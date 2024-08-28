---
hide:
- navigation
- toc
---
# OpenAI Chat Completions Streaming in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat Completions API with streaming in a JavaScript console application.

[:material-file-code: Main.js](./samples/openai-chat-streaming-js/Main.js)  
[:material-file-code: package.json](./samples/openai-chat-streaming-js/package.json)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-js' (2 files)...

    Main.js
    package.json

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-js' (2 files)... DONE!
    ```


## Main.js

**STEP 1**: Read the configuration settings from environment variables:

``` javascript title="Main.js"
const AZURE_OPENAI_SYSTEM_PROMPT = process.env.AZURE_OPENAI_SYSTEM_PROMPT ?? "You are a helpful AI assistant.";

const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_CHAT_DEPLOYMENT = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT ?? "<insert your Azure OpenAI chat deployment name here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai/deployments/${AZURE_OPENAI_CHAT_DEPLOYMENT}`;
```

**STEP 2**: Check if required environment variables are set and initialize the OpenAI client:

``` javascript title="Main.js"
if (!ok) {
  console.error(
    'To use Azure OpenAI, set the following environment variables:\n' +
    '\n  AZURE_OPENAI_SYSTEM_PROMPT' +
    '\n  AZURE_OPENAI_API_KEY' +
    '\n  AZURE_OPENAI_API_VERSION' +
    '\n  AZURE_OPENAI_CHAT_DEPLOYMENT' +
    '\n  AZURE_OPENAI_ENDPOINT'
  );
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});
```

**STEP 3**: Initialize the streaming chat completions helper and obtain user input:

``` javascript title="Main.js"
const chat = new OpenAIChatCompletionsStreamingClass(AZURE_OPENAI_CHAT_DEPLOYMENT, AZURE_OPENAI_SYSTEM_PROMPT, openai, 20);

while (true) {
  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  process.stdout.write('\nAssistant: ');
  await chat.getResponse(input, (content) => {
    process.stdout.write(content);
  });

  process.stdout.write('\n\n');
}

console.log('Bye!');
process.exit();
```

## package.json

``` json title="package.json"
{
  "name": "openai-chat-streaming",
  "version": "1.0.0",
  "description": "",
  "main": "Main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack": "webpack"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@azure/identity": "4.1.0",
    "openai": "^4.31.0"
  }
}
```