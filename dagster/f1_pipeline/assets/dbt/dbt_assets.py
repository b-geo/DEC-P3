from dagster import file_relative_path
from pathlib import Path
from dagster_dbt import DbtCliResource, load_assets_from_dbt_manifest

DBT_PROJECT_DIR = file_relative_path(__file__, "main")
MANIFEST_PATH = file_relative_path(__file__, "main/target/manifest.json")
DBT_TARGET_DIR = file_relative_path(__file__, "main/target")
DBT_PROFILES_DIR = file_relative_path(__file__, "main")

dbt_marts = load_assets_from_dbt_manifest(
    manifest=Path(MANIFEST_PATH),
    io_manager_key="io_manager",
    dbt_resource_key="dbt_resource",
    use_build_command=False
)