``` bash title="Generate sample code"
ai dev new az-inference-chat-streaming --python
cd az-inference-chat-streaming-py
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/main.py)  
    [:material-file-code: azureml_chat_completions_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/azureml_chat_completions_streaming.py)  
    [:material-file-code: requirements.txt](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/az-inference-chat-streaming-py/requirements.txt)  

    [:material-file-document-outline: Deep dive on how it works](/azure-ai-chat/azure-ai-chat-streaming-py/sample-overview.md)  

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