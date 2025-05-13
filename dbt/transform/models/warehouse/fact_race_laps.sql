{{
    config(
        materialized = "incremental",
        unique_key = ["sk_driver", "sk_event", "lap"],
        incremental_strategy = "merge"
    )
}}

select
	dim_driver.sk_driver as sk_driver,
	dim_driver.sk_constructor as sk_constructor,

from {{ source("f1_staging", "stg_laps") }} as stg_laps
join {{ ref("dim_driver") }} as dim_driver
	on parse_json(stg_laps.record_content):"Driver"::varchar = dim_driver.driver_code

{% if is_incremental() %}
	where parse_json(stg_laps.record_metadata):"CreateTime"::timestamp > (select max(to_date(old_events.last_updated)) from {{ this }} as old_events)
{% endif %}



sk_constructor
sk_event
sk_circuit
sk_driver
lap
