---
hide:
- toc
---
# GitHub Model Chat Basics

=== "Overview"

    The `ai chat` command allows you to interact w/ GitHub Marketplace models from the command line.  

    --8<-- "docs/tip-github-prereqs.md"

    ### User and System Prompts

    The `ai chat` command sends a user prompt to GitHub's AI Inference service and displays the response.

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
    
    ### Model Selection

    ``` bash title="Use a different model"
    ai chat --interactive --model Mistral-large-2407
    ```

    ``` bash title="Set default model"
    ai config --set chat.model Mistral-large-2407
    ```

    ``` bash title="Use default model"
    ai chat --interactive
    ```

=== "Sample Code"

    The `ai dev new` command generates sample code for interacting with the GitHub Model Marketplace.

    --8<-- "docs/tip-github-prereqs.md"

    === "C#"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list by name"
        ai dev new list --csharp
        ai dev new list inference --csharp
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new az-inference-chat-streaming --csharp
        cd az-inference-chat-streaming-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/az-inference-chat-streaming-cs/Program.cs)  
            [:material-file-code: AzureAIInferencingChatCompletionsStreamingClass.cs](./samples/az-inference-chat-streaming-cs/AzureAIInferencingChatCompletionsStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-12-sample-overview-az-inference-chat-streaming-cs.md)  

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

        ```bash title="Filter the list by name"
        ai dev new list --go
        ai dev new list inference --go
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "Java"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list by name"
        ai dev new list --java
        ai dev new list inference --java
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list by name"
        ai dev new list --javascript
        ai dev new list inference --javascript
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "Python"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="Filter the list by name"
        ai dev new list --python
        ai dev new list inference --python
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new az-inference-chat-streaming --python
        cd az-inference-chat-streaming-py
        ```

        ??? example "See the code; learn what it does..."

            [:material-file-code: main.py](./samples/az-inference-chat-streaming-py/main.py)  
            [:material-file-code: requirements.txt](./samples/az-inference-chat-streaming-py/requirements.txt)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-12-sample-overview-az-inference-chat-streaming-py.md)  

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
        \\u25e6 builds on previous chapters' console apps  
        \\u25e6 gets connection info/secrets from environment variables  
        \\u25e6 see how use of the Azure.AI.Inference namespace is similar/different from OpenAI  
