from pathlib import Path
import os
from dagster import file_relative_path
from dagster import AssetExecutionContext
from dagster_dbt import DbtCliResource, dbt_assets

DBT_PROJECT_DIR = file_relative_path(__file__, "./main")
manifest_path = os.path.join(DBT_PROJECT_DIR, "target/manifest.json")
DBT_TARGET_DIR = file_relative_path(__file__, "./main/target")
DBT_PROFILES_DIR = file_relative_path(__file__, "./main")

dbt_resource = DbtCliResource(project_dir=DBT_PROJECT_DIR)

@dbt_assets(manifest=manifest_path if Path(manifest_path).exists() else None)
def dbt_marts(context: AssetExecutionContext, dbt_resource: DbtCliResource):
    if not Path(manifest_path).exists():
        context.log.info("No manifest found - compiling dbt project first...")
        yield from dbt_resource.cli(["compile"], context=context).stream()
    yield from dbt_resource.cli(["run"], context=context).stream()
