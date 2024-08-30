---
hide:
- navigation
- toc
---
# OpenAI Chat with Function Calling in JavaScript

This sample demonstrates how to use the OpenAI Chat API with function calling in a JavaScript application.

[:material-file-code: Main.js](./samples/openai-chat-streaming-with-functions-js/Main.js)  
[:material-file-code: OpenAIChatCompletionsCustomFunctions.js](./samples/openai-chat-streaming-with-functions-js/OpenAIChatCompletionsCustomFunctions.js)  
[:material-file-code: OpenAIChatCompletionsFunctionsStreamingClass.js](./samples/openai-chat-streaming-with-functions-js/OpenAIChatCompletionsFunctionsStreamingClass.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-functions --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-js' (7 files)...

    FunctionCallContext.js
    FunctionFactory.js
    Main.js
    OpenAIChatCompletionsCustomFunctions.js
    OpenAIChatCompletionsFunctionsStreamingClass.js
    package.json
    ReadLineWrapper.js

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-js' (7 files)... DONE!
    ```

## OpenAIChatCompletionsCustomFunctions.js

**STEP 1**: Define custom functions and their schemas:

``` javascript title="OpenAIChatCompletionsCustomFunctions.js"
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

## Main.js

**STEP 1**: Read the configuration settings from environment variables:

``` javascript title="Main.js"
const AZURE_OPENAI_SYSTEM_PROMPT = process.env.AZURE_OPENAI_SYSTEM_PROMPT ?? "You are a helpful AI assistant.";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_CHAT_DEPLOYMENT = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT ?? "<insert your Azure OpenAI chat deployment name here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$//, '')}/openai/deployments/${AZURE_OPENAI_CHAT_DEPLOYMENT}`;
```

**STEP 2**: Initialize the client and helper class with the configuration settings and the function factory:

``` javascript title="Main.js"
const openai = new OpenAI({
    apiKey: AZURE_OPENAI_API_KEY,
    baseURL: AZURE_OPENAI_BASE_URL,
    defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
    defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
  });

const chat = new OpenAIChatCompletionsFunctionsStreamingClass(AZURE_OPENAI_CHAT_DEPLOYMENT, AZURE_OPENAI_SYSTEM_PROMPT, factory, openai, 20);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` javascript title="Main.js"
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

## OpenAIChatCompletionsFunctionsStreamingClass.js

**STEP 1**: Initialize the chat message history with a system message:

``` javascript title="OpenAIChatCompletionsFunctionsStreamingClass.js"
constructor(openAIModelOrDeploymentName, systemPrompt, functionFactory, openai, simulateTypingDelay = 0) {
    this.simulateTypingDelay = simulateTypingDelay;
    this.systemPrompt = systemPrompt;
    this.openAIModelOrDeploymentName = openAIModelOrDeploymentName;
    this.openai = openai;
    this.functionFactory = functionFactory;

    this.clearConversation();
}

clearConversation() {
    this.messages = [
      { role: 'system', content: this.systemPrompt }
    ];
    this.functionCallContext = new FunctionCallContext(this.functionFactory, this.messages);
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` javascript title="OpenAIChatCompletionsFunctionsStreamingClass.js"
async getResponse(userInput, callback) {
  this.messages.push({ role: 'user', content: userInput });
```

**STEP 3**: Send the chat message history to the streaming API, processing each update, including checking for function calls:

``` javascript title="OpenAIChatCompletionsFunctionsStreamingClass.js"
  let response = '';
  while (true) {
    const events = await this.openai.chat.completions.create({
      model: this.openAIModelOrDeploymentName,
      messages: this.messages,
      functions: this.functionFactory.getFunctionSchemas(),
      stream: true
    });

    for await (const event of events) {
      for (const choice of event.choices) {
        this.functionCallContext.checkForUpdate(choice);
        let content = choice.delta?.content;
        if (choice.finish_reason === 'length') {
          content = `${content}\nERROR: Exceeded token limit!`;
        }
```

**STEP 4**: For each non-empty update, invoke the callback for the update, and accumulate the response

``` javascript title="OpenAIChatCompletionsFunctionsStreamingClass.js"
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

**STEP 5**: Check if the response contained function calls, and process them:

``` javascript title="OpenAIChatCompletionsFunctionsStreamingClass.js"
    if (this.functionCallContext.tryCallFunction() !== undefined) {
      this.functionCallContext.clear();
      continue;
    }
```

**STEP 6**: Finally, add the assistant's response to the chat message history, and return the response:

``` javascript title="OpenAIChatCompletionsFunctionsStreamingClass.js"
    this.messages.push({ role: 'assistant', content: response });
    return response;
  }
}

```