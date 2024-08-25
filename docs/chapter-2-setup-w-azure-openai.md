➡️ [**Setup w/ Azure OpenAI**](todo.md#chapter-2-setup-w-azure-openai)

**Initialize Azure OpenAI resource (select or create)**  
```bash
ai init openai
```

⇛ Select your Azure subscription  
⇛ Select or create your Azure OpenAI resource  
⇛ Select or create an OpenAI chat model deployment (e.g. gpt-4o)  
⇛ Select or create an OpenAi embeddings model deployment  

**See the persisted config from `ai init openai`**  
```bash
ai config @chat.endpoint
ai config @chat.key
```

