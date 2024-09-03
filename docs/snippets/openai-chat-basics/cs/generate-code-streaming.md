Generate a C# sample that uses streaming completions.

``` bash
ai dev new openai-chat-streaming --csharp
cd openai-chat-streaming-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-cs/Program.cs)  
    [:material-file-code: OpenAIChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-cs/OpenAIChatCompletionsStreamingClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-streaming-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```
