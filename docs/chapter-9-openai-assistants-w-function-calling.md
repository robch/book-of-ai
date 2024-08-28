---
hide:
  - toc
---
# OpenAI Assistants with Function Calling

=== "Overview"

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

    === "C#"

        ### List Samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --csharp
        ai dev new list openai-asst --csharp
        ```

        ### Generate, Build, and Run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-functions --csharp
        cd openai-asst-streaming-with-functions-cs
        ```

        ```bash title="Install dependencies"
        dotnet restore
        ```

        ```bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/openai-asst-streaming-with-functions-cs/Program.cs)  
            [:material-file-code: FunctionFactory.cs](./samples/openai-asst-streaming-with-functions-cs/FunctionFactory.cs)  
            [:material-file-code: HelperFunctionDescriptionAttribute.cs](./samples/openai-asst-streaming-with-functions-cs/HelperFunctionDescriptionAttribute.cs)  
            [:material-file-code: HelperFunctionParameterDescriptionAttribute.cs](./samples/openai-asst-streaming-with-functions-cs/HelperFunctionParameterDescriptionAttribute.cs)  
            [:material-file-code: OpenAIAssistantsCustomFunctions.cs](./samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsCustomFunctions.cs)  
            [:material-file-code: OpenAIAssistantsFunctionsStreamingClass.cs](./samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsFunctionsStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-9-sample-overview-openai-asst-streaming-with-functions-cs.md)  

    === "JavaScript"

        ### List Samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --javascript
        ai dev new list openai-asst --javascript
        ```

        ### Generate, Build, and Run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-functions --javascript
        cd openai-asst-streaming-with-functions-js
        ```

        ```bash title="Install dependencies"
        npm install
        ```

        ```bash title="Run the sample"
        ai dev shell
        node main.js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.js](./samples/openai-asst-streaming-with-functions-js/main.js)  
            [:material-file-code: OpenAIAssistantsCustomFunctions.js](./samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsCustomFunctions.js)  
            [:material-file-code: OpenAIAssistantsFunctionsStreamingClass.js](./samples/openai-asst-streaming-with-functions-js/OpenAIAssistantsFunctionsStreamingClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-9-sample-overview-openai-asst-streaming-with-functions-js.md)  

    === "Python"

        ### List Samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --python
        ai dev new list openai-asst --python
        ```

        ### Generate, Build, and Run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-functions --python
        cd openai-asst-streaming-with-functions-py
        ```

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

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](./samples/openai-asst-streaming-with-functions-py/main.py)  
            [:material-file-code: openai_assistants_custom_functions.py](./samples/openai-asst-streaming-with-functions-py/openai_assistants_custom_functions.py)  
            [:material-file-code: openai_assistants_functions_streaming.py](./samples/openai-asst-streaming-with-functions-py/openai_assistants_functions_streaming.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-9-sample-overview-openai-asst-streaming-with-functions-py.md)  

    === "..."

        **Go over what was generated in the console app**
        
        - Builds on Chapter 7's console app.
        - See how functions are defined and given to the "function factory".
        - In the helper class, see how functions are given to the LLM.
        - See how the LLM streams back the function call requests.
        - See how the helper class processes the function call responses.