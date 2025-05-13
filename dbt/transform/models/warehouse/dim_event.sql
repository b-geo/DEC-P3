{{
    config(
        materialized="incremental",
        unique_key = ["event_id"],
        incremental_strategy = "merge"
    )
}}

select
    {{ dbt_utils.generate_surrogate_key(['stg_events.eventid']) }} as sk_event,
    stg_events.eventid as event_id,
    to_number(stg_events.season) as event_season_year,
    to_number(stg_events.round) as event_round_number,
    stg_events.racename as event_name,
    to_date(stg_events.date) as event_race_date,
    to_time(stg_events.time, 'HH24:MI:SS"Z"') as event_race_time,
    {{ dbt_utils.generate_surrogate_key(['parse_json(stg_events.circuit):"circuitId"::varchar']) }} as sk_circuit,
    stg_events.url as event_url,
    parse_json(stg_events.firstpractice) as event_first_practice,
    parse_json(stg_events.secondpractice) as event_second_practice,
    parse_json(stg_events.thirdpractice) as event_third_practice,
    parse_json(stg_events.qualifying) as event_qualifying,
    parse_json(stg_events.sprintqualifying) as event_sprint_qualifying,
    parse_json(stg_events.sprint) as event_sprint,
    to_timestamp(stg_events.last_updated) as last_updated
from {{ source("f1_staging", "stg_events")}} as stg_events
{% if is_incremental() %}
    where stg_events.last_updated > (select max(to_date(old_events.last_updated)) from {{ this }} as old_events)
{% endif %}