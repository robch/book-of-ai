---
hide:
- toc
icon: material/server-network-outline
---

# Azure OpenAI Setup

The `ai init openai` command initializes the Azure OpenAI resource. This command is used to select or create an Azure OpenAI resource. The Azure OpenAI resource is required to use the Azure OpenAI service.

--8<-- "tips/tip-setup-prereqs.md"

```bash title="Select or create Azure OpenAI resource"
ai init openai
```

> **STEP 1**: ⇛ Select your Azure subscription (if prompted)  
> **STEP 2**: ⇛ Select or create your Azure OpenAI resource  
> **STEP 3**: ⇛ Select or create an OpenAI chat model deployment (e.g. gpt-4o)  
> **STEP 4**: ⇛ Select or create an OpenAI embeddings model deployment (optional)  

### View Configuration

To view the persisted configuration, use the following commands:

--8<-- "code-blocks/ai-config-chat-endpoint.md"

--8<-- "code-blocks/ai-config-chat-key.md"
