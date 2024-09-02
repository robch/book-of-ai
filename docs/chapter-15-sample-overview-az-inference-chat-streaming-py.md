---
hide:
- navigation
- toc
---
# Azure AI Inference Chat Streaming in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure AI Inference Chat API with streaming in a Python application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/main.py)  
[:material-file-code: azureml_chat_completions_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/azureml_chat_completions_streaming.py)  

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

    azureml_chat_completions_streaming.py
    main.py
    requirements.txt

    Generating 'az-inference-chat-streaming' in 'az-inference-chat-streaming-py' (3 files)... DONE!
    ```

## main.py

**STEP 1**: Read the configuration settings from environment variables:

``` python title="main.py"
chat_api_key = os.getenv("AZURE_AI_CHAT_API_KEY", '<insert your Azure AI Inference API key here>')
chat_endpoint = os.getenv("AZURE_AI_CHAT_ENDPOINT", '<insert your Azure AI Inference endpoint here>')
chat_model = os.getenv('AZURE_AI_CHAT_MODEL', '')
chat_system_prompt = os.getenv('SYSTEM_PROMPT', 'You are a helpful AI assistant.')
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` python title="main.py"
chat = AzureAIInferenceChatCompletionsStreaming(chat_endpoint, chat_api_key, chat_model, chat_system_prompt)
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` python title="main.py"
while True:
{
    user_input = input('User: ')
    if user_input == 'exit' or user_input == '':
        break

    print('\nAssistant: ', end='')
    response = chat.get_chat_completions(user_input, lambda content: print(content, end=''))
    print('\n')
}
```

## azureml_chat_completions_streaming.py

**STEP 1**: Create the client and initialize chat message history with a system message:

``` python title="azureml_chat_completions_streaming.py"
class AzureAIInferenceChatCompletionsStreaming:
    def __init__(self, chat_endpoint, chat_api_key, chat_model, chat_system_prompt):
        self.chat_system_prompt = chat_system_prompt
        self.chat_model = chat_model
        self.client = ChatCompletionsClient(endpoint=chat_endpoint, credential=AzureKeyCredential(chat_api_key))
        self.clear_conversation()

    def clear_conversation(self):
        self.messages = [
            SystemMessage(content=self.chat_system_prompt)
        ];
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` python title="azureml_chat_completions_streaming.py"
    def get_chat_completions(self, user_input, callback):
        self.messages.append(UserMessage(content=user_input))
```

**STEP 3**: Send the chat message history to the streaming Azure AI Chat API and process each update:

``` python title="azureml_chat_completions_streaming.py"
        complete_content = ''
        response = self.client.complete(
            messages=self.messages,
            model=self.chat_model,
            stream=True,
        )

        for update in response:

            if update.choices is None or len(update.choices) == 0: 
                continue

            content = update.choices[0].delta.content or ""
            if content is None: continue

            complete_content += content
            callback(content)
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update:

``` python title="azureml_chat_completions_streaming.py"
        self.messages.append(AssistantMessage(content=complete_content))
        return complete_content
```