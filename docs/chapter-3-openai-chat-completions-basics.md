---
hide:
- toc
---
# OpenAI Chat Basics

=== "Tutorial"

    The `ai chat` command allows you to interact w/ OpenAI models from the command line.  

    --8<-- "docs/tip-openai-prereqs.md"

    ### User and System Prompts

    The `ai chat` command sends a user prompt to OpenAI and displays the response.

    ``` bash title="User prompts are questions or statements to the model"
    ai chat --user "What is the capital of France?"
    ```

    ``` bash title="System prompts are special instructions for the model"
    ai chat --user "What is the capital of France." --system "Always answer in French."
    ```

    ``` bash title="--question is an alias for --user"
    ai chat --question "What is the capital of France?"
    ```

    ### User and System prompts from Files

    ``` bash title="User prompt from a file"
    ai chat --question "@question.txt"
    ```

    ``` bash title="System prompt from a file"
    ai chat --question "What is the capital of France?" --system "@system.txt"
    ```

    ### Interactive Chat

    The `--interactive` flag allows back-and-forth conversations with the model.

    ``` bash title="Interactive chat"
    ai chat --interactive
    ```

    ``` bash title="Interactive with an initial question"
    ai chat --interactive --question "What is the capital of France?"
    ```

    ``` bash title="Interactive with a system prompt"
    ai chat --interactive --system "Always answer in French."
    ```

    ### Answers and chat history

    ``` bash title="Output answer to a file"
    ai chat --question "What is the capital of France?" --output-answer answer.txt
    ```

    ``` bash title="Output chat history to a file"
    ai chat --interactive --output-chat-history history.jsonl
    ```

    ``` bash title="Input chat history from a file"
    ai chat --interactive --input-chat-history history.jsonl
    ```

