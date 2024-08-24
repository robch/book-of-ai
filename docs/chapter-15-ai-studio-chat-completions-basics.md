➡️ [Chat Completions Basics](todo.md#chapter-15-ai-studio-chat-completions-basics)

**Use the model in chat completions**  
`ai chat --user "What is the capital of France?"`  
`ai chat --user "What is the population of the United States?" --interactive`  

**Generate code for chat completions with AI Studio models**  
`ai dev new list inference`  
`ai dev new az-inference-chat-streaming --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ builds on previous chapters' console apps  
◦ gets connection info/secrets from environment variables  
◦ see how use of the Azure.AI.Inference namespace is similar/different from OpenAI  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
