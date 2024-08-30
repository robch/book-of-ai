---
hide:
- toc
---
# AI Studio Chat Basics

=== "Overview"

    --8<-- "docs/tip-ai-studio-prereqs.md"

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

=== "Sample Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use AI Studio's AI Inference deployed endpoints.

    --8<-- "docs/tip-ai-studio-prereqs.md"

    === "C#"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only C# samples"
        ai dev new list --csharp
        ```

        ``` bash title="Filter the list by name"
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

            [:material-file-document-outline: Deep dive on how it works](./chapter-15-sample-overview-az-inference-chat-streaming-cs.md)  

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
        ai dev new list inference --go
        ```

        ### Generate, build, and run a sample

        ... 

    === "Java"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only Java samples"
        ai dev new list --java
        ```

        ``` bash title="Filter the list by name"
        ai dev new list inference --java
        ```

        ### Generate, build, and run a sample

        ... 

    === "JavaScript"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ``` bash title="Filter the list by name"
        ai dev new list inference --javascript
        ```

        ### Generate, build, and run a sample

        ... 

    === "Python"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only Python samples"
        ai dev new list --python
        ```

        ``` bash title="Filter the list by name"
        ai dev new list inference --python
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new az-inference-chat-streaming --python
        cd az-inference-chat-streaming-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](./samples/az-inference-chat-streaming-py/main.py)  
            [:material-file-code: azureml_chat_completions_streaming.py](./samples/az-inference-chat-streaming-py/azureml_chat_completions_streaming.py)  
            [:material-file-code: requirements.txt](./samples/az-inference-chat-streaming-py/requirements.txt)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-15-sample-overview-az-inference-chat-streaming-py.md)  

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
        ◦ builds on previous chapters' console apps  
        ◦ gets connection info/secrets from environment variables  
        ◦ see how use of the Azure.AI.Inference namespace is similar/different from OpenAI  
