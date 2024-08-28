---
hide:
- navigation
- toc
---
# OpenAI Assistants in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API in a Python console application.

[:material-file-code: main.py](./samples/openai-asst-py/main.py)  
[:material-file-code: openai_assistants.py](./samples/openai-asst-py/openai_assistants.py)  

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

**STEP 1**: Read the configuration settings from environment variables:

``` python title="main.py"
ASSISTANT_ID = os.getenv('ASSISTANT_ID') or "<insert your OpenAI assistant ID here>"
threadId = sys.argv[1] if len(sys.argv) > 1 else None

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
assistant = OpenAIAssistantsClass(ASSISTANT_ID, openai)
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    response = assistant.get_response(user_input)
    print(f'\nAssistant: {response}\n')
```


## openai_assistants.py

**STEP 1**: Create the client and initialize chat message history with a system message:

``` python title="openai_assistants.py"
class OpenAIAssistantsClass:

    def __init__(self, assistant_id, openai):
        self.assistant_id = assistant_id
        self.thread = None
        self.openai = openai
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

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

**STEP 3**: Send the chat message history to the OpenAI Assistants API and process the response:

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
