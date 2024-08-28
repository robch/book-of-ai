---
hide:
- toc
---
# OpenAI Chat Completions with RAG + AI Search

=== "Overview"

    ### Initialize Azure AI Search resource

    ```bash title="Initialize Azure AI Search"
    ai init search
    ```
    Follow the prompts to select your Azure subscription and Azure AI Search resource.

    ### See the persisted config from `ai init search`

    ```bash title="Get search endpoint"
    ai config @search.endpoint
    ```
    ```bash title="Get search key"
    ai config @search.key
    ```

    ### Create or update your Azure AI Search index

    ```bash title="Create search index"
    ai search index create --name MyFiles --files *.md --blob-container https://...
    ```
    ```bash title="Update search index"
    ai search index update --name MyFiles --files *.md --blob-container https://...
    ```

    ### See the persisted config from `ai search index create/update`

    ```bash title="Get search index name"
    ai config @search.index.name
    ```

    ### Use the search index in chat completions

    ```bash title="Use search index in chat"
    ai chat --user "What is the capital of France?" --index MyFiles
    ```

=== "Sample Code"

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --csharp
        ai dev new list openai-chat-streaming-with-data --csharp
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --csharp
        cd openai-chat-streaming-with-data-cs
        ```

        ```bash title="Install dependencies"
        dotnet restore
        ```

        ```bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

    === "Go"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --go
        ai dev new list openai-chat-streaming-with-data --go
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --go
        cd openai-chat-streaming-with-data-go
        ```

        ```bash title="Install dependencies"
        go mod tidy
        ```

        ```bash title="Run the sample"
        ai dev shell
        go run main.go
        ```

    === "Java"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --java
        ai dev new list openai-chat-streaming-with-data --java
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --java
        cd openai-chat-streaming-with-data-java
        ```

        ```bash title="Restore packages"
        mvn clean package
        ```

        === "Windows"

            ```bash title="Build the sample"
            ai dev shell
            javac -cp "target/lib/*" src/OpenAIChatCompletionsWithDataStreamingClass.java src/Main.java -d out
            ```

            ```bash title="Run the sample"
            java -cp "out;target/lib/*" Main
            ```

        === "macOS"

            ```bash title="Build the sample"
            ai dev shell
            javac -cp "target/lib/*" src/OpenAIChatCompletionsWithDataStreamingClass.java src/Main.java -d out
            ```

            ```bash title="Run the sample"
            java -cp "out:target/lib/*" Main
            ```

        === "Linux"

            ```bash title="Build the sample"
            ai dev shell
            javac -cp "target/lib/*" src/OpenAIChatCompletionsWithDataStreamingClass.java src/Main.java -d out
            ```

            ```bash title="Run the sample"
            java -cp "out:target/lib/*" Main
            ```

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --javascript
        ai dev new list openai-chat-streaming-with-data --javascript
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --javascript
        cd openai-chat-streaming-with-data-js
        ```

        ```bash title="Install dependencies"
        npm install
        ```

        ```bash title="Run the sample"
        ai dev shell
        node Main.js
        ```

        ??? example "See the code; learn what it does..."

            [:material-file-code: Main.js](./samples/openai-chat-streaming-with-data-js/Main.js)  
            [:material-file-code: OpenAIChatCompletionsStreamingWithDataClass.js](./samples/openai-chat-streaming-with-data-js/OpenAIChatCompletionsStreamingWithDataClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-5-sample-overview-openai-chat-streaming-with-data-js.md)  

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --python
        ai dev new list openai-chat-streaming-with-data --python
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --python
        cd openai-chat-streaming-with-data-py
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

        ??? example "See the code; learn what it does..."

            [:material-file-code: main.py](./samples/openai-chat-streaming-with-data-py/main.py)  
            [:material-file-code: requirements.txt](./samples/openai-chat-streaming-with-data-py/requirements.txt)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-5-sample-overview-openai-chat-streaming-with-data-py.md)  

    === "..."

        **Go over what was generated in the console app**  
        
    
        
        

