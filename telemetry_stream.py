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
        print("Failed to deliver message: %s: %s" % (str(msg.value()), err))
    else:
        print("Message produced: %s" % (str(msg.value())))

def send_telemetry(driver_id, x, y, lap):
    producer.produce(
        topic='f1_positions',
        value=json.dumps({
            'driver_id': driver_id,
            'x': x,
            'y': y,
            'lap': lap,
            'timestamp': int(time.time() * 1000)
        }),
        callback=acked
    )
    producer.poll(1)
    

# Example: Send Hamilton's position
send_telemetry(driver_id=44, x=123.45, y=67.89, lap=12)


producer.flush()
