"""Jolpi API requests"""
import json
from datetime import datetime
import requests
import pandas as pd

class JolpiAPI:
    def __init__(self):
        self.base_url = "https://api.jolpi.ca/ergast/f1/"
        self.params = "?format=json&limit=100"
        self.current_round = None
        self.today = datetime.today()
        self.today_year = self.today.year
        self.today_date = self.today.date()

    def get_events(self) -> pd.DataFrame:
        events_df = self._get_events()
        return events_df
    def get_circuits(self) -> pd.DataFrame:
        circuits_df = self._get_circuits()
        return circuits_df
    def get_constructor_standings(self) -> pd.DataFrame:
        cons_df = self._get_constructor_standings()
        return cons_df
    def get_driver_standings(self) -> pd.DataFrame:
        drivers_df = self._get_driver_standings()
        return drivers_df

    def _json_col_conv(self, df: pd.DataFrame, columns: list) -> pd.DataFrame:
        for col in columns:
            df[col] = df[col].apply(
                lambda x: json.dumps(x) if isinstance(x, (dict, list)) else None
            )
        return df
    def _get_current_round(self) -> int:
        events_df = self._get_events()
        events_df["date"] = pd.to_datetime(events_df["date"])
        past_dates_df = events_df[events_df["date"].dt.date < self.today_date] #i only want completed rounds
        
        if not past_dates_df.empty:
            max_round = past_dates_df['round'].max()
            return int(max_round)
        else:
            print("No valid dates <= today found for this round. Returning 1.") #logger warning
            return 1   


    def _get_events(self) -> pd.DataFrame:
        #events
        events_resp = requests.get(f"{self.base_url}{self.today_year}/races/{self.params}", timeout=10)
        events_resp.raise_for_status()
        events_json = events_resp.json()["MRData"]["RaceTable"]["Races"]
        events_df = pd.DataFrame(events_json)
        # add event_id
        events_df["eventid"] = (
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
        events_df = self._json_col_conv(df = events_df, columns = cols_for_json)
        return events_df

    def _get_circuits(self) -> pd.DataFrame:
        #circuits
        circuits_resp = requests.get(f"{self.base_url}circuits/{self.params}", timeout=10)
        circuits_resp.raise_for_status()
        circuits_json = circuits_resp.json()["MRData"]["CircuitTable"]["Circuits"]
        circuits_df = pd.DataFrame(circuits_json)
        cols_for_json = [
            "Location"
        ]
        circuits_df = self._json_col_conv(df = circuits_df, columns = cols_for_json)
        return circuits_df
    # #constructors
    def _get_constructor_standings(self) -> pd.DataFrame:
        if self.current_round is None:
            self.current_round = self._get_current_round()
        cons_resp = requests.get(f"{self.base_url}{self.today_year}/{self.current_round}/constructorstandings/{self.params}", timeout=10)
        cons_resp.raise_for_status()
        cons_json = cons_resp.json()["MRData"]["StandingsTable"]["StandingsLists"][0]["ConstructorStandings"]
        cons_df = pd.DataFrame(cons_json)
        cols_for_json = [
            "Constructor"
        ]
        cons_df = self._json_col_conv(df = cons_df, columns = cols_for_json)
        cons_df["round"] = self.current_round
        cons_df["season"] = self.today_year
        return cons_df

    def _get_driver_standings(self) -> pd.DataFrame:
        if self.current_round is None:
            self.current_round = self._get_current_round()
        drivers_resp = requests.get(f"{self.base_url}{self.today_year}/{self.current_round}/driverstandings/{self.params}", timeout=10)
        drivers_resp.raise_for_status()
        drivers_json =drivers_resp.json()["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
        drivers_df = pd.DataFrame(drivers_json)
        cols_for_json = [
            "Driver",
            "Constructors"
        ]
        drivers_df = self._json_col_conv(df = drivers_df, columns = cols_for_json)
        drivers_df["round"] = self.current_round
        drivers_df["season"] = self.today_year
        return drivers_df
