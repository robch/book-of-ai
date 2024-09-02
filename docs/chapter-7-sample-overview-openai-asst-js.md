---
hide:
- navigation
- toc
---
# OpenAI Assistants Basics in JavaScript

This sample demonstrates how to use the OpenAI Assistants API in a JavaScript console application.

[:material-file-code: main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-js/main.js)  
[:material-file-code: OpenAIAssistantsClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-js/OpenAIAssistantsClass.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst' in 'openai-asst-js' (4 files)...

    OpenAIAssistantsClass.js
    ReadLineWrapper.js
    main.js
    package.json

    Generating 'openai-asst' in 'openai-asst-js' (4 files)... DONE!
    ```

## main.js

**STEP 1**: Read the configuration settings from environment variables:

```javascript title="main.js"
const ASSISTANT_ID = process.env.ASSISTANT_ID ?? "<insert your OpenAI assistant ID here>";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$, '')}/openai`;
```

**STEP 2**: Check if the required environment variables are set:

```javascript title="main.js"
const azureOk = 
  AZURE_OPENAI_API_KEY != null && !AZURE_OPENAI_API_KEY.startsWith('<insert') &&
  AZURE_OPENAI_API_VERSION != null && !AZURE_OPENAI_API_VERSION.startsWith('<insert') &&
  AZURE_OPENAI_ENDPOINT != null && !AZURE_OPENAI_ENDPOINT.startsWith('<insert');

const ok = azureOk &&
  ASSISTANT_ID != null && !ASSISTANT_ID.startsWith('<insert');

if (!ok) {
  console.error(
    'To use Azure OpenAI, set the following environment variables:\n' +
    '\n  ASSISTANT_ID' +
    '\n  AZURE_OPENAI_API_KEY' +
    '\n  AZURE_OPENAI_API_VERSION' +
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

**STEP 3**: Initialize the OpenAI client and the helper class with the configuration settings:

```javascript title="main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});
const assistant = new OpenAIAssistantsClass(ASSISTANT_ID, openai);
```

**STEP 4**: Create or retrieve the thread and display the messages if any:

```javascript title="main.js"
const threadId = process.argv[2] || null;
if (threadId === null) {
  await assistant.createThread()
} else {
  await assistant.retrieveThread(threadId);
  await assistant.getThreadMessages((role, content) => {
    role = role.charAt(0).toUpperCase() + role.slice(1);
    process.stdout.write(`${role}: ${content}`);
  });
}
```

**STEP 5**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

```javascript title="main.js"
while (true) {
  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  let response = await assistant.getResponse(input);
  process.stdout.write(`\nAssistant: ${response}\n\n`);
}
```

## OpenAIAssistantsClass.js

**STEP 1**: Create the client and initialize the class with essential parameters:

```javascript title="OpenAIAssistantsClass.js"
constructor(openAIAssistantId, openai, simulateTypingDelay = 0) {
  this.simulateTypingDelay = simulateTypingDelay;
  this.openAIAssistantId = openAIAssistantId;
  this.thread = null;
  this.openai = openai;
}
```

**STEP 2**: Create a new thread:

```javascript title="OpenAIAssistantsClass.js"
async createThread() {
  this.thread = await this.openai.beta.threads.create();
  return this.thread;
}
```

**STEP 3**: Retrieve an existing thread:

```javascript title="OpenAIAssistantsClass.js"
async retrieveThread(threadId) {
  this.thread = await this.openai.beta.threads.retrieve(threadId);
  return this.thread;
}
```

**STEP 4**: Get the messages in the thread:

```javascript title="OpenAIAssistantsClass.js"
async getThreadMessages(callback) {
  const messages = await this.openai.beta.threads.messages.list(this.thread.id);
  messages.data.reverse();

  for (const message of messages.data) {
    let content = message.content.map(item => item.text.value).join('') + '\n\n';
    callback(message.role, content);
  }
}
```

**STEP 5**: When the user provides input, post the message on the thread and get the response:

```javascript title="OpenAIAssistantsClass.js"
async getResponse(userInput) {
  if (this.thread == null) {
    await this.createThread();
  }

  await this.openai.beta.threads.messages.create(this.thread.id, { role: "user", content: userInput });
  const run = await this.openai.beta.threads.runs.createAndPoll(this.thread.id, { assistant_id: this.openAIAssistantId });
  if (run.status === 'completed') {
    const messages = await this.openai.beta.threads.messages.list(run.thread_id);
    return messages.data[0].content.map(item => item.text.value).join('');
  }

  return run.status.toString();
}
```