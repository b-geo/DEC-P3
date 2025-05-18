#!/bin/sh
set -e

export DBT_PROJECT_DIR=${DBT_PROJECT_DIR:-"/usr/src/app/dagster_pipeline/assets/dbt/main"}
export DBT_PROFILES_DIR=${DBT_PROJECT_DIR:-"/usr/src/app/dagster_pipeline/assets/dbt/main"}
export MANIFEST_PATH=${MANIFEST_PATH:-"/usr/src/app/dagster_pipeline/assets/dbt/main/target/manifest.json"}

cd /usr/src/app/dagster_pipeline/assets/dbt/main || {
    echo "Error: Failed to find dbt project directory"
    exit 1
}

dbt compile || {
    echo "Warning: dbt compilation failed - continuing with existing manifest"
    exit 1
}

cd /usr/src/app
dagster api grpc -d dagster_pipeline -p 4000 &
dagster-daemon run &
sleep 3
exec dagster-webserver -w workspace.yaml -h 0.0.0.0 -p 3000  "$@"