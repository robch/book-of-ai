---
hide:
- toc
---
# OpenAI Assistants API

=== "w/ CLI"

    ### Listing, creating, updating, and deleting assistants

    ```bash title="List all assistants"
    ai chat assistant list
    ```

    ```bash title="Create an assistant"
    ai chat assistant create --name MyAssistant
    ```

    ```bash title="Update an assistant"
    ai chat assistant update --instructions @instructions.txt
    ```

    ```bash title="Delete an assistant"
    ai chat assistant delete --id ID
    ```

    ### See the persisted config from `ai chat assistant create/update`

    ```bash title="View assistant configuration"
    ai config @assistant.id
    ```

    ### Picking a new assistant

    ```bash title="List all assistants"
    ai chat assistant list
    ```

    ```bash title="Set assistant by ID"
    ai config --set assistant.id ID
    ```

    ### Clearing the assistant ID from the config

    ```bash title="Clear assistant ID"
    ai config --clear assistant.id
    ```

=== "C#"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --csharp
    ai dev new list openai-asst --csharp
    ```

    ### Generate, build, and run

    ```bash title="Generate sample code"
    ai dev new openai-asst --csharp
    cd openai-asst-cs
    ```

    ```bash title="Install dependencies"
    dotnet restore
    ```

    ```bash title="Run the sample"
    ai dev shell
    dotnet run
    ```

=== "JavaScript"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --javascript
    ai dev new list openai-asst --javascript
    ```

    ### Generate, build, and run

    ```bash title="Generate sample code"
    ai dev new openai-asst --javascript
    cd openai-asst-js
    ```

    ```bash title="Install dependencies"
    npm install
    ```

    ```bash title="Run the sample"
    node main.js
    ```

=== "Python"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --python
    ai dev new list openai-asst --python
    ```

    ### Generate, build, and run

    ```bash title="Generate sample code"
    ai dev new openai-asst --python
    cd openai-asst-py
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

    **Differences between chat completions and assistants**  
    ◦ stateless vs stateful  
    ◦ customer controlled chat history vs threads  
    ◦ automatic context window management  
    ◦ advanced features: code interpreter, function calling, file search  


    **Go over what was generated in the console app**  
    ◦ getting connection info/secrets from environment variables  
    ◦ using a helper class to encapsulate the OpenAI API calls  
    ◦ getting input from the user  
    ◦ sending the input to the helper class  
    ◦ getting the response from the helper class  
    ◦ deeper dive into the helper class
