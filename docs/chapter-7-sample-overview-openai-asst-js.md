---
hide:
- navigation
- toc
---
# OpenAI Assistants Basics in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API in a JavaScript console application.

[:material-file-code: main.js](./samples/openai-asst-js/main.js)  
[:material-file-code: OpenAIAssistantsClass.js](./samples/openai-asst-js/OpenAIAssistantsClass.js)  

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

``` javascript title="main.js"
const ASSISTANT_ID = process.env.ASSISTANT_ID ?? "<insert your OpenAI assistant ID here>";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai`;
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` javascript title="main.js"
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY,
  baseURL: AZURE_OPENAI_BASE_URL,
  defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
  defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});
const assistant = new OpenAIAssistantsClass(ASSISTANT_ID, openai);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` javascript title="main.js"
while (true) {
  const input = await readline.question('User: ');
  if (input === 'exit' || input === '') break;

  let response = await assistant.getResponse(input);
  process.stdout.write(`\nAssistant: ${response}\n\n`);
}
```

## OpenAIAssistantsClass.js

**STEP 1**: Create the client and initialize chat message history with a system message:

``` javascript title="OpenAIAssistantsClass.js"
constructor(openAIAssistantId, openai, simulateTypingDelay = 0) {
  this.simulateTypingDelay = simulateTypingDelay;
  this.openAIAssistantId = openAIAssistantId;
  this.thread = null;
  this.openai = openai;
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` javascript title="OpenAIAssistantsClass.js"
await this.openai.beta.threads.messages.create(this.thread.id, { role: "user", content: userInput });
```

**STEP 3**: Send the chat message history to the streaming OpenAI Chat Completions API and process each update:

``` javascript title="OpenAIAssistantsClass.js"
const run = await this.openai.beta.threads.runs.createAndPoll(this.thread.id, { assistant_id: this.openAIAssistantId });
if (run.status === 'completed') {
  const messages = await this.openai.beta.threads.messages.list(run.thread_id)
  return messages.data[0].content.map(item => item.text.value).join('');
}
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update:

``` javascript title="OpenAIAssistantsClass.js"
return run.status.toString();
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response:

``` javascript title="OpenAIAssistantsClass.js"
exports.OpenAIAssistantsClass = OpenAIAssistantsClass;
```