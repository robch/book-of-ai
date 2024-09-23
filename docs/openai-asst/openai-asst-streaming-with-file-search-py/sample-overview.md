---
hide:
- navigation
- toc
---
# OpenAI Assistants with File Search in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with file search and streaming in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-py/main.py)  
[:material-file-code: openai_assistants_file_search_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-py/openai_assistants_file_search_streaming.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-file-search --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-file-search' in 'openai-asst-streaming-with-file-search-py' (3 files)...

    openai_assistants_file_search_streaming.py
    main.py
    requirements.txt

    Generating 'openai-asst-streaming-with-file-search' in 'openai-asst-streaming-with-file-search-py' (3 files)... DONE!
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

**STEP 3**: Initialize the OpenAI client and the assistant.

``` python title="main.py"
openai = OpenAI(
    api_key = AZURE_OPENAI_API_KEY,
    base_url = AZURE_OPENAI_BASE_URL,
    default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
    default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
)
assistant = OpenAIAssistantsFileSearchStreamingClass(ASSISTANT_ID, openai)
```

**STEP 4**: Create or retrieve a thread and display existing messages if thread ID is provided.

``` python title="main.py"
threadId = sys.argv[1] if len(sys.argv) > 1 else None
if threadId is None:
    assistant.create_thread()
else:
    assistant.retrieve_thread(threadId)
    assistant.get_thread_messages(lambda role, content: print(f'{role.capitalize()}: {content}', end=''))
```

**STEP 5**: Implement the user interaction loop to get responses from the assistant.

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break
    print('\nAssistant: ', end='')
    assistant.get_response(user_input, lambda content: print(content, end=''))
    print('\n')
```

## openai_assistants_file_search_streaming.py

**STEP 1**: Create the client and initialize chat message history with a system message.

``` python title="openai_assistants_file_search_streaming.py"
class OpenAIAssistantsFileSearchStreamingClass:

    def __init__(self, assistant_id, openai):
        self.assistant_id = assistant_id
        self.thread = None
        self.openai = openai
```

**STEP 2**: When the user provides input, add the user message to the chat message history and process streaming responses.

``` python title="openai_assistants_file_search_streaming.py"
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

**STEP 3**: For each non-empty update, accumulate the response, and invoke the callback for the update.

``` python title="openai_assistants_file_search_streaming.py"
def on_text_delta(self, delta, snapshot):
    content = delta.value
    if delta.annotations:
        for annotation in delta.annotations:
            content = content.replace(annotation.text, f"[{annotation.index}]")
    self.callback(content)
```

**STEP 4**: Once the message is done, output citations.

``` python title="openai_assistants_file_search_streaming.py"
def on_message_done(self, message) -> None:
    message_content = message.content[0].text
    annotations = message_content.annotations
    citations = []
    for index, annotation in enumerate(annotations):
        if file_citation := getattr(annotation, "file_citation", None):
            cited_file = self.openai.files.retrieve(file_citation.file_id)
            citations.append(f"[{index}] {cited_file.filename}")
    if citations:
        print("\n\n" + "\n".join(citations), end="", flush=True)
```

**STEP 5**: Create and retrieve threads, and get thread messages.

``` python title="openai_assistants_file_search_streaming.py"
def create_thread(self):
    self.thread = self.openai.beta.threads.create()
    return self.thread

def retrieve_thread(self, thread_id):
    self.thread = self.openai.beta.threads.retrieve(thread_id)
    return self.thread

def get_thread_messages(self, callback):
    messages = self.openai.beta.threads.messages.list(self.thread.id)
    messages.data.reverse()
    
    for message in messages.data:
        content = ''.join([item.text.value for item in message.content]) + '\n\n'
        callback(message.role, content)
```
