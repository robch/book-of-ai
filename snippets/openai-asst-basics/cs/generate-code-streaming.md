Generate a C# sample that demonstrates how to use OpenAI Assistants with streaming.

``` bash
ai dev new openai-asst-streaming --csharp
cd openai-asst-streaming-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-cs/Program.cs)  
    [:material-file-code: OpenAIAssistantsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-cs/OpenAIAssistantsStreamingClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-streaming-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```