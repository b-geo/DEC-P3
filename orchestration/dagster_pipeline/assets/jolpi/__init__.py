from typing import List
from dagster import load_assets_from_modules, AssetsDefinition
from . import jolpi_assets

# adding type hints below to avoid pylint warnings
jolpi_assets_list: List[AssetsDefinition] = load_assets_from_modules(
    modules=[jolpi_assets]
)

__all__ = ["jolpi_assets_list"]
