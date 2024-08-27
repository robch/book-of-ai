---
hide:
- toc
---
# OpenAI Chat Completions with Function Calling

=== "w/ CLI"

    ### Extending the LLM's world knowledge with functions

    ``` bash title="Get the current time"
    ai chat --user "What time is it?" --built-in-functions
    ```

    ``` bash title="Calculate power"
    ai chat --user "What is 3.5 to the power of 9?" --built-in-functions
    ```

    ``` bash title="Read a file's content"
    ai chat --user "What is in the README.md file?" --built-in-functions
    ```

    ### Allowing the LLM to 'do stuff'

    ``` bash title="Save text to a file"
    ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
    ```

=== "C#"

    ### List samples

    ``` bash title="List all samples"
    ai dev new list
    ```

    ``` bash title="Filter the list"
    ai dev new list --csharp
    ai dev new list openai-chat-streaming-with-functions --csharp
    ```

    ### Generate, build, and run

    ``` bash title="Generate sample code"
    ai dev new openai-chat-streaming-with-functions --csharp
    cd openai-chat-streaming-with-functions-cs
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
    ai dev new list openai-chat-streaming-with-functions --go
    ```

    ### Generate, build, and run

    ``` bash title="Generate sample code"
    ai dev new openai-chat-streaming-with-functions --go
    cd openai-chat-streaming-with-functions-go
    ```

    ``` bash title="Install dependencies"
    go mod tidy
    ```

    ``` bash title="Run the sample"
    ai dev shell
    go run main.go
    ```

=== "Java"

    ### List samples

    ``` bash title="List all samples"
    ai dev new list
    ```

    ``` bash title="Filter the list"
    ai dev new list --java
    ai dev new list openai-chat-streaming-with-functions --java
    ```

    ### Generate, build, and run

    ``` bash title="Generate sample code"
    ai dev new openai-chat-streaming-with-functions --java
    cd openai-chat-streaming-with-functions-java
    ```

    ``` bash title="Restore packages"
    mvn clean package
    ```

    === "Windows"

        ``` bash title="Build the sample"
        ai dev shell
        javac -cp "target/lib/*" src/OpenAIChatCompletionsFunctionsStreamingClass.java src/Main.java -d out
        ```

        ``` bash title="Run the sample"
        java -cp "out;target/lib/*" Main
        ```

    === "macOS"

        ``` bash title="Build the sample"
        ai dev shell
        javac -cp "target/lib/*" src/OpenAIChatCompletionsFunctionsStreamingClass.java src/Main.java -d out
        ```

        ``` bash title="Run the sample"
        java -cp "out:target/lib/*" Main
        ```

    === "Linux"

        ``` bash title="Build the sample"
        ai dev shell
        javac -cp "target/lib/*" src/OpenAIChatCompletionsFunctionsStreamingClass.java src/Main.java -d out
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
    ai dev new list openai-chat-streaming-with-functions --javascript
    ```

    ### Generate, build, and run

    ``` bash title="Generate sample code"
    ai dev new openai-chat-streaming-with-functions --javascript
    cd openai-chat-streaming-with-functions-js
    ```

    ``` bash title="Install dependencies"
    npm install
    ```

    ``` bash title="Run the sample"
    ai dev shell
    node Main.js
    ```

=== "Python"

    ### List samples

    ``` bash title="List all samples"
    ai dev new list
    ```

    ``` bash title="Filter the list"
    ai dev new list --python
    ai dev new list openai-chat-streaming-with-functions --python
    ```

    ### Generate, build, and run

    ``` bash title="Generate sample code"
    ai dev new openai-chat-streaming-with-functions --python
    cd openai-chat-streaming-with-functions-py
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

=== "..."

    **Go over what was generated in the console app**  
    ◦ builds on previous chapter's console app  
    ◦ see how functions are defined, given to "function factory"  
    ◦ in helper class, see how functions are given to the LLM  
    ◦ see how the LLM streams back the function call requests  
    ◦ see how the helper class processes the function call responses  
