import fastf1
import pandas as pd

#dim_events
# columns = [
#    'RoundNumber', 'Country', 'Location', 'OfficialEventName', 'EventDate',
#    'EventName', 'EventFormat', 'Session1', 'Session1Date',
#    'Session1DateUtc', 'Session2', 'Session2Date', 'Session2DateUtc',
#    'Session3', 'Session3Date', 'Session3DateUtc', 'Session4',
#    'Session4Date', 'Session4DateUtc', 'Session5', 'Session5Date',
#    'Session5DateUtc', 'F1ApiSupport']
events = fastf1.get_event_schedule(year = 2025)
round_numbers = events["RoundNumber"]
session = fastf1.get_session(2025, "Australia", "R")
session.load()
dim_driver = session.results
print(dim_driver)

# for round_number in round_numbers[1:2]:
#     session = fastf1.get_session(2025, round_number, "R")
#     session.load()
#     dim_driver = session.results[1:3]
#     for driver in dim_driver["Abbreviation"]:
#         last_lap = session.laps.groupby("Driver")["LapNumber"].max().reset_index() #not every person has all laps
#         print(driver, last_lap)
        # laps = session.laps.pick_drivers([driver])
        # should then go for each driver, each lap get tele
        # get laps range for driver then do get tele which is for a lap and driver
        # print(laps) # has per lap - so tyre stuff, sector times
        # driver_tele = laps.get_telemetry() # has telemetry for the selection of laps
        # print(driver_tele.columns) #needs to be for specific driver
    # session_info = session.session_info # don't need this
    # dim_driver = session.results # dim_driver and dim_team
    # events can give other circuit info, then just get corners from below
    # circuit_corners = session.get_circuit_info().corners


#dims - driver, team, date, circuit
#facts - event - done in snowflake from everything, lap - streamed with kafka

#dim_drivers (need to do for all sessions)
# columns = [
#     'DriverNumber', 'BroadcastName', 'Abbreviation', 'DriverId', 'TeamName',
#     'TeamColor', 'TeamId', 'FirstName', 'LastName', 'FullName',
#     'HeadshotUrl', 'CountryCode', 'Position', 'ClassifiedPosition',
#     'GridPosition', 'Q1', 'Q2', 'Q3', 'Time', 'Status', 'Points']
 #df
# this is for a particular session (which will be race)

#dim_teams
#GET FROM ABOVE
# columns = [
#     'TeamName', 'TeamColor', 'TeamId']
#dim_date
#EZ DONE

#fact_laps



#dim_circuits (need to do for all sessions)
# columns = [
#     'X', 'Y', 'Number', 'Letter', 'Angle', 'Distance']

    
