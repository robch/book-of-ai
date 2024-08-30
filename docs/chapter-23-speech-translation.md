---
hide:
- toc
---
# Speech Translation

=== "Overview"

    The `ai speech translate` command allows you to translate speech from one language to another. You can translate speech from a microphone or a file, and output subtitles in SRT format.

    --8<-- "docs/tip-speech-prereqs.md"

    ### Translate Speech

    ```bash title="Translate from microphone"
    ai speech translate --microphone --source en-US --target es-ES
    ```

    ```bash title="Translate from file"
    ai speech translate --file hello-world.wav --source en-US --target es-ES
    ```

    ```bash title="Translate to multiple languages"
    ai speech translate --file hello-world.wav --source en-US --targets es-ES;fr-FR;zh-CN
    ```

    ### Output Subtitles

    ```bash title="Output SRT subtitles"
    ai speech translate --file hello-world.wav --source en-US --target es-ES --output-srt-file captions.srt
    ```

=== "Sample Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use speech translation.

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
        ai dev new list translate --csharp
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new speech-to-text-with-translation --csharp
        cd speech-to-text-with-translation-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-translation-cs/Program.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-23-sample-overview-speech-to-text-with-translation-cs.md)  


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
        ai dev new list translate --go
        ```

        ### Generate, build, and run a sample

        ... 
        
    === "Java"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only Java samples"
        ai dev new list --java
        ```

        ```bash title="Filter the list by name"
        ai dev new list translate --java
        ```

        ### Generate, build, and run a sample
        ... 

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only JavaScript samples"
        ai dev new list --javascript
        ```

        ```bash title="Filter the list by name"
        ai dev new list translate --javascript
        ```

        ### Generate, build, and run a sample
        ... 

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="List only Python samples"
        ai dev new list --python
        ```

        ```bash title="Filter the list by name"
        ai dev new list translate --python
        ```

        ### Generate, build, and run a sample

        ```bash title="Generate sample code"
        ai dev new speech-to-text-with-translation --python
        cd speech-to-text-with-translation-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-translation-py/main.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-23-sample-overview-speech-to-text-with-translation-py.md)  

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
