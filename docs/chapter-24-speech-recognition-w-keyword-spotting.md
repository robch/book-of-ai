---
hide:
- toc
---
# Speech Recognition with Keyword Spotting

=== "w/ CLI"

    ### Recognize Speech with Keyword Spotting

    ```bash title="Interactive recognition with keyword spotting"
    ai speech recognize --interactive --keyword keyword.table
    ```

    ```bash title="Recognize speech from an audio file with keyword spotting"
    ai speech recognize --file hello-world.wav --keyword keyword.table
    ```

    ??? tip "If you don't have a custom keyword file..."

        [Custom Keyword Portal](https://speech.microsoft.com/portal/customkeyword)  
        Create your custom keyword `.table` file.

        [Custom Keyword Docs](https://learn.microsoft.com/azure/ai-services/speech-service/custom-keyword-basics)  
        Learn more about creating custom keywords.  

=== "C#"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --csharp
    ai dev new list speech-to-text-with-keyword --csharp
    ```

    ### Generate, build, and run

    ```bash title="Generate sample code"
    ai dev new speech-to-text-with-keyword --csharp
    cd speech-to-text-with-keyword-cs
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
    ai dev new list speech-to-text-with-keyword --go
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
    ai dev new list speech-to-text-with-keyword --java
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
    ai dev new list speech-to-text-with-keyword --javascript
    ```

    ### Generate, build, and run

    ... 🚧 UNDER CONSTRUCTION ...  

=== "Python"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --python
    ai dev new list speech-to-text-with-keyword --python
    ```

    ### Generate, build, and run

    ```bash title="Generate sample code"
    ai dev new speech-to-text-with-keyword --python
    cd speech-to-text-with-keyword-py
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

    **Go over what was generated in the console app**  
    ◦ getting connection info/secrets from environment variables  
    ◦ recognizing speech from an audio file with keyword detection  
    ◦ using a helper class to encapsulate the Speech SDK API calls  
    ◦ sending the input to the helper class  
    ◦ getting the response from the helper class  
    ◦ deeper dive into the helper class  
