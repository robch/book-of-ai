from function_factory import FunctionFactory
factory = FunctionFactory()

def ignore_args_decorator(func):
    def wrapper(*args, **kwargs):
        return func()
    return wrapper

@ignore_args_decorator
def get_current_date():
    from datetime import date
    today = date.today()
    return f'{today.year}-{today.month}-{today.day}'

get_current_date_schema = {
    'name': 'get_current_date',
    'description': 'Get the current date',
    'parameters': {
        'type': 'object',
        'properties': {},
    },
}

factory.add_function(get_current_date_schema, get_current_date)

@ignore_args_decorator
def get_current_time():
    from datetime import datetime
    now = datetime.now()
    return f'{now.hour}:{now.minute}'

get_current_time_schema = {
    'name': 'get_current_time',
    'description': 'Get the current time',
    'parameters': {
        'type': 'object',
        'properties': {},
    },
}

factory.add_function(get_current_time_schema, get_current_time)

def get_current_weather(function_arguments):
    location = function_arguments.get('location')
    return f'The weather in {location} is 72 degrees and sunny.'

get_current_weather_schema = {
    'name': 'get_current_weather',
    'description': 'Get the current weather in a given location',
    'parameters': {
        'type': 'object',
        'properties': {
            'location': {
                'type': 'string',
                'description': 'The city and state, e.g. San Francisco, CA',
            },
            'unit': {
                'type': 'string',
                'enum': ['celsius', 'fahrenheit'],
            },
        },
        'required': ['location'],
    },
}

factory.add_function(get_current_weather_schema, get_current_weather)
