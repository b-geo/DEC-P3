{{
    config(
        materialized="incremental",
        unique_key = ["circuit_id"],
        incremental_strategy = "merge"
    )
}}

select
    {{ dbt_utils.generate_surrogate_key(['stg_circuits.circuitid']) }} as sk_circuit,
    stg_circuits.circuitid as circuit_id,
    stg_circuits.circuitname as circuit_name,
    stg_circuits.url as circuit_url,
    parse_json(stg_circuits.location) as circuit_location,
    to_timestamp(stg_circuits.last_updated) as last_updated
from {{ source("f1_staging", "stg_circuits")}} as stg_circuits
{% if is_incremental() %}
    where stg_circuits.last_updated > (select max(to_date(old_circuits.last_updated)) from {{ this }} as old_circuits)
{% endif %}