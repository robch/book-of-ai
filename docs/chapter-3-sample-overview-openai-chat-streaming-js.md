---
hide:
- navigation
- toc
---
# OpenAI Chat Streaming in JavaScript

This sample demonstrates how to use the OpenAI Chat API with streaming in a JavaScript application.

[:material-file-code: Main.js](./samples/openai-chat-streaming-js/Main.js)  
[:material-file-code: OpenAIChatCompletionsStreamingClass.js](./samples/openai-chat-streaming-js/OpenAIChatCompletionsStreamingClass.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-js' (3 files)...

    OpenAIChatCompletionsStreamingClass.js
    Main.js
    ReadLineWrapper.js

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-js' (3 files)... DONE!
    ```


## Main.js

**STEP 1**: Read the configuration settings from environment variables:

``` javascript title="Main.js"
const AZURE_OPENAI_SYSTEM_PROMPT = process.env.AZURE_OPENAI_SYSTEM_PROMPT ?? "You are a helpful AI assistant.";

// NOTE: Never deploy your API Key in client-side environments like browsers or mobile apps
// SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety

// Get the required environment variables
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_CHAT_DEPLOYMENT = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT ?? "<insert your Azure OpenAI chat deployment name here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai/deployments/${AZURE_OPENAI_CHAT_DEPLOYMENT}`;
```

**STEP 2**: Create the client with the configuration settings and initialize the helper class:

``` javascript title="Main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});

const chat = new OpenAIChatCompletionsStreamingClass(AZURE_OPENAI_CHAT_DEPLOYMENT, AZURE_OPENAI_SYSTEM_PROMPT, openai, 20);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` javascript title="Main.js"
while (true) {

  // Get user input
  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  // Get the response
  process.stdout.write('\nAssistant: ');
  await chat.getResponse(input, (content) => {
    process.stdout.write(content);
  });

  process.stdout.write('\n\n');
}
```

## OpenAIChatCompletionsStreamingClass.js

**STEP 1**: Initialize chat message history with a system message:

``` javascript title="OpenAIChatCompletionsStreamingClass.js"
constructor(openAIModelOrDeploymentName, systemPrompt, openai, simulateTypingDelay = 0) {
  this.simulateTypingDelay = simulateTypingDelay;
  this.systemPrompt = systemPrompt;
  this.openAIModelOrDeploymentName = openAIModelOrDeploymentName;
  this.openai = openai;

  this.clearConversation();
}

clearConversation() {
  this.messages = [
    { role: 'system', content: this.systemPrompt }
  ];
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` javascript title="OpenAIChatCompletionsStreamingClass.js"
this.messages.push({ role: 'user', content: userInput });
```

**STEP 3**: Send the chat message history to the OpenAI Chat streaming API and process each update:

``` javascript title="OpenAIChatCompletionsStreamingClass.js"
const events = await this.openai.chat.completions.create({
  model: this.openAIModelOrDeploymentName,
  messages: this.messages,
  stream: true
});

for await (const event of events) {
  for (const choice of event.choices) {

    let content = choice.delta?.content;
    if (choice.finish_reason === 'length') {
      content = `${content}\nERROR: Exceeded token limit!`;
    }
```

**STEP 4**: For each non-empty update, invoke the callback for the update, and accumulate the response

``` javascript title="OpenAIChatCompletionsStreamingClass.js"
if (content != null) {
  if(callback != null) {
    callback(content);
    if (this.simulateTypingDelay > 0) {
      await new Promise(r => setTimeout(r, this.simulateTypingDelay));
    }
  }
  response += content;
}
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return the response:

``` javascript title="OpenAIChatCompletionsStreamingClass.js"
this.messages.push({ role: 'assistant', content: response });
return response;
```
