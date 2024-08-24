➡️ [OpenAI Assistants API](todo.md#chapter-6-openai-assistants-api)

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
