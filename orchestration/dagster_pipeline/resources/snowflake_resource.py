from snowflake.connector.pandas_tools import write_pandas
import pandas as pd
from dagster import resource
from dagster_snowflake import SnowflakeResource as DagsterSnowflakeResource


class SnowflakeUpsertUtils:
    @staticmethod
    def get_latest_timestamp(conn, table):
        cursor = conn.cursor()
        cursor.execute(f"SELECT MAX(updated_at) FROM {table}")
        return cursor.fetchone()[0]
    @staticmethod    
    def upsert_to_snowflake(conn, df, target_table, merge_keys, pk):
        cursor = conn.cursor()
        df["last_updated"] = pd.to_datetime("now", utc=True).round("ms")
        df.columns = df.columns.str.upper()
        merge_keys = [key.upper() for key in merge_keys]

        temp_table = f"temp_{target_table}".upper()
        target_table = target_table.upper()
        # write the DataFrame to a temporary table
        write_pandas(conn, df, temp_table, auto_create_table=True, overwrite=True, use_logical_type=True)

        column_defs = []
        for column in df.columns:
            #forcing text type for this as it'll be raw data before transformation
            column_def = f"{column} TEXT"
            if column == pk:
                column_def += " PRIMARY KEY"
            column_defs.append(column_def)

        columns = ",\n".join(column_defs)

        set_clause = ", ".join([f"target.{col} = source.{col}" for col in df.columns if col not in merge_keys and col != "LAST_UPDATED"])
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

        cursor.execute(create_table_query)
        cursor.execute(merge_sql)
        cursor.execute(f"DROP TABLE IF EXISTS {temp_table}")
class EnhancedSnowflakeResource(DagsterSnowflakeResource):
    def upsert_to_snowflake(self, df, target_table, merge_keys, pk):
        with self.get_connection() as conn:
            SnowflakeUpsertUtils.upsert_to_snowflake(conn, df, target_table, merge_keys, pk)
    def get_latest_timestamp(self, table):
        with self.get_connection() as conn:
            SnowflakeUpsertUtils.get_latest_timestamp(conn, table)

@resource
def res(context):
    return EnhancedSnowflakeResource(**context.resource_config)