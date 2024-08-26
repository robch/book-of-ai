---
hide:
- toc
---
# Speech Recognition

=== "w/ CLI"

    ### Recognize speech from audio

    ```bash title="From microphone"
    ai speech recognize --microphone
    ```

    ```bash title="From WAV file"
    ai speech recognize --file hello-world.wav
    ```

    ```bash title="From MP3 file"
    ai speech recognize --file hello-world.mp3 --format mp3
    ```

    ### Recognize speech with a specific language

    ```bash title="From microphone in Spanish"
    ai speech recognize --microphone --language es-ES
    ```

    ```bash title="From WAV file in multiple languages"
    ai speech recognize --file hello-world.wav --languages es-ES;fr-FR
    ```

    ### Output subtitles

    ```bash title="Output SRT subtitles"
    ai speech recognize --file hello-world.wav --output-srt-file captions.srt
    ```

    ```bash title="Output VTT subtitles"
    ai speech recognize --file hello-world.wav --output-vtt-file captions.vtt
    ```

=== "C#"

    ### List samples

    ```bash title="List all samples"
    ai dev new list
    ```

    ```bash title="Filter the list"
    ai dev new list --csharp
    ai dev new list speech --csharp
    ```

    ### Generate, build, and run

    ```bash title="Generate sample code"
    ai dev new speech-to-text --csharp
    cd speech-to-text-cs
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
    ai dev new list text-to-speech --go
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
    ai dev new list text-to-speech --java
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
    ai dev new list text-to-speech --javascript
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
    ai dev new list speech --python
    ```

    ### Generate, build, and run

    ```bash title="Generate sample code"
    ai dev new speech-to-text --python
    cd speech-to-text-py
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
    
    - Getting connection info/secrets from environment variables  
    - Using a helper class to encapsulate the Speech API calls  
    - Getting input from the user  
    - Sending the input to the helper class  
    - Getting the response from the helper class  
    - Deeper dive into the helper class  