# AI CLI

Let's do a quick tour of the various AI capabilities available in Azure via the new Azure AI CLI (`ai`). 

**INSTALLATION and SETUP**  
[CHAPTER 1: CLI Installation](#chapter-1-cli-installation)  
[CHAPTER 2: Setup w/ Azure OpenAI](#chapter-2-setup-w-azure-openai)  

**OPENAI CHAT COMPLETIONS**  
[CHAPTER 3: Chat Completion Basics](#chapter-3-openai-chat-completions-basics)  
[CHAPTER 4: Chat Completions w/ Function Calling](#chapter-4-openai-chat-completions-w-function-calling)  
[CHAPTER 5: Chat Completions w/ RAG + AI Search](#chapter-5-openai-chat-completions-w-rag--ai-search)  

**OPENAI ASSISTANTS API**  
[CHAPTER 6: Assistants API](#chapter-6-openai-assistants-api)  
[CHAPTER 7: Assistants Basics](#chapter-7-openai-assistants-basics)  
[CHAPTER 8: Assistants w/ Code Interpreter](#chapter-8-openai-assistants-w-code-interpreter)  
[CHAPTER 9: Assistants w/ Function Calling](#chapter-9-openai-assistants-w-function-calling)  
[CHAPTER 10: Assistants w/ File Search](#chapter-10-openai-assistants-w-file-search)  

**GITHUB MODEL MARKETPLACE**  
[CHAPTER 11: Setup w/ GitHub Model Marketplace](#chapter-11-setup-w-github-model-marketplace)  
[CHAPTER 12: GitHub Model Chat Completion Basics](#chapter-12-github-model-chat-completion-basics)  
[CHAPTER 13: GitHub Model Chat Completions W/ Function Calling](#chapter-13-github-model-chat-completions-w-function-calling)🚧  

**AZURE AI INFERENCING**  
[CHAPTER 14: Setup w/ AI Studio and the Model Catalog](#chapter-14-setup-w-ai-studio-and-the-model-catalog)  
[CHAPTER 15: AI Studio Chat Completions Basics](#chapter-15-ai-studio-chat-completions-basics)  
[CHAPTER 16: AI Studio Chat Completions w/ Function Calling](#chapter-16-ai-studio-chat-completions-w-function-calling)🚧  

**LOCAL INFERENCING W/ ONNX AND PHI-3**  
[CHAPTER 17: Setup w/ ONNX and PHI-3 Models](#chapter-17-setup-w-onnx-and-phi-3-models)  
[CHAPTER 18: ONNX Chat Completions](#chapter-18-onnx-chat-completions)  
[CHAPTER 19: ONNX Chat Completions w/ Function Calling](#chapter-19-onnx-chat-completions-w-function-calling)🚧  

**SPEECH INPUT AND OUTPUT**  
[CHAPTER 20: Setup w/ Speech](#chapter-20-setup-w-speech)  
[CHAPTER 21: Speech Synthesis](#chapter-21-speech-synthesis)  
[CHAPTER 22: Speech Recognition](#chapter-22-speech-recognition)  
[CHAPTER 23: Speech Translation](#chapter-23-speech-translation)  
[CHAPTER 24: Speech Recognition w/ Keyword Spotting](#chapter-24-speech-recognition-w-keyword-spotting)  

**MULTI-MODAL AI**  
[CHAPTER 25: Multi-Modal AI](#chapter-25-multi-modal-ai)  
[CHAPTER 26: Chat Completions w/ Speech Input](#chapter-26-chat-completions-w-speech-input)  
[CHAPTER 27: Chat Completions w/ Speech Input and Output](#chapter-27-chat-completions-w-speech-input-and-output)  
[CHAPTER 28: Chat Completions w/ Image Input](#chapter-28-chat-completions-w-image-input)  
[CHAPTER 29: Chat Completions w/ Image Output](#chapter-29-chat-completions-w-image-output)  

**SEMANTIC KERNEL AGENTS**  
[CHAPTER 30: Semantic Kernel Basics](#chapter-30-semantic-kernel-basics)  
[CHAPTER 31: Semantic Kernel w/ Function Calling](#chapter-31-semantic-kernel-w-function-calling)  
[CHAPTER 32: Semantic Kernel w/ Basic Agents](#chapter-32-semantic-kernel-w-basic-agents)  
[CHAPTER 33: Semantic Kernel w/ Advanced Agents](#chapter-33-semantic-kernel-w-advanced-agents)  

## CHAPTER 1: CLI Installation

➡️ [**CLI Installation**](#chapter-1-cli-installation)  

**Install the pre-requisites for the Azure AI CLI (`ai`)**  
`winget install Microsoft.DotNet.SDK.8`  

**Install the Azure AI CLI (`ai`) on Linux, Mac, or Windows**  
`dotnet tool install -g Microsoft.Azure.AI.CLI --prerelease`  

OR: Use the Azure AI CLI (`ai`) in a GitHub Codespace  
OR: Use the Azure AI CLI (`ai`) in a Docker container  

## CHAPTER 2: Setup w/ Azure OpenAI

➡️ [**Setup w/ Azure OpenAI**](#chapter-2-setup-w-azure-openai)  

**Initialize Azure OpenAI resource (select or create)**  
`ai init openai`  
◦ ⇛ Select your Azure subscription  
◦ ⇛ Select or create your Azure OpenAI resource  
◦ ⇛ Select or create an OpenAI chat model deployment (e.g. gpt-4o)  
◦ ⇛ Select or create an OpenAi embeddings model deployment  

**See the persisted config from `ai init openai`**  
`ai config @chat.endpoint`  
`ai config @chat.key`  

## CHAPTER 3: OpenAI Chat Completions Basics

➡️ [**OpenAI Chat Completion Basics**](#chapter-3-openai-chat-completions-basics)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

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

## CHAPTER 4: OpenAI Chat Completions w/ Function Calling

➡️ [**OpenAI Chat Completions w/ Function Calling**](#chapter-4-openai-chat-completions-w-function-calling)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

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

## CHAPTER 5: OpenAI Chat Completions w/ RAG + AI Search

➡️ [**OpenAI Chat Completions w/ RAG + AI Search**](#chapter-5-openai-chat-completions-w-rag--ai-search)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

**Initialize Azure AI Search resource (select or create)**  
`ai init search`  
◦ => Select your Azure subscription  
◦ => Select or create your Azure AI Search resource  

**See the persisted config from `ai init search`**  
`ai config @search.endpoint`  
`ai config @search.key`  

**Create or update your Azure AI Search index**  
`ai search index create --name MyFiles --files *.md --blob-container https://...`  
`ai search index update --name MyFiles --files *.md --blob-container https://...`  

**See the persisted config from `ai search index create/update`**  
`ai config @search.index.name`  

**Use the search index in chat completions**  
`ai chat --user "What is the capital of France?" --index MyFiles`  

**Generate code for RAG + AI Search**  
`ai dev new openai-chat-streaming-with-data --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ builds on Chapter 4's console app  
◦ see how the helper class gives the LLM access to the AI Search index  
◦ see how the LLM sends back citations to the helper class  
◦ see how the helper class processes the citations  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

## CHAPTER 6: OpenAI Assistants API

➡️ [OpenAI Assistants API](#chapter-6-openai-assistants-api)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

**Differences between chat completions and assistants**  
◦ stateless vs stateful  
◦ customer controlled chat history vs threads  
◦ automatic context window management  
◦ advanced features: code interpreter, function calling, file search  

**Listing, creating, updating, and deleting assistants**  
`ai chat assistant`  
`ai chat assistant list`  
`ai chat assistant create --name MyAssistant`  
`ai chat assistant update --instructions @instructions.txt`  
`ai chat assistant delete --id ID`  

**See the persisted config from `ai chat assistant create/update`**  
`ai config @assistant.id`  

**Picking a new assistant**  
`ai chat assistant list`  
`ai config --set assistant.id ID`

**Clearing the assistant ID from the config**  
`ai config --clear assistant.id`  

## CHAPTER 7: OpenAI Assistants Basics

➡️ [OpenAI Assistants Basics](#chapter-7-openai-assistants-basics)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

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

## CHAPTER 8: OpenAI Assistants w/ Code Interpreter

➡️ [OpenAI Assistants w/ Code Interpreter](#chapter-8-openai-assistants-w-code-interpreter)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

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

## CHAPTER 9: OpenAI Assistants w/ Function Calling

➡️ [OpenAI Assistants w/ Function Calling](#chapter-9-openai-assistants-w-function-calling)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

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

## CHAPTER 10: OpenAI Assistants w/ File Search

➡️ [OpenAI Assistants w/ File Search](#chapter-10-openai-assistants-w-file-search)  

🛑 Setup w/ Azure OpenAI in [chapter 2](#chapter-2-setup-w-azure-openai)  

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

## CHAPTER 11: Setup w/ GitHub Model Marketplace

➡️ [Setup w/ GitHub Model Marketplace](#chapter-11-setup-w-github-model-marketplace)  

**See the available models**  
◦ https://github.com/marketplace/models/  
◦ Discuss how this is similar to Azure AI Model Catalog in chapter 14  
◦ Discuss how this is similar to OpenAI API in chapters 3-5  

**Initialize connection to GitHub Model Marketplace**  
`ai init github`  
◦ ⇛ Enter your GitHub personal access token from https://github.com/settings/tokens  
◦ ⇛ Enter the model you want to use (e.g. `gpt-4o`, `gpt-4o-mini`, `Mistral-large-2407`, etc.)  

## CHAPTER 12: GitHub Model Chat Completion Basics

➡️ [Chat Completion Basics](#chapter-12-github-model-chat-completion-basics)  

🛑 Setup w/ GitHub Model Marketplace in [chapter 11](#chapter-11-setup-w-github-model-marketplace)  

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

## CHAPTER 13: GitHub Model Chat Completions W/ Function Calling

➡️ [Chat Completions W/ Function Calling](#chapter-13-github-model-chat-completions-w-function-calling)  

🛑 Setup w/ GitHub Model Marketplace in [chapter 11](#chapter-11-setup-w-github-model-marketplace)  

... 🚧 UNDER CONSTRUCTION ...  

## CHAPTER 14: Setup w/ AI Studio and the Model Catalog

➡️ [AI Studio and the Model Catalog](#chapter-14-setup-w-ai-studio-and-the-model-catalog)  

**Explore the Azure AI Model Catalog**  
◦ https://ai.azure.com/explore/models  
◦ Discuss how this is similar to GitHub Model Marketplace in chapter 11  
◦ Discuss how this is similar to OpenAI API in chapters 3-5  

**Deploy a model w/ Azure AI Studio**  
◦ https://learn.microsoft.com/en-us/azure/ai-studio/how-to/deploy-models-serverless  

**Initialize connection to Azure AI Inference endpoint**  
`ai init inference`  
◦ ⇛ Enter your Azure AI Inference endpoint  
◦ ⇛ Enter your Azure AI Inference key  

**See the persisted config from `ai init inference`**  
`ai config @chat.endpoint`  
`ai config @chat.key`  

## CHAPTER 15: AI Studio Chat Completions Basics

➡️ [Chat Completions Basics](#chapter-15-ai-studio-chat-completions-basics)  

🛑 Setup w/ AI Studio and the Model Catalog in [chapter 14](#chapter-14-setup-w-ai-studio-and-the-model-catalog)  

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

## CHAPTER 16: AI Studio Chat Completions w/ Function Calling

➡️ [Chat Completions w/ Function Calling](#chapter-16-ai-studio-chat-completions-w-function-calling)  

🛑 Setup w/ AI Studio and the Model Catalog in [chapter 14](#chapter-14-setup-w-ai-studio-and-the-model-catalog)  

... 🚧 UNDER CONSTRUCTION ...  

## CHAPTER 17: Setup w/ ONNX and PHI-3 Models

➡️ [PHI-3 Models](#chapter-17-setup-w-onnx-and-phi-3-models)  

🚧 COMING SOON 🚧 ◦ `ai init phi-3` or `ai init onnx`  

◦ https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx  

**Setup locally:**  
`git lfs install`  
`git clone https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx`  
`git lfs checkout`  

◦ OR: Use the VS Code AI Toolkit to download the model  
◦ https://learn.microsoft.com/windows/ai/toolkit/  

**Setup the model path in the config so we can use it later**  
`ai config --set mp Phi-3-mini-4k-instruct-onnx\directml\directml-int4-awq-block-128`  

## CHAPTER 18: ONNX Chat Completions

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

## CHAPTER 19: ONNX Chat Completions w/ Function Calling

➡️ [ONNX Chat Completions w/ Function Calling](#chapter-19-onnx-chat-completions-w-function-calling)  

🛑 Setup w/ ONNX and PHI-3 Models in [chapter 17](#chapter-17-setup-w-onnx-and-phi-3-models)  

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

## CHAPTER 20: Setup w/ Speech

➡️ [Setup w/ Speech](#chapter-20-setup-w-speech)  

**Initialize Azure Speech resource (select or create)**  
`ai init speech`  
◦ ⇛ Select your Azure subscription  
◦ ⇛ Select or create your Azure Speech resource  

**See the persisted config from `ai init speech`**  
`ai config @speech.endpoint`  
`ai config @speech.key`  

## CHAPTER 21: Speech Synthesis

➡️ [Speech Synthesis](#chapter-21-speech-synthesis)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

**Synthesize speech from text**  
`ai speech synthesize --interactive`  
`ai speech synthesize --text "Hello, world!"`  
`ai speech synthesize --text "Hello, world!" --audio-output hello-world.wav`  
`ai speech synthesize --text "Hello, world!" --audio-output hello-world.mp3 --format mp3`  

**List available voices**  
`ai speech synthesize --voices`  

**Synthesize speech with a specific voice**  
`ai speech synthesize --text "Hello, world!" --voice en-US-AriaNeural`  

**Generate code for speech synthesis**  
`ai dev new list speech`  
`ai dev new text-to-speech --csharp` or `--python` or `--javascript` ...  
`ai dev new text-to-speech-with-file --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

## CHAPTER 22: Speech Recognition

➡️ [Speech Recognition](#chapter-22-speech-recognition)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

**Recognize speech from audio**  
`ai speech recognize --microphone`  
`ai speech recognize --file hello-world.wav`  
`ai speech recognize --file hello-world.mp3 --format mp3`  

**Recognize speech with a specific language**  
`ai speech recognize --microphone --language es-ES`  
`ai speech recognize --file hello-world.wav --languages es-ES;fr-FR`  

**Output SRT or VTT subtitles**  
`ai speech recognize --file hello-world.wav --output-srt-file captions.srt`  
`ai speech recognize --file hello-world.wav --output-vtt-file captions.vtt`  

**Generate code for speech recognition**  
`ai dev new list speech`  
`ai dev new speech-to-text --csharp` or `--python` or `--javascript` ...  
`ai dev new speech-to-text-continuous --csharp` or `--python` or `--javascript` ...  
`ai dev new speech-to-text-with-file --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

## CHAPTER 23: Speech Translation

➡️ [Speech Translation](#chapter-23-speech-translation)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

**Translate speech from one language to another**  
`ai speech translate --microphone --source en-uS --target es-ES`  
`ai speech translate --file hello-world.wav --source en-uS --target es-ES`  
`ai speech translate --file hello-world.wav --source en-uS --targets es-ES;fr-FR;zh-CN`  

**Output SRT or VTT subtitles**  
`ai speech translate --file hello-world.wav --source en-uS --target es-ES --output-srt-file captions.srt`  

**Generate code for speech translation**  
`ai dev new list translate`  
`ai dev new speech-to-text-with-translation --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

## CHAPTER 24: Speech Recognition w/ Keyword Spotting

➡️ [Speech Recognition w/ Keyword Spotting](#chapter-24-speech-recognition-w-keyword-spotting)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

**Create and download custom keyword model**  
◦ https://speech.microsoft.com/portal/customkeyword  
◦ https://learn.microsoft.com/azure/ai-services/speech-service/custom-keyword-basics  

**Recognize speech from audio with keyword spotting**  
`ai speech recognize --interactive --keyword keyword.table`  
`ai speech recognize --file hello-world.wav --keyword keyword.table`  

**Generate code for speech recognition with keyword spotting**  
`ai dev new list keyword`  
`ai dev new speech-to-text-with-keyword --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  

## CHAPTER 25: Multi-Modal AI

➡️ [Multi-Modal AI](#chapter-25-multi-modal-ai)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

...

## CHAPTER 26: Chat Completions w/ Speech Input

➡️ [Chat Completions w/ Speech Input](#chapter-26-chat-completions-w-speech-input)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

...

## CHAPTER 27: Chat Completions w/ Speech Input and Output

➡️ [Chat Completions w/ Speech Input and Output](#chapter-27-chat-completions-w-speech-input-and-output)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

...

## CHAPTER 28: Chat Completions w/ Image Input

➡️ [Chat Completions w/ Image Input](#chapter-28-chat-completions-w-image-input)  

...

## CHAPTER 29: Chat Completions w/ Image Output

➡️ [Chat Completions w/ Image Output](#chapter-29-chat-completions-w-image-output)  

...

## CHAPTER 30: Semantic Kernel Basics

➡️ [Semantic Kernel Basics](#chapter-30-semantic-kernel-basics)  

...

## CHAPTER 31: Semantic Kernel w/ Function Calling

➡️ [Semantic Kernel w/ Function Calling](#chapter-31-semantic-kernel-w-function-calling)  

...

## CHAPTER 32: Semantic Kernel w/ Basic Agents

➡️ [Semantic Kernel w/ Basic Agents](#chapter-32-semantic-kernel-w-basic-agents)  

...

## CHAPTER 33: Semantic Kernel w/ Advanced Agents

➡️ [Semantic Kernel w/ Advanced Agents](#chapter-33-semantic-kernel-w-advanced-agents)  

...

