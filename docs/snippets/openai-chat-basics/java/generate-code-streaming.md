Generate a Java sample that uses streaming completions.

``` bash
ai dev new openai-chat-streaming --java
cd openai-chat-streaming-java
```

??? example "See the code; learn how it works..."

    [:material-file-code: Main.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-java/src/Main.java)  
    [:material-file-code: OpenAIChatCompletionsStreamingClass.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-java/src/OpenAIChatCompletionsStreamingClass.java)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-streaming-java/sample-overview.md)  

``` bash title="Restore packages"
mvn clean package
```

=== "Windows"

    ``` bash title="Build the sample"
    ai dev shell
    javac -cp "target/lib/*" src/OpenAIChatCompletionsStreamingClass.java src/Main.java -d out
    ```

    ``` bash title="Run the sample"
    java -cp "out;target/lib/*" Main
    ```

=== "macOS"

    ``` bash title="Build the sample"
    ai dev shell
    javac -cp "target/lib/*" src/OpenAIChatCompletionsStreamingClass.java src/Main.java -d out
    ```

    ``` bash title="Run the sample"
    java -cp "out:target/lib/*" Main
    ```

=== "Linux"

    ``` bash title="Build the sample"
    ai dev shell
    javac -cp "target/lib/*" src/OpenAIChatCompletionsStreamingClass.java src/Main.java -d out
    ```

    ``` bash title="Run the sample"
    java -cp "out:target/lib/*" Main
    ```
