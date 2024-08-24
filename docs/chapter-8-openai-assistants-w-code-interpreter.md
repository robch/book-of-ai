➡️ [OpenAI Assistants w/ Code Interpreter](#chapter-8-openai-assistants-w-code-interpreter)  

**Create or update an assistant with a code interpreter**  
`ai chat assistant create --name MyCodeAssistant --code-interpreter`  
`ai chat assistant update --code-interpreter`  

**Use the code interpreter in the assistant**  
`ai chat --interactive --question "how many e's are there in the pledge of allegiance?"`  
◦ ⇛ `how'd you do that?`  
◦ ⇛ `show me the code`  

**Generate code for using code interpreters**  
`ai dev new openai-asst-streaming-with-code --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ similar to console apps generated in earlier chapters  
◦ see how the LLM sends back info on the code created to the helper class  
◦ see how the helper class processes those responses  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

**Delete the assistant**  
`ai chat assistant delete`  
`ai config --clear assistant.id`  
