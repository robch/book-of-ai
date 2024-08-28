---
hide:
- navigation
- toc
---
# ONNX Chat Completions with Functions in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use ONNX Chat Completions with function calling in a JavaScript application.

[:material-file-code: index.js](./samples/onnx-chat-completions-with-functions-js/index.js)  
[:material-file-code: onnxChatCompletions.js](./samples/onnx-chat-completions-with-functions-js/onnxChatCompletions.js)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new onnx-chat-completions-with-functions --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'onnx-chat-completions-with-functions' in 'onnx-chat-completions-with-functions-js' (3 files)...

    onnxChatCompletions.js
    index.js

    Generating 'onnx-chat-completions-with-functions' in 'onnx-chat-completions-with-functions-js' (2 files)... DONE!
    ```


## index.js

**STEP 1**: Import the required modules:

``` javascript title="index.js"
const { onnxChatCompletions } = require('./onnxChatCompletions');
```

**STEP 2**: Define the main function to handle user input and call the ONNX Chat Completions function:

``` javascript title="index.js"
async function main() {
    const userPrompt = "What is the weather like today?";
    const response = await onnxChatCompletions(userPrompt);
    console.log(`Assistant: ${response}`);
}
```

**STEP 3**: Call the main function:

``` javascript title="index.js"
main();
```

## onnxChatCompletions.js

**STEP 1**: Import the required modules and define the function to call the ONNX model:

``` javascript title="onnxChatCompletions.js"
const { OpenAIClient } = require('@azure/openai');

async function onnxChatCompletions(userPrompt) {
    const client = new OpenAIClient(process.env.OPENAI_ENDPOINT, new AzureKeyCredential(process.env.OPENAI_API_KEY));
    const deployment = client.getDeployment('onnx-chat-completions');
    const systemMessage = { role: 'system', content: 'You are a helpful assistant.' };
    const userMessage = { role: 'user', content: userPrompt };

    const response = await deployment.completeChat([systemMessage, userMessage], { functions: true });
    return response.choices[0].message.content;
}
```

**STEP 2**: Export the function:

``` javascript title="onnxChatCompletions.js"
module.exports = { onnxChatCompletions };
```