---
hide:
- navigation
- toc
---
# OpenAI Assistants with File Search in JavaScript

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with file search functionality in a JavaScript console application.

[:material-file-code: main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-js/main.js)  
[:material-file-code: OpenAIAssistantsFileSearchStreamingClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-js/OpenAIAssistantsFileSearchStreamingClass.js)  
[:material-file-code: ReadLineWrapper.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-js/ReadLineWrapper.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-file-search --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-file-search' in 'openai-asst-streaming-with-file-search-js' (4 files)...

    main.js
    OpenAIAssistantsFileSearchStreamingClass.js
    package.json
    ReadLineWrapper.js

    Generating 'openai-asst-streaming-with-file-search' in 'openai-asst-streaming-with-file-search-js' (4 files)... DONE!
    ```


## main.js

**STEP 1**: Read the configuration settings from environment variables.

``` javascript title="main.js"
const ASSISTANT_ID = process.env.ASSISTANT_ID ?? "<insert your OpenAI assistant ID here>";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai`;
```

**STEP 2**: Create the OpenAI client and the assistants streaming helper class instance.

``` javascript title="main.js"
const openai = new OpenAI({
    apiKey: AZURE_OPENAI_API_KEY,
    baseURL: AZURE_OPENAI_BASE_URL,
    defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
    defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});

const assistant = new OpenAIAssistantsFileSearchStreamingClass(ASSISTANT_ID, openai);
```

**STEP 3**: Create or retrieve a thread and get thread messages if thread ID is provided.

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

**STEP 4**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

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

## OpenAIAssistantsFileSearchStreamingClass.js

**STEP 1**: Create the client and initialize chat message history with a system message.

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
class OpenAIAssistantsFileSearchStreamingClass {
    constructor(openAIAssistantId, openai, simulateTypingDelay = 0) {
        this.simulateTypingDelay = simulateTypingDelay;
        this.openAIAssistantId = openAIAssistantId;
        this.thread = null;
        this.openai = openai;
    }
```

**STEP 2**: When the user provides input, add the user message to the chat message history and process streaming responses.

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
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

**STEP 3**: Handle the stream events and accumulate the response.

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
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
    stream.on("messageDone", async (event) => {
      if (event.content[0].type === "text") {
        const { text } = event.content[0];
        const { annotations } = text;
        const citations = [];
  
        let index = 0;
        for (let annotation of annotations) {
          const { file_citation } = annotation;
          if (file_citation) {
            const citedFile = await this.openai.files.retrieve(file_citation.file_id);
            citations.push("[" + index + "] " + citedFile.filename);
          }
          index++;
        }
        if (citations.length > 0) {
          process.stdout.write(`\n\n${citations.join("\n")}\n`);
        }
      }
    });
}
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update.

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
async onTextDelta(textDelta, callback) {
    let content = textDelta.value;
    if (content != null) {
        if(callback != null) {
            if (textDelta.annotations) {
                for (let annotation of textDelta.annotations) {
                    content = content.replace(annotation.text, `[${annotation.index}]`);
                }
            }
            callback(content);
            if (this.simulateTypingDelay > 0) {
                await new Promise(r => setTimeout(r, this.simulateTypingDelay));
            }
        }
    }
}
```

**STEP 5**: Create and retrieve threads, and get thread messages.

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
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
