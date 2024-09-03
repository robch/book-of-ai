---
hide:
- navigation
- toc
---
# OpenAI Assistants with Code Interpreter in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with a code interpreter in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-code-py/main.py)  
[:material-file-code: openai_assistants_code_interpreter_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-code-py/openai_assistants_code_interpreter_streaming.py)  

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new openai-asst-streaming-with-code --python
    ```

    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-code' in 'openai-asst-streaming-with-code-py' (3 files)...

    main.py
    openai_assistants_code_interpreter_streaming.py
    requirements.txt

    Generating 'openai-asst-streaming-with-code' in 'openai-asst-streaming-with-code-py' (3 files)... DONE!
    ```


## main.py

**STEP 1**: Import required libraries and initialize variables:

```python title="main.py"
import os
import sys
from openai import OpenAI
from openai_assistants_code_interpreter_streaming import OpenAIAssistantsCodeInterpreterStreamingClass
```

**STEP 2**: Define the main function and read environment variables:

```python title="main.py"
def main():
    ASSISTANT_ID = os.getenv('ASSISTANT_ID') or "<insert your OpenAI assistant ID here>"
    threadId = sys.argv[1] if len(sys.argv) > 1 else None

    AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY', '<insert your Azure OpenAI API key here>')
    AZURE_OPENAI_API_VERSION = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
    AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your Azure OpenAI endpoint here>')
    AZURE_OPENAI_BASE_URL = f'{AZURE_OPENAI_ENDPOINT.rstrip("/")}/openai'

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

**STEP 3**: Create the OpenAI client and assistant instance:

```python title="main.py"
    openai = OpenAI(
        api_key = AZURE_OPENAI_API_KEY,
        base_url = AZURE_OPENAI_BASE_URL,
        default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
        default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
    )

    assistant = OpenAIAssistantsCodeInterpreterStreamingClass(ASSISTANT_ID, openai)
```

**STEP 4**: Retrieve or create a thread and display messages:

```python title="main.py"
    if threadId is None:
        assistant.create_thread()
    else:
        assistant.retrieve_thread(threadId)
        assistant.get_thread_messages(lambda role, content: print(f'{role.capitalize()}: {content}', end=''))
```

**STEP 5**: Loop to get user input and display assistant's response:

```python title="main.py"
    while True:
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break

        print('\nAssistant: ', end='')
        assistant.get_response(user_input, lambda content: print(content, end=''))

        print('\n')

    print(f"Bye! (threadId: {assistant.thread.id})")

if __name__ == '__main__':
    try:
        main()
    except EOFError:
        pass
    except Exception as e:
        print(f"The sample encountered an error: {e}")
        sys.exit(1)
```

## openai_assistants_code_interpreter_streaming.py

**STEP 1**: Import required libraries and define the event handler class:

```python title="openai_assistants_code_interpreter_streaming.py"
from typing_extensions import override
from openai import AssistantEventHandler

class EventHandler(AssistantEventHandler):

    def __init__(self, openai, callback):
        super().__init__()
        self.openai = openai
        self.callback = callback
```

**STEP 2**: Override methods to handle text delta and tool call events:

```python title="openai_assistants_code_interpreter_streaming.py"
    @override
    def on_text_delta(self, delta, snapshot):
        self.callback(delta.value)

    def on_tool_call_created(self, tool_call):
        if tool_call.type == 'code_interpreter':
            print('\n\nassistant-code:\n', end='', flush=True)
```

**STEP 3**: Override methods to handle tool call deltas and events:

```python title="openai_assistants_code_interpreter_streaming.py"
    def on_tool_call_delta(self, delta, snapshot):
        if delta.type == 'code_interpreter':
            if delta.code_interpreter.input:
                print(delta.code_interpreter.input, end='', flush=True)
            if delta.code_interpreter.outputs:
                print(f'\n\nassistant-output:', end='', flush=True)
                for output in delta.code_interpreter.outputs:
                    if output.type == 'logs':
                        print(f'\n{output.logs}', flush=True)

    @override
    def on_event(self, event):
        if event.event == 'thread.run.failed':
            print(event)
            raise Exception('Run failed')
        super().on_event(event)
```

**STEP 4**: Define the assistant class and initialize it:

```python title="openai_assistants_code_interpreter_streaming.py"
class OpenAIAssistantsCodeInterpreterStreamingClass:

    def __init__(self, assistant_id, openai):
        self.assistant_id = assistant_id
        self.thread = None
        self.openai = openai

    def create_thread(self):
        self.thread = self.openai.beta.threads.create()
        return self.thread
```

**STEP 5**: Define methods to retrieve thread, get messages, and get response:

```python title="openai_assistants_code_interpreter_streaming.py"
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
