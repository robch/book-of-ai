---
hide:
- toc
---
# OpenAI Assistants Basics

=== "Overview"

    The `ai` CLI allows you to create, manage, and interact with OpenAI's Assistants and persisted threads.

    --8<-- "docs/tip-openai-prereqs.md"

    ### Create an Assistant

    ```bash title="Create a simple assistant"
    ai chat assistant create --name MyAssistant
    ```

    ### Threads

    ```bash title="Start an interactive chat"
    ai chat --interactive
    ```

    ```bash title="Continue with a previous thread"
    ai chat --interactive --thread-id ID
    ```

    ```bash title="Ask a question and save the thread ID"
    ai chat --question "..." --output-thread-id myNewThread.txt
    ```

    ```bash title="Use a saved thread ID"
    ai chat --question "..." --thread-id @myNewThread.txt
    ```

    ```bash title="Interactive chat with thread ID and save history"
    ai chat --interactive --thread-id @myNewThread.txt --output-chat-history history.jsonl
    ```

=== "Sample Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use OpenAI Assistants.

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
        ai dev new list openai-asst --csharp
        ai dev new list openai-asst-streaming --csharp
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a C# sample that demonstrates how to use OpenAI Assistants with streaming.

            ``` bash
            ai dev new openai-asst-streaming --csharp
            cd openai-asst-streaming-cs
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-cs/Program.cs)  
                [:material-file-code: OpenAIAssistantsStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-cs/OpenAIAssistantsStreamingClass.cs)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-7-sample-overview-openai-asst-streaming-cs.md)  

            ``` bash title="Install dependencies"
            dotnet restore
            ```

            ``` bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

        === "Non-streaming"

            Generate a C# sample that demonstrates how to use OpenAI Assistants without streaming.

            ``` bash
            ai dev new openai-asst --csharp
            cd openai-asst-cs
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-cs/Program.cs)  
                [:material-file-code: OpenAIAssistantsClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-cs/OpenAIAssistantsClass.cs)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-7-sample-overview-openai-asst-cs.md)  

            ``` bash title="Install dependencies"
            dotnet restore
            ```

            ``` bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

    === "JavaScript"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-asst --javascript
        ai dev new list openai-asst-streaming --javascript
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a JavaScript sample that demonstrates how to use OpenAI Assistants with streaming.

            ``` bash
            ai dev new openai-asst-streaming --javascript
            cd openai-asst-streaming-js
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-js/main.js)  
                [:material-file-code: OpenAIAssistantsStreamingClass.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-js/OpenAIAssistantsStreamingClass.js)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-7-sample-overview-openai-asst-streaming-js.md)  

            ``` bash title="Install dependencies"
            npm install
            ```

            ``` bash title="Run the sample"
            ai dev shell
            node main.js
            ```

        === "Non-streaming"

            Generate a JavaScript sample that demonstrates how to use OpenAI Assistants without streaming.

            ``` bash
            ai dev new openai-asst --javascript
            cd openai-asst-js
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-js/main.js)  
                [:material-file-code: OpenAIAssistantsClass.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-js/OpenAIAssistantsClass.js)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-7-sample-overview-openai-asst-js.md)  

            ``` bash title="Install dependencies"
            npm install
            ```

            ``` bash title="Run the sample"
            ai dev shell
            node main.js
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
        ai dev new list openai-asst --python
        ai dev new list openai-asst-streaming --python
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a Python sample that demonstrates how to use OpenAI Assistants with streaming.

            ``` bash
            ai dev new openai-asst-streaming --python
            cd openai-asst-streaming-py
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-py/main.py)  
                [:material-file-code: openai_assistants_streaming.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-py/openai_assistants_streaming.py)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-7-sample-overview-openai-asst-streaming-py.md)  

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

        === "Non-streaming"

            Generate a Python sample that demonstrates how to use OpenAI Assistants without streaming.

            ``` bash
            ai dev new openai-asst --python
            cd openai-asst-py
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-py/main.py)  
                [:material-file-code: openai_assistants.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-py/openai_assistants.py)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-7-sample-overview-openai-asst-py.md)  

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

    === "..."

        **Go over what was generated in the console app**  
        
        - similar to console apps generated in earlier chapters  
        - see how the LLM sends back citations to the helper class  
        - see how the helper class processes the citations  

        ### Delete the Assistant

        ``` bash title="Delete the assistant"
        ai chat assistant delete
        ```

        ``` bash title="Clear assistant configuration"
        ai config --clear assistant.id
        ```