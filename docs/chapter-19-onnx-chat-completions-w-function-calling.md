---
hide:
- toc
---
# ONNX Chat with Function Calling

=== "Tutorial"

    ### Extending the Phi-3's world knowledge with functions

    !!! warning "THE CLI does NOT currently work with ONNX/Phi-3"

    !!! info "The C# sample w/ functions DOES work with ONNX/Phi-3"

    ``` bash title="Without functions"
    ai chat --model-path @mp --user "What time is it?"
    ```

    ``` bash title="With built-in functions"
    ai chat --model-path @mp --user "What time is it?" --built-in-functions
    ```

    ``` bash title="File interaction without functions"
    ai chat --model-path @mp --user "What is in the README.md file?"
    ```

    ``` bash title="File interaction with built-in functions"
    ai chat --model-path @mp --user "What is in the README.md file?" --built-in-functions
    ```

    ### Allowing the LLM to interact with your code

    ``` bash title="Without functions"
    ai chat --model-path @mp --user "Save the pledge of allegiance to 'pledge.txt'"
    ```

    ``` bash title="With built-in functions"
    ai chat --model-path @mp --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
    ```

=== "Generate Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use ONNX with Phi-3 models and Function Calling.

    --8<-- "tips/tip-onnx-prereqs.md"

    === "C#"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list by name"
        ai dev new list --csharp
        ai dev new list phi3-onnx-chat --csharp
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new phi3-onnx-chat-streaming-with-functions --csharp
        cd phi3-onnx-chat-streaming-with-functions-cs
        ```

        ``` bash title="Install dependencies"
        dotnet restore
        ```

        ``` bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-with-functions-cs/Program.cs)  
            [:material-file-code: ONNXChatCompletionsStreamingWithFunctions.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-with-functions-cs/ONNXChatCompletionsStreamingWithFunctions.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-19-sample-overview-phi3-onnx-chat-streaming-with-functions-cs.md)  

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
