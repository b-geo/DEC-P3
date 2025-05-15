{{
    config(
        materialized = "incremental",
        unique_key = ["sk_race_lap"],
        incremental_strategy = "merge"
    )
}}

select
	{{ dbt_utils.star(from=ref("fact_race_laps"), relation_alias="fact_race_laps", except=[
		"last_updated"
	]) }},
	{{ dbt_utils.star(from=ref("dim_driver"), relation_alias="dim_driver", except=[
        "sk_driver", "sk_constructor", "driver_url", "last_updated"
    ]) }},
		{{ dbt_utils.star(from=ref("dim_constructor"), relation_alias="dim_constructor", except=[
        "sk_constructor", "constructor_url", "last_updated"
    ]) }},
		{{ dbt_utils.star(from=ref("dim_circuit"), relation_alias="dim_circuit", except=[
		"sk_circuit", "circuit_url", "last_updated"
	]) }},
	{{ dbt_utils.star(from=ref("fact_events"), relation_alias="fact_events", except=[
		"sk_event", "sk_circuit", "event_url", "last_updated"
	]) }},
	fact_race_laps.last_updated as last_updated,
from {{ ref("fact_race_laps") }} as fact_race_laps
left join {{ ref("dim_driver") }} as dim_driver
	on fact_race_laps.sk_driver = dim_driver.sk_driver
left join {{ ref("dim_constructor") }} as dim_constructor
	on fact_race_laps.sk_constructor = dim_constructor.sk_constructor
left join {{ ref("dim_circuit") }} as dim_circuit
	on fact_race_laps.sk_circuit = dim_circuit.sk_circuit
left join {{ ref("fact_events") }} as fact_events
	on fact_race_laps.sk_event = fact_events.sk_event
{% if is_incremental() %}
	where fact_race_laps.last_updated > (select max(current_table.last_updated) from {{ this }} as current_table)
{% endif %}
