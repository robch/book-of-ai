➡️ [**OpenAI Chat Completions w/ RAG + AI Search**](todo.md#chapter-5-openai-chat-completions-w-rag--ai-search)

**Initialize Azure AI Search resource (select or create)**  
`ai init search`  
◦ => Select your Azure subscription  
◦ => Select or create your Azure AI Search resource  

**See the persisted config from `ai init search`**  
`ai config @search.endpoint`  
`ai config @search.key`  

**Create or update your Azure AI Search index**  
`ai search index create --name MyFiles --files *.md --blob-container https://...`  
`ai search index update --name MyFiles --files *.md --blob-container https://...`  

**See the persisted config from `ai search index create/update`**  
`ai config @search.index.name`  

**Use the search index in chat completions**  
`ai chat --user "What is the capital of France?" --index MyFiles`  

**Generate code for RAG + AI Search**  
`ai dev new openai-chat-streaming-with-data --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ builds on Chapter 4's console app  
◦ see how the helper class gives the LLM access to the AI Search index  
◦ see how the LLM sends back citations to the helper class  
◦ see how the helper class processes the citations  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
