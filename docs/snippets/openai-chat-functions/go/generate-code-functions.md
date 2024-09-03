```bash title="Generate sample code"
ai dev new openai-chat-streaming-with-functions --go
cd openai-chat-streaming-with-functions-go
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/main.go)  
    [:material-file-code: function_call_context.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/function_call_context.go)  
    [:material-file-code: function_factory.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/function_factory.go)  
    [:material-file-code: openai_chat_completions_custom_functions.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/openai_chat_completions_custom_functions.go)  
    [:material-file-code: openai_chat_completions_functions_streaming_hello_world.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/openai_chat_completions_functions_streaming_hello_world.go)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-functions-go/sample-overview.md)

```bash title="Install dependencies"
go mod tidy
```

```bash title="Run the sample"
ai dev shell
go run main.go
```
