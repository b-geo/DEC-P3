from pathlib import Path
from typing import List
from dagster import (
    Definitions,
    load_assets_from_modules,
    AssetsDefinition
)
from dagster_dbt import (
    DbtCliResource, 
    load_assets_from_dbt_manifest
)
from dagster_snowflake import snowflake_resource
from dagster_pipeline.assets import jolpi
from dagster_pipeline.assets.dbt.dbt_assets import (
    DBT_PROJECT_DIR, 
    DBT_PROFILES_DIR, 
    MANIFEST_PATH
)
from dagster_pipeline.schedules import staging_schedule

# adding type hints below to avoid pylint warnings
jolpi_assets: List[AssetsDefinition] = load_assets_from_modules([jolpi])
dbt_assets: List[AssetsDefinition] = load_assets_from_dbt_manifest(
    manifest=Path(MANIFEST_PATH),
    dbt_resource_key="dbt_resource", 
    use_build_command=True
)

defs = Definitions(
    assets= [*jolpi_assets, *dbt_assets],
    schedules=[staging_schedule],
    resources= {
        "snowflake_resource":
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
        )
    }
)
