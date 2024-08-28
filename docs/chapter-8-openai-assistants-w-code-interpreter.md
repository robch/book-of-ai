---
hide:
  - toc
---
# OpenAI Assistants with Code Interpreter

=== "Overview"

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

=== "Sample Code"

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --csharp
        ai dev new list openai-asst-streaming-with-code --csharp
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-code --csharp
        cd openai-asst-streaming-with-code-cs
        ```

        ```bash title="Install dependencies"
        dotnet restore
        ```

        ```bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/openai-asst-streaming-with-code-cs/Program.cs)  
            [:material-file-code: OpenAIAssistantsCodeInterpreterStreamingClass.cs](./samples/openai-asst-streaming-with-code-cs/OpenAIAssistantsCodeInterpreterStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-8-sample-overview-openai-asst-streaming-with-code-cs.md)  

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --javascript
        ai dev new list openai-asst-streaming-with-code --javascript
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-code --javascript
        cd openai-asst-streaming-with-code-js
        ```

        ```bash title="Install dependencies"
        npm install
        ```

        ```bash title="Run the sample"
        ai dev shell
        node main.js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.js](./samples/openai-asst-streaming-with-code-js/main.js)  
            [:material-file-code: OpenAIAssistantsCodeInterpreterStreamingClass.js](./samples/openai-asst-streaming-with-code-js/OpenAIAssistantsCodeInterpreterStreamingClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-8-sample-overview-openai-asst-streaming-with-code-js.md)  

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --python
        ai dev new list openai-asst-streaming-with-code --python
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-code --python
        cd openai-asst-streaming-with-code-py
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

            [:material-file-code: main.py](./samples/openai-asst-streaming-with-code-py/main.py)  
            [:material-file-code: openai_assistants_code_interpreter_streaming.py](./samples/openai-asst-streaming-with-code-py/openai_assistants_code_interpreter_streaming.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-8-sample-overview-openai-asst-streaming-with-code-py.md)  

    === "..."

        **Go over what was generated in the console app**  
        
        - Similar to console apps generated in earlier chapters  
        - See how the LLM sends back info on the code created to the helper class  
        - See how the helper class processes those responses  

