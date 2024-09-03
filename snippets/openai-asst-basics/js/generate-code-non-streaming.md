Generate a JavaScript sample that demonstrates how to use OpenAI Assistants without streaming.

``` bash
ai dev new openai-asst --javascript
cd openai-asst-js
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-js/main.js)  
    [:material-file-code: OpenAIAssistantsClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-js/OpenAIAssistantsClass.js)

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-non-streaming-js/sample-overview.md)  

``` bash title="Install dependencies"
npm install
```

``` bash title="Run the sample"
ai dev shell
node main.js
```