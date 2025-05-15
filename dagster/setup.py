from setuptools import find_packages, setup

setup(
    name="f1_pipeline",
    packages=find_packages(exclude=["f1_pipeline_tests"]),
    install_requires=[
        "dagster==1.6.9",
        "dagster-cloud==1.6.9",
        "dbt-core==1.7.13",
        "dagster-snowflake-pandas==0.22.9",
        "dagster_dbt==0.22.9",
        "dbt-snowflake==1.7.4",
        "pandas==2.2.1"
    ],
    extras_require={"dev": ["dagster-webserver==1.6.9", "pytest==8.1.1"]}
)