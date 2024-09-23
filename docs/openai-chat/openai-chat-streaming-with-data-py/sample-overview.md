---
hide:
- navigation
- toc
---
# OpenAI Chat with Data Streaming in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API with data streaming in a Python console application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-py/main.py)  
[:material-file-code: openai_chat_completions_with_data_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-py/openai_chat_completions_with_data_streaming.py)  
[:material-file-code: requirements.txt](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-py/requirements.txt)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-data --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-py' (3 files)...

    main.py
    openai_chat_completions_with_data_streaming.py
    requirements.txt

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-py' (3 files)... DONE!
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

**STEP 2**: Validate the environment variables:

``` python title="main.py"
if not all([openai_api_key, openai_api_version, openai_endpoint, openai_chat_deployment_name, openai_embeddings_deployment_name, search_api_key, search_endpoint, search_index_name]):
    raise ValueError("One or more environment variables are not set.")
```

**STEP 3**: Initialize the helper class with the configuration settings:

``` python title="main.py"
chat = OpenAIChatCompletionsStreamingWithData(openai_api_version, openai_endpoint, openai_api_key, openai_chat_deployment_name, openai_system_prompt, search_endpoint, search_api_key, search_index_name, openai_embeddings_endpoint)
```

**STEP 4**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` python title="main.py"
while True:
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    print("\nAssistant: ", end="")
    response = chat.get_chat_completions(user_input, lambda content: print(content, end=""))
    print("\n")
```

## openai_chat_completions_with_data_streaming.py

**STEP 1**: Create the client and initialize chat message history with a system message and set up data sources:

``` python title="openai_chat_completions_with_data_streaming.py"
class OpenAIChatCompletionsStreamingWithData:
    def __init__(self, openai_api_version, openai_endpoint, openai_key, openai_chat_deployment_name, openai_system_prompt, search_endpoint, search_api_key, search_index_name, openai_embeddings_endpoint):
        self.openai_system_prompt = openai_system_prompt
        self.openai_chat_deployment_name = openai_chat_deployment_name
        self.client = AzureOpenAI(
            api_key=openai_key,
            api_version=openai_api_version,
            base_url = f"{openai_endpoint.rstrip('/')}/openai/deployments/{openai_chat_deployment_name}/extensions"
            )
        self.extra_body={
            "dataSources": [
                {
                    "type": "AzureCognitiveSearch",
                    "parameters": {
                        "endpoint": search_endpoint,
                        "key": search_api_key,
                        "indexName": search_index_name,
                        "embeddingEndpoint": openai_embeddings_endpoint,
                        "embeddingKey": openai_key,
                        "queryType": "vectorSimpleHybrid"
                    }
                }
            ]
        }

        self.clear_conversation()

    def clear_conversation(self):
        self.messages = [
            {'role': 'system', 'content': self.openai_system_prompt}
        ]
```

**STEP 2**: Clear conversation history:

``` python title="openai_chat_completions_with_data_streaming.py"
def clear_conversation(self):
    self.messages = [
        {'role': 'system', 'content': self.openai_system_prompt}
    ]
```

**STEP 3**: Append user input to the messages list:

``` python title="openai_chat_completions_with_data_streaming.py"
def get_chat_completions(self, user_input, callback):
    self.messages.append({'role': 'user', 'content': user_input})
```

**STEP 4**: Create chat completions with streaming and callback function:

``` python title="openai_chat_completions_with_data_streaming.py"
    complete_content = ''
    response = self.client.chat.completions.create(
        model=self.openai_chat_deployment_name,
        messages=self.messages,
        extra_body=self.extra_body,
        stream=True)

    for chunk in response:

        choice0 = chunk.choices[0] if hasattr(chunk, 'choices') and chunk.choices else None
        delta = choice0.delta if choice0 and hasattr(choice0, 'delta') else None
        content = delta.content if delta and hasattr(delta, 'content') else ''

        finish_reason = choice0.finish_reason if choice0 and hasattr(choice0, 'finish_reason') else None
        if finish_reason == 'length':
            content += f"{content}\nERROR: Exceeded max token length!"

        if content is None: continue

        complete_content += content
        callback(content)
```

**STEP 5**: Append assistant's response to the messages list:

``` python title="openai_chat_completions_with_data_streaming.py"
    self.messages.append({'role': 'assistant', 'content': complete_content})
    return complete_content
```

## requirements.txt

This file contains the dependencies required to run the sample:

``` text title="requirements.txt"
openai>1.0
```