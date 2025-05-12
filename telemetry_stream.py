import fastf1
import json
import time
from confluent_kafka import Producer

conf = {
    'bootstrap.servers': "pkc-ldvj1.ap-southeast-2.aws.confluent.cloud:9092",
    'security.protocol': 'SASL_SSL',
    'sasl.mechanism': 'PLAIN',
    'sasl.username': '2FPJZWYXLZ5YLX5O',
    'sasl.password': '4yfgzNUItElyWbHFpiuMYoxsaxQI8Lk0/rjy57VLvXgN5Vbx8U997Ieazz5hkTxE'
}
producer = Producer(conf)

def acked(err, msg):
    if err is not None:
        print(f"Failed to deliver message: {msg.value()}: {err}")
    else:
        print(f"Message sent to partition {msg.partition()} (Driver ID: {msg.key().decode('utf-8')}) at offset {msg.offset()}")

def send_telemetry(message, producer):
    producer.produce(
        topic='f1_positions',
        key= str(message["Driver"]).encode('utf-8'),
        value=json.dumps({
            "X": message["X"],
            "Y": message["Y"],
            "Z": message["Z"],
            "Status": message["Status"],
            "Speed": message["Speed"],
            "RPM": message["RPM"],
            "Throttle": message["Throttle"],
            "Brake": message["Brake"],
            "DRS": message["DRS"],
            "nGear": message["nGear"],
            "Driver": message["Driver"],
            "Date": message["Date"],
            "Lap": message["Lap"],
            "SessionTime": message["SessionTime"],
            "Distance": message["Distance"],
            "RelativeDistance": message["RelativeDistance"],
            "DriverAhead": message["DriverAhead"],
            "DistanceToDriverAhead": message["DistanceToDriverAhead"],
            "date_delta": message["date_delta"],
            "timestamp": int(time.time() * 1000)
        }),
        callback=acked
    )
    producer.poll(1)


with open("f1_data.jsonl", "r", encoding = "utf-8") as file:
    for row in file:
        data = json.loads(row.strip())
        wait_time = data["date_delta"]
        time.sleep(wait_time / 1000.0) 
        send_telemetry(message = data, producer = producer)       


producer.flush()
