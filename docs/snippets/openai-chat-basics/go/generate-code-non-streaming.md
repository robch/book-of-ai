Generate a Go sample that uses non-streaming completions.

``` bash
ai dev new openai-chat --go
cd openai-chat-go
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-go/main.go)  
    [:material-file-code: openai_chat_completions_hello_world.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-go/openai_chat_completions_hello_world.go)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-go/sample-overview.md)  

``` bash title="Install dependencies"
go mod tidy
```

``` bash title="Run the sample"
go run main.go
```
