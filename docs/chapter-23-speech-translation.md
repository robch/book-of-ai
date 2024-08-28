---
hide:
- toc
---
# Speech Translation

=== "Overview"

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

    === "C#"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --csharp
        ai dev new list translate --csharp
        ```

        ### Generate, build, and run

        ```bash title="Generate sample code"
        ai dev new speech-to-text-with-translation --csharp
        cd speech-to-text-with-translation-cs
        ```

        ```bash title="Install dependencies"
        dotnet restore
        ```

        ```bash title="Run the sample"
        ai dev shell
        dotnet run
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/speech-to-text-with-translation-cs/Program.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-23-sample-overview-speech-to-text-with-translation-cs.md)  

    === "Go"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --go
        ai dev new list translate --go
        ```

        ### Generate, build, and run

        ... 
        
    === "Java"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --java
        ai dev new list translate --java
        ```

        ### Generate, build, and run
        ... 

    === "JavaScript"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --javascript
        ai dev new list translate --javascript
        ```

        ### Generate, build, and run
        ... 

    === "Python"

        ### List samples

        ```bash title="List all samples"
        ai dev new list
        ```

        ```bash title="Filter the list"
        ai dev new list --python
        ai dev new list translate --python
        ```

        ### Generate, build, and run
        ```bash title="Generate sample code"
        ai dev new speech-to-text-with-translation --python
        cd speech-to-text-with-translation-py
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
            
        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](./samples/speech-to-text-with-translation-py/main.py)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-23-sample-overview-speech-to-text-with-translation-py.md)  

    === "..."

        **Go over what was generated in the console app**  
        
