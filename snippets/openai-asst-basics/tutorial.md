The `ai chat` commands allow you to create, manage, and interact with OpenAI's Assistants and persisted threads.

--8<-- "tips/tip-openai-prereqs.md"

### Create an Assistant

```bash title="Create a simple assistant"
ai chat assistant create --name MyAssistant
```

### Threads

```bash title="Start an interactive chat"
ai chat --interactive
```

```bash title="Continue with a previous thread"
ai chat --interactive --thread-id ID
```

```bash title="Ask a question and save the thread ID"
ai chat --question "..." --output-thread-id myNewThread.txt
```

```bash title="Use a saved thread ID"
ai chat --question "..." --thread-id @myNewThread.txt
```

```bash title="Interactive chat with thread ID and save history"
ai chat --interactive --thread-id @myNewThread.txt --output-chat-history history.jsonl
```

--8<-- "generate-code-for-scenarios-button-section.md"
