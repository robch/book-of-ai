---
hide:
- toc
---

# Speech Synthesis

=== "Overview"

    The `ai speech synthesize` command allows you to synthesize speech from text. You can synthesize speech with different voices, formats, and audio outputs.

    --8<-- "docs/tip-speech-prereqs.md"

    ### Synthesize speech from text

    ``` bash title="Interactive mode"
    ai speech synthesize --interactive
    ```

    ``` bash title="Synthesize text"
    ai speech synthesize --text "Hello, world!"
    ```

    ``` bash title="Synthesize text with audio output"
    ai speech synthesize --text "Hello, world!" --audio-output hello-world.wav
    ```

    ``` bash title="Synthesize text with specific format"
    ai speech synthesize --text "Hello, world!" --audio-output hello-world.mp3 --format mp3
    ```

    ### List available voices

    ``` bash title="List voices"
    ai speech synthesize --voices
    ```

    ### Synthesize speech with a specific voice

    ``` bash title="Synthesize with specific voice"
    ai speech synthesize --text "Hello, world!" --voice en-US-AriaNeural
    ```

=== "Sample Code"

    The `ai dev new` command allows you to generate sample code that demonstrates how to use Speech Synthesis.

    --8<-- "docs/tip-speech-prereqs.md"

    === "C#"

        ### List samples

        ``` bash title="List all samples"
        ai dev new list
        ```

        ``` bash title="List only C# samples"
        ai dev new list --csharp
        ```

        ``` bash title="Filter the list by name"
        ai dev new list text-to-speech --csharp
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new text-to-speech --csharp
        cd text-to-speech-cs
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/text-to-speech-cs/Program.cs)  
            [:material-file-code: TextToSpeechClass.cs](./samples/text-to-speech-cs/TextToSpeechClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-21-sample-overview-text-to-speech-cs.md)  

        ``` bash title="Install dependencies"
        dotnet restore
        ```

        ``` bash title="Run the sample"
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
        ai dev new list text-to-speech --go
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
        ai dev new list text-to-speech --java
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
        ai dev new list text-to-speech --javascript
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
        ai dev new list text-to-speech --python
        ```

        ### Generate, build, and run a sample

        ``` bash title="Generate sample code"
        ai dev new text-to-speech --python
        cd text-to-speech-py
        ```

        ??? example "See the code; learn how it works..."

            [:material-file-code: main.py](./samples/text-to-speech-py/main.py)  
            [:material-file-code: requirements.txt](./samples/text-to-speech-py/requirements.txt)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-21-sample-overview-text-to-speech-py.md)  

        === "Windows"

            ``` bash title="Create virtual environment"
            python -m venv env
            env/Scripts/activate
            ```

            ``` bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ``` bash title="Run the sample"
            ai dev shell
            python main.py
            ```

        === "macOS"

            ``` bash title="Create virtual environment"
            python3 -m venv env
            source env/bin/activate
            ```

            ``` bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ``` bash title="Run the sample"
            ai dev shell
            python3 main.py
            ```

        === "Linux"

            ``` bash title="Create virtual environment"
            python3 -m venv env
            source env/bin/activate
            ```

            ``` bash title="Install requirements"
            pip install -r requirements.txt
            ```

            ``` bash title="Run the sample"
            ai dev shell
            python3 main.py
            ```

    === "..."

        **Go over what was generated in the console app**  
        ◦ getting connection info/secrets from environment variables  
        ◦ using a helper class to encapsulate the Azure Speech API calls  
        ◦ getting input from the user  
        ◦ sending the input to the helper class  
        ◦ getting the response from the helper class  
        ◦ deeper dive into the helper class  
