➡️ [**OpenAI Chat Completions w/ Function Calling**](#chapter-4-openai-chat-completions-w-function-calling)  

**Extending the LLM's world knowledge with functions**  
`ai chat --user "What time is it?" --built-in-functions`  
`ai chat --user "What is 3.5 to the power of 9?" --built-in-functions`  
`ai chat --user "What is in the README.md file?" --built-in-functions`  

**Allowing the LLM to 'do stuff'**  
`ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions`  

**Generating code for function calling**  
`ai dev new list function`  
`ai dev new openai-chat-streaming-with-functions --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ builds on previous chapter's console app  
◦ see how functions are defined, given to "function factory"  
◦ in helper class, see how functions are given to the LLM  
◦ see how the LLM streams back the function call requests  
◦ see how the helper class processes the function call responses  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
