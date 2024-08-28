---
hide:
- navigation
- toc
---
# OpenAI Assistants with Code Interpreter Streaming in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants with a Code Interpreter in a JavaScript console application.

[:material-file-code: main.js](./samples/openai-asst-streaming-with-code-js/main.js)  
[:material-file-code: OpenAIAssistantsCodeInterpreterStreamingClass.js](./samples/openai-asst-streaming-with-code-js/OpenAIAssistantsCodeInterpreterStreamingClass.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-code --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-code' in 'openai-asst-streaming-with-code-js' (4 files)...

    OpenAIAssistantsCodeInterpreterStreamingClass.js
    ReadLineWrapper.js
    main.js
    package.json

    Generating 'openai-asst-streaming-with-code' in 'openai-asst-streaming-with-code-js' (4 files)... DONE!
    ```


## main.js

**STEP 1**: Read the configuration settings from environment variables:

``` javascript title="main.js"
const ASSISTANT_ID = process.env.ASSISTANT_ID ?? "<insert your OpenAI assistant ID here>";
const threadId = process.argv[2] || null;

const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai`;
```

**STEP 2**: Create the OpenAI client:

``` javascript title="main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});
```

**STEP 3**: Create the assistants streaming helper class instance:

``` javascript title="main.js"
const assistant = new OpenAIAssistantsCodeInterpreterStreamingClass(ASSISTANT_ID, openai);
```

**STEP 4**: Get or create the thread, and display the messages if any:

``` javascript title="main.js"
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

**STEP 5**: Loop until the user types 'exit', get user input and get the Assistant's response:

``` javascript title="main.js"
while (true) {

  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  process.stdout.write('\nAssistant: ');
  await assistant.getResponse(input, (content) => {
    process.stdout.write(content);
  });

  process.stdout.write('\n\n');
}
```

## OpenAIAssistantsCodeInterpreterStreamingClass.js

**STEP 1**: Create the client, initialize class variables and create or retrieve a thread:

``` javascript title="OpenAIAssistantsCodeInterpreterStreamingClass.js"
constructor(openAIAssistantId, openai, simulateTypingDelay = 0) {
  this.simulateTypingDelay = simulateTypingDelay;
  this.openAIAssistantId = openAIAssistantId;
  this.thread = null;
  this.openai = openai;
}

async createThread() {
  this.thread = await this.openai.beta.threads.create();
  return this.thread;
}

async retrieveThread(threadId) {
  this.thread = await this.openai.beta.threads.retrieve(threadId);
  return this.thread;
}
```

**STEP 2**: Get the messages in the thread:

``` javascript title="OpenAIAssistantsCodeInterpreterStreamingClass.js"
async getThreadMessages(callback) {

  const messages = await this.openai.beta.threads.messages.list(this.thread.id);
  messages.data.reverse();

  for (const message of messages.data) {
    let content = message.content.map(item => item.text.value).join('') + '\n\n';
    callback(message.role, content);
  }
}
```

**STEP 3**: Get the response from the Assistant:

``` javascript title="OpenAIAssistantsCodeInterpreterStreamingClass.js"
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
```

**STEP 4**: Handle the stream events:

``` javascript title="OpenAIAssistantsCodeInterpreterStreamingClass.js"
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
  stream.on('toolCallCreated', (toolCall) => {
    if (toolCall.type === 'code_interpreter') {
      process.stdout.write('\n\nassistant-code:\n');
    }
  });
  stream.on('toolCallDelta', (toolCallDelta, snapshot) => {
    if (toolCallDelta.type === 'code_interpreter') {
      if (toolCallDelta.code_interpreter.input) {
        process.stdout.write(toolCallDelta.code_interpreter.input);
      }
      if (toolCallDelta.code_interpreter.outputs) {
        process.stdout.write('\n\nassistant-output:');
        toolCallDelta.code_interpreter.outputs.forEach(output => {
          if (output.type === "logs") {
            process.stdout.write(`\n${output.logs}\n`);
          }
        });
      }
    }
  });
}
```

**STEP 5**: Process text deltas from the stream:

``` javascript title="OpenAIAssistantsCodeInterpreterStreamingClass.js"
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
