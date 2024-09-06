# `ai search index`

The `ai search index` commands manage vector indexes used in Retrieval Augmented Generation solutions (aka "Chat w/ my data").

### Usage
``` bash
ai search index <command> [...]
```

### Sub-commands
 | Sub-command | Description |
| --- | --- |
| [ai search index create](./create.md) | Create a search index. |
| [ai search index update](./update.md) | Update a search index. |

### Examples

``` bash title="Create a search index"
ai search index create --index-name YourIndexName --files YourFiles --search-api-key YourSearchApiKey --search-endpoint YourSearchEndpoint --group rg-contosoaihub --project contoso-outdoor-proj --subscription YourSubscriptionId
```

``` bash title="Update a search index"
ai search index update --index-name YourIndexName --files YourFiles --search-api-key YourSearchApiKey --search-endpoint YourSearchEndpoint --group rg-contosoaihub --project contoso-outdoor-proj --subscription YourSubscriptionId
```
