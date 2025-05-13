"""Use to get the track path of a specific session in JSON format. 
This is then displayed in the streaming dashboard."""

import json
import fastf1
import numpy as np


session = fastf1.get_session(2025, "Australia", "R")
session.load()
lap = session.laps.pick_fastest()
tel = lap.get_telemetry()
x_coords = np.array(tel['X'].values)
y_coords = np.array(tel['Y'].values)
track_points = np.column_stack((x_coords, y_coords)).tolist()

with open('melb_track.json', 'w', encoding = "utf-8") as file:
    json.dump(track_points, file)      
