from dagster_pipeline.utils.snowflake_upsert import upsert_to_snowflake
from dagster import asset, OpExecutionContext
from .connectors.jolpi_api import JolpiAPI

api = JolpiAPI()


@asset(
    group_name="f1_staging",
    key_prefix="f1_staging",
    required_resource_keys={"snowflake_resource"},
)
def stg_events(context: OpExecutionContext) -> None:
    df = api.get_events()
    with context.resources.snowflake_resource.get_connection() as conn:
        upsert_to_snowflake(
            df, "stg_events", conn, context, merge_keys=["eventid"], pk="eventid"
        )


@asset(
    group_name="f1_staging",
    key_prefix="f1_staging",
    required_resource_keys={"snowflake_resource"},
)
def stg_circuits(context: OpExecutionContext) -> None:
    df = api.get_circuits()
    with context.resources.snowflake_resource.get_connection() as conn:
        upsert_to_snowflake(
            df, "stg_circuits", conn, context, merge_keys=["circuitid"], pk="circuitid"
        )


@asset(
    group_name="f1_staging",
    key_prefix="f1_staging",
    required_resource_keys={"snowflake_resource"},
)
def stg_constructor_standings(context: OpExecutionContext) -> None:
    df = api.get_constructor_standings()
    with context.resources.snowflake_resource.get_connection() as conn:
        upsert_to_snowflake(
            df,
            "stg_constructor_standings",
            conn,
            context,
            merge_keys=["constructor"],
            pk="constructor",
        )


@asset(
    group_name="f1_staging",
    key_prefix="f1_staging",
    required_resource_keys={"snowflake_resource"},
)
def stg_driver_standings(context: OpExecutionContext) -> None:
    df = api.get_driver_standings()
    with context.resources.snowflake_resource.get_connection() as conn:
        upsert_to_snowflake(
            df,
            "stg_driver_standings",
            conn,
            context,
            merge_keys=["driver"],
            pk="driver",
        )
