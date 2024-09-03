Generate a Python sample that demonstrates how to use OpenAI Assistants with streaming.

``` bash
ai dev new openai-asst-streaming --python
cd openai-asst-streaming-py
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-py/main.py)  
    [:material-file-code: openai_assistants_streaming.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-py/openai_assistants_streaming.py)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-streaming-py/sample-overview.md)  

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