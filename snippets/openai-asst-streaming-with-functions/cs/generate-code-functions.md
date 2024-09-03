Generate sample code that demonstrates how to use OpenAI Assistants with Function Calling.

```bash title="Generate sample code"
ai dev new openai-asst-streaming-with-functions --csharp
cd openai-asst-streaming-with-functions-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/Program.cs)  
    [:material-file-code: FunctionFactory.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/FunctionFactory.cs)  
    [:material-file-code: HelperFunctionDescriptionAttribute.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/HelperFunctionDescriptionAttribute.cs)  
    [:material-file-code: HelperFunctionParameterDescriptionAttribute.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/HelperFunctionParameterDescriptionAttribute.cs)  
    [:material-file-code: OpenAIAssistantsCustomFunctions.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsCustomFunctions.cs)  
    [:material-file-code: OpenAIAssistantsFunctionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsFunctionsStreamingClass.cs)  

    [:material-file-document-outline:Deep dive on how it works](/openai-asst/openai-asst-streaming-with-functions-cs/sample-overview.md)  

```bash title="Install dependencies"
dotnet restore
```

```bash title="Run the sample"
ai dev shell
dotnet run
```
