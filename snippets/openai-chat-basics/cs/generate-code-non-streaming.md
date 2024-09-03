Generate a C# sample that uses non-streaming completions.

``` bash
ai dev new openai-chat --csharp
cd openai-chat-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-cs/Program.cs)  
    [:material-file-code: OpenAIChatCompletionsClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-cs/OpenAIChatCompletionsClass.cs)

    [:material-file-document-outline: Deep dive on how it works](/openai-chat/openai-chat-non-streaming-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```
