---
hide:
- navigation
- toc
---

# OpenAI Chat Completions Streaming in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat Completions API with streaming in a JavaScript console application.

[:material-file-code: Main.js](./samples/openai-chat-streaming-js/Main.js)  
[:material-file-code: OpenAIChatCompletionsStreamingClass.js](./samples/openai-chat-streaming-js/OpenAIChatCompletionsStreamingClass.js)  
[:material-file-code: ReadLineWrapper.js](./samples/openai-chat-streaming-js/ReadLineWrapper.js)  

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new openai-chat-streaming --javascript
    ```

    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-js' (3 files)...

    Main.js
    OpenAIChatCompletionsStreamingClass.js
    ReadLineWrapper.js

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-js' (3 files)... DONE!
    ```

## Main.js

**STEP 1**: Read configuration settings from environment variables:

```javascript title="Main.js"
const AZURE_OPENAI_SYSTEM_PROMPT = process.env.AZURE_OPENAI_SYSTEM_PROMPT ?? "You are a helpful AI assistant.";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_CHAT_DEPLOYMENT = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT ?? "<insert your Azure OpenAI chat deployment name here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$, '')}/openai/deployments/${AZURE_OPENAI_CHAT_DEPLOYMENT}`;
```

**STEP 2**: Initialize the OpenAI client and helper class with the configuration settings:

```javascript title="Main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});

const chat = new OpenAIChatCompletionsStreamingClass(AZURE_OPENAI_CHAT_DEPLOYMENT, AZURE_OPENAI_SYSTEM_PROMPT, openai, 20);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

```javascript title="Main.js"
while (true) {
  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  process.stdout.write('\nAssistant: ');
  await chat.getResponse(input, (content) => {
    process.stdout.write(content);
  });

  process.stdout.write('\n\n');
}
```

## OpenAIChatCompletionsStreamingClass.js

**STEP 1**: Create the client and initialize chat message history with a system message:

```javascript title="OpenAIChatCompletionsStreamingClass.js"
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

```javascript title="OpenAIChatCompletionsStreamingClass.js"
async getResponse(userInput, callback) {
  this.messages.push({ role: 'user', content: userInput });
```

**STEP 3**: Send the chat message history to the streaming OpenAI Chat Completions API and process each update:

```javascript title="OpenAIChatCompletionsStreamingClass.js"
let response = '';
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

    if (content != null) {
      if(callback != null) {
        callback(content);
        if (this.simulateTypingDelay > 0) {
          await new Promise(r => setTimeout(r, this.simulateTypingDelay));
        }
      }
      response += content;
    }
  }
}
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update:

```javascript title="OpenAIChatCompletionsStreamingClass.js"
if (string.isNullOrEmpty(content)) continue;

response += content;
if (callback != null) callback(content);
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response:

```javascript title="OpenAIChatCompletionsStreamingClass.js"
this.messages.push({ role: 'assistant', content: response });
return response;
```

## ReadLineWrapper.js

**STEP 1**: Create a readline wrapper for user input:

```javascript title="ReadLineWrapper.js"
class ReadLineWrapper {

  constructor() {
    this.lineGenerator = this.readlines();
  }

  async* readlines() {
    let buffer = '';
    for await (const chunk of process.stdin) {
      buffer += chunk;
      let i;
      while ((i = buffer.indexOf('\n')) >= 0) {
        yield buffer.substring(0, i).trimEnd();
        buffer = buffer.substring(i + 1);
      }
    }
  }

  async question(prompt) {
    process.stdout.write(prompt);
    const result = await this.lineGenerator.next();
    if(result.done) {
      return '';
    }
    return result.value;
  }
}

const readline = new ReadLineWrapper();

module.exports = { readline: readline };
```
