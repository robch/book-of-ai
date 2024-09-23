---
hide:
- navigation
- toc
---
# OpenAI Chat in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-py/main.py)  
[:material-file-code: openai_chat_completions.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-py/openai_chat_completions.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat' in 'openai-chat-py' (3 files)...

    main.py
    openai_chat_completions.py
    requirements.txt

    Generating 'openai-chat' in 'openai-chat-py' (3 files)... DONE!
    ```

## main.py

**STEP 1**: Read the configuration settings from environment variables:

```python title="main.py"
openai_api_key = os.getenv('AZURE_OPENAI_API_KEY', '<insert your OpenAI API key here>')
openai_api_version = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
openai_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your OpenAI endpoint here>')
openai_chat_deployment_name = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', '<insert your OpenAI chat deployment name here>')
openai_system_prompt = os.getenv('AZURE_OPENAI_SYSTEM_PROMPT', 'You are a helpful AI assistant.')
```

**STEP 2**: Initialize the AzureOpenAI client with the configuration settings:

```python title="main.py"
client = AzureOpenAI(
  api_key=openai_api_key,
  api_version=openai_api_version,
  azure_endpoint = openai_endpoint
)
messages=[
    {'role': 'system', 'content': openai_system_prompt},
]
```

**STEP 3**: Obtain user input, use the helper function to get the assistant's response, and display responses:

```python title="main.py"
def main():
    while True:
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break

        response_content = get_chat_completions(user_input)
        print(f"\nAssistant: {response_content}\n")
```

## openai_chat_completions.py

**STEP 1**: Create the client and initialize chat message history with a system message:

```python title="openai_chat_completions.py"
client = AzureOpenAI(
  api_key=openai_api_key,
  api_version=openai_api_version,
  azure_endpoint = openai_endpoint
)

messages=[
    {'role': 'system', 'content': openai_system_prompt},
]
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

```python title="openai_chat_completions.py"
def get_chat_completions(user_input) -> str:
    messages.append({'role': 'user', 'content': user_input})

    response = client.chat.completions.create(
        model=openai_chat_deployment_name,
        messages=messages,
    )

    response_content = response.choices[0].message.content
    messages.append({'role': 'assistant', 'content': response_content})

    return response_content
```
