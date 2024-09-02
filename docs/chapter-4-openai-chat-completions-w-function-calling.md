---
hide:
- toc
---
# OpenAI Chat with Function Calling

??? question "Why use OpenAI Function Calling?"

    OpenAI Chat with Function Calling allows you to extend the capabilities of the Language Model (LLM) by adding custom functions that can be called from within the chat session. This enables you to perform a wide range of tasks, such as accessing the current date/time, performing mathematical calculations, reading/writing files, and more.

    By using custom functions, you can enhance the LLM's world knowledge and allow it to 'do stuff' that it wouldn't otherwise be able to do. This can be particularly useful when you need to interact with external systems or perform complex operations that are not natively supported by the LLM.
    
=== "Tutorial"

    The `ai chat` `--built-in-functions` option enables CLI-provided "custom functions".

    --8<-- "docs/tip-openai-prereqs.md"
    
    ### Access information

    Often, you need to access information that is not available to the OpenAI model. For example, you might want to know the current date and time, perform mathematical calculations, or read/write files. With custom functions provided by the CLI, you can easily access this information.

    ``` bash title="Date and time"
    ai chat --question "What time is it?" --built-in-functions
    ```

    ``` bash title="Math"
    ai chat --question "What is 3.5 to the power of 9?" --built-in-functions
    ```

    ``` bash title="File input"
    ai chat --question "What is in the README.md file?" --built-in-functions
    ```

    ### Perform actions

    ``` bash title="File output"
    ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
    ```

=== "Generate Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use OpenAI Chat with Function Calling.

    --8<-- "docs/tip-openai-prereqs.md"

    === "C#"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only C# samples"
        ai dev new list --csharp
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-functions --csharp
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --csharp
        cd openai-chat-streaming-with-functions-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-cs/Program.cs)  
            [:material-file-code: OpenAIChatCompletionsCustomFunctions.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsCustomFunctions.cs)  
            [:material-file-code: OpenAIChatCompletionsFunctionsStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsFunctionsStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-cs.md)  

        ``` bash title="Install dependencies"
        dotnet restore
        ```

        ``` bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

    === "Go"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only Go samples"
        ai dev new list --go
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-functions --go
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --go
        cd openai-chat-streaming-with-functions-go
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-go/main.go)  
            [:material-file-code: function_call_context.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-go/function_call_context.go)  
            [:material-file-code: function_factory.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-go/function_factory.go)  
            [:material-file-code: openai_chat_completions_custom_functions.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-go/openai_chat_completions_custom_functions.go)  
            [:material-file-code: openai_chat_completions_functions_streaming_hello_world.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-go/openai_chat_completions_functions_streaming_hello_world.go)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-go.md)

        ``` bash title="Install dependencies"
        go mod tidy
        ```

        ``` bash title="Run the sample"
        ai dev shell
        go run main.go
        ```

    === "Java"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only Java samples"
        ai dev new list --java
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-functions --java
        ```

        !!! warning "THE CLI does NOT currently generate Java samples for OpenAI Chat with Function Calling."

        !!! info "The OpenAI Java SDK does support OpenAI Function Calling"

    === "JavaScript"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-functions --javascript
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --javascript
        cd openai-chat-streaming-with-functions-js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Main.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-js/Main.js)  
            [:material-file-code: OpenAIChatCompletionsCustomFunctions.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-js/OpenAIChatCompletionsCustomFunctions.js)  
            [:material-file-code: OpenAIChatCompletionsFunctionsStreamingClass.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-js/OpenAIChatCompletionsFunctionsStreamingClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-js.md)  

        ``` bash title="Install dependencies"
        npm install
        ```

        ``` bash title="Run the sample"
        ai dev shell
        node Main.js
        ```

    === "Python"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only Python samples"
        ai dev new list --python
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-functions --python
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --python
        cd openai-chat-streaming-with-functions-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-py/main.py)  
            [:material-file-code: openai_chat_completions_custom_functions.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-py/openai_chat_completions_custom_functions.py)  
            [:material-file-code: openai_chat_completions_functions_streaming.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-with-functions-py/openai_chat_completions_functions_streaming.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-py.md)

        === "Windows"

            ``` bash title="Create virtual environment"
            python -m venv env
            env/Scripts/activate
            ```

            ``` bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ``` bash title="Run the sample"
            ai dev shell
            python main.py
            ```

        === "macOS"

            ``` bash title="Create virtual environment"
            python3 -m venv env
            source env/bin/activate
            ```

            ``` bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ``` bash title="Run the sample"
            ai dev shell
            python3 main.py
            ```

        === "Linux"

            ``` bash title="Create virtual environment"
            python3 -m venv env
            source env/bin/activate
            ```

            ``` bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ``` bash title="Run the sample"
            ai dev shell
            python3 main.py
            ```
