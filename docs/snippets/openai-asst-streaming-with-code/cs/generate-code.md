```bash title="Generate sample code"
ai dev new openai-asst-streaming-with-code --csharp
cd openai-asst-streaming-with-code-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-code-cs/Program.cs)  
    [:material-file-code: OpenAIAssistantsCodeInterpreterStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-code-cs/OpenAIAssistantsCodeInterpreterStreamingClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-streaming-with-code-cs/sample-overview.md)  

```bash title="Install dependencies"
dotnet restore
```

```bash title="Run the sample"
ai dev shell
dotnet run
```
