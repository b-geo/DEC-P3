# Start with a Python base image
FROM python:3.12-slim

# Set up working directory
WORKDIR /usr/src/app

# Copy your dbt project
COPY . .

RUN pip install --no cache-dir \
dagster==1.9.9 \
dagster-cloud==1.9.9 \
dagster-webserver==1.9.9 \
dagster_dbt==0.25.9 \
dagster-snowflake-pandas==0.25.9 \
dbt-core==1.7.13 \
dbt-snowflake==1.7.4 \
snowplow-tracker==0.10.0

# Expose ports if needed (Dagit typically uses 3000)
EXPOSE 3000

# Obviously not ideal for production
CMD ["dagster", "dev"] 
