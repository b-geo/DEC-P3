python 3.12.7
partition kafka by driver for concurrent processing

getting schedule of all events for 2025
each event is added to dim_events
each event is a get_session - dim_driver will need to be all drivers from all sessions
for each event that is complete, go by driver, then per lap that was completed by the driver, to then get tele
    - laps will also have tyre stuff

then i have a stream of lap tele per car
 - this gives me:
    - fastest lap within last or within race
    - distance of each car from leader
    - all drivers on hard compound
    - who has the oldest tyres
    - who had the best sector 3 time
 - .laps for each lap can probably just be fact_laps cause of all good info

 - the update fact one could be tele for each lap in one fact so lap 1 could have multiple but things change cause tele

 - should say how i'd deal with late data and other faults

 - need to sort trino, preset from kafka and postgres

 Best for: Near-real-time (5-60s delay)
Workflow:

Stream → Kafka

Spark Streaming/Flink → Writes to:

PostgreSQL (for latest positions)

S3/Delta Lake (for historical trends)

Preset connects to:

PostgreSQL (for real-time panels)

S3 via Trino (for historical analysis)

# FOR DIMS
- extract with python (And transform)
- upsert to postgres
- dbt to transform and go to snowflake
- dbt for data quality tests
- need streaming transformations
- need dependancy dag - dagster

- stream (python producer), to transform stream (confluent), to store postgres, then either preset grabs or custom dashboard
- python grab data, to postgres as raw, to snowflake via airbyte,  dbt to model in snowflake, preset grabs from snowflake
- all set up with dagster

- i have used IO manager in dagster so that storage location of raw can be agnostic
- using trino cloud (starbust) because limited time