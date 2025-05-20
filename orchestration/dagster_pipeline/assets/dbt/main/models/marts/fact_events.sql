{{
    config(
        materialized="incremental",
        unique_key = ["sk_event"],
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
  case
    when stg_events.firstpractice is not null
      then
        try_to_timestamp(
          parse_json(stg_events.firstpractice):"date" || ' ' || parse_json(stg_events.firstpractice):"time",
          'yyyy-mm-dd hh24:mi:ss"z"'
        )
  end as event_first_practice,
  case
    when stg_events.secondpractice is not null
      then
        try_to_timestamp(
          parse_json(stg_events.secondpractice):"date" || ' ' || parse_json(stg_events.secondpractice):"time",
          'yyyy-mm-dd hh24:mi:ss"z"'
        )
  end as event_second_practice,
  case
    when stg_events.thirdpractice is not null
      then
        try_to_timestamp(
          parse_json(stg_events.thirdpractice):"date" || ' ' || parse_json(stg_events.thirdpractice):"time",
          'yyyy-mm-dd hh24:mi:ss"z"'
        )
  end as event_third_practice,
  case
    when stg_events.qualifying is not null
      then
        try_to_timestamp(
          parse_json(stg_events.qualifying):"date" || ' ' || parse_json(stg_events.qualifying):"time",
          'yyyy-mm-dd hh24:mi:ss"z"'
        )
  end as event_qualifying,
  case
    when stg_events.sprintqualifying is not null
      then
        try_to_timestamp(
          parse_json(stg_events.sprintqualifying):"date" || ' ' || parse_json(stg_events.sprintqualifying):"time",
          'yyyy-mm-dd hh24:mi:ss"z"'
        )
  end as event_sprint_qualifying,
  case
    when stg_events.sprint is not null
      then
        try_to_timestamp(
          parse_json(stg_events.sprint):"date" || ' ' || parse_json(stg_events.sprint):"time",
          'yyyy-mm-dd hh24:mi:ss"z"'
        )
  end as event_sprint,
  to_timestamp(stg_events.last_updated) as last_updated
from {{ source("f1_staging", "stg_events") }} as stg_events
{% if is_incremental() %}
  where stg_events.last_updated > (select max(to_date(old_events.last_updated)) from {{ this }} as old_events)
{% endif %}
