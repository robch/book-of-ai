---
title: How to use the AI search command.
titleSuffix: Azure AI Studio
description: This article provides instructions on how to use the AI search command with the Azure AI CLI.
manager: nitinme
ms.service: azure-ai-studio
ms.topic: how-to
ms.date: 2/26/2024
ms.reviewer: eur
ms.author: eur
author: eric-urban
---

# How to use the AI search command

[!INCLUDE [Azure AI Studio preview](../../includes/preview-ai-studio.md)]

The `ai search` command in the Azure AI CLI provides a set of commands to work with vector search indexes that you use for retrieval augmented generation (RAG). 

Here's a table of the `ai search` commands available in the Azure AI CLI. For more information, see the help and examples for each command.

| Command | Description |
| --- | --- |
| [ai search index](#ai-search-index-command) | Provides a set of commands to work with vector search indexes that you use for retrieval augmented generation (RAG). |
| `ai search query` | Net yet available. |

## AI search index command

Indexes in Azure AI Studio are used to store and retrieve data for retrieval augmented generation (RAG). 

You use the commands in this table to manage Azure AI Search indexes.

| Command | Description |
| --- | --- |
| `ai search index create` | Create a search index. |
| `ai search index delete` | Net yet available. |
| `ai search index list` | Net yet available. |
| `ai search index update` | Update a search index. |

The following table describes the parameters for the `ai search index` commands. Some parameters are required, while others are optional. For more information, see the help for each command.

| Option | Description |
| --- | --- |
| `--subscription SUBSCRIPTION`<sup>1</sup> | Specifies the Azure subscription. |
| `--group GROUP`<sup>1</sup> | Specifies the resource group that contains the Azure AI project. |
| `--project NAME`<sup>1</sup> | Specifies the Azure AI project name. |
| `--index-name NAME`<sup>2</sup> | Specifies the name of the search index. |
| `--index-kind KIND` | Specifies the kind of the search index. |
| `--search-api-key KEY`<sup>1</sup> | Specifies the search API key. |
| `--search-endpoint ENDPOINT`<sup>1</sup> | Specifies the search endpoint. |
| `--data-source-connection NAME` | Specifies the data source connection. |
| `--blob-container ENDPOINT/NAME` | Specifies the blob container. |
| `--indexer-name NAME` | Specifies the indexer name. |
| `--skillset-name NAME` | Specifies the skillset name. |
| `--id-field NAME` | Specifies the ID field name. |
| `--content-field NAME` | Specifies the content field name. |
| `--vector-field NAME` | Specifies the vector field name. |
| `--embedding-deployment DEPLOYMENT`<sup>1</sup> | Specifies the embedding deployment. |
| `--embedding-model MODEL`<sup>1</sup> | Specifies the embedding model. |
| `--file FILE` | Specifies the file. |
| `--files FILES` | Specifies the files. |
| `--external-source` | Specifies the external source. |

<sup>1</sup> If you previously configured settings via `ai init`, you can omit the parameter. The setting is automatically retrieved from the local AI CLI configuration datastore. You can specify the parameter to override the persisted value.

<sup>2</sup> If you previously created an index via `ai search index create` or `ai search index update`, you can omit the parameter. The setting is automatically retrieved from the local AI CLI configuration datastore. You can specify the parameter to override the persisted value.

### Example to create a search index

You use the `ai search index create` command to create a search index. For example, you can create a search index for an Azure AI Search service.

```bash
ai search index create \
--index-name YourIndexName \
--files YourFiles \
--search-api-key YourSearchApiKey \
--search-endpoint YourSearchEndpoint \
--group rg-contosoaihub \
--project contoso-outdoor-proj \
--subscription YourSubscriptionId
```

> [!NOTE]
> If you already have a search index for the specified project, index name, and search endpoint, the command will update the existing index with the new index endpoint and key.

The command returns a JSON-formatted string similar to the following example. You see that the index is created. The `search.index.name` (`product-info`) is saved in the `/.ai/data` folder.

```json
{
  "index": {
    "name": "product-info",
    "path": "azureml://subscriptions/a5b1ca8b-bab3-4c26-aebe-4cf7ec4791a0/resourcegroups/rg-contosoaihub/workspaces/contoso-outdoor-proj/datastores/workspaceblobstore/paths/LocalUpload/caacc7115de8432708685fd375a6bbd1/product-info-mlindex/",
    "version": "2",
    "description": null,
    "tags": {},
    "properties": null
  }
}
```

The `search.index.name` (`product-info`) is saved in the `/.ai/data` folder.

### Example to update a search index

You use the `ai search index update` command to update a search index. For example, you can update a search index for an Azure AI Search service.

```bash
ai search index update \
--index-name YourIndexName \
--files YourFiles \
--search-api-key YourSearchApiKey \
--search-endpoint YourSearchEndpoint \
--group rg-contosoaihub \
--project contoso-outdoor-proj \
--subscription YourSubscriptionId
```

The command returns a JSON-formatted string similar to the following example. You see that the index is updated. The `search.index.name` (`product-info`) is saved in the `/.ai/data` folder.

```json
{
  "index": {
    "name": "product-info",
    "path": "azureml://subscriptions/a5b1ca8b-bab3-4c26-aebe-4cf7ec4791a0/resourcegroups/rg-contosoaihub/workspaces/contoso-outdoor-proj/datastores/workspaceblobstore/paths/LocalUpload/caacc7115de8432708685fd375a6bbd1/product-info-mlindex/",
    "version": "2",
    "description": null,
    "tags": {},
    "properties": null
  }
}
```

The `search.index.name` (`product-info`) is saved in the `/.ai/data` folder.

## Related content

- [Azure AI CLI reference](./commands-summary.md)
- [Install the Azure AI CLI](cli-get-started.md)
- [Develop with VS Code (Web) in Azure AI Studio](../../how-to/vscode-web.md)
