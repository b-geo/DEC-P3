from f1_pipeline.jobs import full_staging_job
from dagster import ScheduleDefinition

staging_schedule = ScheduleDefinition(job=full_staging_job, cron_schedule="0 0 * * *")
