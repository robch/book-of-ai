➡️ [OpenAI Assistants w/ Function Calling](#chapter-9-openai-assistants-w-function-calling)  

**Create or update an assistant for use with function calling**  
`ai chat assistant create --name MyFunctionAssistant`  

**Use the assistant with function calling, via built-in CLI functions**  
◦ This is similar to Chapter 4's chat completions w/ function calling  
`ai chat --user "What time is it?" --built-in-functions`  
`ai chat --user "What is 3.5 to the power of 9?" --built-in-functions`  
`ai chat --user "What is in the README.md file?" --built-in-functions`  
`ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions`  

**Generating code for function calling**  
`ai dev new list function`  
`ai dev new openai-asst-streaming-with-functions --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ builds on chapter 7's console app  
◦ see how functions are defined, given to "function factory"  
◦ in helper class, see how functions are given to the LLM  
◦ see how the LLM streams back the function call requests  
◦ see how the helper class processes the function call responses  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

**Delete the assistant**  
`ai chat assistant delete`  
`ai config --clear assistant.id`  
