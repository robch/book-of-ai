---
hide:
- toc
---
# Speech Recognition with Keyword Spotting

=== "Overview"

    The `ai speech recognize` `--keyword` option allows you to recognize speech with keyword spotting. You can recognize speech from a microphone or a file, and output the recognized text.

    --8<-- "docs/tip-speech-prereqs.md"

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

=== "Sample Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use Speech Recognition with Keyword Spotting.

    --8<-- "docs/tip-speech-prereqs.md"

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only C# samples"
        ai dev new list --csharp
        ```

        ```bash title="Filter the list by name"
        ai dev new list speech-to-text-with-keyword --csharp
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new speech-to-text-with-keyword --csharp
        cd speech-to-text-with-keyword-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-keyword-cs/Program.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-24-sample-overview-speech-to-text-with-keyword-cs.md)  

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
        ai dev new list speech-to-text-with-keyword --go
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "Java"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only Java samples"
        ai dev new list --java
        ```

        ```bash title="Filter the list by name"
        ai dev new list speech-to-text-with-keyword --java
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ```bash title="Filter the list by name"
        ai dev new list speech-to-text-with-keyword --javascript
        ```

        ### Generate, build, and run a sample

        ... 🚧 UNDER CONSTRUCTION ...  

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only Python samples"
        ai dev new list --python
        ```

        ```bash title="Filter the list by name"
        ai dev new list speech-to-text-with-keyword --python
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new speech-to-text-with-keyword --python
        cd speech-to-text-with-keyword-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-keyword-py/main.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-24-sample-overview-speech-to-text-with-keyword-py.md)  

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
