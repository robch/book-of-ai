# `ai search index create`

The `ai search index create` command creates a vector index.

### Usage
```
ai search index create [...]
```

### Options
| Option | Description |
| --- | --- |
| `--subscription SUBSCRIPTION` | Specifies the Azure subscription. |
| `--index-name NAME` | Specifies the name of the search index. |
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

### Examples
``` bash title="Creates a search index with files from a blob container"
ai search index create --index-name product-info --files "*.md" --blob-container https://crbn.blob.core.windows.net/product-info
```
