---
hide:
- toc
---
# OpenAI Assistants with File Search

=== "Overview"

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

=== "Sample Code"

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --csharp
        ai dev new list openai-asst-streaming-with-file-search --csharp
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-file-search --csharp
        cd openai-asst-streaming-with-file-search-cs
        ```

        ```bash title="Install dependencies"
        dotnet restore
        ```

        ```bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

        ??? example "See the code; learn what it does..."

            [:material-file-code: Program.cs](./samples/openai-asst-streaming-with-file-search-cs/Program.cs)  
            [:material-file-code: OpenAIAssistantsFileSearchStreamingClass.cs](./samples/openai-asst-streaming-with-file-search-cs/OpenAIAssistantsFileSearchStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-10-sample-overview-openai-asst-streaming-with-file-search-cs.md)  

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --javascript
        ai dev new list openai-asst-streaming-with-file-search --javascript
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-file-search --javascript
        cd openai-asst-streaming-with-file-search-js
        ```

        ```bash title="Install dependencies"
        npm install
        ```

        ```bash title="Run the sample"
        ai dev shell
        node main.js
        ```

        ??? example "See the code; learn what it does..."

            [:material-file-code: Main.js](./samples/openai-asst-streaming-with-file-search-js/main.js)  
            [:material-file-code: OpenAIAssistantsFileSearchStreamingClass.js](./samples/openai-asst-streaming-with-file-search-js/OpenAIAssistantsFileSearchStreamingClass.js)  
            [:material-file-code: ReadLineWrapper.js](./samples/openai-asst-streaming-with-file-search-js/ReadLineWrapper.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-10-sample-overview-openai-asst-streaming-with-file-search-js.md)  

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --python
        ai dev new list openai-asst-streaming-with-file-search --python
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-asst-streaming-with-file-search --python
        cd openai-asst-streaming-with-file-search-py
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

    === "..."

        **Go over what was generated in the console app**  
        ◦ builds on chapter 7's console app  
        ◦ see how the LLM sends back citations to the helper class  
        ◦ see how the helper class processes the citations  

