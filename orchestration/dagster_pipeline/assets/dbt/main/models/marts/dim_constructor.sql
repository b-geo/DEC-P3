{{
    config(
        materialized="incremental",
        unique_key = ["sk_constructor"],
        incremental_strategy = "merge"
    )
}}

select
  {{ dbt_utils.generate_surrogate_key(['parse_json(stg_constructor_standings.constructor):"constructorId"::varchar']) }} as sk_constructor,
  parse_json(stg_constructor_standings.constructor):"constructorId"::VARCHAR as constructor_id,
  parse_json(stg_constructor_standings.constructor):"name"::VARCHAR as constructor_name,
  parse_json(stg_constructor_standings.constructor):"url"::VARCHAR as constructor_url,
  parse_json(stg_constructor_standings.constructor):"nationality"::VARCHAR as constructor_nationality,
  to_timestamp(stg_constructor_standings.last_updated) as last_updated
from {{ source("f1_staging", "stg_constructor_standings") }} as stg_constructor_standings
{% if is_incremental() %}
  where stg_constructor_standings.last_updated > (select max(to_date(old_circuits.last_updated)) from {{ this }} as old_circuits)
{% endif %}
