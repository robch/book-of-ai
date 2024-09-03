Generate a Python sample that demonstrates how to use OpenAI Assistants with File Search.

```bash title="Generate sample code"
ai dev new openai-asst-streaming-with-file-search --python
cd openai-asst-streaming-with-file-search-py
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-py/main.py)  
    [:material-file-code: openai_assistants_file_search_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-file-search-py/openai_assistants_file_search_streaming.py)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-streaming-with-file-search-py/sample-overview.md)  

```bash title="Create virtual environment"
python -m venv env
source env/bin/activate
```

```bash title="Install requirements"
pip install -r requirements.txt
```

```bash title="Run the sample"
ai dev shell
python main.py
```
