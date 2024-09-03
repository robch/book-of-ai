---
hide:
- navigation
- toc
---
# OpenAI Assistants Streaming in JavaScript

This sample demonstrates how to use the OpenAI Assistants API with streaming in a JavaScript application.

[:material-file-code: main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-js/main.js)  
[:material-file-code: OpenAIAssistantsStreamingClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-js/OpenAIAssistantsStreamingClass.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming' in 'openai-asst-streaming-js' (4 files)...

    main.js
    OpenAIAssistantsStreamingClass.js
    ReadLineWrapper.js
    package.json

    Generating 'openai-asst-streaming' in 'openai-asst-streaming-js' (4 files)... DONE!
    ```


## main.js

**STEP 1**: Read the configuration settings from environment variables and check if they are set:

```javascript title="main.js"
const ASSISTANT_ID = process.env.ASSISTANT_ID ?? "<insert your OpenAI assistant ID here>";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$", '')}/openai`;

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

**STEP 2**: Initialize the OpenAI client and the helper class with the configuration settings:

```javascript title="main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});

const assistant = new OpenAIAssistantsStreamingClass(ASSISTANT_ID, openai);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

```javascript title="main.js"
while (true) {
  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  process.stdout.write('\nAssistant: ');
  await assistant.getResponse(input, (content) => {
    process.stdout.write(content);
  });

  process.stdout.write('\n\n');
}

console.log(`Bye! (threadId: ${assistant.thread.id})`);
process.exit();
```

## OpenAIAssistantsStreamingClass.js

**STEP 1**: Create the client and initialize the assistant with necessary configurations:

```javascript title="OpenAIAssistantsStreamingClass.js"
constructor(openAIAssistantId, openai, simulateTypingDelay = 0) {
  this.simulateTypingDelay = simulateTypingDelay;
  this.openAIAssistantId = openAIAssistantId;
  this.thread = null;
  this.openai = openai;
}
```

**STEP 2**: Create or retrieve the thread, and display the messages if any:

```javascript title="OpenAIAssistantsStreamingClass.js"
async createThread() {
  this.thread = await this.openai.beta.threads.create();
  return this.thread;
}

async retrieveThread(threadId) {
  this.thread = await this.openai.beta.threads.retrieve(threadId);
  return this.thread;
}

async getThreadMessages(callback) {
  const messages = await this.openai.beta.threads.messages.list(this.thread.id);
  messages.data.reverse();
  for (const message of messages.data) {
    let content = message.content.map(item => item.text.value).join('') + '\n\n';
    callback(message.role, content);
  }
}
```

**STEP 3**: Send the user input to the assistant and handle the streaming response:

```javascript title="OpenAIAssistantsStreamingClass.js"
async getResponse(userInput, callback) {
  if (this.thread == null) {
    await this.createThread();
  }

  await this.openai.beta.threads.messages.create(this.thread.id, { role: "user", content: userInput });
  let stream = await this.openai.beta.threads.runs.stream(this.thread.id, {
    assistant_id: this.openAIAssistantId,
  });

  let runCompletedPromise = new Promise((resolve) => {
    this.resolveRunCompletedPromise = resolve;
  });

  await this.handleStreamEvents(stream, callback);
  await runCompletedPromise;
  runCompletedPromise = null;
}

async handleStreamEvents(stream, callback) {
  stream.on('textDelta', async (textDelta, snapshot) => await this.onTextDelta(textDelta, callback));
  stream.on('event', async (event) => {
    if (event.event == 'thread.run.completed') {
      this.resolveRunCompletedPromise();
    }
    else if (event.event == 'thread.run.failed') {
      console.log(JSON.stringify(event));
      throw new Error('Run failed');
    }
  });
}

async onTextDelta(textDelta, callback) {
  let content = textDelta.value;
  if (content != null) {
    if(callback != null) {
      callback(content);
      if (this.simulateTypingDelay > 0) {
        await new Promise(r => setTimeout(r, this.simulateTypingDelay));
      }
    }
  }
}
```