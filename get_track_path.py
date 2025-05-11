import fastf1
import pandas as pd
import numpy as np
import json

# events = fastf1.get_event_schedule(year = 2025)
# round_numbers = events["RoundNumber"]
session = fastf1.get_session(2025, "Australia", "R")
session.load()
lap = session.laps.pick_fastest()
tel = lap.get_telemetry()
x_coords = np.array(tel['X'].values)
y_coords = np.array(tel['Y'].values)
print(x_coords[0], y_coords[0])
track_points = np.column_stack((x_coords, y_coords)).tolist()

with open('melb_track.json', 'w', encoding = "utf-8") as file:
    json.dump(track_points, file)      
