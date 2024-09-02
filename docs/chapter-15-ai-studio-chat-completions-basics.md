---
hide:
- toc
---
# Azure AI Model Chat Basics

=== "Tutorial"

    The `ai chat` command allows you to interact w/ Azure AI models from the command line.

    --8<-- "tips/tip-ai-studio-prereqs.md"

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
    
=== "Generate Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use Azure AI models on serverless endpoints.

    --8<-- "tips/tip-ai-studio-prereqs.md"

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

            [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-cs/Program.cs)  
            [:material-file-code: AzureAIInferencingChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-cs/AzureAIInferencingChatCompletionsStreamingClass.cs)  

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

            [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/main.py)  
            [:material-file-code: azureml_chat_completions_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/azureml_chat_completions_streaming.py)  
            [:material-file-code: requirements.txt](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/requirements.txt)  

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
