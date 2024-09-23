---
hide:
- navigation
- toc
---
# OpenAI Chat in JavaScript

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API in a JavaScript console application.

[:material-file-code: Main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-js/Main.js)  
[:material-file-code: OpenAIChatCompletionsClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-js/OpenAIChatCompletionsClass.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat' in 'openai-chat-js' (3 files)...

    Main.js
    OpenAIChatCompletionsClass.js
    ReadLineWrapper.js

    Generating 'openai-chat' in 'openai-chat-js' (3 files)... DONE!
    ```


## Main.js

**STEP 1**: Read the configuration settings from environment variables.

``` javascript title="Main.js"
const AZURE_OPENAI_SYSTEM_PROMPT = process.env.AZURE_OPENAI_SYSTEM_PROMPT ?? "You are a helpful AI assistant.";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_CHAT_DEPLOYMENT = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT ?? "<insert your Azure OpenAI chat deployment name here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai/deployments/${AZURE_OPENAI_CHAT_DEPLOYMENT}`;
```

**STEP 2**: Initialize the helper class with the configuration settings.

``` javascript title="Main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});

const chat = new OpenAIChatCompletionsClass(AZURE_OPENAI_CHAT_DEPLOYMENT, AZURE_OPENAI_SYSTEM_PROMPT, openai);
```

**STEP 3**: Check if the required environment variables are set.

``` javascript title="Main.js"
const azureOk = 
  AZURE_OPENAI_API_KEY != null && !AZURE_OPENAI_API_KEY.startsWith('<insert') &&
  AZURE_OPENAI_API_VERSION != null && !AZURE_OPENAI_API_VERSION.startsWith('<insert') &&
  AZURE_OPENAI_CHAT_DEPLOYMENT != null && !AZURE_OPENAI_CHAT_DEPLOYMENT.startsWith('<insert') &&
  AZURE_OPENAI_ENDPOINT != null && !AZURE_OPENAI_ENDPOINT.startsWith('<insert');

const ok = azureOk &&
  AZURE_OPENAI_SYSTEM_PROMPT != null && !AZURE_OPENAI_SYSTEM_PROMPT.startsWith('<insert');

if (!ok) {
  console.error(
    'To use Azure OpenAI, set the following environment variables:\n' +
    '\n  AZURE_OPENAI_SYSTEM_PROMPT' +
    '\n  AZURE_OPENAI_API_KEY' +
    '\n  AZURE_OPENAI_API_VERSION' +
    '\n  AZURE_OPENAI_CHAT_DEPLOYMENT' +
    '\n  AZURE_OPENAI_ENDPOINT'
  );
  console.error(
    '\nYou can easily do that using the Azure AI CLI by doing one of the following:\n' +
    '\n  ai init' +
    '\n  ai dev shell' +
    '\n  node main.js' +
    '\n' +
    '\n  or' +
    '\n' +
    '\n  ai init' +
    '\n  ai dev shell --run "node main.js"'
  );
  process.exit(1);
}
```

**STEP 4**: Create the OpenAI client.

``` javascript title="Main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});
```

**STEP 5**: Create the streaming chat completions helper.

``` javascript title="Main.js"
const chat = new OpenAIChatCompletionsClass(AZURE_OPENAI_CHAT_DEPLOYMENT, AZURE_OPENAI_SYSTEM_PROMPT, openai);
```

**STEP 6**: Get user input, use the helper class to get the assistant's response, and display responses as they are received.

``` javascript title="Main.js"
while (true) {
  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  const response = await chat.getResponse(input);
  process.stdout.write(`\nAssistant: ${response}\n\n`);
}
```

## OpenAIChatCompletionsClass.js

**STEP 1**: Create the client and initialize chat message history with a system message.

``` javascript title="OpenAIChatCompletionsClass.js"
constructor(openAIModelOrDeploymentName, systemPrompt, openai) {
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

**STEP 2**: When the user provides input, add the user message to the chat message history.

``` javascript title="OpenAIChatCompletionsClass.js"
async getResponse(userInput) {
  this.messages.push({ role: 'user', content: userInput });
```

**STEP 3**: Send the chat message history to the OpenAI Chat API and process each update.

``` javascript title="OpenAIChatCompletionsClass.js"
const completion = await this.openai.chat.completions.create({
  model: this.openAIModelOrDeploymentName,
  messages: this.messages,
});

const choice = completion.choices[0];
let content = choice.message?.content;
if (choice.finish_reason === 'length') {
  content = `${content}\nERROR: Exceeded token limit!`;
}
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update.

``` javascript title="OpenAIChatCompletionsClass.js"
this.messages.push({ role: 'assistant', content: content });
return content;
```
