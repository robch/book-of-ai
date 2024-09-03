```bash title="Generate sample code"
ai dev new openai-chat-streaming-with-functions --python
cd openai-chat-streaming-with-functions-py
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-py/main.py)  
    [:material-file-code: openai_chat_completions_custom_functions.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-py/openai_chat_completions_custom_functions.py)  
    [:material-file-code: openai_chat_completions_functions_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-py/openai_chat_completions_functions_streaming.py)  

    [:material-file-document-outline: Deep dive on how it works](/openai-chat-functions-py/sample-overview.md)  

```bash title="Install requirements"
pip install -r requirements.txt
```

```bash title="Create virtual environment"
python3 -m venv env
source env/bin/activate
```

```bash title="Run the sample"
ai dev shell
python main.py
```
