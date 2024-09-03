``` bash title="Generate sample code"
ai dev new phi3-onnx-chat-streaming-with-functions --csharp
cd phi3-onnx-chat-streaming-with-functions-cs
```


??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-with-functions-cs/Program.cs)  
    [:material-file-code: ONNXChatCompletionsStreamingWithFunctions.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-with-functions-cs/ONNXChatCompletionsStreamingWithFunctions.cs)  

    [:material-file-document-outline: Deep dive on how it works](/onnx-chat/onnx-chat-streaming-with-functions-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```
