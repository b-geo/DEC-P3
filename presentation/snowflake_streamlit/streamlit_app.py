import streamlit as st
from snowflake.snowpark.context import get_active_session
import seaborn as sns
import matplotlib.pyplot as plt
from datetime import datetime

st.set_page_config(layout="wide")

team_details = {
    "alpine": {
        "short_name": "Alpine",
        "team_colour": "#ff87bc"
    },
    "aston_martin": {
        "short_name": "Aston Martin",
        "team_colour": "#00665f"
    },
    "ferrari": {
        "short_name": "Ferrari",
        "team_colour": "#e80020"
    },
    "haas": {
        "short_name": "Haas",
        "team_colour": "#b6babd"
    },
    "mclaren": {
        "short_name": "McLaren",
        "team_colour": "#ff8000"
    },
    "mercedes": {
        "short_name": "Mercedes",
        "team_colour": "#27f4d2"
    },
    "rb": {
        "short_name": "RB",
        "team_colour": "#fcd700"
    },
    "red_bull": {
        "short_name": "Red Bull",
        "team_colour": "#0600ef"
    },
    "sauber": {
        "short_name": "Sauber",
        "team_colour": "#00e700"
    },
    "williams": {
        "short_name": "Williams",
        "team_colour": "#00a0dd"
    }
}

compound_colours = {
    "HYPERSOFT": "#CC00FF",    # Bright purple-pink (used 2018)
    "ULTRASOFT": "#FF00FF",    # Fuchsia pink (used 2017-2018)
    "SUPERSOFT": "#FF0066",    # Hot pink (used 2016-2018)
    "SOFT": "#FF0000",         # Pure red (current soft)
    "MEDIUM": "#FFD700",       # Gold yellow (current medium)
    "HARD": "#FFFFFF",         # White (current hard)
    "SUPERHARD": "#000000",    # Black (rarely used)
    "INTERMEDIATE": "#00FF00", # Green
    "WET": "#0000FF",          # Blue
    "UNKNOWN": "#AAAAAA",      # Gray
    "TEST-UNKNOWN": "#555555"  # Dark gray
}

try:
    session = get_active_session()
except Exception as e:
    st.error(f"Session error: {str(e)}")
    st.stop()

try:
    season_years_query = f"""
            SELECT
                MIN(EVENT_SEASON_YEAR) AS MIN_YEAR,
                MAX(EVENT_SEASON_YEAR) AS MAX_YEAR
            FROM F1.MARTS.FACT_EVENTS
            """
    season_years_df = session.sql(season_years_query).to_pandas()
    min_year = season_years_df.at[0, 'MIN_YEAR']
    max_year = season_years_df.at[0, 'MAX_YEAR']
    
    with st.sidebar:
        st.header("Race Selection")
        year = st.slider("Season Year", min_value=min_year-1, max_value=max_year, value=datetime.now().year)
        round_num = st.number_input("Round Number", min_value=1, max_value=2, value=1)

    @st.cache_data
    def load_race_data(year, round_num):
        try:
            query = f"""
            SELECT 
                EVENT_NAME,
                DRIVER_CODE,
                CONSTRUCTOR_ID, 
                LAP_NUMBER,
                DRIVER_STINT,
                LAP_TIME_MS,
                TYRE_COMPOUND
            FROM F1.MARTS.RACE_LAPS_OBT
            WHERE
                EVENT_SEASON_YEAR = {year}
                AND EVENT_ROUND_NUMBER = {round_num}
            """
            df = session.sql(query).to_pandas()
            return df
        except Exception as e:
            st.error(f"Query error: {str(e)}")
            return None

    with st.spinner("Loading race data..."):
        laps = load_race_data(year, round_num)

    if laps is not None and not laps.empty:
        event_name = laps.at[0, 'EVENT_NAME']
        st.title(f"{year} {event_name}")
        stints = laps.copy()
        race_laps = laps.copy()

        
        ###############################################################################
        #First CHART 
        stints = stints[["DRIVER_CODE", "DRIVER_STINT", "TYRE_COMPOUND", "LAP_NUMBER"]]
        stints = stints.rename(columns={"LAP_NUMBER": "StintLength"})
        stints = stints.groupby(["DRIVER_CODE", "DRIVER_STINT", "TYRE_COMPOUND"])
        stints = stints.count().reset_index()
        drivers = stints["DRIVER_CODE"].unique().tolist()

        # PLOT
        fig_1, ax_1 = plt.subplots(figsize=(12, 6))

        for driver in drivers:
            driver_stints = stints.loc[stints["DRIVER_CODE"] == driver]
        
            previous_stint_end = 0
            for idx, row in driver_stints.iterrows():
                # each row contains the compound name and stint length
                compound_color = compound_colours[row["TYRE_COMPOUND"]]
                plt.barh(
                    y=driver,
                    width=row["StintLength"],
                    left=previous_stint_end,
                    color=compound_color,
                    edgecolor="black",
                    fill=True
                )
        
                previous_stint_end += row["StintLength"]
    
        st.subheader("Tyre Compound Strategies")
        plt.xlabel("Lap Number")
        plt.grid(False)
        # invert the y-axis so drivers that finish higher are closer to the top
        ax_1.invert_yaxis()
        ax_1.spines['top'].set_visible(False)
        ax_1.spines['right'].set_visible(False)
        ax_1.spines['left'].set_visible(False)
        plt.tight_layout()

        st.pyplot(fig_1)
        
        ###############################################################################
        #SEONCD CHART    
        race_laps["LapTime (s)"] = race_laps["LAP_TIME_MS"] / 1000
        race_laps["CONSTRUCTOR_ID"] = race_laps["CONSTRUCTOR_ID"].map(lambda x: team_details[x]["short_name"])
        race_laps.rename(columns = {
            "DRIVER_CODE": "Driver", 
            "LAP_NUMBER": "LapNumber", 
            "CONSTRUCTOR_ID": "Team" 
        }, inplace=True)
        
        # order by median lap time
        team_order = (
            race_laps[["Team", "LapTime (s)"]]
            .groupby("Team")
            .median()["LapTime (s)"]
            .sort_values()
            .index
        )
    
        team_palette = {
            team: next(
                (v["team_colour"] for k, v in team_details.items() 
                 if v["short_name"] == team), 
                "#000000"  # default black if not found
            )
            for team in team_order
        }

        # PLOT
        fig_2, ax_2 = plt.subplots(figsize=(12, 6))
        
        sns.boxplot(
            data=race_laps,
            x="Team",
            y="LapTime (s)",
            hue="Team",
            order=team_order,
            palette=team_palette,
            whiskerprops=dict(color="grey"),
            boxprops=dict(edgecolor="white"),
            medianprops=dict(color="grey"),
            capprops=dict(color="grey"),
            showfliers=False
        )
    
        st.subheader("Team Pace Comparison")
        ax_2.grid(visible=False)
        ax_2.set(xlabel=None)
        plt.xticks(rotation=45)
        plt.tight_layout()
    
        st.pyplot(fig_2)
    
        # show raw data table
        if st.checkbox("Show raw lap time data"):
            st.dataframe(race_laps[["Driver", "Team", "LapNumber", "LapTime (s)"]]
                         .sort_values("LapTime (s)"))

except Exception as e:
    st.error(f"App crashed: {str(e)}")
    st.write("Check the Logs tab for detailed errors")