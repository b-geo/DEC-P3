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
- sacrificed nice code and layout for cool stuff

dagster can do the initial api calls!

- really need to account for lack of values in response from api. raise errors
- i only did constructors and drivers for current season, would hit other endpoint in prod

PLAN
- DAGSTER INITIATES API CALLS
- MOVE TO SNOWFLAKE STAGING
- MAKE CHANGES WITH DBT
- SERVE PRESET

- PYTHON AS PRODUCER FOR TELEMETRY
- TO CONFLUENT KAFKA
- CONSUMED BY DASHBOARD AND CONSUMED BY SNOWFLAKE

- i have partition by driverid, so that messages are in correct order


NEXT
- python producer can be manual not cloud hosted
- nodejs webstit hosted
- dagster for api calls to snowflake
- dbt snowflake transform
    - slowly changing dimensions
    - data quality tests with dbt
- preset basic stuff - is matplot lib enough?? is streaming website enough?
- CI/CD need to learn!
- SQLFluff linting with CICD - gitlab style guide might use it?
- NEED to use .ENV

dagster dev
# or in production:
dagster-daemon run

set up confluent
new connector snowflake
add snowflake details
create user for confluent as shown here: https://docs.confluent.io/cloud/current/connectors/cc-snowflake-sink/cc-snowflake-sink.html?ajs_aid=15f7888d-2eec-438c-9c48-1f118dba39e4&ajs_uid=5710910#cc-snowflake-db-sink-gen-key-pair

for dagster isntall deps: pip install -e ".[dev]"


FOLDER STRUCTURE
- kafka producer
- streaming dashboard
- orchestration
- transformation

- terraform
- cicd
- presentation

aws configure //to login
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 850995533399.dkr.ecr.ap-southeast-2.amazonaws.com
docker build --platform=linux/amd64 -t decp3/f1_realtime_dashboard .
docker tag decp3/f1_realtime_dashboard:latest 850995533399.dkr.ecr.ap-southeast-2.amazonaws.com/decp3/f1_realtime_dashboard:latest
docker push 850995533399.dkr.ecr.ap-southeast-2.amazonaws.com/decp3/f1_realtime_dashboard:latest
