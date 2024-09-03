Generate a Java sample that uses non-streaming completions.

``` bash
ai dev new openai-chat --java
cd openai-chat-java
```

??? example "See the code; learn how it works..."

    [:material-file-code: Main.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-java/src/Main.java)  
    [:material-file-code: OpenAIChatCompletionsClass.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-java/src/OpenAIChatCompletionsClass.java)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-java/sample-overview.md)  

``` bash title="Restore packages"
mvn clean package
```

=== "Windows"

    ``` bash title="Build the sample"
    ai dev shell
    javac -cp "target/lib/*" src/OpenAIChatCompletionsClass.java src/Main.java -d out
    ```

    ``` bash title="Run the sample"
    java -cp "out;target/lib/*" Main
    ```

=== "macOS"

    ``` bash title="Build the sample"
    ai dev shell
    javac -cp "target/lib/*" src/OpenAIChatCompletionsClass.java src/Main.java -d out
    ```

    ``` bash title="Run the sample"
    java -cp "out:target/lib/*" Main
    ```

=== "Linux"

    ``` bash title="Build the sample"
    ai dev shell
    javac -cp "target/lib/*" src/OpenAIChatCompletionsClass.java src/Main.java -d out
    ```

    ``` bash title="Run the sample"
    java -cp "out:target/lib/*" Main
    ```
