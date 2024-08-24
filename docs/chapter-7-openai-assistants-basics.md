➡️ [OpenAI Assistants Basics](#chapter-7-openai-assistants-basics)  

**Pre-reqs**:  
🛑 [Install CLI](chapter-1-cli-installation.md)  
🛑 [Setup Azure OpenAI](chapter-2-setup-w-azure-openai.md)  

**Create a simple assistant**  
`ai chat assistant create --name MyAssistant`  

**Threads ...**  
`ai chat --interactive`  
`ai chat --interactive --thread-id ID` (from previous chat)  

`ai chat --question "..." --output-thread-id myNewThread.txt`  
`ai chat --question "..." --thread-id @myNewThread.txt`  
`ai chat --interactive --thread-id @myNewThread.txt --output-chat-history history.jsonl`  

**Generate code for using assistants**  
`ai dev new list asst`  
`ai dev new openai-asst-streaming --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ similar to console apps generated in earlier chapters  
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
