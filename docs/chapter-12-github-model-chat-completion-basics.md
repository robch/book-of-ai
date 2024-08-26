---
hide:
- toc
---
# GitHub Model Chat Completion Basics

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
    
    ### Model Selection

    ``` bash title="Use a different model"
    ai chat --interactive --model Mistral-large-2407
    ```

    ``` bash title="Set default model"
    ai config --set chat.model gpt-4o-mini
    ```

    ``` bash title="Use default model"
    ai chat --interactive
    ```

=== "C#"

    ### List samples

    ``` bash title="List all samples"
    ai dev new list
    ```

    ``` bash title="Filter the list"
    ai dev new list --csharp
    ai dev new list inference --csharp
    ```

    ### Generate, build, and run

    ``` bash title="Generate sample code"
    ai dev new az-inference-chat-streaming --csharp
    cd az-inference-chat-streaming-cs
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

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --go
    ai dev new list inference --go
    ```

    ### Generate, build, and run

    ... 🚧 UNDER CONSTRUCTION ...  

=== "Java"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --java
    ai dev new list inference --java
    ```

    ### Generate, build, and run

    ... 🚧 UNDER CONSTRUCTION ...  

=== "JavaScript"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --javascript
    ai dev new list inference --javascript
    ```

    ### Generate, build, and run

    ... 🚧 UNDER CONSTRUCTION ...  

=== "Python"

    ### List samples

    ``` bash title="List all samples"
    ai dev new list
    ```

    ``` bash title="Filter the list"
    ai dev new list --python
    ai dev new list inference --python
    ```

    ### Generate, build, and run

    ``` bash title="Generate sample code"
    ai dev new az-inference-chat-streaming --python
    cd az-inference-chat-streaming-py
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
    ◦ builds on previous chapters' console apps  
    ◦ gets connection info/secrets from environment variables  
    ◦ see how use of the Azure.AI.Inference namespace is similar/different from OpenAI  
