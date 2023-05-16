import boto3

from flask import current_app as app
from boto3.dynamodb.conditions import Attr


def get_esp8266_items_dynamo(table_name, region, window):
    app.logger.info(f"Getting records from dynamo table {table_name}")
    dynamodb = boto3.resource('dynamodb', region_name=region)
    table = dynamodb.Table(table_name)
    records = table.scan(
        Limit=123,
        Select='ALL_ATTRIBUTES',
        FilterExpression=Attr('sample_time').between(window[0], window[1])
    )['Items']
    app.logger.info(f"Found {len(records)} records in shard.")
    return records
