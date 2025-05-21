
 [![Infrastructure and Docker Deployment](https://github.com/b-geo/DEC-P3/actions/workflows/deploy.yaml/badge.svg)](https://github.com/b-geo/DEC-P3/actions/workflows/deploy.yaml)
[![Lint SQL and Python](https://github.com/b-geo/DEC-P3/actions/workflows/lint.yml/badge.svg)](https://github.com/b-geo/DEC-P3/actions/workflows/lint.yml)


 # 🏎️ Introduction
Once upon a time it was enough to know lap times and speed, but F1 has now evolved to utilise data in all aspects of decision making and evaluation. Not only do teams require this data, but spectators equally enjoy the insights that can be extracted. This project ultimately converges on two dashboards, a realtime race dashboard and a post race summary dashboard. The depth of data is deeper than what is provided in the two dashbaords and this can be leveraged at any time via Snowflake, the datawarhouse for this project.

 # The Components
You will notice these main folders in the root directory, here is a guide to their contents.
- Infrastructure: builds the cloud architecture required.
- Kafka Producer: provides lap data and telemetry data to Kafka topics.
- Orchestration: handles ELT of batch data.
- Presentation: dashboards for both realtime data and batch data.

```
┣ infra
┣ kafka_producer
┣ orchestration
┃ ┣ dagster_pipeline
┃ ┃ ┣ assets
┃ ┃ ┃ ┣ dbt
┃ ┃ ┃ ┣ jolpi
┣ presentation
┃ ┣ snowflake_streamlit
┃ ┗ streaming_dashboard
 ```

# Source Data
## Event Data
This is data captured during the race and streamed by F1.com. There are two streams of event data, one for car telemetry that polls approximately every 200ms, and lap summary data that is provided per driver per lap.
```
{
"Driver":"PIA",
"LapTime":143155,
"LapNumber":5.0,
"Stint":4.0,
"PitOutTime":4871064,
"PitInTime":null,
"Sector1Time":53433,
"Sector2Time":32176,
"Sector3Time":57546,
"Sector1SessionTime":4922486,
"Sector2SessionTime":4954662,
"Sector3SessionTime":5012208,
"SpeedI1":87.0,
"SpeedI2":199.0,
"SpeedFL":252.0,
"SpeedST":189.0,
"Compound":"INTERMEDIATE",
"TyreLife":5.0,
"FreshTyre":false,
"Team":"McLaren",
"LapStartTime":4868974,
"LapStartDate":1742099311593,
"TrackStatus":"4",
"Position":3.0
}
```
## Entity Data
Entity data covers essentailly the metadata of a race - driver details, driver championship standings, team details, circuit details.This data generally changes after each round.
```
{
    "Date":1742099338869,
    "SessionTime":4896250,
    "DriverAhead":"27",
    "DistanceToDriverAhead":48.685,
    "RPM":8414.0,
    "Speed":74.0,
    "nGear":1,
    "Throttle":32.0,
    "Brake":false,
    "DRS":1,
    "Distance":68.1011111111,
    "RelativeDistance":0.0129132137,
    "Status":"OnTrack",
    "X":-1449.1830563296,
    "Y":-886.9041600145,
    "Z":82.0,
    "Lap":5,
    "Driver":"ANT",
    "date_delta":0
}
```


# how to setup
- github secrets
- run terra locally to get state and upload to s3 bucket
    - terra will set up ecr, ecs, ecs tasks
- upload .env to github bucket
- define vars for tf
- aws account
- backfill based on round
- snowflake account
- confluent account
    - set up snowflake role based on guide
- providing the directories stay the same no need to pip install since it'll be part of docker, then with the nodejs one packages are installed with that too

# architecture diagram

# tables diagram

# dependences with dagster (that'll also cover dbt)

# kafka producer
- f1 actually has real data available by the signalr protocol - but only available during events.
- cluster per driver to keep right order
- i used a python library to get the data from a previous event (Aus Grand Prix 2025)
- there's obviously a lot of it per event so i've just done this part for the one event
- i have sent that to a kafka topic (confluent)
    - a snowflake connector on confluent sends that to a staging table in snowflake
        - stg_laps
        - stg_telemetry
    - a realtime dashboard receives the telemetry and displays the race

# orchestration
- dagster materializes assets
    - jolpi api for staging to snowflake - every second day schedule
    - dbt then transforms and turns to marts - automaterialize eager
    - the tables that are materialized through the kafka snowflake connector are also registered with dagster through being source assets.
- partition by date snowflake


# presentation
- streamlit on snowflake is used for some charting. the two files required for the streamlit app are in this repo. this is matplotlib mainly and sql like spark
- the realtime dashboard uses a nodejs server where the kafka topic is consumed then through that same server websocket passes it to the website

# infra
- using terraform to setup ecr, ecs, ecs tasks
- new docker image is loaded to ecr with github actions and task definition updated
- currently its manual tasks and i didn't want to setup a service that is alwasy running for this project, but i could have the task definition update on an existing service for sure
- tasks and containers for the realtime dashboard and dagster orchestration are separate. dashboard is designed with an ec2 cluster and dagster is fargate - this is purely because i wanted to challenge myself a bit with terraform and dagster needed more than the free tier level. same reason i didn't use dagster plus.

# ci/cd
- two workflows
    - deploy
        - build
        - terraform
    - linting
- linting runs on pull requests
- terraform runs on merges to main
- the building and pushing of the docker container will only happen if there are changes to folder that would affect either docker image.
- linting is sqlfluff and black. an error will force the developer to fix locally then remerge.

**if i get time
-  s3 bucket .env is read to use in github actions instead of using github secrets
-  backfill option for dagster jolpi data - all rounds
- auto materialize assets dagster. jolpi runs regularly and marts the auto run because of that
- dbt snapshot for slowly changing dimensions
- race results based on fact_laps
- dbt tests
- first_practice etc should be first_practice_date since date
- STANDINGS tables should have event sk as well

**unsure
- should standings by fact table? probably.

**to say
- now of course there were shortcuts to make in this time
    - theres no test branch before pushing to main
        - and no tests, logs
    