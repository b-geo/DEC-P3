import streamlit as st
from snowflake.snowpark.context import get_active_session
import seaborn as sns
import matplotlib.pyplot as plt
from datetime import datetime

session = get_active_session()

team_details = {
    "7c9fb847d117531433435b68b61f91f6": {
        "short_name": "Alpine",
        "team_colour": "#ff87bc"
    },
    "4d214653cfee77832c16e926bc05260e": {
        "short_name": "Aston Martin",
        "team_colour": "#00665f"
    },
    "0911054d8ad47cc256400031197f3e97": {
        "short_name": "Ferrari",
        "team_colour": "#e80020"
    },
    "ab1cef3ccacf899b18333303cd055fd5": {
        "short_name": "Haas",
        "team_colour": "#b6babd"
    },
    "49644513f565fee9c6cb3e7372d4b224": {
        "short_name": "McLaren",
        "team_colour": "#ff8000"
    },
    "d9eaabe53adedb62bc74b7eb0a9477d4": {
        "short_name": "Mercedes",
        "team_colour": "#27f4d2"
    },
    "9e3f4f69757d07f6a0d2af4f1f2a1103": {
        "short_name": "RB",
        "team_colour": "#fcd700"
    },
    "13325175887648f104ae28711c9f8a91": {
        "short_name": "Red Bull",
        "team_colour": "#0600ef"
    },
    "38a92bf1f184c53144139dfa6a781a51": {
        "short_name": "Sauber",
        "team_colour": "#00e700"
    },
    "44e7cdc8f1386a1820b02f504f38317d": {
        "short_name": "Williams",
        "team_colour": "#00a0dd"
    }
}

# Configure Streamlit page
st.set_page_config(layout="wide")
st.title("🏎️ Team Pace Comparison")
st.markdown("Rank teams race pace from fastest to slowest")

# Sidebar controls (simplified)
with st.sidebar:
    st.header("Race Selection")
    year = st.slider("Season Year", 2018, datetime.now().year, 2023)
    round_num = st.number_input("Round Number", min_value=1, max_value=25, value=1)

# Load data
with st.spinner("Loading race data..."):
    race_laps = session.sql("SELECT * FROM F1.WAREHOUSE.FACT_RACE_LAPS")

if race_laps:
    # Process data
    transformed_laps = race_laps.copy()
    transformed_laps.loc[:, "LapTime (s)"] = race_laps["lap_time_ms"] / 1000
    transformed_laps["sk_constructor"] = team_details[transformed_laps["sk_constructor"]]["short_name"]
    # Order teams by median lap time
    team_order = (
        transformed_laps[["sk_constructor", "LapTime (s)"]]
        .groupby("sk_constructor")
        .median()["LapTime (s)"]
        .sort_values()
        .index
    )

    # Create team color palette
    team_palette = {team: team_details[team]["team_colour"] for team in team_order}

    # Create plot
    st.subheader(f"{year} Melbourne Grand Prix - Race Pace")
    
    fig, ax = plt.subplots(figsize=(12, 6))
    sns.boxplot(
        data=transformed_laps,
        x="Team",
        y="LapTime (s)",
        hue="Team",
        order=team_order,
        palette=team_palette,
        whiskerprops=dict(color="white"),
        boxprops=dict(edgecolor="white"),
        medianprops=dict(color="grey"),
        capprops=dict(color="white"),
    )

    ax.set_title(f"Team Pace Comparison - Race", pad=20)
    ax.grid(visible=False)
    ax.set(xlabel=None)
    plt.xticks(rotation=45)
    plt.tight_layout()

    # Display plot
    st.pyplot(fig)

    # Show raw data
    if st.checkbox("Show raw lap time data"):
        st.dataframe(transformed_laps[["sk_driver", "sk_constructor", "lap_number", "LapTime (s)"]].sort_values("LapTime (s)"))
else:
    st.warning("No race data available for the selected parameters")