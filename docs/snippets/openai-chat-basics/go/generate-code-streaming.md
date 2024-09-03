Generate a Go sample that uses streaming completions.

``` bash
ai dev new openai-chat-streaming --go
cd openai-chat-streaming-go
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-go/main.go)  
    [:material-file-code: openai_chat_completions_streaming_hello_world.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-go/openai_chat_completions_streaming_hello_world.go)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-streaming-go/sample-overview.md)  

``` bash title="Install dependencies"
go mod tidy
```

``` bash title="Run the sample"
go run main.go
```
