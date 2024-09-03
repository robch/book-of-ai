```bash title="Generate sample code"
ai dev new phi3-onnx-chat-streaming --csharp
cd phi3-onnx-chat-streaming-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/Program.cs)  
    [:material-file-code: OnnxGenAIChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/OnnxGenAIChatCompletionsStreamingClass.cs)  
    [:material-file-code: get-phi3-mini-onnx.cmd](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/get-phi3-mini-onnx.cmd)  
    [:material-file-code: Phi3ChatStreaming.csproj](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/Phi3ChatStreaming.csproj)  

    [:material-file-document-outline: Deep dive on how it works](/onnx-chat/onnx-chat-streaming-cs/sample-overview.md)  

```bash title="Install dependencies"
dotnet restore
```

```bash title="Get models"
./get-phi3-mini-onnx.cmd
```

```bash title="Run the sample"
ai dev shell
dotnet run
```