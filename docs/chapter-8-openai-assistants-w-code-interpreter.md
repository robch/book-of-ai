---
hide:
- toc
---

# OpenAI Assistants with Code Interpreter

=== "Tutorial"

    The `ai` CLI allows you to create, manage, and interact with OpenAI's Assistants, including use of Code Interpreter.
    --8<-- "docs/tip-openai-prereqs.md"

    ### Create or Update Assistant

    ```bash title="Create Assistant with Code Interpreter"
    ai chat assistant create --name MyCodeAssistant --code-interpreter
    ```

    ```bash title="Update Assistant with Code Interpreter"
    ai chat assistant update --code-interpreter
    ```

    ### Use Code Interpreter

    ```bash title="Interactive Chat with Code Interpreter"
    ai chat --interactive --question "how many e's are there in the pledge of allegiance?"
    ```

    ### Delete Assistant

    ```bash title="Delete Assistant"
    ai chat assistant delete
    ```

    ```bash title="Clear Assistant ID"
    ai config --clear assistant.id
    ```

=== "Generate Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use the Code Interpreter feature.

    --8<-- "docs/tip-openai-prereqs.md"

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only C# samples"
        ai dev new list --csharp
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst-streaming-with-code --csharp
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-code --csharp
        cd openai-asst-streaming-with-code-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-code-cs/Program.cs)  
            [:material-file-code: OpenAIAssistantsCodeInterpreterStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-code-cs/OpenAIAssistantsCodeInterpreterStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-8-sample-overview-openai-asst-streaming-with-code-cs.md)  

        ```bash title="Install dependencies"
        dotnet restore
        ```

        ```bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst-streaming-with-code --javascript
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-code --javascript
        cd openai-asst-streaming-with-code-js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-code-js/main.js)  
            [:material-file-code: OpenAIAssistantsCodeInterpreterStreamingClass.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-code-js/OpenAIAssistantsCodeInterpreterStreamingClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-8-sample-overview-openai-asst-streaming-with-code-js.md)  

        ```bash title="Install dependencies"
        npm install
        ```

        ```bash title="Run the sample"
        ai dev shell
        node main.js
        ```

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only Python samples"
        ai dev new list --python
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst-streaming-with-code --python
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-code --python
        cd openai-asst-streaming-with-code-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-code-py/main.py)  
            [:material-file-code: openai_assistants_code_interpreter_streaming.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-code-py/openai_assistants_code_interpreter_streaming.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-8-sample-overview-openai-asst-streaming-with-code-py.md)  

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
        
        - Similar to console apps generated in earlier chapters  
        - See how the LLM sends back info on the code created to the helper class  
        - See how the helper class processes those responses  
