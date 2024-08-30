---
hide:
- navigation
- toc
---
# OpenAI Assistants with Function Calling in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with function calling in a Python console application.

[:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-py/main.py)  
[:material-file-code: openai_assistants_custom_functions.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_custom_functions.py)  
[:material-file-code: openai_assistants_functions_streaming.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_functions_streaming.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-functions --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-functions' in 'openai-asst-streaming-with-functions-py' (3 files)...

    main.py
    openai_assistants_custom_functions.py
    openai_assistants_functions_streaming.py

    Generating 'openai-asst-streaming-with-functions' in 'openai-asst-streaming-with-functions-py' (3 files)... DONE!
    ```


## main.py

**STEP 1**: Set up environment variables and check their availability:

``` python title="main.py"
# Get the required environment variables, and form the base URL for Azure OpenAI Assistants API
AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY', '<insert your Azure OpenAI API key here>')
AZURE_OPENAI_API_VERSION = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your Azure OpenAI endpoint here>')
AZURE_OPENAI_BASE_URL = f'{AZURE_OPENAI_ENDPOINT.rstrip("/")}/openai'

# Check if the required environment variables are set
ok = \
    ASSISTANT_ID != None and not ASSISTANT_ID.startswith('<insert') and \
    AZURE_OPENAI_API_KEY != None and not AZURE_OPENAI_API_KEY.startswith('<insert') and \
    AZURE_OPENAI_API_VERSION != None and not AZURE_OPENAI_API_VERSION.startswith('<insert') and \
    AZURE_OPENAI_ENDPOINT != None and not AZURE_OPENAI_ENDPOINT.startswith('<insert')
```

**STEP 2**: Initialize the OpenAI client and the assistant's streaming helper class:

``` python title="main.py"
# Create the OpenAI client
openai = OpenAI(
    api_key = AZURE_OPENAI_API_KEY,
    base_url = AZURE_OPENAI_BASE_URL,
    default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
    default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
)

# Create the assistants streaming helper class instance
assistant = OpenAIAssistantsFunctionsStreamingClass(ASSISTANT_ID, factory, openai)
```

**STEP 3**: Manage the assistant's thread, retrieve messages, and handle user input in a loop:

``` python title="main.py"
# Get or create the thread, and display the messages if any
if threadId is None:
    assistant.create_thread()
else:
    assistant.retrieve_thread(threadId)
    assistant.get_thread_messages(lambda role, content: print(f'{role.capitalize()}: {content}', end=''))

# Loop until the user types 'exit'
while True:
    # Get user input
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    # Get the Assistant's response
    print('\nAssistant: ', end='')
    assistant.get_response(user_input, lambda content: print(content, end=''))

    print('\n')
```

## openai_assistants_custom_functions.py

**STEP 1**: Define custom functions and their schemas, then add them to the function factory:

``` python title="openai_assistants_custom_functions.py"
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
```

**STEP 2**: Define more custom functions as needed:

``` python title="openai_assistants_custom_functions.py"
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
```

**STEP 3**: Add a function with parameters:

``` python title="openai_assistants_custom_functions.py"
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
```

## openai_assistants_functions_streaming.py

**STEP 1**: Define the event handler to process streaming events and function calls:

``` python title="openai_assistants_functions_streaming.py"
class EventHandler(AssistantEventHandler):

    def __init__(self, function_factory, openai, callback):
        super().__init__()
        self.function_factory = function_factory
        self.openai = openai
        self.callback = callback

    @override
    def on_text_delta(self, delta, snapshot):
        self.callback(delta.value)


    @override
    def on_event(self, event):
        if event.event == 'thread.run.requires_action':
            run_id = event.data.id
            self.handle_requires_action(event.data, run_id)
        elif event.event == 'thread.run.failed':
            print(event)
            raise Exception('Run failed')
        super().on_event(event)
```

**STEP 2**: Implement the required actions and tool outputs handling:

``` python title="openai_assistants_functions_streaming.py"
def handle_requires_action(self, data, run_id):
    tool_outputs = []

    tool_calls = data.required_action.submit_tool_outputs.tool_calls
    if tool_calls != None:
        tool_outputs = self.get_tool_outputs(tool_calls)

    self.submit_tool_outputs(tool_outputs, run_id)

# The rest of the code follows the same pattern of handling different parts of the streaming process.
```