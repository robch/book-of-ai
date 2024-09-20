The `ai` CLI allows you to extend OpenAI's models with custom data sources using File Search.

--8<-- "tips/tip-openai-prereqs.md"

### Create or Update Assistant

```bash title="Create assistant with file search"
ai chat assistant create --name MyFileAssistant --files "**/*.md"
```

```bash title="Update assistant's file search"
ai chat assistant update --files "**/*.txt"
```

### See Vector Store and persisted config

```bash title="List vector stores"
ai chat assistant vector-store list
```

```bash title="Get vector store"
ai chat assistant vector-store get
```

```bash title="See persisted config"
ai config @assistant.id
ai config @vector.store.id
```

### Update Vector Store directly

```bash title="Update vector store with one file"
ai chat assistant vector-store update --file README.md
```

```bash title="Update vector store with many files"
ai chat assistant vector-store update --files "**/*.txt"
```

### Use File Search

```bash title="Query with file search"
ai chat --user "Find information on markdown files."
```

```bash title="Interactive query with file search"
ai chat --user "Search for details on the latest updates." --interactive
```

### Delete the Assistant/Vector Store

```bash title="Delete the assistant"
ai chat assistant delete
ai config --clear assistant.id
```

```bash title="Delete the vector store"
ai chat assistant vector-store delete
ai config --clear vector.store.id
```

--8<-- "generate-code-for-scenarios-button-section.md"
