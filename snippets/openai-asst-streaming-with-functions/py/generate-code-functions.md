Generate sample code that demonstrates how to use OpenAI Assistants with Function Calling.

```bash title="Generate sample code"
ai dev new openai-asst-streaming-with-functions --python
cd openai-asst-streaming-with-functions-py
```

??? example "See the code;learn how it works..."

    [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-py/main.py)  
    [:material-file-code: openai_assistants_custom_functions.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_custom_functions.py)  
    [:material-file-code: openai_assistants_functions_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-py/openai_assistants_functions_streaming.py)  

    [:material-file-document-outline:Deep dive on how it works](/openai-asst/openai-asst-streaming-with-functions-py/sample-overview.md)  

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
