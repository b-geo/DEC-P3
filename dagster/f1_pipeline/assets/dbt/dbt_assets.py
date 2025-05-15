from pathlib import Path

from dagster import AssetExecutionContext, asset, file_relative_path, define_asset_job

from dagster_dbt import DbtCliResource, dbt_assets

DBT_PROJECT_DIR = file_relative_path(__file__, "./main")
MANIFEST_PATH = file_relative_path(__file__, "./main/target/manifest.json")
DBT_TARGET_DIR = file_relative_path(__file__, "./main/target")
DBT_PROFILES_DIR = file_relative_path(__file__, "./main")

dbt_resource = DbtCliResource(
    project_dir=DBT_PROJECT_DIR, 
    profiles_dir=DBT_PROFILES_DIR, 
    target_dir=DBT_TARGET_DIR
)

@dbt_assets(manifest= str(MANIFEST_PATH))
def dbt_marts(context: AssetExecutionContext, dbt_resource: DbtCliResource):
    yield from dbt_resource.cli(["run"], context=context).stream()