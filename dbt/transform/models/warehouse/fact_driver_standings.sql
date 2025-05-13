{{
    config(
        materialized = "incremental",
        unique_key = ["sk_driver", "sk_constructor", "standings_season", "standings_round"],
        incremental_strategy = "merge",
        merge_update_columns = ["driver_points", "driver_position", "driver_wins"]
    )
}}

select
	{{ dbt_utils.generate_surrogate_key(['parse_json(stg_driver_standings.driver):"driverId"::varchar']) }} as sk_driver,
	{{ dbt_utils.generate_surrogate_key(['parse_json(stg_driver_standings.constructors):"constructorId"::varchar']) }} as sk_constructor,
	stg_driver_standings.season as standings_season,
	stg_driver_standings.round as standings_round,
	stg_driver_standings.position as driver_position,
	to_number(stg_driver_standings.points) as driver_points,
	to_number(stg_driver_standings.wins) as driver_wins,
from {{ source("f1_staging", "stg_driver_standings") }} as stg_driver_standings
{% if is_incremental() %}
	where stg_driver_standings.season = year(current_date())
{% endif %}