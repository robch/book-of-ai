---
hide:
- toc
---
# Speech Recognition

=== "Overview"

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

=== "Sample Code"

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

        === "Once w/ Microphone"

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

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](./samples/speech-to-text-cs/Program.cs)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-cs.md)  

        === "Continuous w/ Microphone"

            ```bash title="Generate sample code"
            ai dev new speech-to-text-continuous-reco --csharp
            cd speech-to-text-continuous-reco-cs
            ```

            ```bash title="Install dependencies"
            dotnet restore
            ```

            ```bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](./samples/speech-to-text-continuous-reco-cs/Program.cs)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-continuous-reco-cs.md)  

        === "Continuous w/ File"

            ```bash title="Generate sample code"
            ai dev new speech-to-text-with-file --csharp
            cd speech-to-text-with-file-cs
            ```

            ```bash title="Install dependencies"
            dotnet restore
            ```

            ```bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](./samples/speech-to-text-with-file-cs/Program.cs)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-with-file-cs.md)  


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

        === "Once w/ Microphone"

        === "Continuous w/ Microphone"

        === "Continuous w/ Flie"

        ... 

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

        === "Once w/ Microphone"

        === "Continuous w/ Microphone"

        === "Continuous w/ File"

        ... 

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

        === "Once w/ Microphone"

        === "Continuous w/ Microphone"

        === "Continuous w/ File"

        ... 

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

        === "Once w/ Microphone"

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

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](./samples/speech-to-text-py/main.py)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-py.md)  

        === "Continuous w/ Microphone"

            ```bash title="Generate sample code"
            ai dev new speech-to-text-continuous-reco --python
            cd speech-to-text-continuous-reco-py
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

                [:material-file-code: main.py](./samples/speech-to-text-continuous-reco-py/main.py)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-continuous-reco-py.md)

        === "Continuous w/ File"

            ```bash title="Generate sample code"
            ai dev new speech-to-text-with-file --python
            cd speech-to-text-with-file-py
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

                [:material-file-code: main.py](./samples/speech-to-text-with-file-py/main.py)  

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-with-file-py.md)
                
    === "..."

        **Go over what was generated in the console app**  
        
        - Getting connection info/secrets from environment variables  
        - Using a helper class to encapsulate the Speech API calls  
        - Getting input from the user  
        - Sending the input to the helper class  
        - Getting the response from the helper class  
        - Deeper dive into the helper class  
