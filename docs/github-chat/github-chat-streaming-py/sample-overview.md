---
hide:
- navigation
- toc
---
# Azure Inference Chat Streaming in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the Azure AI Inference Chat API with streaming in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/main.py)  
[:material-file-code: requirements.txt](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/requirements.txt)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new az-inference-chat-streaming --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'az-inference-chat-streaming' in 'az-inference-chat-streaming-py' (3 files)...

    main.py
    requirements.txt

    Generating 'az-inference-chat-streaming' in 'az-inference-chat-streaming-py' (2 files)... DONE!
    ```


## main.py

**STEP 1**: Import required libraries and modules.

``` python title="main.py"
from azureml_chat_completions_streaming import AzureAIInferenceChatCompletionsStreaming
import os
import sys
```

**STEP 2**: Define the main function that reads the configuration settings from environment variables.

``` python title="main.py"
def main():
    chat_api_key = os.getenv("AZURE_AI_CHAT_API_KEY", '<insert your Azure AI Inference API key here>')
    chat_endpoint = os.getenv("AZURE_AI_CHAT_ENDPOINT", '<insert your Azure AI Inference endpoint here>')
    chat_model = os.getenv('AZURE_AI_CHAT_MODEL', '')
    chat_system_prompt = os.getenv('SYSTEM_PROMPT', 'You are a helpful AI assistant.')
```

**STEP 3**: Validate the configuration settings.

``` python title="main.py"
    ok = all([chat_api_key, chat_endpoint, chat_system_prompt]) and \
         all([not s.startswith('<insert') for s in [chat_api_key, chat_endpoint, chat_system_prompt]])
    if not ok:
        print(
            'To use Azure AI Chat Streaming, set the following environment variables:' +
            '\n- AZURE_AI_CHAT_API_KEY' +
            '\n- AZURE_AI_CHAT_ENDPOINT' +
            '\n- AZURE_AI_CHAT_MODEL (optional)' +
            '\n- SYSTEM_PROMPT (optional)')
        sys.exit(1)
```

**STEP 4**: Initialize the AzureAIInferenceChatCompletionsStreaming class with the configuration settings.

``` python title="main.py"
    chat = AzureAIInferenceChatCompletionsStreaming(chat_endpoint, chat_api_key, chat_model, chat_system_prompt)
```

**STEP 5**: Implement an input loop to obtain user input.

``` python title="main.py"
    while True:
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break
```

**STEP 6**: Use the helper class to get the assistant's response and display responses as they are received.

``` python title="main.py"
        print('\nAssistant: ', end='')
        response = chat.get_chat_completions(user_input, lambda content: print(content, end=''))
        print('\n')
```
