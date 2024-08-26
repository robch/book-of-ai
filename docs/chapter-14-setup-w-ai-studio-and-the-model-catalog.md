# AI Studio Setup

``` bash title="Initialize Azure AI Inference Endpoint"
ai init inference
```

⇛ Enter your Azure AI Inference endpoint  
⇛ Enter your Azure AI Inference key  

``` bash title="See the persisted config from `ai init inference`"
ai config @chat.endpoint
ai config @chat.key
```

??? tip "If you don't have an Azure AI Inference endpoint..."
    [Model Catalog](https://ai.azure.com/explore/models)  
    Explore the Azure AI Model Catalog and Deploy a model to an endpoint

    [Azure AI Serverless Model Documentation](https://learn.microsoft.com/en-us/azure/ai-studio/how-to/deploy-models-serverless)  
    Learn how to deploy an Azure AI Serverless Model to a new Azure AI Inference endpoint.

