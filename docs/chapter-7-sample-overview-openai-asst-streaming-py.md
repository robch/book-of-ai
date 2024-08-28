---
hide:
- navigation
- toc
---
# OpenAI Assistants Streaming in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with streaming in a Python console application.

[:material-file-code: main.py](./samples/openai-asst-streaming-py/main.py)  
[:material-file-code: openai_assistants_streaming.py](./samples/openai-asst-streaming-py/openai_assistants_streaming.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming' in 'openai-asst-streaming-py' (3 files)...

    main.py
    openai_assistants_streaming.py
    requirements.txt

    Generating 'openai-asst-streaming' in 'openai-asst-streaming-py' (3 files)... DONE!
    ```


## main.py

**STEP 1**: Read the configuration settings from environment variables:

``` python title="main.py"
ASSISTANT_ID = os.getenv('ASSISTANT_ID') or "<insert your OpenAI assistant ID here>"
AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY', '<insert your Azure OpenAI API key here>')
AZURE_OPENAI_API_VERSION = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your Azure OpenAI endpoint here>')
AZURE_OPENAI_BASE_URL = f'{AZURE_OPENAI_ENDPOINT.rstrip("/")}/openai'
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` python title="main.py"
openai = OpenAI(
    api_key = AZURE_OPENAI_API_KEY,
    base_url = AZURE_OPENAI_BASE_URL,
    default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
    default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
)
assistant = OpenAIAssistantsStreamingClass(ASSISTANT_ID, openai)
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break
    print('\nAssistant: ', end='')
    assistant.get_response(user_input, lambda content: print(content, end=''))
    print('\n')
```

## openai_assistants_streaming.py

**STEP 1**: Create the client and initialize chat message history with a system message:

``` python title="openai_assistants_streaming.py"
def __init__(self, assistant_id, openai):
    self.assistant_id = assistant_id
    self.thread = None
    self.openai = openai

class EventHandler(AssistantEventHandler):
    def __init__(self, openai, callback):
        super().__init__()
        self.openai = openai
        self.callback = callback
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` python title="openai_assistants_streaming.py"
message = self.openai.beta.threads.messages.create(
    thread_id=self.thread.id,
    role="user",
    content=user_input,
)
```

**STEP 3**: Send the chat message history to the streaming OpenAI Assistants API and process each update:

``` python title="openai_assistants_streaming.py"
with self.openai.beta.threads.runs.stream(
    thread_id=self.thread.id,
    assistant_id=self.assistant_id,
    event_handler=EventHandler(self.openai, callback)
) as stream:
    stream.until_done()
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update:

``` python title="openai_assistants_streaming.py"
def on_text_delta(self, delta, snapshot):
    self.callback(delta.value)
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response:

``` python title="openai_assistants_streaming.py"
def get_response(self, user_input, callback) -> None:
    if self.thread == None:
        self.create_thread()
    message = self.openai.beta.threads.messages.create(
        thread_id=self.thread.id,
        role="user",
        content=user_input,
    )
    with self.openai.beta.threads.runs.stream(
        thread_id=self.thread.id,
        assistant_id=self.assistant_id,
        event_handler=EventHandler(self.openai, callback)
    ) as stream:
        stream.until_done()
```