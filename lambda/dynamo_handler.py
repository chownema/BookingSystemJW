import boto3
import uuid
import datetime
import json
from boto3.dynamodb.conditions import Key, Attr

# Init test parameters
table_name='jw-entity'
test_user_put = {
    'uuid' : {'S' : '1'},
    'type' : {'S' : 'USER'},
    'name' : {'S' : 'John Johnathon'},
    'email' : {'S' : 'John@Johnmail.com'},
    'activated' : {'BOOL' : True},
    'role' : {'S' : 'admin'},
    'password' : {'S' : 'pass123'},
    'token' : {'S' : str(uuid.uuid4())+str(uuid.uuid4())}
}
test_venue_put = {
    'uuid' : {'S' : '2'},
    'type' : {'S' : 'VENUE'},
    'name' : {'S' : 'Skate Park'},
    'address' : {'S' : '3 Ormiston Road'} # Could use for google map apis
}
test_booking_put = {
    'uuid' : {'S' : '3'},
    'type' : {'S' : 'BOOKING'},
    'user_id' : {'S' : '1'},
    'venue_id' : {'S' : '2'},
    'week_year' : {'S' : '52:2017'},
    'start_time_date' : {'S' : '14:00 GMT 12/12/2017'},
    'shift_hours' : {'S' : '2'},
    'status' : {'S' : 'PENDING'}
}

# Test get item primary keys
test_user_get = {'uuid' : '1', 'type' : 'USER'}
test_venue_get = {'uuid' : '2', 'type' : 'VENUE'}
test_booking_get = {'uuid' : '3', 'type' : 'BOOKING'}

# Test queries secondary global indexes
test_user_booking_get = {'user_id' : '1', 'week_year' : '52:2017'}
test_user_booking_get = {'venue_id' : '2', 'week_year' : '52:2017'}

def lambda_handler(event, context):
    # Init resources
    dynamodbc = boto3.client("dynamodb")
    dynamodbr = boto3.resource("dynamodb")
    # Test puts
    # put_record(table_name, test_booking_put, dynamodbc)
    # put_record(table_name, test_venue_put, dynamodbc)
    # put_record(table_name, test_user_put, dynamodbc)
    
    # return get_records(table_name, dynamodbc)
    return get_record(table_name, dynamodbr, test_booking_get)

def get_records(table, dynamodb):
    action = "Getting items from the " + table + " table"
    items = dynamodb.scan(
        TableName=table, 
        ConsistentRead=True
    )
    return items
    
def get_record(table_name, dynamodb, query_key):
    table = dynamodb.Table(table_name)
    item = table.get_item(
        Key=query_key
    )
    return item
    
def put_record(table_name, item, dynamodb):
    put_response = dynamodb.put_item(
        TableName=table_name, Item=item, ReturnConsumedCapacity="TOTAL"
    )