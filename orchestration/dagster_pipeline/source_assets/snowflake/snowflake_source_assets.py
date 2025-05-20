from dagster import SourceAsset, AssetKey

stg_laps = SourceAsset(
    key=AssetKey(["f1_staging", "stg_laps"]),
    group_name="f1_staging",
    description="Raw lap data ingested via Kafka connector to Snowflake.",
)

stg_telemetry = SourceAsset(
    key=AssetKey(["f1_staging", "stg_telemetry"]),
    group_name="f1_staging",
    description="Raw lap telemetry data ingested via Kafka connector to Snowflake.",
)
