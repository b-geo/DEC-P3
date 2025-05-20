from dagster import define_asset_job, AssetSelection

#materialize all staging assets every second day
full_staging_job = define_asset_job(
    name="every second day - staging", selection=AssetSelection.groups("f1_staging")
)
