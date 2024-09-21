---
hide:
- toc
---
# OpenAI Assistants API

The `ai` CLI allows you to create, manage, and interact with OpenAI's Assistants API.

--8<-- "tips/tip-openai-prereqs.md"

### Listing, creating, updating, and deleting assistants

```bash title="List all assistants"
ai chat assistant list
```

```bash title="Create an assistant"
ai chat assistant create --name MyAssistant
```

```bash title="Update an assistant"
ai chat assistant update --instructions @instructions.txt
```

```bash title="Delete an assistant"
ai chat assistant delete --id ID
```

### See the persisted config from `ai chat assistant create/update`

```bash title="View assistant configuration"
ai config @assistant.id
```

### Picking a new assistant

```bash title="List all assistants"
ai chat assistant list
```

```bash title="Set assistant by ID"
ai config --set assistant.id ID
```

### Clearing the assistant ID from the config

```bash title="Clear assistant ID"
ai config --clear assistant.id
```
