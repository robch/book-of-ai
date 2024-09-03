Generate a C# sample that demonstrates how to use OpenAI Assistants without streaming.

``` bash
aid ev new openai-asst --csharp
cd openai-asst-csharp
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-cs/Program.cs)  
    [:material-file-code: OpenAIAssistantsClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-cs/OpenAIAssistantsClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-non-streaming-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```