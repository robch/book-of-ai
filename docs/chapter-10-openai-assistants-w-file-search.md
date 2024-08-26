➡️ [OpenAI Assistants w/ File Search](#chapter-10-openai-assistants-w-file-search)  

**Create or update an assistant for use with file search**  
`ai chat assistant create --name MyFileAssistant --files "**/*.md"`  
`ai chat assistant update --files "**/*.txt"` or `--files "**/*.cs"` or `--files "**/*.ts"` ...  

**See that it created a vector store for the files**  
`ai chat assistant vector-store`  
`ai chat assistant vector-store list`  
`ai chat assistant vector-store get`  

**See the persisted config from `ai chat assistant create/update`**  
`ai config @assistant.id`  
`ai config @vector.store.id`  

**You can update the vector-store directly as well**  
`ai chat assistant vector-store update --file README.md`  

**Use the assistant with file search**  
`ai chat --user "..."`  
`ai chat --user "..." --interactive`  

**Generating code for file search**  
`ai dev new list file`  
`ai dev new openai-asst-streaming-with-file-search --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ builds on chapter 7's console app  
◦ see how the LLM sends back citations to the helper class  
◦ see how the helper class processes the citations  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

**Delete the assistant**  
`ai chat assistant delete`  
`ai config --clear assistant.id`  

**Delete the vector store**  
`ai chat assistant vector-store delete`  
`ai config --clear vector.store.id`  

