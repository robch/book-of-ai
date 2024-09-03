The `ai` CLI allows you to extend OpenAI's models with custom data sources using Azure AI Search.

--8<-- "tips/tip-openai-prereqs.md"

### Initialize Azure AI Search resource

```bash title="Initialize Azure AI Search"
ai init search
```
Follow the prompts to select your Azure subscription and Azure AI Search resource.

### See the persisted config from `ai init search`

```bash title="Get search endpoint"
ai config @search.endpoint
```

```bash title="Get search key"
ai config @search.key
```

### Create or update your Azure AI Search index

```bash title="Create search index"
ai search index create --name MyFiles --files *.md --blob-container https://...
```

```bash title="Update search index"
ai search index update --name MyFiles --files *.md --blob-container https://...
```

### See the persisted config from `ai search index create/update`

```bash title="Get search index name"
ai config @search.index.name
```

### Use the search index in chat completions

```bash title="Use search index in chat"
ai chat --user "What is the capital of France?" --index MyFiles
```
