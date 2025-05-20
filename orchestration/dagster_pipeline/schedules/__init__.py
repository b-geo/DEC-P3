from dagster_pipeline.jobs import full_staging_job
from dagster import ScheduleDefinition

# every second day
staging_schedule = ScheduleDefinition(job=full_staging_job, cron_schedule="0 0 */2 * *")
