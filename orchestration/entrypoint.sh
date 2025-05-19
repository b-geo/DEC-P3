#!/bin/sh

# exit if any error
set -e

# adding default paths for dbt that are specific to the docker file set up.
# can be overriden with environment variables 
export DBT_PROJECT_DIR=${DBT_PROJECT_DIR:-"/usr/src/app/dagster_pipeline/assets/dbt/main"}
export DBT_PROFILES_DIR=${DBT_PROJECT_DIR:-"/usr/src/app/dagster_pipeline/assets/dbt/main"}
export MANIFEST_PATH=${MANIFEST_PATH:-"/usr/src/app/dagster_pipeline/assets/dbt/main/target/manifest.json"}

cd /usr/src/app/dagster_pipeline/assets/dbt/main

dbt compile

cd /usr/src/app
dagster api grpc -d dagster_pipeline -p 4000 &
dagster-daemon run &
sleep 3
exec dagster-webserver -w workspace.yaml -h 0.0.0.0 -p 3000  "$@"