➡️ [ONNX Chat Completions](#chapter-18-onnx-chat-completions)

🛑 Setup w/ ONNX and PHI-3 Models in [chapter 17](#chapter-17-setup-w-onnx-and-phi-3-models)  

**Use the model in chat completions**  
`ai chat --model-path @mp --user "What is the capital of France?"`  
`ai chat --model-path @mp --interactive`  
`ai chat --model-path @mp --interactive --system @prompt.txt`  
`ai chat --model-path @mp --interactive --system @prompt.txt --user "Tell me a joke"`  
`ai chat --model-path @mp --interactive --output-answer answer.txt`  
`ai chat --model-path @mp --interactive --output-chat-history history.jsonl`  
`ai chat --model-path @mp --interactive --input-chat-history history.jsonl`  

**Generate code for chat completions with ONNX models**  
`ai dev new list onnx`  
`ai dev new phi3-onnx-chat-streaming --csharp`  
🚧 COMING SOON 🚧 `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ similar to console apps generated in earlier chapters  
◦ getting connection info/secrets from environment variables  
◦ using a helper class to encapsulate the ONNX API calls  
◦ getting input from the user  
◦ sending the input to the helper class  
◦ getting the response from the helper class  
◦ deeper dive into the helper class  

**Install the dependencies**  
`dotnet restore`  

**Run the console app**  
`ai dev shell`  
`dotnet run`  
