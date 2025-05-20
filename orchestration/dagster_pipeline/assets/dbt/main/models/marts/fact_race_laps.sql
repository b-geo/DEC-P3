{{
    config(
        materialized = "incremental",
        unique_key = ["sk_race_lap"],
        incremental_strategy = "merge"
    )
}}

select
	{{ dbt_utils.generate_surrogate_key(
		[
			'dim_driver.sk_driver',
			'fact_events.sk_circuit',
			'stg_laps.record_content:"LapNumber"::number'
			]) 
	}} as sk_race_lap,
  dim_driver.sk_driver,
  dim_driver.sk_constructor,
  fact_events.sk_event,
  fact_events.sk_circuit,
  stg_laps.record_content:"LapNumber"::NUMBER as lap_number,
  stg_laps.record_content:"Position"::NUMBER as position,
  stg_laps.record_content:"LapTime"::NUMBER as lap_time_ms,
  stg_laps.record_content:"PitOutTime"::NUMBER as pit_out_time_ms,
  stg_laps.record_content:"PitInTime"::NUMBER as pit_in_time_ms,
  stg_laps.record_content:"Sector1Time"::NUMBER as sector1_time_ms,
  stg_laps.record_content:"Sector2Time"::NUMBER as sector2_time_ms,
  stg_laps.record_content:"Sector3Time"::NUMBER as sector3_time_ms,
  stg_laps.record_content:"SpeedI1"::NUMBER as speed_trap_1_kmh,
  stg_laps.record_content:"SpeedI2"::NUMBER as speed_trap_2_kmh,
  stg_laps.record_content:"SpeedFL"::NUMBER as speed_finishline_kmh,
  stg_laps.record_content:"SpeedST"::NUMBER as speed_straight_kmh,
  stg_laps.record_content:"Compound"::VARCHAR as tyre_compound,
  stg_laps.record_content:"TyreLife"::NUMBER as tyre_life_laps,
  stg_laps.record_content:"Stint"::NUMBER as driver_stint,
  to_timestamp((stg_laps.record_content:"LapStartDate"::NUMBER) / 1000) as lap_start,
  to_timestamp((stg_laps.record_metadata:"CreateTime"::NUMBER) / 1000) as last_updated
from {{ source("f1_staging", "stg_laps") }} as stg_laps
left join {{ ref("dim_driver") }} as dim_driver
  on stg_laps.record_content:"Driver"::VARCHAR = dim_driver.driver_code
left join {{ ref("fact_events") }} as fact_events
  on
    fact_events.event_race_date = to_date(to_timestamp((stg_laps.record_content:"LapStartDate"::NUMBER) / 1000))
    or
    fact_events.event_race_date
    = dateadd('day', -1, to_date(to_timestamp((stg_laps.record_content:"LapStartDate"::NUMBER) / 1000)))
    or
    fact_events.event_race_date
    = dateadd('day', 1, to_date(to_timestamp((stg_laps.record_content:"LapStartDate"::NUMBER) / 1000)))
where
  dim_driver.sk_driver is not null and fact_events.sk_event is not null
