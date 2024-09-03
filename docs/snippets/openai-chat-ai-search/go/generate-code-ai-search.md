Generate a Go sample that uses AI Search functionalities.

``` bash
aai dev new openai-chat-streaming-with-data --go
cd openai-chat-streaming-with-data-go
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-go/main.go)  
    [:material-file-code: openai_chat_completions_streaming_with_data_hello_world.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-go/openai_chat_completions_streaming_with_data_hello_world.go)

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-streaming-with-data-go/sample-overview.md)  

``` bash title="Install dependencies"
go mod tidy
```

``` bash title="Run the sample"
ai dev shell
go run main.go
```
