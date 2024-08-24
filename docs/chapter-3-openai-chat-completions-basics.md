➡️ [**OpenAI Chat Completion Basics**](#chapter-3-openai-chat-completions-basics)  

**Pre-reqs**:  
🛑 [Install CLI](chapter-1-cli-installation.md)  
🛑 [Setup Azure OpenAI](chapter-2-setup-w-azure-openai.md)  

**User prompts, system prompts, and interactive use**  
`ai chat --user "What is the capital of France?"`  
`ai chat --interactive`  
`ai chat --interactive --system @prompt.txt`  
`ai chat --interactive --system @prompt.txt --user "Tell me a joke"`  
 
**Output answers and/or chat history**  
`ai chat --interactive --output-answer answer.txt`  
`ai chat --interactive --output-chat-history history.jsonl`  

**Input chat history**  
`ai chat --interactive --input-chat-history history.jsonl`  

**Generate console apps for chat completions**  
`ai dev new list`  
`ai dev new list chat`  
`ai dev new openai-chat --csharp` or `--python` or `--javascript` ...  
`ai dev new openai-chat-streaming --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  
◦ using a helper class to encapsulate the OpenAI API calls  
◦ getting input from the user  
◦ sending the input to the helper class  
◦ getting the response from the helper class  
◦ deeper dive into the helper class  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
