---
hide:
- navigation
- toc
---
# OpenAI Chat with Function Calling in Python

This sample demonstrates how to use the OpenAI Chat API with function calling in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-py/main.py)  
[:material-file-code: openai_chat_completions_custom_functions.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-py/openai_chat_completions_custom_functions.py)  
[:material-file-code: openai_chat_completions_functions_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-py/openai_chat_completions_functions_streaming.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-functions --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-py' (5 files)...

    function_factory.py
    openai_chat_completions_custom_functions.py
    openai_chat_completions_functions_streaming.py
    main.py
    requirements.txt

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-py' (5 files)... DONE!
    ```

## openai_chat_completions_custom_functions.py

**STEP 1**: Import the FunctionFactory class and create an instance.

``` python title="openai_chat_completions_custom_functions.py"
from function_factory import FunctionFactory
factory = FunctionFactory()
```

**STEP 2**: Define and add the get_current_date, get_current_time, and get_current_weather functions to the factory.

``` python title="openai_chat_completions_custom_functions.py"
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
```

## main.py

**STEP 1**: Read the configuration settings from environment variables.

``` python title="main.py"
openai_api_key = os.getenv('AZURE_OPENAI_API_KEY', '<insert your OpenAI API key here>')
openai_api_version = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
openai_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your OpenAI endpoint here>')
openai_chat_deployment_name = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', '<insert your OpenAI chat deployment name here>')
openai_system_prompt = os.getenv('AZURE_OPENAI_SYSTEM_PROMPT', 'You are a helpful AI assistant.')
```

**STEP 2**: Initialize the helper class with the configuration settings and the function factory.

``` python title="main.py"
chat = OpenAIChatCompletionsFunctionsStreaming(openai_api_version, openai_endpoint, openai_api_key, openai_chat_deployment_name, openai_system_prompt, factory)
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    print("\nAssistant: ", end="")
    response = chat.get_chat_completions(user_input, lambda content: print(content, end=""))
    print("\n")
```

## openai_chat_completions_functions_streaming.py

**STEP 1**: Create the client and initialize chat message history with a system message.

``` python title="openai_chat_completions_functions_streaming.py"
def __init__(self, openai_api_version, openai_endpoint, openai_key, openai_chat_deployment_name, openai_system_prompt, function_factory):
    self.openai_system_prompt = openai_system_prompt
    self.openai_chat_deployment_name = openai_chat_deployment_name
    self.function_factory = function_factory
    self.client = AzureOpenAI(
        api_key=openai_key,
        api_version=openai_api_version,
        azure_endpoint = openai_endpoint
        )
    self.clear_conversation()

def clear_conversation(self):
    self.messages = [
        {'role': 'system', 'content': self.openai_system_prompt}
    ]
    self.function_call_context = FunctionCallContext(self.function_factory, self.messages)
```

**STEP 2**: When the user provides input, add the user message to the chat message history.

``` python title="openai_chat_completions_functions_streaming.py"
def get_chat_completions(self, user_input, callback):
    self.messages.append({'role': 'user', 'content': user_input})
```

**STEP 3**: Send the chat message history and the function schemas to the streaming API and process each update, including checking for function calls.

``` python title="openai_chat_completions_functions_streaming.py"
    complete_content = ''
    functions = self.function_factory.get_function_schemas()

    while True:
        response = self.client.chat.completions.create(
            model=self.openai_chat_deployment_name,
            messages=self.messages,
            stream=True,
            functions=functions,
            function_call='auto')

        for chunk in response:

            choice0 = chunk.choices[0] if hasattr(chunk, 'choices') and chunk.choices else None
            self.function_call_context.check_for_update(choice0)

            delta = choice0.delta if choice0 and hasattr(choice0, 'delta') else None
            content = delta.content if delta and hasattr(delta, 'content') else ''

            finish_reason = choice0.finish_reason if choice0 and hasattr(choice0, 'finish_reason') else None
            if finish_reason == 'length':
                content += f"{content}\nERROR: Exceeded max token length!"
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update.

``` python title="openai_chat_completions_functions_streaming.py"
            if content is None: continue

            complete_content += content
            callback(content)
```

**STEP 5**: Check if the response contained function calls, and process them.

``` python title="openai_chat_completions_functions_streaming.py"
        if self.function_call_context.try_call_function() is not None:
            self.function_call_context.clear()
            continue
```

**STEP 6**: Finally, add the assistant's response to the chat message history and return the response.

``` python title="openai_chat_completions_functions_streaming.py"
    self.messages.append({'role': 'assistant', 'content': complete_content})
    return complete_content
```

