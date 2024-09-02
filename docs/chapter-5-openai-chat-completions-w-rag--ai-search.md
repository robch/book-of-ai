---
hide:
- toc
---
# OpenAI Chat with RAG + AI Search

=== "Tutorial"

    The `ai` CLI allows you to extend OpenAI's models with custom data sources using Azure AI Search.

    --8<-- "docs/tip-openai-prereqs.md"

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

=== "Generate Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use OpenAI's chat completions with AI Search.

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
        ai dev new list openai-chat-streaming-with-data --csharp
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --csharp
        cd openai-chat-streaming-with-data-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-cs/Program.cs)  
            [:material-file-code: OpenAIChatCompletionsWithDataStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-cs/OpenAIChatCompletionsWithDataStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-5-sample-overview-openai-chat-streaming-with-data-cs.md)  

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

        ```bash title="List only Go samples"
        ai dev new list --go
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-data --go
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --go
        cd openai-chat-streaming-with-data-go
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-go/main.go)  
            [:material-file-code: openai_chat_completions_streaming_with_data_hello_world.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-go/openai_chat_completions_streaming_with_data_hello_world.go)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-5-sample-overview-openai-chat-streaming-with-data-go.md)  

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

        ```bash title="List only Java samples"
        ai dev new list --java
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-data --java
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --java
        cd openai-chat-streaming-with-data-java
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Main.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-java/src/Main.java)  
            [:material-file-code: OpenAIChatCompletionsWithDataStreamingClass.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-java/src/OpenAIChatCompletionsWithDataStreamingClass.java)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-5-sample-overview-openai-chat-streaming-with-data-java.md)  

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

        ```bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ```bash title="Filter the list by name"
        ai dev new list openai-chat-streaming-with-data --javascript
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --javascript
        cd openai-chat-streaming-with-data-js
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Main.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-js/Main.js)  
            [:material-file-code: OpenAIChatCompletionsStreamingWithDataClass.js](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-js/OpenAIChatCompletionsStreamingWithDataClass.js)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-5-sample-overview-openai-chat-streaming-with-data-js.md)  

        ```bash title="Install dependencies"
        npm install
        ```

        ```bash title="Run the sample"
        ai dev shell
        node Main.js
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
        ai dev new list openai-chat-streaming-with-data --python
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new openai-chat-streaming-with-data --python
        cd openai-chat-streaming-with-data-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-py/main.py)  
            [:material-file-code: requirements.txt](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-py/requirements.txt)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-5-sample-overview-openai-chat-streaming-with-data-py.md)  

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
