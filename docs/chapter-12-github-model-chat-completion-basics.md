➡️ [Chat Completion Basics](#chapter-12-github-model-chat-completion-basics)  

**Use the model in chat completions**  
`ai chat --user "What is the capital of France?"`  
`ai chat --user "What is the population of the United States?" --interactive`  

**Use a different model in chat completions**  
`ai chat --interactive --model Mistral-large-2407` or `--model gpt-4o-mini` ...  

`ai config @chat.model`  
`ai config --set chat.model gpt-4o` or `--set chat.model gpt-4o-mini`  
`ai chat --interactive`  

**Generate code for chat completions with GitHub models**  
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

