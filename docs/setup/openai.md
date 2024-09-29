---
hide:
- toc
icon: material/server-network-outline
---

# Azure OpenAI Setup

The `ai init openai` command allows selection or creation of an Azure OpenAI resource.

--8<-- "tips/tip-setup-prereqs.md"

```bash title="Select or create Azure OpenAI resource"
ai init openai
```

> **STEP 1**: ⇛ Select your Azure subscription (if prompted)  
> **STEP 2**: ⇛ Select or create your Azure OpenAI resource  
> **STEP 3**: ⇛ Select or create an OpenAI chat[^1] model deployment (e.g. gpt-4o)  
> **STEP 4**: ⇛ Select or create an OpenAI embeddings[^2] model deployment (optional)  

### View Configuration

To view the persisted configuration, use the following commands:

--8<-- "code-blocks/ai-config-chat-endpoint.md"

--8<-- "code-blocks/ai-config-chat-key.md"

[^1]: Chat models are used to generate human-like text based on the input they are given
[^2]: Embeddings models are used to interpret and quantify relationships and similarities in data.