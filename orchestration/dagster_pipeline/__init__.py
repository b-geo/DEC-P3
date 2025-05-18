from dagster import (
    Definitions
)
from dagster_dbt import (
    DbtCliResource
)
from dagster_pipeline.assets import jolpi
from dagster_snowflake import snowflake_resource
from dagster_pipeline.source_assets import snowflake
from dagster_pipeline.assets import dbt
from dagster_pipeline.schedules import staging_schedule


defs = Definitions(
    assets= [*jolpi.jolpi_assets_list, *dbt.dbt_assets_list, *snowflake.snowflake_source_assets_list],
    schedules=[staging_schedule],
    resources= {
        "snowflake_resource":
            snowflake_resource.configured({
            "account": {"env": "SNOWFLAKE_ACCOUNT"},
            "user": {"env": "SNOWFLAKE_USER"},
            "password": {"env": "SNOWFLAKE_PASSWORD"},
            "database": {"env": "SNOWFLAKE_DB"},
            "warehouse": {"env": "SNOWFLAKE_WAREHOUSE"},
            "schema": "staging"
        }),
        "dbt_resource": DbtCliResource(
            project_dir=dbt.DBT_PROJECT_DIR,
            profiles_dir=dbt.DBT_PROFILES_DIR
        )
    }
)

