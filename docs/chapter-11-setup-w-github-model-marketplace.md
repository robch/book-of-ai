---
hide:
- toc
icon: material/server-network-outline
---

# GitHub Model Setup

The `ai init github` command initializes the connection to the GitHub Model Marketplace. This initialization is required to use the models available in the GitHub Model Marketplace with the Azure AI CLI or with the Azure AI Inference SDK packages.

--8<-- "docs/tip-setup-prereqs.md"

``` bash title="Initialize connection to GitHub Model Marketplace"
ai init github
```

> **STEP 1**: ⇛ Enter your GitHub personal access token from [https://github.com/settings/tokens](https://github.com/settings/tokens)  
> **STEP 2**: ⇛ Enter the model you want to use (e.g. `gpt-4o`, ...)

??? tip "If you don't know what model to use..."
    [GitHub Model Marketplace](https://github.com/marketplace/models/)  
    See what models you can experiment with for free.
    
### View Configuration

To view the persisted configuration, use the following commands:

``` bash title="Get chat endpoint"
ai config @chat.endpoint
```

``` bash title="Get chat key"
ai config @chat.key
```
