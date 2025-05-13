{{
    config(
        materialized = "incremental",
        unique_key = ["sk_constructor", "standings_season", "standings_round"],
        incremental_strategy = "merge",
        merge_update_columns = ["constructor_points", "constructor_position", "constructor_wins"]
    )
}}

select
	{{ dbt_utils.generate_surrogate_key(['parse_json(stg_constructor_standings.constructor):"constructorId"::varchar']) }} as sk_constructor,
	stg_constructor_standings.season as standings_season,
	stg_constructor_standings.round as standings_round,
	stg_constructor_standings.position as constructor_position,
	to_number(stg_constructor_standings.points) as constructor_points,
	to_number(stg_constructor_standings.wins) as constructor_wins,
from {{ source("f1_staging", "stg_constructor_standings") }} as stg_constructor_standings
{% if is_incremental() %}
    where stg_constructor_standings.season = year(current_date())
{% endif %}