FROM python:3.12-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    "dbt-core~=1.7.13" \
    "dbt-snowflake~=1.7.4" \
    "dagster==1.6.9" \
    "dagster-cloud==1.6.9" \
    "dagster-webserver==1.6.9" \
    "dagster_dbt==0.22.9" \
    "dagster-snowflake-pandas==0.22.9" \
    "snowplow-tracker==0.10.0" \
    "pandas==2.2.1" \
    "websockets==11.0.3"

COPY . .

RUN mkdir -p /dagster_home
ENV DAGSTER_HOME=/dagster_home

COPY ./dagster_pipeline/assets/dbt/main/profiles.yml /root/.dbt/profiles.yml
RUN dbt deps --project-dir ./dagster_pipeline/assets/dbt/main

EXPOSE 3000 4000

# need to run dbt compile at time of container start because of envar
# then run dagster dev
RUN chmod +x /usr/src/app/entrypoint.sh

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

