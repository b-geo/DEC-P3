from snowflake.connector.pandas_tools import write_pandas
import pandas as pd


def upsert_to_snowflake(df, target_table, conn, context, merge_keys, pk):
    df["last_updated"] = pd.to_datetime("now", utc=True).round("ms")
    df.columns = df.columns.str.upper()
    merge_keys = [key.upper() for key in merge_keys]

    temp_table = f"temp_{target_table}".upper()
    target_table = target_table.upper()
    # write the DataFrame to a temporary table
    write_pandas(
        conn,
        df,
        temp_table,
        auto_create_table=True,
        overwrite=True,
        use_logical_type=True,
    )

    column_defs = []
    for column in df.columns:
        # forcing text type for this as it'll be raw data before transformation
        column_def = f"{column} TEXT"
        if column == pk:
            column_def += " PRIMARY KEY"
        column_defs.append(column_def)

    columns = ",\n".join(column_defs)

    set_clause = ", ".join(
        [
            f"target.{col} = source.{col}"
            for col in df.columns
            if col not in merge_keys and col != "LAST_UPDATED"
        ]
    )
    insert_columns = ", ".join(df.columns)
    insert_values = ", ".join([f"source.{col}" for col in df.columns])
    on_clause = " AND ".join([f"target.{key} = source.{key}" for key in merge_keys])

    # create table if it doesn't exist
    create_table_query = f"CREATE TABLE IF NOT EXISTS {target_table} (\n{columns}\n);"
    merge_sql = f"""
    MERGE INTO {target_table} AS target
    USING {temp_table} AS source
    ON {on_clause}
    WHEN MATCHED THEN UPDATE SET {set_clause}
    WHEN NOT MATCHED THEN INSERT ({insert_columns}) VALUES ({insert_values})
    """

    with conn.cursor() as cur:
        cur.execute(create_table_query)
        context.log.info(f"Running MERGE into {target_table}")
        cur.execute(merge_sql)
        context.log.info(f"Dropping staging table {temp_table}")
        cur.execute(f"DROP TABLE IF EXISTS {temp_table}")
