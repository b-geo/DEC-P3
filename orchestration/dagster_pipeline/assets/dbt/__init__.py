from typing import List
from pathlib import Path
from dagster import (
    AssetsDefinition,
    file_relative_path
)
from dagster_dbt import load_assets_from_dbt_manifest

DBT_PROJECT_DIR = file_relative_path(__file__, "main")
MANIFEST_PATH = file_relative_path(__file__, "main/target/manifest.json")
DBT_PROFILES_DIR = file_relative_path(__file__, "main")

dbt_assets_list: List[AssetsDefinition] = load_assets_from_dbt_manifest(
    manifest=Path(MANIFEST_PATH),
    dbt_resource_key="dbt_resource",
    use_build_command=True
)

__all__ = ["dbt_assets_list", "DBT_PROJECT_DIR", "DBT_PROFILES_DIR"]