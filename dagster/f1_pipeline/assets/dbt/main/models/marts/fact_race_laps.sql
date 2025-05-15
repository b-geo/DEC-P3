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
	dim_driver.sk_driver as sk_driver,
	dim_driver.sk_constructor as sk_constructor,
	fact_events.sk_event as sk_event,
	fact_events.sk_circuit as sk_circuit,
	stg_laps.record_content:"LapNumber"::number as lap_number,
	stg_laps.record_content:"Position"::number as position,
	stg_laps.record_content:"LapTime"::number as lap_time_ms,
	stg_laps.record_content:"PitOutTime"::number as pit_out_time_ms,
	stg_laps.record_content:"PitInTime"::number as pit_in_time_ms,
	stg_laps.record_content:"Sector1Time"::number as sector1_time_ms,
	stg_laps.record_content:"Sector2Time"::number as sector2_time_ms,
	stg_laps.record_content:"Sector3Time"::number as sector3_time_ms,
	stg_laps.record_content:"SpeedI1"::number as speed_trap_1_kmh,
	stg_laps.record_content:"SpeedI2"::number as speed_trap_2_kmh,
	stg_laps.record_content:"SpeedFL"::number as speed_finishline_kmh,
	stg_laps.record_content:"SpeedST"::number as speed_straight_kmh,
	stg_laps.record_content:"Compound"::varchar as tyre_compound,
	stg_laps.record_content:"TyreLife"::number as tyre_life_laps,
	stg_laps.record_content:"Stint"::number as driver_stint,
	to_timestamp((stg_laps.record_content:"LapStartDate"::number) / 1000) as lap_start,
	to_timestamp((stg_laps.record_metadata:"CreateTime"::number) / 1000) as last_updated
from {{ source("f1_staging", "stg_laps") }} as stg_laps
left join {{ ref("dim_driver") }} as dim_driver
	on stg_laps.record_content:"Driver"::varchar = dim_driver.driver_code
left join {{ ref("fact_events") }} as fact_events
	on
		fact_events.event_race_date = to_date(to_timestamp((stg_laps.record_content:"LapStartDate"::number)/1000))
		or 
			fact_events.event_race_date = 
				dateadd('day', -1, to_date(to_timestamp((stg_laps.record_content:"LapStartDate"::number)/1000)))
		or 
			fact_events.event_race_date = 
				dateadd('day', 1, to_date(to_timestamp((stg_laps.record_content:"LapStartDate"::number)/1000)))

{% if is_incremental() %}
	where to_timestamp((stg_laps.record_metadata:"CreateTime"::number) / 1000) > (select max(current_table.last_updated) from {{ this }} as current_table)
{% endif %}
