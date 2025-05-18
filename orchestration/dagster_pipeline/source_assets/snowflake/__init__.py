from typing import List
from dagster import (
    SourceAsset
)
from . import snowflake_source_assets

# adding type hints below to avoid pylint warnings
snowflake_source_assets_list: List[SourceAsset] = [
    snowflake_source_assets.stg_laps,
    snowflake_source_assets.stg_telemetry
]

__all__ = ["snowflake_source_assets_list"]