=== "Generate Code"

    The `ai dev new` command allows you to generate sample code for your projects.  

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
        ai dev new list openai-chat --csharp
        ai dev new list openai-chat-streaming --csharp
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a C# sample that uses streaming completions.

            ``` bash
            ai dev new openai-chat-streaming --csharp
            cd openai-chat-streaming-cs
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-cs/Program.cs)  
                [:material-file-code: OpenAIChatCompletionsStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-cs/OpenAIChatCompletionsStreamingClass.cs)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-streaming-cs.md)  

            ``` bash title="Install dependencies"
            dotnet restore
            ```

            ``` bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

        === "Non-streaming"

            Generate a C# sample that uses non-streaming completions.

            ``` bash
            ai dev new openai-chat --csharp
            cd openai-chat-cs
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-cs/Program.cs)  
                [:material-file-code: OpenAIChatCompletionsClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-cs/OpenAIChatCompletionsClass.cs)

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-cs.md)  

            ``` bash title="Install dependencies"
            dotnet restore
            ```

            ``` bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

    === "Go"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only Go samples"
        ai dev new list --go
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-chat --go
        ai dev new list openai-chat-streaming --go
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a Go sample that uses streaming completions.

            ``` bash
            ai dev new openai-chat-streaming --go
            cd openai-chat-streaming-go
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-go/main.go)  
                [:material-file-code: openai_chat_completions_streaming_hello_world.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-go/openai_chat_completions_streaming_hello_world.go)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-streaming-go.md)  

            ``` bash title="Install dependencies"
            go mod tidy
            ```

            ``` bash title="Run the sample"
            go run main.go
            ```

        === "Non-streaming"

            Generate a Go sample that uses non-streaming completions.

            ``` bash
            ai dev new openai-chat --go
            cd openai-chat-go
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-go/main.go)  
                [:material-file-code: openai_chat_completions_hello_world.go](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-go/openai_chat_completions_hello_world.go)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-go.md)  

            ``` bash title="Install dependencies"
            go mod tidy
            ```

            ``` bash title="Run the sample"
            go run main.go
            ```

    === "Java"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only Java samples"
        ai dev new list --java
        ```

        ``` bash title="Filter the list by name"
        ai dev new list openai-chat --java
        ai dev new list openai-chat-streaming --java
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a Java sample that uses streaming completions.

            ``` bash
            ai dev new openai-chat-streaming --java
            cd openai-chat-streaming-java
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Main.java](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-java/src/Main.java)  
                [:material-file-code: OpenAIChatCompletionsStreamingClass.java](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-java/src/OpenAIChatCompletionsStreamingClass.java)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-streaming-java.md)  

            ``` bash title="Restore packages"
            mvn clean package
            ```

            === "Windows"

                ``` bash title="Build the sample"
                ai dev shell
                javac -cp "target/lib/*" src/OpenAIChatCompletionsStreamingClass.java src/Main.java -d out
                ```

                ``` bash title="Run the sample"
                java -cp "out;target/lib/*" Main
                ```

            === "macOS"

                ``` bash title="Build the sample"
                ai dev shell
                javac -cp "target/lib/*" src/OpenAIChatCompletionsStreamingClass.java src/Main.java -d out
                ```

                ``` bash title="Run the sample"
                java -cp "out:target/lib/*" Main
                ```

            === "Linux"

                ``` bash title="Build the sample"
                ai dev shell
                javac -cp "target/lib/*" src/OpenAIChatCompletionsStreamingClass.java src/Main.java -d out
                ```

                ``` bash title="Run the sample"
                java -cp "out:target/lib/*" Main
                ```

        === "Non-streaming"

            Generate a Java sample that uses non-streaming completions.

            ``` bash
            ai dev new openai-chat --java
            cd openai-chat-java
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Main.java](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-java/src/Main.java)  
                [:material-file-code: OpenAIChatCompletionsClass.java](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-java/src/OpenAIChatCompletionsClass.java)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-java.md)  

            ``` bash title="Restore packages"
            mvn clean package
            ```

            === "Windows"

                ``` bash title="Build the sample"
                ai dev shell
                javac -cp "target/lib/*" src/OpenAIChatCompletionsClass.java src/Main.java -d out
                ```

                ``` bash title="Run the sample"
                java -cp "out;target/lib/*" Main
                ```

            === "macOS"

                ``` bash title="Build the sample"
                ai dev shell
                javac -cp "target/lib/*" src/OpenAIChatCompletionsClass.java src/Main.java -d out
                ```

                ``` bash title="Run the sample"
                java -cp "out:target/lib/*" Main
                ```

            === "Linux"

                ``` bash title="Build the sample"
                ai dev shell
                javac -cp "target/lib/*" src/OpenAIChatCompletionsClass.java src/Main.java -d out
                ```

                ``` bash title="Run the sample"
                java -cp "out:target/lib/*" Main
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
        ai dev new list openai-chat --javascript
        ai dev new list openai-chat-streaming --javascript
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a JavaScript sample that uses streaming completions.

            ``` bash
            ai dev new openai-chat-streaming --javascript
            cd openai-chat-streaming-js
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Main.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-js/Main.js)  
                [:material-file-code: OpenAIChatCompletionsStreamingClass.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-js/OpenAIChatCompletionsStreamingClass.js)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-streaming-js.md)  

            ``` bash title="Install dependencies"
            npm install
            ```

            ``` bash title="Run the sample"
            node Main.js
            ```

        === "Non-streaming"

            Generate a JavaScript sample that uses non-streaming completions.

            ``` bash
            ai dev new openai-chat --javascript
            cd openai-chat-js
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Main.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-js/Main.js)  
                [:material-file-code: OpenAIChatCompletionsClass.js](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-js/OpenAIChatCompletionsClass.js)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-js.md)  

            ``` bash title="Install dependencies"
            npm install
            ```

            ``` bash title="Run the sample"
            node Main.js
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
        ai dev new list openai-chat --python
        ai dev new list openai-chat-streaming --python
        ```

        ### Generate, build, and run a sample

        === "Streaming"

            Generate a Python sample that uses streaming completions.

            ``` bash
            ai dev new openai-chat-streaming --python
            cd openai-chat-streaming-py
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-py/main.py)  
                [:material-file-code: openai_chat_completions_streaming.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-py/openai_chat_completions_streaming.py)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-streaming-py.md)  

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

            Generate a Python sample that uses non-streaming completions.

            ``` bash
            ai dev new openai-chat --python
            cd openai-chat-py
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-py/main.py)  
                [:material-file-code: openai_chat_completions.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-py/openai_chat_completions.py)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-py.md)  

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
                python openai_chat_completions.py
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
                python3 openai_chat_completions.py
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
                python3 openai_chat_completions.py
                ```

    === "..."

        **Go over what was generated in the console app**  
        
        - getting connection info/secrets from environment variables  
        - using a helper class to encapsulate the OpenAI API calls  
        - getting input from the user  
        - sending the input to the helper class  
        - getting the response from the helper class  
        - deeper dive into the helper class