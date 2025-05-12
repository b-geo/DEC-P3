from f1_pipeline.assets import jolpi_api
from f1_pipeline.schedules import staging_schedule
from dagster_snowflake import snowflake_resource
from dagster import (
    Definitions,
    load_assets_from_modules,
)

all_assets = load_assets_from_modules([jolpi_api])
snowflake = snowflake_resource.configured({
        "account": "UDGCIBD-WR02182",
        "user": "B1G",
        "password": "dqF!U7uzgcEHTAg",
        "database": "f1",
        "warehouse": "COMPUTE_WH",
        "schema": "staging"
    })

defs = Definitions(
    assets= all_assets,
    schedules=[staging_schedule],
    resources= {"snowflake": snowflake},
)