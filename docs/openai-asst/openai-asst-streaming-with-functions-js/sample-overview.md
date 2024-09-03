---
hide:
- navigation
- toc
---
# OpenAI Assistants with Function Calling in JavaScript

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with function calling in a JavaScript application.

[:material-file-code: main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-js/main.js)  
[:material-file-code: OpenAIAssistantsCustomFunctions.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsCustomFunctions.js)  
[:material-file-code: OpenAIAssistantsFunctionsStreamingClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsFunctionsStreamingClass.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-functions --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-functions' in 'openai-asst-streaming-with-functions-js' (3 files)...

    OpenAIAssistantsFunctionsStreamingClass.js
    OpenAIAssistantsCustomFunctions.js
    main.js

    Generating 'openai-asst-streaming-with-functions' in 'openai-asst-streaming-with-functions-js' (3 files)... DONE!
    ```


## main.js

**STEP 1**: Set up environment variables and create the OpenAI client:

``` javascript title="main.js"
const ASSISTANT_ID = process.env.ASSISTANT_ID ?? "<insert your OpenAI assistant ID here>";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$, '')}/openai`;

const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});
```

**STEP 2**: Initialize the assistant's streaming helper class:

``` javascript title="main.js"
const assistant = new OpenAIAssistantsFunctionsStreamingClass(ASSISTANT_ID, factory, openai);
```

**STEP 3**: Create or retrieve a thread and display its messages:

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

**STEP 4**: Loop to get user input and get the assistant's response:

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

## OpenAIAssistantsCustomFunctions.js

**STEP 1**: Define the function and its schema, then add it to the function factory:

``` javascript title="OpenAIAssistantsCustomFunctions.js"
function getCurrentWeather(function_arguments) {
  const location = JSON.parse(function_arguments).location;
  return `The weather in ${location} is 72 degrees and sunny.`;
};

const getCurrentWeatherSchema = {
  name: "get_current_weather",
  description: "Get the current weather in a given location",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The city and state, e.g. San Francisco, CA",
      },
      unit: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
      },
    },
    required: ["location"],
  },
};

factory.addFunction(getCurrentWeatherSchema, getCurrentWeather);
```

**STEP 2**: Add more functions following the same pattern:

``` javascript title="OpenAIAssistantsCustomFunctions.js"
function getCurrentDate() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const getCurrentDateSchema = {
  name: "get_current_date",
  description: "Get the current date",
  parameters: {
    type: "object",
    properties: {},
  },
};

factory.addFunction(getCurrentDateSchema, getCurrentDate);

function getCurrentTime() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const getCurrentTimeSchema = {
  name: "get_current_time",
  description: "Get the current time",
  parameters: {
    type: "object",
    properties: {},
  },
};

factory.addFunction(getCurrentTimeSchema, getCurrentTime);
```

## OpenAIAssistantsFunctionsStreamingClass.js

**STEP 1**: Create the constructor to initialize the class:

``` javascript title="OpenAIAssistantsFunctionsStreamingClass.js"
constructor(openAIAssistantId, functionFactory, openai, simulateTypingDelay = 0) {
  this.simulateTypingDelay = simulateTypingDelay;
  this.openAIAssistantId = openAIAssistantId;
  this.functionFactory = functionFactory;
  this.thread = null;
  this.openai = openai;
}
```

**STEP 2**: Implement methods to create/retrieve threads and get messages:

``` javascript title="OpenAIAssistantsFunctionsStreamingClass.js"
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

**STEP 3**: Implement the method to get the assistant's response:

``` javascript title="OpenAIAssistantsFunctionsStreamingClass.js"
async getResponse(userInput, callback) {
  if (this.thread == null) {
    await this.createThread();
  }
  await this.openai.beta.threads.messages.create(this.thread.id, { role: "user", content: userInput });
  let stream = await this.openai.beta.threads.runs.stream(this.thread.id, {
    assistant_id: this.openAIAssistantId,
    tools: this.functionFactory.getTools()
  });
  let runCompletedPromise = new Promise((resolve) => {
    this.resolveRunCompletedPromise = resolve;
  });
  await this.handleStreamEvents(stream, callback);
  await runCompletedPromise;
  runCompletedPromise = null;
}
```

**STEP 4**: Handle stream events and tool calls:

``` javascript title="OpenAIAssistantsFunctionsStreamingClass.js"
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
    else if (event.event == 'thread.run.requires_action') {
      await this.onThreadRunRequiresAction(event, callback);
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

async onThreadRunRequiresAction(event, callback) {
  let toolCalls = event.data?.required_action?.submit_tool_outputs?.tool_calls;
  if (toolCalls != null) {
    let tool_outputs = this.getToolOutputs(toolCalls);
    let stream = await this.openai.beta.threads.runs.submitToolOutputsStream(this.thread.id, event.data.id, { tool_outputs: tool_outputs})
    await this.handleStreamEvents(stream, callback);
  }
}

getToolOutputs(toolCalls) {
  let tool_outputs = [];
  for (let toolCall of toolCalls) {
    if (toolCall.type == 'function') {
      let result = this.functionFactory.tryCallFunction(toolCall.function?.name, toolCall.function?.arguments);
      tool_outputs.push({
        output: result,
        tool_call_id: toolCall.id
      });
    }
  }
  return tool_outputs;
}
```
