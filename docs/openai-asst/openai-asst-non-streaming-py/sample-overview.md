---
hide:
- navigation
- toc
---
# OpenAI Assistants in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-py/main.py)  
[:material-file-code: openai_assistants.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-py/openai_assistants.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst' in 'openai-asst-py' (3 files)...

    main.py
    openai_assistants.py
    requirements.txt

    Generating 'openai-asst' in 'openai-asst-py' (3 files)... DONE!
    ```

## main.py

**STEP 1**: Read the configuration settings from environment variables.

``` python title="main.py"
ASSISTANT_ID = os.getenv('ASSISTANT_ID') or "<insert your OpenAI assistant ID here>"
threadId = sys.argv[1] if len(sys.argv) > 1 else None

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

**STEP 3**: Initialize the helper class with the configuration settings.

``` python title="main.py"
openai = OpenAI(
    api_key = AZURE_OPENAI_API_KEY,
    base_url = AZURE_OPENAI_BASE_URL,
    default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
    default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
)
assistant = OpenAIAssistantsClass(ASSISTANT_ID, openai)
```

**STEP 4**: Handle thread creation or retrieval.

``` python title="main.py"
if threadId is None:
    assistant.create_thread()
else:
    assistant.retrieve_thread(threadId)
    assistant.get_thread_messages(lambda role, content: print(f'{role.capitalize()}: {content}', end=''))
```

**STEP 5**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    response = assistant.get_response(user_input)
    print(f'\nAssistant: {response}\n')
```

## openai_assistants.py

**STEP 1**: Create the client and initialize chat message history with a system message.

``` python title="openai_assistants.py"
class OpenAIAssistantsClass:

    def __init__(self, assistant_id, openai):
        self.assistant_id = assistant_id
        self.thread = None
        self.openai = openai
```

**STEP 2**: When the user provides input, add the user message to the chat message history.

``` python title="openai_assistants.py"
def get_response(self, user_input) -> str:
    if self.thread == None:
        self.create_thread()

    message = self.openai.beta.threads.messages.create(
        thread_id=self.thread.id,
        role="user",
        content=user_input,
    )
```

**STEP 3**: Send the chat message history to the OpenAI Assistants API and process the response.

``` python title="openai_assistants.py"
run = self.openai.beta.threads.runs.create_and_poll(
    thread_id=self.thread.id,
    assistant_id=self.assistant_id
)

if run.status == 'completed':
    messages = self.openai.beta.threads.messages.list(thread_id=self.thread.id)
    return ''.join([item.text.value for item in messages.data[0].content])

return str(run.status)
```

**STEP 4**: Create and retrieve thread methods for handling threads.

``` python title="openai_assistants.py"
def create_thread(self):
    self.thread = self.openai.beta.threads.create()
    return self.thread

    def retrieve_thread(self, thread_id):
        self.thread = self.openai.beta.threads.retrieve(thread_id)
        return self.thread
```

**STEP 5**: Retrieve and display previous messages in the thread.

``` python title="openai_assistants.py"
def get_thread_messages(self, callback):
    messages = self.openai.beta.threads.messages.list(self.thread.id)
    messages.data.reverse()

    for message in messages.data:
        content = ''.join([item.text.value for item in message.content]) + '\n\n'
        callback(message.role, content)
```