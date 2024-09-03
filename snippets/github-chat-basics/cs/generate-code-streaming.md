``` bash title="Generate sample code"
ai dev new az-inference-chat-streaming --csharp
cd az-inference-chat-streaming-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-cs/Program.cs)  
    [:material-file-code: AzureAIInferencingChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-cs/AzureAIInferencingChatCompletionsStreamingClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/github-chat/github-chat-streaming-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```
