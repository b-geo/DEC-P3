import os
from typing import List
from pathlib import Path
from dagster import AssetsDefinition, AutoMaterializePolicy
from dagster_dbt import load_assets_from_dbt_manifest

DBT_PROJECT_DIR = os.environ["DBT_PROJECT_DIR"]
MANIFEST_PATH = os.environ["MANIFEST_PATH"]
DBT_PROFILES_DIR = os.environ["DBT_PROFILES_DIR"]

dbt_assets_list: List[AssetsDefinition] = load_assets_from_dbt_manifest(
    manifest=Path(MANIFEST_PATH),
    dbt_resource_key="dbt_resource",
    use_build_command=True,
)

dbt_assets_list_automaterialize = [
    asset.with_policy(AutoMaterializePolicy.eager()) for asset in dbt_assets_list
]

__all__ = ["dbt_assets_list_automaterialize", "DBT_PROJECT_DIR", "DBT_PROFILES_DIR"]
