``` bash
ai dev new sk-chat-streaming --csharp
cd sk-chat-streaming-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-streaming-cs/Program.cs)  
    [:material-file-code: SemanticKernelChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-streaming-cs/SemanticKernelChatCompletionsStreamingClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/sk-chat/sk-chat-streaming-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```