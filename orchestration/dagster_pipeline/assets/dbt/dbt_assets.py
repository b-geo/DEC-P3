from dagster import file_relative_path

DBT_PROJECT_DIR = file_relative_path(__file__, "main")
MANIFEST_PATH = file_relative_path(__file__, "main/target/manifest.json")
DBT_PROFILES_DIR = file_relative_path(__file__, "main")