---
hide:
- toc
---
# Speech Translation

=== "w/ CLI"

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

    ... 🚧 UNDER CONSTRUCTION ...  

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

    ... 🚧 UNDER CONSTRUCTION ...  

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

    ... 🚧 UNDER CONSTRUCTION ...  

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

=== "..."

    **Go over what was generated in the console app**  
    • getting connection info/secrets from environment variables  
    • using a helper class to encapsulate the Speech Translation API calls  
    • getting input from the user  
    • sending the input to the helper class  
    • getting the response from the helper class  
    • deeper dive into the helper class  