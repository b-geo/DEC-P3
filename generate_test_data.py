"""
Get telemetry data for a given round.
This is then used as the source to replay a datastream to Kafka.
"""

import fastf1
import pandas as pd

fastf1.Cache.set_disabled()
# events = fastf1.get_event_schedule(year = 2025)
# round_numbers = events["RoundNumber"]
session = fastf1.get_session(2025, "Australia", "R")
session.load()
results = session.results
drivers = results["Abbreviation"].unique().tolist()
laps = session.laps
laps_column_types = {
        'Driver': 'object',
        'LapTime': 'timedelta64[ns]',
        'LapNumber': 'float64',
        'PitOutTime': 'timedelta64[ns]',
        'PitInTime': 'timedelta64[ns]',
        'Sector1Time': 'timedelta64[ns]',
        'Sector2Time': 'timedelta64[ns]',
        'Sector3Time': 'timedelta64[ns]',
        'Sector1SessionTime': 'timedelta64[ns]',
        'Sector2SessionTime': 'timedelta64[ns]',
        'Sector3SessionTime': 'timedelta64[ns]',
        'SpeedI1': 'float64',
        'SpeedI2': 'float64',
        'SpeedFL': 'float64',
        'SpeedST': 'float64',
        'Compound': 'object',
        'TyreLife': 'float64',
        'FreshTyre': 'object',
        'Team': 'object',
        'LapStartTime': 'timedelta64[ns]',
        'LapStartDate': 'datetime64[ns]',
        'TrackStatus': 'object',
        'Position': 'float64'
    }
session_laps = pd.DataFrame(columns = laps_column_types.keys()).astype(laps_column_types)
telemetry_column_types = {
    'Date': 'datetime64[ns]', 
    'SessionTime': 'timedelta64[ns]', 
    'DriverAhead': 'object', 
    'DistanceToDriverAhead': 'float64', 
    'RPM': 'float64', 
    'Speed': 'float64', 
    'nGear': 'int32', 
    'Throttle': 'float64', 
    'Brake': 'bool', 
    'DRS': 'int32', 
    'Distance': 'float64', 
    'RelativeDistance': 'float64', 
    'Status': 'object', 
    'X': 'float64', 
    'Y': 'float64', 
    'Z': 'float64', 
    'Lap': 'int64', 
    'Driver': 'object'
    }
session_telemetry = pd.DataFrame(columns = telemetry_column_types.keys()).astype(telemetry_column_types)
for driver in drivers[1:2]:
    driver_laps = laps[laps["Driver"] == driver]["LapNumber"].unique().tolist()
    for lap in driver_laps[1:2]:
        driver_lap_data = laps.pick_drivers(driver)
        final_laps_data = driver_lap_data.drop(columns = [
            "Time",
            "DriverNumber", 
            'Stint', 
            'IsPersonalBest', 
            'Deleted', 
            'DeletedReason', 
            'FastF1Generated', 
            'IsAccurate'
        ])
        session_laps = pd.concat([session_laps, final_laps_data], axis = 0, ignore_index = True)
        driver_tele_data = driver_lap_data.get_telemetry()
        driver_tele_data["Lap"] = int(lap)
        driver_tele_data["Driver"] = str(driver)
        final_tele_laps_data = driver_tele_data.drop(columns = ["Time", "Source"])
        session_telemetry = pd.concat([session_telemetry, final_tele_laps_data], axis = 0, ignore_index = True)

session_laps.sort_values(by = "LapNumber", inplace = True)

session_telemetry.sort_values(by = "Date", inplace = True)
session_telemetry["date_delta"] = session_telemetry["Date"] \
    .diff() \
    .fillna(pd.Timedelta(seconds=0)) \
    .dt.total_seconds() * 1000
session_telemetry["date_delta"] =session_telemetry["date_delta"].round(0).astype(int)

with open('laps_data.jsonl', 'w', encoding = "utf-8") as file:
    file.write(session_laps.to_json(orient='records', lines=True))

with open('tele_data.jsonl', 'w', encoding = "utf-8") as file:
    file.write(session_telemetry.to_json(orient='records', lines=True))
