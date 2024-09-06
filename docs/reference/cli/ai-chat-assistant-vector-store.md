# `ai chat assistant vector-store`

The `ai chat assistant vector-store` commands manage OpenAI Assistant Vector Stores.

### Usage

``` bash
a chat assistant vector-store [command]
```

### Options

| Option | Description |
| ------ | ----------- |
| `--endpoint ENDPOINT` | (see: ai help chat endpoint) |
| `--key KEY` | (see: ai help chat key) |

### Sub-commands

| Sub-command | Description |
| ----------- | ----------- |
| [create](./ai-chat-assistant-vector-store-create.md) | Creates a new OpenAI Assistant Vector Store |
| [update](./ai-chat-assistant-vector-store-update.md) | Updates an OpenAI Assistant Vector Store |
| [delete](./ai-chat-assistant-vector-store-delete.md) | Deletes an existing OpenAI Assistant Vector Store |
| [list](./ai-chat-assistant-vector-store-list.md) | Lists OpenAI Assistant Vector Stores |
| [get](./ai-chat-assistant-vector-store-get.md) | Gets an existing OpenAI Assistant Vector Store |

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

### See Also

- [ai chat assistant examples](#)
- [ai chat assistant vector-store examples](#)
- [ai help find topics chat assistant vector-store](#)

---

This PUBLIC PREVIEW version may change at any time. See: https://aka.ms/azure-ai-cli-public-preview

---
