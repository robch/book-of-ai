Generate a JavaScript sample that demonstrates how to use OpenAI Assistants with streaming.

``` bash
ai dev new openai-asst-streaming --javascript
cd openai-asst-streaming-js
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-js/main.js)  
    [:material-file-code: OpenAIAssistantsStreamingClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-js/OpenAIAssistantsStreamingClass.js)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-streaming-js/sample-overview.md)  

``` bash title="Install dependencies"
npm install
```

``` bash title="Run the sample"
ai dev shell
node main.js
```