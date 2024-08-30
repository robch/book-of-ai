---
hide:
- toc
---
# OpenAI Chat Completions with Function Calling

=== "Overview"

    The `ai` CLI allows you to extend OpenAI models w/ custom functions (e.g. dates, times, math, filesystem).

    --8<-- "docs/tip-openai-prereqs.md"
    
    ### Extending the LLM's world knowledge with functions

    ``` bash title="Get the current time"
    ai chat --user "What time is it?" --built-in-functions
    ```

    ``` bash title="Calculate power"
    ai chat --user "What is 3.5 to the power of 9?" --built-in-functions
    ```

    ``` bash title="Read a file's content"
    ai chat --user "What is in the README.md file?" --built-in-functions
    ```

    ### Allowing the LLM to 'do stuff'

    ``` bash title="Save text to a file"
    ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
    ```

=== "Sample Code"

    === "C#"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list"
        ai dev new list --csharp
        ai dev new list openai-chat-streaming-with-functions --csharp
        ```

        ### Generate, build, and run

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --csharp
        cd openai-chat-streaming-with-functions-cs
        ```

        ``` bash title="Install dependencies"
        dotnet restore
        ```

        ``` bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/openai-chat-streaming-with-functions-cs/Program.cs)  
            [:material-file-code: OpenAIChatCompletionsCustomFunctions.cs](./samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsCustomFunctions.cs)  
            [:material-file-code: OpenAIChatCompletionsFunctionsStreamingClass.cs](./samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsFunctionsStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-cs.md)  

    === "Go"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list"
        ai dev new list --go
        ai dev new list openai-chat-streaming-with-functions --go
        ```

        ### Generate, build, and run

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --go
        cd openai-chat-streaming-with-functions-go
        ```

        ``` bash title="Install dependencies"
        go mod tidy
        ```

        ``` bash title="Run the sample"
        ai dev shell
        go run main.go
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.go](./samples/openai-chat-streaming-with-functions-go/main.go)  
            [:material-file-code: function_call_context.go](./samples/openai-chat-streaming-with-functions-go/function_call_context.go)  
            [:material-file-code: function_factory.go](./samples/openai-chat-streaming-with-functions-go/function_factory.go)  
            [:material-file-code: openai_chat_completions_custom_functions.go](./samples/openai-chat-streaming-with-functions-go/openai_chat_completions_custom_functions.go)  
            [:material-file-code: openai_chat_completions_functions_streaming_hello_world.go](./samples/openai-chat-streaming-with-functions-go/openai_chat_completions_functions_streaming_hello_world.go)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-go.md)


    === "Java"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list"
        ai dev new list --java
        ai dev new list openai-chat-streaming-with-functions --java
        ```

        ### Generate, build, and run

        ... 🚧 UNDER CONSTRUCTION ...  

    === "JavaScript"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list"
        ai dev new list --javascript
        ai dev new list openai-chat-streaming-with-functions --javascript
        ```

        ### Generate, build, and run

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --javascript
        cd openai-chat-streaming-with-functions-js
        ```

        ``` bash title="Install dependencies"
        npm install
        ```

        ``` bash title="Run the sample"
        ai dev shell
        node Main.js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Main.js](./samples/openai-chat-streaming-with-functions-js/Main.js)  
            [:material-file-code: OpenAIChatCompletionsCustomFunctions.js](./samples/openai-chat-streaming-with-functions-js/OpenAIChatCompletionsCustomFunctions.js)  
            [:material-file-code: OpenAIChatCompletionsFunctionsStreamingClass.js](./samples/openai-chat-streaming-with-functions-js/OpenAIChatCompletionsFunctionsStreamingClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-js.md)  

    === "Python"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list"
        ai dev new list --python
        ai dev new list openai-chat-streaming-with-functions --python
        ```

        ### Generate, build, and run

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-functions --python
        cd openai-chat-streaming-with-functions-py
        ```

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

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](./samples/openai-chat-streaming-with-functions-py/main.py)  
            [:material-file-code: openai_chat_completions_custom_functions.py](./samples/openai-chat-streaming-with-functions-py/openai_chat_completions_custom_functions.py)  
            [:material-file-code: openai_chat_completions_functions_streaming.py](./samples/openai-chat-streaming-with-functions-py/openai_chat_completions_functions_streaming.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-4-sample-overview-openai-chat-streaming-with-functions-py.md)
