---
hide:
- navigation
- toc
---
# OpenAI Assistants with File Search in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with file search functionality in a JavaScript console application.

[:material-file-code: main.js](./samples/openai-asst-streaming-with-file-search-js/main.js)  
[:material-file-code: OpenAIAssistantsFileSearchStreamingClass.js](./samples/openai-asst-streaming-with-file-search-js/OpenAIAssistantsFileSearchStreamingClass.js)  
[:material-file-code: ReadLineWrapper.js](./samples/openai-asst-streaming-with-file-search-js/ReadLineWrapper.js)  

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

**STEP 1**: Get the required environment variables and validate them:

``` javascript title="main.js"
const ASSISTANT_ID = process.env.ASSISTANT_ID ?? "<insert your OpenAI assistant ID here>";
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai`;
```

**STEP 2**: Create the OpenAI client and the assistants streaming helper class instance:

``` javascript title="main.js"
const openai = new OpenAI({
    apiKey: AZURE_OPENAI_API_KEY,
    baseURL: AZURE_OPENAI_BASE_URL,
    defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
    defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
});

const assistant = new OpenAIAssistantsFileSearchStreamingClass(ASSISTANT_ID, openai);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

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

**STEP 1**: Create the client and initialize the constructor:

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
class OpenAIAssistantsFileSearchStreamingClass {
    constructor(openAIAssistantId, openai, simulateTypingDelay = 0) {
        this.simulateTypingDelay = simulateTypingDelay;
        this.openAIAssistantId = openAIAssistantId;
        this.thread = null;
        this.openai = openai;
    }
```

**STEP 2**: Create a new thread or retrieve an existing one:

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
async createThread() {
    this.thread = await this.openai.beta.threads.create();
    return this.thread;
}

async retrieveThread(threadId) {
    this.thread = await this.openai.beta.threads.retrieve(threadId);
    return this.thread;
}
```

**STEP 3**: Get messages in the thread and handle stream events:

``` javascript title="OpenAIAssistantsFileSearchStreamingClass.js"
async getThreadMessages(callback) {
    const messages = await this.openai.beta.threads.messages.list(this.thread.id);
    messages.data.reverse();

    for (const message of messages.data) {
        let content = message.content.map(item => item.text.value).join('') + '\n\n';
        callback(message.role, content);
    }
}

async handleStreamEvents(stream, callback) {
    stream.on('textDelta', async (textDelta, snapshot) => await this.onTextDelta(textDelta, callback));
}
```

**STEP 4**: Get the response from the assistant and process text deltas:

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

async onTextDelta(textDelta, callback) {
    let content = textDelta.value;
    if (content != null) {
        if(callback != null) {
            callback(content);
        }
    }
}
```

## ReadLineWrapper.js

**STEP 1**: Create the ReadLineWrapper class to handle user input:

``` javascript title="ReadLineWrapper.js"
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