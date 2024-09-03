Generate a Python sample that demonstrates how to use OpenAI Assistants without streaming.

``` bash
ai dev new openai-asst --python
cd openai-asst-py
```

??? example "See the code; learn how it works..."

    [:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-py/main.py)  
    [:material-file-code: openai_assistants.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-py/openai_assistants.py)  

    [:material-file-document-outline: Deep dive on how it works](/openai-asst/openai-asst-non-streaming-py/sample-overview.md)  

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
"