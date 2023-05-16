import json
from flask import current_app as app

class SensorReading:
    def __init__(self, sample_time, temperature, humidity):
        self.sample_time = sample_time
        self.temperature = temperature
        self.humidity = humidity

    def __str__(self) -> str:
        return "sample_time: {}, temp: {}, humidity: {}".format(self.sample_time, self.temperature, self.humidity)

    def to_json(self):
        return json.dumps(self.__dict__)


def extract_field(dictionary, field):
    try:
        return dictionary[field]
    except KeyError:
        app.logger.warning(f"Missing key {field} when trying to map sensor reading!")
        return None


def extract_sensor_data_from_reading_dynamo(reading):
    esp32_data = extract_field(reading, 'esp32/pub')
    if esp32_data is not None:
        temperature = extract_field(esp32_data, 'temperature')
        humidity = extract_field(esp32_data, 'humidity')
        ts = str(extract_field(esp32_data, 'ts'))
        if None not in [ts, temperature, humidity] and ts.isdigit():
            return SensorReading(ts, str(temperature), str(humidity)).to_json()


def map_to_sensor_readings(readings):
    return [sensor_data for sensor_data in
            (extract_sensor_data_from_reading_dynamo(reading) for reading in readings)
            if sensor_data is not None]


