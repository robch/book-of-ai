``` bash title="Generate sample code"
ai dev new text-to-speech --python
cd text-to-speech-py
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-py/main.py)  
    [:material-file-code: requirements.txt](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-py/requirements.txt)  

    [:material-file-document-outline: Deep dive on how it works](/speech/text-to-speech-py/sample-overview.md)  

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
