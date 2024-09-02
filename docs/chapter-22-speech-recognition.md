---
hide:
- toc
---
# Speech Recognition

=== "Tutorial"

    The `ai speech recognize` command allows you to recognize speech from audio. You can recognize speech from a microphone or a file, and output subtitles in SRT or VTT format.

    --8<-- "docs/tip-speech-prereqs.md"

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

=== "Generate Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use speech recognition features.

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
        ai dev new list speech --csharp
        ```

        ### Generate, build, and run a sample

        === "Once w/ Microphone"

            Generate a C# sample that recognizes speech from the microphone.

            ```bash
            ai dev new speech-to-text --csharp
            cd speech-to-text-cs
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-cs/Program.cs)

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-cs.md)

            ```bash title="Install dependencies"
            dotnet restore
            ```

            ```bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

        === "Continuous w/ Microphone"

            Generate a C# sample that continuously recognizes speech from the microphone.

            ```bash
            ai dev new speech-to-text-continuous-reco --csharp
            cd speech-to-text-continuous-reco-cs
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-continuous-reco-cs/Program.cs)

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-continuous-reco-cs.md)

            ```bash title="Install dependencies"
            dotnet restore
            ```

            ```bash title="Run the sample"
            ai dev shell
            dotnet run
            ```

        === "Continuous w/ File"

            Generate a C# sample that continuously recognizes speech from a file.

            ```bash
            ai dev new speech-to-text-with-file --csharp
            cd speech-to-text-with-file-cs
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-file-cs/Program.cs)

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-with-file-cs.md)

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
        ai dev new list speech --go
        ```

        ### Generate, build, and run a sample

        === "Once w/ Microphone"

        === "Continuous w/ Microphone"

        === "Continuous w/ File"

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
        ai dev new list speech --java
        ```

        ### Generate, build, and run a sample

        === "Once w/ Microphone"

        === "Continuous w/ Microphone"

        === "Continuous w/ File"

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
        ai dev new list speech --javascript
        ```

        ### Generate, build, and run a sample

        === "Once w/ Microphone"

        === "Continuous w/ Microphone"

        === "Continuous w/ File"

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
        ai dev new list speech --python
        ```

        ### Generate, build, and run a sample

        === "Once w/ Microphone"

            Generate a Python sample that recognizes speech from the microphone.

            ```bash
            ai dev new speech-to-text --python
            cd speech-to-text-py
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-py/main.py)

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-py.md)

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

        === "Continuous w/ Microphone"

            Generate a Python sample that continuously recognizes speech from the microphone.

            ```bash
            ai dev new speech-to-text-continuous-reco --python
            cd speech-to-text-continuous-reco-py
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-continuous-reco-py/main.py)

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-continuous-reco-py.md)

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

        === "Continuous w/ File"

            Generate a Python sample that continuously recognizes speech from a file.

            ```bash
            ai dev new speech-to-text-with-file --python
            cd speech-to-text-with-file-py
            ```

            ??? example "See the code; learn how it works..."

                [:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-file-py/main.py)

                [:material-file-document-outline: Deep dive on how it works](./chapter-22-sample-overview-speech-to-text-with-file-py.md)

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
