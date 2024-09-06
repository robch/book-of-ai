# `ai search`

### Usage
``` bash
ai search index [OPTIONS]
```

### Description
Indexes in Azure AI Studio are used to store and retrieve data for retrieval augmented generation (RAG). 

### Options
| Option | Description |
| --- | --- |
| `--subscription SUBSCRIPTION` | Specifies the Azure subscription. |
| `--group GROUP` | Specifies the resource group that contains the Azure AI project. |
| `--project NAME` | Specifies the Azure AI project name. |
| `--index-name NAME` | Specifies the name of the search index. |
| `--index-kind KIND` | Specifies the kind of the search index. |
| `--search-api-key KEY` | Specifies the search API key. |
| `--search-endpoint ENDPOINT` | Specifies the search endpoint. |
| `--data-source-connection NAME` | Specifies the data source connection. |
| `--blob-container ENDPOINT/NAME` | Specifies the blob container. |
| `--indexer-name NAME` | Specifies the indexer name. |
| `--skillset-name NAME` | Specifies the skillset name. |
| `--id-field NAME` | Specifies the ID field name. |
| `--content-field NAME` | Specifies the content field name. |
| `--vector-field NAME` | Specifies the vector field name. |
| `--embedding-deployment DEPLOYMENT` | Specifies the embedding deployment. |
| `--embedding-model MODEL` | Specifies the embedding model. |
| `--file FILE` | Specifies the file. |
| `--files FILES` | Specifies the files. |
| `--external-source` | Specifies the external source. |

### Sub-commands
 | Sub-command | Description |
| --- | --- |
| create | Create a search index. |
| update | Update a search index. |

### Examples

``` bash title="Create a search index"
ai search index create --index-name YourIndexName --files YourFiles --search-api-key YourSearchApiKey --search-endpoint YourSearchEndpoint --group rg-contosoaihub --project contoso-outdoor-proj --subscription YourSubscriptionId
```

``` bash title="Update a search index"
ai search index update --index-name YourIndexName --files YourFiles --search-api-key YourSearchApiKey --search-endpoint YourSearchEndpoint --group rg-contosoaihub --project contoso-outdoor-proj --subscription YourSubscriptionId
```
