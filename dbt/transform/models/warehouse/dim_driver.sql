{{
    config(
        materialized="incremental",
        unique_key = ["sk_driver"],
        incremental_strategy = "merge"
    )
}}

select
    {{ dbt_utils.generate_surrogate_key(['parse_json(stg_driver_standings.driver):"driverId"::varchar']) }} as sk_driver,
    parse_json(stg_driver_standings.driver):"driverId"::varchar as driver_id,
    parse_json(stg_driver_standings.driver):"permanentNumber"::varchar as driver_permanent_number,
    parse_json(stg_driver_standings.driver):"code"::varchar as driver_code,
    parse_json(stg_driver_standings.driver):"url"::varchar as driver_url,
    parse_json(stg_driver_standings.driver):"givenName"::varchar as driver_given_name,
    parse_json(stg_driver_standings.driver):"familyName"::varchar as driver_family_name,
    parse_json(stg_driver_standings.driver):"dateOfBirth"::date as driver_date_of_birth,
    parse_json(stg_driver_standings.driver):"nationality"::varchar as driver_nationality,
    {{ dbt_utils.generate_surrogate_key(
        [
        'parse_json(stg_driver_standings.constructors)[0]:"constructorId"::varchar'
        ]) 
    }} as sk_constructor,
    to_timestamp(stg_driver_standings.last_updated) as last_updated
from {{ source("f1_staging", "stg_driver_standings")}} as stg_driver_standings
{% if is_incremental() %}
    where stg_driver_standings.last_updated > (select max(to_date(old_circuits.last_updated)) from {{ this }} as old_circuits)
{% endif %}