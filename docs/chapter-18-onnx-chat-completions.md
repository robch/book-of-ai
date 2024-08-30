---
hide:
- toc
---
# ONNX Chat

=== "Overview"

    ### Prompts

    ```bash title="One prompt"
    ai chat --model-path @mp --user "What is the capital of France?"
    ```

    ```bash title="Interactive chat"
    ai chat --model-path @mp --interactive
    ```

    ```bash title="System prompts"
    ai chat --model-path @mp --interactive --system @prompt.txt
    ```

    ```bash title="User and system prompts"
    ai chat --model-path @mp --interactive --system @prompt.txt --user "Tell me a joke"
    ```

    ### Answers and chat history

    ```bash title="Output answer to a file"
    ai chat --model-path @mp --interactive --output-answer answer.txt
    ```

    ```bash title="Output chat history to a file"
    ai chat --model-path @mp --interactive --output-chat-history history.jsonl
    ```

    ```bash title="Input chat history"
    ai chat --model-path @mp --interactive --input-chat-history history.jsonl
    ```

=== "Sample Code"

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list onnx
        ```

        ```bash title="Filter the list by name"
        ai dev new list phi3-onnx-chat-streaming --csharp
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new phi3-onnx-chat-streaming --csharp
        cd phi3-onnx-chat-streaming-cs
        ```

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

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/phi3-onnx-chat-streaming-cs/Program.cs)  
            [:material-file-code: OnnxGenAIChatCompletionsStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/phi3-onnx-chat-streaming-cs/OnnxGenAIChatCompletionsStreamingClass.cs)  
            [:material-file-code: get-phi3-mini-onnx.cmd](https://github.dev/robch/book-of-ai/blob/main/docs/samples/phi3-onnx-chat-streaming-cs/get-phi3-mini-onnx.cmd)  
            [:material-file-code: Phi3ChatStreaming.csproj](https://github.dev/robch/book-of-ai/blob/main/docs/samples/phi3-onnx-chat-streaming-cs/Phi3ChatStreaming.csproj)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-18-sample-overview-phi3-onnx-chat-streaming-cs.md)  

    === "Go"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list by name"
        ai dev new list --go
        ai dev new list onnx --go
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "Java"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list by name"
        ai dev new list --java
        ai dev new list onnx --java
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list by name"
        ai dev new list --javascript
        ai dev new list onnx --javascript
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list by name"
        ai dev new list --python
        ai dev new list onnx --python
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "..."

        **Go over what was generated in the console app**  
        ◦ similar to console apps generated in earlier chapters  
        ◦ getting connection info/secrets from environment variables  
        ◦ using a helper class to encapsulate the ONNX API calls  
        ◦ getting input from the user  
        ◦ sending the input to the helper class  
        ◦ getting the response from the helper class  
        ◦ deeper dive into the helper class  
