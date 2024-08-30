---
hide:
- navigation
- toc
---
# OpenAI Chat with Data Streaming in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API with data streaming in a Python console application.

[:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-data-py/main.py)  
[:material-file-code: requirements.txt](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-data-py/requirements.txt)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-data --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-py' (2 files)...

    main.py
    requirements.txt

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-py' (2 files)... DONE!
    ```


## main.py

**STEP 1**: Read the configuration settings from environment variables:

``` python title="main.py"
openai_api_key = os.getenv('AZURE_OPENAI_API_KEY', '<insert your OpenAI API key here>')
openai_api_version = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your OpenAI API version here>')
openai_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your OpenAI endpoint here>')
openai_chat_deployment_name = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', '<insert your OpenAI chat deployment name here>')
openai_embeddings_deployment_name = os.getenv('AZURE_OPENAI_EMBEDDING_DEPLOYMENT', '<insert your OpenAI embeddings deployment here>')
openai_embeddings_endpoint = f"{openai_endpoint.rstrip('/')}/openai/deployments/{openai_embeddings_deployment_name}/embeddings?api-version={openai_api_version}"
openai_system_prompt = os.getenv('AZURE_OPENAI_SYSTEM_PROMPT', 'You are a helpful AI assistant.')
search_api_key = os.getenv('AZURE_AI_SEARCH_KEY', '<insert your search api key here>')
search_endpoint =os.getenv('AZURE_AI_SEARCH_ENDPOINT', '<insert your search endpoint here>')
search_index_name = os.getenv('AZURE_AI_SEARCH_INDEX_NAME', '<insert your search index name here>')
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` python title="main.py"
chat = OpenAIChatCompletionsStreamingWithData(openai_api_version, openai_endpoint, openai_api_key, openai_chat_deployment_name, openai_system_prompt, search_endpoint, search_api_key, search_index_name, openai_embeddings_endpoint)
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    print("\nAssistant: ", end="")
    response = chat.get_chat_completions(user_input, lambda content: print(content, end=""))
    print("\n")
```

## requirements.txt

This file contains the dependencies required to run the sample:

``` text title="requirements.txt"
openai>1.0
```