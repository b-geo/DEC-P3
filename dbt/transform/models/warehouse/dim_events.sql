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
    to_number(stg_events.season) as season_year,
    to_number(stg_events.round) as round_number,
    stg_events.racename as event_name,
    to_date(stg_events.date) as race_date,
    to_time(stg_events.time, 'HH24:MI:SS"Z"') as race_time,
    {{ dbt_utils.generate_surrogate_key(['parse_json(stg_events.circuit):"circuitId"::varchar']) }} as sk_circuit,
    stg_events.url as event_url,
    parse_json(stg_events.firstpractice) as first_practice,
    parse_json(stg_events.secondpractice) as second_practice,
    parse_json(stg_events.thirdpractice) as third_practice,
    parse_json(stg_events.qualifying) as qualifying,
    parse_json(stg_events.sprintqualifying) as sprint_qualifying,
    parse_json(stg_events.sprint) as sprint,
    to_timestamp(stg_events.last_updated) as last_updated
from {{ source("f1_staging", "stg_events")}} as stg_events
{% if is_incremental() %}
    where stg_events.last_updated > (select max(to_date(old_events.last_updated)) from {{ this }} as old_events)
{% endif %}