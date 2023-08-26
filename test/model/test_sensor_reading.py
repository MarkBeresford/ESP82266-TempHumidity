import unittest
from flask import Flask
from model.sensor_reading import extract_sensor_data_from_reading_dynamo, map_to_sensor_readings

app = Flask(__name__)

class TestSensorReading(unittest.TestCase):

    def setUp(self):
        ctx = app.app_context()
        ctx.push()

    def test_parsing_correct_item_to_map_to_sensor_readings(self):
        data_point = {
            "esp32/pub": {
                "ts": 1692608680000,
                "temperature": 24,
                "humidity": 100
            }
        }
        expected_json_output = '{"sample_time": "1692608680000", "temperature": "24", "humidity": "100"}'
        self.assertEqual(extract_sensor_data_from_reading_dynamo(data_point), expected_json_output)

    def test_parsing_item_with_missing_Data_field_to_map_to_sensor_readings(self):
        data_point = {
            "esp32/pub": {
                "ts": 1692608680000,
            }
        }
        self.assertEqual(extract_sensor_data_from_reading_dynamo(data_point), None)

    def test_parsing_item_with_missing_ApproximateArrivalTimestamp_field_to_map_to_sensor_readings(self):
        data_point = {
            "esp32/pub": {
                "temperature": 24,
                "humidity": 100
            }
        }
        self.assertEqual(extract_sensor_data_from_reading_dynamo(data_point), None)

    def test_parsing_item_with_missing_temperature_field_to_map_to_sensor_readings(self):
        data_point = {
            "esp32/pub": {
                "temperature": 24,
                "humidity": 100
            }
        }
        self.assertEqual(extract_sensor_data_from_reading_dynamo(data_point), None)

    def test_parsing_item_with_missing_humidity_field_to_map_to_sensor_readings(self):
        data_point = {
            "esp32/pub": {
                "ts": 1692608680000,
                "humidity": 100
            }
        }
        self.assertEqual(extract_sensor_data_from_reading_dynamo(data_point), None)

    def test_parsing_multiple_items_to_map_to_sensor_readings(self):
        data_points = [
            {
                "esp32/pub": {
                    "ts": 1692608680000,
                    "temperature": 24,
                    "humidity": 100
                }
            },
            {
                "esp32/pub": {
                    "ts": 1692608680000,
                    "temperature": 25,
                    "humidity": 99
                }
            }
        ]
        expected_sensor_readings = [
            '{"sample_time": "1692608680000", "temperature": "24", "humidity": "100"}',
            '{"sample_time": "1692608680000", "temperature": "25", "humidity": "99"}'
        ]
        self.assertCountEqual(map_to_sensor_readings(data_points), expected_sensor_readings)

    def test_map_to_sensor_readings_drops_multiple_Nonimportcheckere_items(self):
        data_points = [
            {
                "esp32/pub": {
                    "ts": 1692608680000,
                    "temperature": 24,
                    "humidity": 100
                }
            },
            {
                "esp32/pub": {
                    "ts": 1692608680000,
                    "humidity": 100
                }
            },
            {
                "esp32/pub": {
                    "ts": 1692608680000,
                    "temperature": 25,
                }
            },
            {
                "esp32/pub": {
                    "temperature": 25,
                    "humidity": 100
                }
            },
            {},
            {
                "esp32/pub": {
                    "ts": 1792608680000,
                    "temperature": 24,
                    "humidity": 99
                }
            },
        ]
        expected_sensor_readings = [
            '{"sample_time": "1792608680000", "temperature": "24", "humidity": "99"}',
            '{"sample_time": "1692608680000", "temperature": "24", "humidity": "100"}'
        ]
        self.assertCountEqual(map_to_sensor_readings(data_points), expected_sensor_readings)
