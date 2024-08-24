➡️ [ONNX Chat Completions w/ Function Calling](#chapter-19-onnx-chat-completions-w-function-calling)  

🚧 COMING SOON 🚧 ◦ Extending the Phi-3's world knowledge with functions  
🚧 COMING SOON 🚧 ◦ `ai chat --model-path @mp --user "What time is it?"` => doesn't know the time  
🚧 COMING SOON 🚧 ◦ `ai chat --model-path @mp --user "What time is it?" --built-in-functions` => works!  
🚧 COMING SOON 🚧 ◦ `ai chat --model-path @mp --user "What is in the README.md file?" --built-in-functions`  

🚧 COMING SOON 🚧 ◦ Allowing the LLM to interact with your code  
🚧 COMING SOON 🚧 ◦ `ai chat --model-path @mp --user "Save the pledge of allegiance to 'pledge.txt'"` => doesn't work  
🚧 COMING SOON 🚧 ◦ `ai chat --model-path @mp --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions` => works!  

**Generating code for function calling**  
`ai dev new list function`  
`ai dev new phi3-onnx-chat-streaming-with-functions --csharp`  
🚧 COMING SOON 🚧 `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ builds on previous chapter's console app  
◦ see how functions are defined, given to "function factory"  
◦ in helper class, see how functions are given to the LLM  
◦ see how the LLM streams back the function call requests  
◦ see how the helper class processes the function call responses  

**Install the dependencies**  
`dotnet restore`  

**Run the console app**  
`ai dev shell`  
`dotnet run`  
