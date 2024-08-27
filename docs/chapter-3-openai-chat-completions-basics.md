---
hide:
- toc
---
# OpenAI Chat Completion Basics

=== "w/ CLI"

    ### Prompts

    ``` bash title="One prompt"
    ai chat --user "What is the capital of France?"
    ```
    ``` bash title="Interactive chat"
    ai chat --interactive
    ```

    ``` bash title="System prompts"
    ai chat --interactive --system @prompt.txt
    ```

    ``` bash title="User and system prompts"
    ai chat --interactive --system @prompt.txt --user "Tell me a joke"
    ```
    
    ### Answers and chat history

    ``` bash title="Output answer to a file"
    ai chat --interactive --output-answer answer.txt
    ```

    ``` bash title="Output chat history to a file"
    ai chat --interactive --output-chat-history history.jsonl
    ```

    ``` bash title="Input chat history"
    ai chat --interactive --input-chat-history history.jsonl
    ```

=== "C#"

    ### List samples

    ``` bash title="List all samples"
    ai dev new list
    ```

    ``` bash title="Filter the list"
    ai dev new list --csharp
    ai dev new list openai-chat --csharp
    ai dev new list openai-chat-streaming --csharp
    ```

    ### Generate, build, and run

    === "Streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming --csharp
        cd openai-chat-streaming-cs
        ```

        ``` bash title="Install dependencies"
        dotnet restore
        ```

        ``` bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

    === "Non-streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat --csharp
        cd openai-chat-cs
        ```

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

    ``` bash title="Filter the list"
    ai dev new list --go
    ai dev new list openai-chat --go
    ai dev new list openai-chat-streaming --go
    ```

    ### Generate, build, and run

    === "Streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming --go
        cd openai-chat-streaming-go
        ```

        ``` bash title="Install dependencies"
        go mod tidy
        ```

        ``` bash title="Run the sample"
        go run main.go
        ```

    === "Non-streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat --go
        cd openai-chat-go
        ```

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

    ``` bash title="Filter the list"
    ai dev new list --java
    ai dev new list openai-chat --java
    ai dev new list openai-chat-streaming --java
    ```

    ### Generate, build, and run

    === "Streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming --java
        cd openai-chat-streaming-java
        ```

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

        ``` bash title="Generate sample code"
        ai dev new openai-chat --java
        cd openai-chat-java
        ```

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

    ``` bash title="Filter the list"
    ai dev new list --javascript
    ai dev new list openai-chat --javascript
    ai dev new list openai-chat-streaming --javascript
    ```

    ### Generate, build, and run

    === "Streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming --javascript
        cd openai-chat-streaming-js
        ```

        ``` bash title="Install dependencies"
        npm install
        ```

        ``` bash title="Run the sample"
        node Main.js
        ```

    === "Non-streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat --javascript
        cd openai-chat-js
        ```

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

    ``` bash title="Filter the list"
    ai dev new list --python
    ai dev new list openai-chat --python
    ai dev new list openai-chat-streaming --python
    ```

    ### Generate, build, and run

    === "Streaming"

        ``` bash title="Generate sample code"
        ai dev new openai-chat-streaming --python
        cd openai-chat-streaming-py
        ```

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

        ``` bash title="Generate sample code"
        ai dev new openai-chat --python
        cd openai-chat-py
        ```

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
    ◦ getting connection info/secrets from environment variables  
    ◦ using a helper class to encapsulate the OpenAI API calls  
    ◦ getting input from the user  
    ◦ sending the input to the helper class  
    ◦ getting the response from the helper class  
    ◦ deeper dive into the helper class  
