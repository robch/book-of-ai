Generate a Java sample that uses AI Search functionalities.

``` bash
aai dev new openai-chat-streaming-with-data --java
cd openai-chat-streaming-with-data-java
```

??? example "See the code; learn how it works..."

    [:material-file-code: Main.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-java/src/Main.java)  
    [:material-file-code: OpenAIChatCompletionsWithDataStreamingClass.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-java/src/OpenAIChatCompletionsWithDataStreamingClass.java)

    [:material-file-document-outline: Deep dive on how it works](/openai-chat/openai-chat-streaming-with-data-java/sample-overview.md)  

``` bash title="Restore packages"
mvn clean package
```

``` bash title="Build the sample"
ai dev shell
javac -cp "target/lib/*" src/OpenAIChatCompletionsWithDataStreamingClass.java src/Main.java -d out
```

``` bash title="Run the sample"
java -cp "out;target/lib/*" Main
```
