from dagster import define_asset_job, AssetSelection

full_staging_job = define_asset_job(
    name="weekly_refresh", 
    selection=AssetSelection.groups("f1_staging")
)
