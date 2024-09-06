# `ai chat assistant vector-store`

The `ai chat assistant vector-store` commands manage OpenAI Assistant Vector Stores.

### Usage

``` bash
ai chat assistant vector-store [command]
```

### Sub-commands

| Sub-command | Description |
| ----------- | ----------- |
| [ai chat assistant vector-store create](/reference/cli/chat/assistant/vector-store/create.md) | Creates a new OpenAI Assistant Vector Store |
| [ai chat assistant vector-store delete](/reference/cli/chat/assistant/vector-store/delete.md) | Deletes an existing OpenAI Assistant Vector Store |
| [ai chat assistant vector-store get](/reference/cli/chat/assistant/vector-store/get.md) | Gets an existing OpenAI Assistant Vector Store |
| [ai chat assistant vector-store list](/reference/cli/chat/assistant/vector-store/list.md) | Lists OpenAI Assistant Vector Stores |
| [ai chat assistant vector-store update](/reference/cli/chat/assistant/vector-store/update.md) | Updates an OpenAI Assistant Vector Store |

### Examples

``` bash title="Create a new Vector Store"
ai chat assistant vector-store create --name "My Vector Store" --files "**/*.md"
```

``` bash title="Update an existing Vector Store"
ai chat assistant vector-store update --name "My Vector Store" --files "**/*.md"
```

``` bash title="Delete an existing Vector Store"
ai chat assistant vector-store delete --id vs_xdAyb8HQsXRKnqCFPCTvwCYa
```

``` bash title="List all Vector Stores"
ai chat assistant vector-store list
```

``` bash title="Get a specific Vector Store"
ai chat assistant vector-store get --id vs_xdAyb8HQsXRKnqCFPCTvwCYa
```
