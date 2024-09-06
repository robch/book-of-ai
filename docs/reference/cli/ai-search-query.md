# `ai search query`

### Usage
``` bash
ai search query [<options>]
```

### Options
| Option | Description |
| --- | --- |
| `--subscription` | Specifies the Azure subscription. |
| `--project` | Specifies the Azure AI project name. |
| `--group` | Specifies the resource group that contains the Azure AI project. |
| `--search-api-key` | Specifies the search API key. |
| `--search-endpoint` | Specifies the search endpoint. |
| `--embedding-deployment` | Specifies the embedding deployment. |
| `--embedding-model` | Specifies the embedding model. |
| `--file` | Specifies the file. |
| `--files` | Specifies the files. |

### Examples

``` bash title="Search for a query in the specified file"
ai search query --file "example.txt" --search-endpoint "https://example-search-endpoint" --search-api-key "your-api-key"
```
``` bash title="Search for a query using specific project and group"
ai search query --project "your-project-name" --group "your-resource-group" --search-endpoint "https://example-search-endpoint" --search-api-key "your-api-key"
```
``` bash title="Search for a query using multiple files"
ai search query --files "file1.txt,file2.md" --embedding-deployment "your-deployment" --embedding-model "your-model" --search-api-key "your-api-key" --search-endpoint "https://example-search-endpoint"
```

---

Please save the new markdown file as `ai-search-query.md` in the `docs/reference/cli/` directory.
