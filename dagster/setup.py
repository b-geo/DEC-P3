from setuptools import find_packages, setup

setup(
    name="f1_pipeline",
    packages=find_packages(exclude=["f1_pipeline_tests"]),
    install_requires=[
        "dagster",
        "dagster-cloud",
        "dagster-snowflake-pandas",
        "dagster_dbt",
        "pandas",

    ],
    extras_require={"dev": ["dagster-webserver", "pytest"]},
)
