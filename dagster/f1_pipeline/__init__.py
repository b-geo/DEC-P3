from f1_pipeline.assets import jolpi
from f1_pipeline.schedules import staging_schedule
from f1_pipeline.assets.dbt.dbt_assets import DBT_PROJECT_DIR, DBT_PROFILES_DIR, dbt_marts
from dagster_snowflake import snowflake_resource
from dagster import (
    Definitions,
    load_assets_from_modules,
    FilesystemIOManager
)
from dagster_dbt import DbtCliResource

jolpi_assets = load_assets_from_modules([jolpi])

defs = Definitions(
    assets= [*jolpi_assets, *dbt_marts],
    schedules=[staging_schedule],
    resources= {"snowflake_resource": 
        snowflake_resource.configured({
            "account": "UDGCIBD-WR02182",
            "user": "B1G",
            "password": "dqF!U7uzgcEHTAg",
            "database": "f1",
            "warehouse": "COMPUTE_WH",
            "schema": "staging"
        }),
        "dbt_resource": DbtCliResource(
    project_dir=DBT_PROJECT_DIR,
    profiles_dir=DBT_PROFILES_DIR
),
        "io_manager": FilesystemIOManager(base_dir="/tmp/dagster"),  # or your custom IO manager
    }
)