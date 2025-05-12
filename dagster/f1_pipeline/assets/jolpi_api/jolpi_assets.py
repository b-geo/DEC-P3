from f1_pipeline.utils.snowflake_upsert import upsert_to_snowflake
import pandas as pd
from dagster import asset, OpExecutionContext
from .connectors.jolpi_api import JolpiAPI


api = JolpiAPI()

@asset(
    group_name="f1_staging",
    required_resource_keys={"snowflake"}
)
def stg_events(context) -> None:
    df = api.get_events()
    # Use the connection as a context manager
    with context.resources.snowflake.get_connection() as conn:
        # Ensure you're working with the actual connection object
        upsert_to_snowflake(df, "stg_events", conn, context, merge_keys=["eventid"], pk="eventid")

@asset(
    group_name="f1_staging",
    required_resource_keys={"snowflake"}
)
def stg_circuits(context: OpExecutionContext) -> None:
    df = api.get_circuits()
    # Use the connection as a context manager
    with context.resources.snowflake.get_connection() as conn:
        # Ensure you're working with the actual connection object
       upsert_to_snowflake(df, "stg_circuits", conn, context, merge_keys=["circuitid"], pk="circuitid")

@asset(
    group_name="f1_staging",
    required_resource_keys={"snowflake"}
)
def stg_constructor_standings(context: OpExecutionContext) -> None:
    df =  api.get_constructor_standings()
    with context.resources.snowflake.get_connection() as conn:
        # Ensure you're working with the actual connection object
       upsert_to_snowflake(df, "stg_constructor_standings", conn, context, merge_keys=["constructor"], pk="constructor")

@asset(
    group_name="f1_staging",
    required_resource_keys={"snowflake"}
)
def stg_driver_standings(context: OpExecutionContext) -> None:
    df = api.get_driver_standings()
    with context.resources.snowflake.get_connection() as conn:
        # Ensure you're working with the actual connection object
       upsert_to_snowflake(df, "stg_driver_standings", conn, context, merge_keys=["driver"], pk="driver")