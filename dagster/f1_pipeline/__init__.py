from f1_pipeline.assets import jolpi
from f1_pipeline.schedules import staging_schedule
from f1_pipeline.assets.dbt.dbt_assets import dbt_resource, dbt_marts
from dagster_snowflake import snowflake_resource
from dagster import (
    Definitions,
    load_assets_from_modules
)

jolpi_assets = load_assets_from_modules([jolpi])

defs = Definitions(
    assets= [*jolpi_assets, dbt_marts],
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
        "dbt_resource": dbt_resource
    }
)