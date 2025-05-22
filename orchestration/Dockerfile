FROM python:3.12-slim

WORKDIR /usr/src/app

RUN pip install --no-cache-dir \
    "dbt-core~=1.7.13" \
    "dbt-snowflake~=1.7.4" \
    "dagster==1.7.8" \
    "dagster-cloud==1.7.8" \
    "dagster-webserver==1.7.8" \
    "dagster-dbt==0.23.8" \
    "dagster-snowflake-pandas==0.23.8" \
    "snowplow-tracker==0.10.0" \
    "pandas==2.2.1" \
    "websockets==10.4" \
    "tornado==6.2"

COPY . .

RUN mkdir -p /dagster_home
ENV DAGSTER_HOME=/dagster_home

# needs profiles here for initial dbt run
COPY ./dagster_pipeline/assets/dbt/main/profiles.yml /root/.dbt/profiles.yml
RUN dbt deps --project-dir ./dagster_pipeline/assets/dbt/main

EXPOSE 3000 4000

# need to run dbt compile at time of container start because of envar
# then run dagster webserver and daemon
RUN chmod +x /usr/src/app/entrypoint.sh

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

