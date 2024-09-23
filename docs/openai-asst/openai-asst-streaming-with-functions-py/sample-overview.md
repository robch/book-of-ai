---
hide:
- navigation
- toc
---
# OpenAI Assistants with Function Calling in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with function calling in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-py/main.py)  
[:material-file-code: openai_assistants_custom_functions.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_custom_functions.py)  
[:material-file-code: openai_assistants_functions_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_functions_streaming.py)  

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

**STEP 1**: Read the configuration settings from environment variables.

``` python title="main.py"
ASSISTANT_ID = os.getenv('ASSISTANT_ID') or "<insert your OpenAI assistant ID here>"
AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY', '<insert your Azure OpenAI API key here>')
AZURE_OPENAI_API_VERSION = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your Azure OpenAI endpoint here>')
AZURE_OPENAI_BASE_URL = f'{AZURE_OPENAI_ENDPOINT.rstrip("/")}/openai'
```

**STEP 2**: Validate the environment variables.

``` python title="main.py"
ok = \
    ASSISTANT_ID != None and not ASSISTANT_ID.startswith('<insert') and \
    AZURE_OPENAI_API_KEY != None and not AZURE_OPENAI_API_KEY.startswith('<insert') and \
    AZURE_OPENAI_API_VERSION != None and not AZURE_OPENAI_API_VERSION.startswith('<insert') and \
    AZURE_OPENAI_ENDPOINT != None and not AZURE_OPENAI_ENDPOINT.startswith('<insert')

if not ok:
    print('To use Azure OpenAI, set the following environment variables:\n' +
        '\n  ASSISTANT_ID' +
        '\n  AZURE_OPENAI_API_KEY' +
        '\n  AZURE_OPENAI_API_VERSION' +
        '\n  AZURE_OPENAI_ENDPOINT')
    print('\nYou can easily do that using the Azure AI CLI by doing one of the following:\n' +
      '\n  ai init' +
      '\n  ai dev shell' +
      '\n  python main.py' +
      '\n' +
      '\n  or' +
      '\n' +
      '\n  ai init' +
      '\n  ai dev shell --run "python main.py"')
    os._exit(1)
```

**STEP 3**: Initialize the OpenAI client with the configuration settings.

``` python title="main.py"
openai = OpenAI(
    api_key = AZURE_OPENAI_API_KEY,
    base_url = AZURE_OPENAI_BASE_URL,
    default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
    default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
)
```

**STEP 4**: Initialize the helper class with the OpenAI client.

``` python title="main.py"
assistant = OpenAIAssistantsFunctionsStreamingClass(ASSISTANT_ID, factory, openai)
```

**STEP 5**: Create or retrieve a thread and display its messages.

``` python title="main.py"
if threadId is None:
    assistant.create_thread()
else:
    assistant.retrieve_thread(threadId)
    assistant.get_thread_messages(lambda role, content: print(f'{role.capitalize()}: {content}', end=''))
```

**STEP 6**: Loop to get user input and get the assistant's response.

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    print('\nAssistant: ', end='')
    assistant.get_response(user_input, lambda content: print(content, end=''))

    print('\n')

print(f"Bye! (threadId: {assistant.thread.id})")
```

## openai_assistants_custom_functions.py

**STEP 1**: Define the function and its schema, then add it to the function factory.

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

**STEP 2**: Add more functions following the same pattern.

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

**STEP 1**: Create the client and initialize chat message history.

``` python title="openai_assistants_functions_streaming.py"
class OpenAIAssistantsFunctionsStreamingClass:

    def __init__(self, assistant_id, function_factory, openai):
        self.assistant_id = assistant_id
        self.function_factory = function_factory
        self.thread = None
        self.openai = openai
```

**STEP 2**: Create an event handler that processes each text delta.

``` python title="openai_assistants_functions_streaming.py"
class EventHandler(AssistantEventHandler):
    def __init__(self, openai, callback):
        super().__init__()
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

**STEP 3**: Implement the required actions and tool outputs handling.

``` python title="openai_assistants_functions_streaming.py"
def handle_requires_action(self, data, run_id):
    tool_outputs = []

    tool_calls = data.required_action.submit_tool_outputs.tool_calls
    if tool_calls != None:
        tool_outputs = self.get_tool_outputs(tool_calls)

    self.submit_tool_outputs(tool_outputs, run_id)

# The rest of the code follows the same pattern of handling different parts of the streaming process.
```