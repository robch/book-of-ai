---
hide:
- toc
---
# OpenAI Assistants with Function Calling

=== "Overview"

    The `ai` CLI allows you to extend OpenAI's models with custom functions (e.g. dates, times, math, filesystem).

    --8<-- "docs/tip-openai-prereqs.md"

    ### Create an Assistant

    ```bash title="Create an assistant"
    ai chat assistant create --name MyFunctionAssistant
    ```

    ### Use the Assistant with Built-in Function Calling

    ```bash title="Ask the assistant the current time"
    ai chat --user "What time is it?" --built-in-functions
    ```

    ```bash title="Calculate a power"
    ai chat --user "What is 3.5 to the power of 9?" --built-in-functions
    ```

    ```bash title="Read a file"
    ai chat --user "What is in the README.md file?" --built-in-functions
    ```

    ```bash title="Save content to a file"
    ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
    ```

    ### Delete the Assistant

    ```bash title="Delete the assistant"
    ai chat assistant delete
    ai config --clear assistant.id
    ```

=== "Sample Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use OpenAI Assistants with Function Calling.

    --8<-- "docs/tip-openai-prereqs.md"

    === "C#"

        ### List Samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only C# samples"
        ai dev new list --csharp
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst --csharp
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-functions --csharp
        cd openai-asst-streaming-with-functions-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-cs/Program.cs)  
            [:material-file-code: FunctionFactory.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-cs/FunctionFactory.cs)  
            [:material-file-code: HelperFunctionDescriptionAttribute.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-cs/HelperFunctionDescriptionAttribute.cs)  
            [:material-file-code: HelperFunctionParameterDescriptionAttribute.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-cs/HelperFunctionParameterDescriptionAttribute.cs)  
            [:material-file-code: OpenAIAssistantsCustomFunctions.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsCustomFunctions.cs)  
            [:material-file-code: OpenAIAssistantsFunctionsStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsFunctionsStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-9-sample-overview-openai-asst-streaming-with-functions-cs.md)  

        ```bash title="Install dependencies"
        dotnet restore
        ```

        ```bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

    === "JavaScript"

        ### List Samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst --javascript
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-functions --javascript
        cd openai-asst-streaming-with-functions-js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-js/main.js)  
            [:material-file-code: OpenAIAssistantsCustomFunctions.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsCustomFunctions.js)  
            [:material-file-code: OpenAIAssistantsFunctionsStreamingClass.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsFunctionsStreamingClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-9-sample-overview-openai-asst-streaming-with-functions-js.md)  

        ```bash title="Install dependencies"
        npm install
        ```

        ```bash title="Run the sample"
        ai dev shell
        node main.js
        ```

    === "Python"

        ### List Samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only Python samples"
        ai dev new list --python
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst --python
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-functions --python
        cd openai-asst-streaming-with-functions-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-py/main.py)  
            [:material-file-code: openai_assistants_custom_functions.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_custom_functions.py)  
            [:material-file-code: openai_assistants_functions_streaming.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_functions_streaming.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-9-sample-overview-openai-asst-streaming-with-functions-py.md)  

        === "Windows"

            ```bash title="Create virtual environment"
            python -m venv env
            env/Scripts/activate
            ```

            ```bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ```bash title="Run the sample"
            ai dev shell
            python main.py
            ```

        === "macOS"

            ```bash title="Create virtual environment"
            python3 -m venv env
            source env/bin/activate
            ```

            ```bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ```bash title="Run the sample"
            ai dev shell
            python3 main.py
            ```

        === "Linux"

            ```bash title="Create virtual environment"
            python3 -m venv env
            source env/bin/activate
            ```

            ```bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ```bash title="Run the sample"
            ai dev shell
            python3 main.py
            ```

    === "..."

        **Go over what was generated in the console app**
        
        - Builds on Chapter 7's console app.
        - See how functions are defined and given to the "function factory".
        - In the helper class, see how functions are given to the LLM.
        - See how the LLM streams back the function call requests.
        - See how the helper class processes the function call responses.