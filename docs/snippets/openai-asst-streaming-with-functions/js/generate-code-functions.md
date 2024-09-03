Generate sample code that demonstrates how to use OpenAI Assistants with Function Calling.

```bash title="Generate sample code"
ai dev new openai-asst-streaming-with-functions --javascript
cd openai-asst-streaming-with-functions-js
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-js/main.js)  
    [:material-file-code: OpenAIAssistantsCustomFunctions.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsCustomFunctions.js)  
    [:material-file-code: OpenAIAssistantsFunctionsStreamingClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsFunctionsStreamingClass.js)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-streaming-with-functions-js/sample-overview.md)  

```bash title="Install dependencies"
npm install
```

```bash title="Run the sample"
ai dev shell
node main.js
```
