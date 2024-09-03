```bash title="Generate sample code"
ai dev new openai-chat-streaming-with-functions --csharp
cd openai-chat-streaming-with-functions-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-cs/Program.cs)  
    [:material-file-code: OpenAIChatCompletionsCustomFunctions.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsCustomFunctions.cs)  
    [:material-file-code: OpenAIChatCompletionsFunctionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsFunctionsStreamingClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat/openai-chat-functions-cs/sample-overview.md)  

```bash title="Install dependencies"
dotnet restore
```

```bash title="Run the sample"
ai dev shell
dotnet run
```
