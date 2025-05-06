"""Jolpi API requests"""
#circuits, constructors, 
import requests
import pandas as pd
from datetime import datetime
import psycopg2
from psycopg2.extras import execute_batch

#make this dictionary
def map_dtype_to_pg(dtype):
    if pd.api.types.is_string_dtype(dtype):
        return "TEXT"
    elif pd.api.types.is_integer_dtype(dtype):
        return "INTEGER"
    elif pd.api.types.is_float_dtype(dtype):
        return "DOUBLE PRECISION"
    elif pd.api.types.is_bool_dtype(dtype):
        return "BOOLEAN"
    elif pd.api.types.is_datetime64_any_dtype(dtype):
        return "TIMESTAMP"
    else:
        return "TEXT"  # Fallback


def update_table(table_as_df: pd.DataFrame, table_name: str, pk: str):
    connection = psycopg2.connect(host = "localhost", port = 5432, database = "postgres", user = "postgres", password = "postgres")
    cur = connection.cursor()

    columns = ",\n".join([
        f"{col} {map_dtype_to_pg(dtype)}" + (" PRIMARY KEY" if col == pk else "")
        for col, dtype in table_as_df.dtypes.items()
    ])
    # SQL to create table if it doesn't exist
    create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} (\n{columns}\n);"
    cur.execute(create_table_query)

    # Generate column names and placeholders
    columns = ', '.join(table_as_df.columns)
    placeholders = ', '.join(['%s'] * len(table_as_df.columns))
    updates = ', '.join([f"{col}=EXCLUDED.{col}" for col in table_as_df.columns if col != pk])

    query = f"""
    INSERT INTO {table_name} ({columns})
    VALUES ({placeholders})
    ON CONFLICT ({pk})
    DO UPDATE SET {updates}
    """

    execute_batch(cur, query, table_as_df.values.tolist())
    connection.commit()
    cur.close()




#get year we are in
now = datetime.now()
today_year = now.year
today_date = now.strftime("%Y-%m-%d")

#events
resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{today_year}/races/?format=json&limit=100")
json = resp.json()
events = json["MRData"]["RaceTable"]["Races"]
events_df = pd.DataFrame(events)
events_df["circuit_id"] = events_df["Circuit"].apply(lambda col_value: col_value.get("circuitId") if isinstance(col_value, dict) else None)
events_df.drop(columns = [
    "Circuit", 
    "FirstPractice", 
    "SecondPractice", 
    "ThirdPractice", 
    "Qualifying", 
    "Sprint", 
    "SprintQualifying"
    ], 
    inplace = True
    )
events_df["event_id"] = (
    events_df["season"].astype(str) +
    "-R" +
    events_df["round"].astype(str).str.zfill(3)
)
# print(events_df.columns)
update_table(table_as_df=events_df, table_name="dim_events", pk="event_id")
#circuits
# resp = requests.get(f"https://api.jolpi.ca/ergast/f1/circuits/?format=json&limit=100")
# print(resp.json()["MRData"]["CircuitTable"]["Circuits"])
# #use info for circuits dim

# ##get races to find what round we are in
# events_complete = [event for event in events if event["date"] <= today_date]
# current_round = max(event["round"] for event in events_complete) if events_complete else None

# #constructors
# resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{today_year}/{current_round}/constructorstandings/?format=json&limit=100")
# print(resp.json()["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"])
# #use info for constructors dim

# #drivers (driverid on jolpi matches DriverID on fastf1)
# resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{today_year}/{current_round}/driverstandings/?format=json&limit=100")
# print(resp.json()["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"])
# #use info for driver dim

#date dim

# fact events and fact laps, linked by event id


# """
# Get telemetry data for a given round.
# This is then used as the source to replay a datastream to Kafka.
# """

# import fastf1
# import pandas as pd

# events = fastf1.get_event_schedule(year = 2025)
# round_numbers = events["RoundNumber"]
# session = fastf1.get_session(2025, "Australia", "R")
# session.load()
# results = session.results
# drivers = results["Abbreviation"].unique().tolist()
# laps = session.laps
# column_types = {
#     'Date': 'datetime64[ns]', 
#     'SessionTime': 'timedelta64[ns]', 
#     'DriverAhead': 'object', 
#     'DistanceToDriverAhead': 'float64', 
#     'RPM': 'float64', 
#     'Speed': 'float64', 
#     'nGear': 'int32', 
#     'Throttle': 'float64', 
#     'Brake': 'bool', 
#     'DRS': 'int32', 
#     'Distance': 'float64', 
#     'RelativeDistance': 'float64', 
#     'Status': 'object', 
#     'X': 'float64', 
#     'Y': 'float64', 
#     'Z': 'float64', 
#     'Lap': 'int64', 
#     'Driver': 'object'}
# session_telemetry = pd.DataFrame(columns = column_types.keys()).astype(column_types)
# for driver in drivers[1:2]:
#     driver_laps = laps[laps["Driver"] == driver]["LapNumber"].unique().tolist()
#     for lap in driver_laps[1:2]:
#         driver_lap_data = laps.pick_drivers(driver)
#         driver_tele_data = driver_lap_data.get_telemetry()
#         driver_tele_data["Lap"] = int(lap)
#         driver_tele_data["Driver"] = str(driver)
#         final_lap_data = driver_tele_data.drop(columns = ["Time", "Source"])
#         session_telemetry = pd.concat([session_telemetry, final_lap_data], axis = 0, ignore_index = True)

# with open('f1_data.jsonl', 'w', encoding = "utf-8") as file:
#     file.write(session_telemetry.to_json(orient='records', lines=True))      


# //Laps data
# "Time": "timedelta64[ns]",
# "Driver": str,
# "DriverNumber": str,
# "LapTime": "timedelta64[ns]",
# "LapNumber": "float64",
# "Stint": "float64",
# "PitOutTime": "timedelta64[ns]",
# "PitInTime": "timedelta64[ns]",
# "Sector1Time": "timedelta64[ns]",
# "Sector2Time": "timedelta64[ns]",
# "Sector3Time": "timedelta64[ns]",
# "Sector1SessionTime": "timedelta64[ns]",
# "Sector2SessionTime": "timedelta64[ns]",
# "Sector3SessionTime": "timedelta64[ns]",
# "SpeedI1": "float64",
# "SpeedI2": "float64",
# "SpeedFL": "float64",
# "SpeedST": "float64",
# "IsPersonalBest": bool,
# "Compound": str,
# "TyreLife": "float64",
# "FreshTyre": bool,
# "Team": str,
# "LapStartTime": "timedelta64[ns]",
# "LapStartDate": "datetime64[ns]",
# "TrackStatus": str,
# "Position": "float64",  # need to support NaN
# "Deleted": Optional[bool],
# "DeletedReason": str,
# "FastF1Generated": bool,
# "IsAccurate": bool