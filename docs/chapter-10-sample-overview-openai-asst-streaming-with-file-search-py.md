---
hide:
- navigation
- toc
---
# OpenAI Assistants with File Search in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with file search in a Python console application.

[:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-file-search-py/main.py)  
[:material-file-code: openai_assistants_file_search_streaming.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-file-search-py/openai_assistants_file_search_streaming.py)  

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

    main.py
    openai_assistants_file_search_streaming.py
    requirements.txt

    Generating 'openai-asst-streaming-with-file-search' in 'openai-asst-streaming-with-file-search-py' (3 files)... DONE!
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

**STEP 2**: Initialize the OpenAI client and the helper class with the configuration settings:

``` python title="main.py"
openai = OpenAI(
    api_key = AZURE_OPENAI_API_KEY,
    base_url = AZURE_OPENAI_BASE_URL,
    default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
    default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
)
assistant = OpenAIAssistantsFileSearchStreamingClass(ASSISTANT_ID, openai)
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` python title="main.py"
while True:
{
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    print('\nAssistant: ', end='')
    assistant.get_response(user_input, lambda content: print(content, end=''))
    print('\n')
}
```

## openai_assistants_file_search_streaming.py

**STEP 1**: Define the EventHandler class to handle streaming responses:

``` python title="openai_assistants_file_search_streaming.py"
class EventHandler(AssistantEventHandler):
    def __init__(self, openai, callback):
        super().__init__()
        self.openai = openai
        self.callback = callback
```

**STEP 2**: Implement the on_text_delta method to process text updates and invoke the callback:

``` python title="openai_assistants_file_search_streaming.py"
    def on_text_delta(self, delta, snapshot):
        content = delta.value
        if delta.annotations:
            for annotation in delta.annotations:
                content = content.replace(annotation.text, f"[{annotation.index}]")
        self.callback(content)
```

**STEP 3**: Implement the on_message_done method to handle message completion and display citations:

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

**STEP 4**: Define the OpenAIAssistantsFileSearchStreamingClass to manage assistant interactions:

``` python title="openai_assistants_file_search_streaming.py"
class OpenAIAssistantsFileSearchStreamingClass:
    def __init__(self, assistant_id, openai):
        self.assistant_id = assistant_id
        self.thread = None
        self.openai = openai
```

**STEP 5**: Implement methods to create or retrieve threads, get thread messages, and get responses:

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