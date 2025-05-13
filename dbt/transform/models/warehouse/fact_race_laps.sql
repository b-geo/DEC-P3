{{
    config(
        materialized = "incremental",
        unique_key = ["sk_driver", "sk_event", "lap_number"],
        incremental_strategy = "merge"
    )
}}

select
	dim_driver.sk_driver as sk_driver,
	dim_driver.sk_constructor as sk_constructor,
	dim_event.sk_event as sk_event,
	dim_event.sk_circuit as sk_circuit,
	parse_json(stg_laps.record_content):"LapNumber"::number as lap_number,
	to_timestamp((parse_json(stg_laps.record_metadata):"CreateTime"::number) / 1000) as last_updated
from {{ source("f1_staging", "stg_laps") }} as stg_laps
left join {{ ref("dim_driver") }} as dim_driver
	on parse_json(stg_laps.record_content):"Driver"::varchar = dim_driver.driver_code
left join {{ ref("dim_event") }} as dim_event
	on
		dim_event.event_race_date = to_date(to_timestamp((parse_json(stg_laps.record_content):"LapStartDate"::number)/1000))
		or 
			dim_event.event_race_date = 
				dateadd('day', -1, to_date(to_timestamp((parse_json(stg_laps.record_content):"LapStartDate"::number)/1000)))
		or 
			dim_event.event_race_date = 
				dateadd('day', 1, to_date(to_timestamp((parse_json(stg_laps.record_content):"LapStartDate"::number)/1000)))

{% if is_incremental() %}
	where to_timestamp((parse_json(stg_laps.record_metadata):"CreateTime"::number) / 1000) > (select max(current_table.last_updated) from {{ this }} as current_table)
{% endif %}
