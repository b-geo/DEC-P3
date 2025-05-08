"""Jolpi API requests"""
import json
from datetime import datetime
import requests
import pandas as pd
import psycopg2
from psycopg2.extras import execute_batch



# def get_val_from_dict_col(col_value, key):
#     if isinstance(col_value, dict):
#         value = col_value.get(key)
#         if value is not None:
#             print(value)
#             return value
#     else:
#         raise Exception("Constructor format has changed.")

def json_col_conv(df: pd.DataFrame, columns: list) -> pd.DataFrame:
    for col in columns:
        df[col] = df[col].apply(
            lambda x: json.dumps(x) if isinstance(x, (dict, list)) else None
        )
    return df

def get_current_round(events_df: pd.DataFrame, today: datetime) -> int:
    try:
        events_df["date"] = pd.to_datetime(events_df["date"])
        today_date = today.date()
        past_dates_df = events_df[events_df["date"].dt.date < today_date] #i only want completed rounds
        
        if not past_dates_df.empty:
            max_round = past_dates_df['round'].max()
            return int(max_round)
        else:
            print("No valid dates <= today found") #logger warning
            return None
            
    except Exception as e:
        print(f"Error processing dates: {e}") #logger error


def update_table(table_as_df: pd.DataFrame, table_name: str, pk: str) -> None:
    try:
        connection = psycopg2.connect(host = "localhost", port = 5432, database = "postgres", user = "postgres", password = "postgres")
        with connection:
            with connection.cursor() as cur:

                column_defs = []
                for column in table_as_df.columns:
                    #forcing text type for this as it'll be raw data before transformation
                    column_def = f"{column} TEXT"
                    if column == pk:
                        column_def += " PRIMARY KEY"
                    column_defs.append(column_def)

                columns = ",\n".join(column_defs)

                # create table if it doesn't exist
                create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} (\n{columns}\n);"
                cur.execute(create_table_query)

                # get relevant parts for table
                columns = ', '.join(table_as_df.columns)
                placeholders = ', '.join(['%s'] * len(table_as_df.columns)) #%s placeholder to prevent SQL injection
                updates = ', '.join([f"{col}=EXCLUDED.{col}" for col in table_as_df.columns if col != pk]) #grabs from excluded when pk = pk, so that values are update

                query = f"""
                INSERT INTO {table_name} ({columns})
                VALUES ({placeholders})
                ON CONFLICT ({pk})
                DO UPDATE SET {updates}
                """

                execute_batch(cur, query, table_as_df.values.tolist())
    except Exception as e:
        print(f"Error occurred: {e}")
        raise
    finally:
        if 'connection' in locals() and connection is not None:
            connection.close()

#get year we are in
today = datetime.today()

def events(today: datetime) -> None:
    today_year = today.year
    #events
    events_resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{today_year}/races/?format=json&limit=100", timeout=10)
    events_json = events_resp.json()["MRData"]["RaceTable"]["Races"]
    events_df = pd.DataFrame(events_json)
    # add event_id
    events_df["event_id"] = (
        events_df["season"].astype(str) +
        "-R" +
        events_df["round"].astype(str).str.zfill(3)
    )
    cols_for_json = [
        "Circuit", 
        "FirstPractice", 
        "SecondPractice", 
        "ThirdPractice", 
        "Qualifying", 
        "Sprint", 
        "SprintQualifying"
    ]
    for col in cols_for_json:
        events_df[col] = events_df[col].apply(
            lambda x: json.dumps(x) if isinstance(x, (dict, list)) else None
        )

    update_table(table_as_df = events_df, table_name = "events", pk = "event_id")
    curr_round = get_current_round(events_df = events_df, today = today)
    if curr_round:
        return curr_round
    else:
        return 1

current_round = events(today = today)


def circuits() -> None:
    #circuits
    circuits_resp = requests.get(f"https://api.jolpi.ca/ergast/f1/circuits/?format=json&limit=100", timeout=10)
    circuits_json = circuits_resp.json()["MRData"]["CircuitTable"]["Circuits"]
    circuits_df = pd.DataFrame(circuits_json)

    cols_for_json = [
        "Location"
    ]
    circuits_df = json_col_conv(df = circuits_df, columns = cols_for_json)

    update_table(table_as_df = circuits_df, table_name = "circuits", pk = "circuitId")

circuits()


# #constructors
def consctructor_standings(today: datetime, current_round: int) -> None:
    today_year = today.year
    cons_resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{today_year}/{current_round}/constructorstandings/?format=json&limit=100", timeout=10)
    cons_json = cons_resp.json()["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"]
    cons_df = pd.DataFrame(cons_json)
    cols_for_json = [
        "Constructor"
    ]
    cons_df = json_col_conv(df = cons_df, columns = cols_for_json)
    update_table(table_as_df = cons_df, table_name = "constructor_standings", pk ="Constructor")

consctructor_standings(today = today, current_round = current_round)

#drivers (driverid on jolpi matches DriverID on fastf1)
def driver_standings(today: datetime, current_round: int) -> None:
    today_year = today.year
    drivers_resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{today_year}/{current_round}/driverstandings/?format=json&limit=100", timeout=10)
    drivers_json =drivers_resp.json()["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
    drivers_df = pd.DataFrame(drivers_json)
    cols_for_json = [
        "Driver",
        "Constructors"
    ]
    drivers_df = json_col_conv(df = drivers_df, columns = cols_for_json)
    update_table(table_as_df = drivers_df, table_name = "driver_standings", pk ="Driver")

driver_standings(today = today, current_round = current_round)

#date dim

# fact events and fact laps, linked by event id
