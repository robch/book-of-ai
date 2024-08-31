---
hide:
- toc
icon: material/server-network-outline
---

# AI Studio Setup

The `ai init inference` command initializes the connection to the Azure AI Inference endpoint. This initialization is required to use the models available in the Azure AI Model Catalog with the Azure AI CLI or with the Azure AI Inference SDK packages.

--8<-- "docs/tip-setup-prereqs.md"

``` bash title="Initialize connection to Azure AI Inference Endpoint"
ai init inference
```

> **STEP 1**: ⇛ Enter your Azure AI Inference endpoint  
> **STEP 2**: ⇛ Enter your Azure AI Inference key  

??? tip "If you don't have an Azure AI Inference endpoint..."
    [Model Catalog](https://ai.azure.com/explore/models)  
    Explore the Azure AI Model Catalog and Deploy a model to an endpoint

    [Azure AI Serverless Model Documentation](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/deploy-models-serverless)  
    Learn how to deploy an Azure AI Serverless Model to a new Azure AI Inference endpoint.

### View Configuration

To view the persisted configuration, use the following commands:

``` bash title="Get chat endpoint"
ai config @chat.endpoint
```

``` bash title="Get chat key"
ai config @chat.key
```
