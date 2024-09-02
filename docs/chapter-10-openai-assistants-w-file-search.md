---
hide:
- toc
---
# OpenAI Assistants with File Search

=== "Tutorial"

    The `ai` CLI allows you to extend OpenAI's models with custom data sources using File Search.

    --8<-- "tips/tip-openai-prereqs.md"
    
    ### Create or Update Assistant

    ```bash title="Create assistant with file search"
    ai chat assistant create --name MyFileAssistant --files "**/*.md"
    ```

    ```bash title="Update assistant's file search"
    ai chat assistant update --files "**/*.txt"
    ```

    ### See Vector Store and persisted config

    ```bash title="List vector stores"
    ai chat assistant vector-store list
    ```

    ```bash title="Get vector store"
    ai chat assistant vector-store get
    ```

    ```bash title="See persisted config"
    ai config @assistant.id
    ai config @vector.store.id
    ```

    ### Update Vector Store directly

    ```bash title="Update vector store with one file"
    ai chat assistant vector-store update --file README.md
    ```

    ```bash title="Update vector store with many files"
    ai chat assistant vector-store update --files "**/*.txt"
    ```

    ### Use File Search

    ```bash title="Query with file search"
    ai chat --user "Find information on markdown files."
    ```

    ```bash title="Interactive query with file search"
    ai chat --user "Search for details on the latest updates." --interactive
    ```

    ### Delete the Assistant/Vector Store

    ```bash title="Delete the assistant"
    ai chat assistant delete
    ai config --clear assistant.id
    ```

    ```bash title="Delete the vector store"
    ai chat assistant vector-store delete
    ai config --clear vector.store.id
    ```

=== "Generate Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use OpenAI Assistants with File Search.

    --8<-- "tips/tip-openai-prereqs.md"

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only C# samples"
        ai dev new list --csharp
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst-streaming-with-file-search --csharp
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-file-search --csharp
        cd openai-asst-streaming-with-file-search-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-cs/Program.cs)  
            [:material-file-code: OpenAIAssistantsFileSearchStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-cs/OpenAIAssistantsFileSearchStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-10-sample-overview-openai-asst-streaming-with-file-search-cs.md)  

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
        ai dev new list openai-asst-streaming-with-file-search --javascript
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-file-search --javascript
        cd openai-asst-streaming-with-file-search-js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-js/main.js)  
            [:material-file-code: OpenAIAssistantsFileSearchStreamingClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-js/OpenAIAssistantsFileSearchStreamingClass.js)  
            [:material-file-code: ReadLineWrapper.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-js/ReadLineWrapper.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-10-sample-overview-openai-asst-streaming-with-file-search-js.md)  


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

        ```bash title="Filter the list by name"
        ai dev new list --python
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-asst-streaming-with-file-search --python
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-file-search --python
        cd openai-asst-streaming-with-file-search-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-py/main.py)  
            [:material-file-code: openai_assistants_file_search_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-py/openai_assistants_file_search_streaming.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-10-sample-overview-openai-asst-w-file-search-py.md)  

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
        
        - builds on chapter 7's console app  
        - see how the LLM sends back citations to the helper class  
        - see how the helper class processes the citations