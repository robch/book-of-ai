---
hide:
- navigation
- toc
---
# OpenAI Chat Streaming with RAG + AI Search in JavaScript

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API with RAG (Retrieval-Augmented Generation) and AI Search in a JavaScript console application.

[:material-file-code: Main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-js/Main.js)  
[:material-file-code: OpenAIChatCompletionsStreamingWithDataClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-js/OpenAIChatCompletionsStreamingWithDataClass.js)  

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new openai-chat-streaming-with-data --javascript
    ```

    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-js' (3 files)...

    OpenAIChatCompletionsStreamingWithDataClass.js
    ReadLineWrapper.js
    Main.js

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-js' (3 files)... DONE!
    ```

## Main.js

**STEP 1**: Read the configuration settings from environment variables.

```javascript title="Main.js"
const openAIAPIKey = process.env["AZURE_OPENAI_API_KEY"] || "<insert your OpenAI API key here>";
const openAIAPIVersion = process.env["AZURE_OPENAI_API_VERSION"] || "<insert your OpenAI API version here>" ;
const openAIEndpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<insert your OpenAI endpoint here>";
const openAIChatDeploymentName = process.env["AZURE_OPENAI_CHAT_DEPLOYMENT"] || "<insert your OpenAI chat deployment name here>" ;
const openAIEmbeddingsDeploymentName = process.env["AZURE_OPENAI_EMBEDDING_DEPLOYMENT"] || "<insert your OpenAI embeddings deployment here>" ;
const openAIEmbeddingsEndpoint = `${openAIEndpoint.replace(/\/+$, '')}/openai/deployments/${openAIEmbeddingsDeploymentName}/embeddings?api-version=${openAIAPIVersion}`;
const openAISystemPrompt = process.env["AZURE_OPENAI_SYSTEM_PROMPT"] || "You are a helpful AI assistant." ;
const searchEndpoint = process.env["AZURE_AI_SEARCH_ENDPOINT"] || "<insert your search endpoint here>" ;
const searchAPIKey = process.env["AZURE_AI_SEARCH_KEY"] || "<insert your search api key here>" ;
const searchIndexName = process.env["AZURE_AI_SEARCH_INDEX_NAME"] || "<insert your search index name here>" ;
```

**STEP 2**: Initialize the helper class with the configuration settings.

```javascript title="Main.js"
const chat = new OpenAIChatCompletionsStreamingWithDataClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, searchEndpoint, searchAPIKey, searchIndexName, openAIEmbeddingsEndpoint);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

```javascript title="Main.js"
while (true) {

  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  let response = await chat.getChatCompletions(input, (content) => {
    console.log(`assistant-streaming: ${content}`);
  });

  console.log(`\nAssistant: ${response}\n`);
}

console.log('Bye!');
process.exit();
```

## OpenAIChatCompletionsStreamingWithDataClass.js

**STEP 1**: Create the client and initialize chat message history with a system message and set up data sources.

```javascript title="OpenAIChatCompletionsStreamingWithDataClass.js"
constructor(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, searchEndpoint, searchAPIKey, searchIndexName, openAIEmbeddingsEndpoint) {
  this.openAISystemPrompt = openAISystemPrompt;
  this.openAIChatDeploymentName = openAIChatDeploymentName;
  this.client = new OpenAIClient(openAIEndpoint, new AzureKeyCredential(openAIAPIKey));

  this.azureExtensionOptions = {
    azureExtensionOptions: {
      extensions: [
        {
          type: "AzureCognitiveSearch",
          endpoint: searchEndpoint,
          key: searchAPIKey,
          indexName: searchIndexName,
          embeddingEndpoint: openAIEmbeddingsEndpoint,
          embeddingKey: openAIAPIKey,
          queryType: "vectorSimpleHybrid"
        },
      ],
    }
  }

  this.clearConversation();
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history.

```javascript title="OpenAIChatCompletionsStreamingWithDataClass.js"
clearConversation() {
  this.messages = [
    { role: 'system', content: this.openAISystemPrompt }
  ];
}
```

**STEP 3**: Send the chat message history to the streaming OpenAI Chat API and process each update.

```javascript title="OpenAIChatCompletionsStreamingWithDataClass.js"
async getChatCompletions(userInput, callback) {
  this.messages.push({ role: 'user', content: userInput });

  let contentComplete = '';
  const events = await this.client.streamChatCompletions(this.openAIChatDeploymentName, this.messages, this.azureExtensionOptions);

  for await (const event of events) {
    for (const choice of event.choices) {

      let content = choice.delta?.content;
      if (choice.finishReason === 'length') {
        content = `${content}\nERROR: Exceeded token limit!`;
      }
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update.

```javascript title="OpenAIChatCompletionsStreamingWithDataClass.js"
      if (content != null) {
        if(callback != null) {
          callback(content);
        }
        await new Promise(r => setTimeout(r, 50)); // delay to simulate real-time output, word by word
        contentComplete += content;
      }
    }
  }
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response.

```javascript title="OpenAIChatCompletionsStreamingWithDataClass.js"
  this.messages.push({ role: 'assistant', content: contentComplete });
  return contentComplete;
}
```