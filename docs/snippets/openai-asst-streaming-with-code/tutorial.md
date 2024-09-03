The `ai` CLI allows you to create, manage, and interact with OpenAI's Assistants, including use of Code Interpreter.

--8<-- "tips/tip-openai-prereqs.md"

### Create or Update Assistant

```bash title="Create Assistant with Code Interpreter"
ai chat assistant create --name MyCodeAssistant --code-interpreter
```

```bash title="Update Assistant with Code Interpreter"
ai chat assistant update --code-interpreter
```

### Use Code Interpreter

```bash title="Interactive Chat with Code Interpreter"
ai chat --interactive --question "how many e's are there in the pledge of allegiance?"
```

### Delete Assistant

```bash title="Delete Assistant"
ai chat assistant delete
```

```bash title="Clear Assistant ID"
ai config --clear assistant.id
```
