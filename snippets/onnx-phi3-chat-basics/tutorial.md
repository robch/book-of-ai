The `ai chat` command allows you to interact w/ ONNX models from the command line.

--8<-- "tips/tip-onnx-prereqs.md"

### Prompts

```bash title="One prompt"
ai chat --model-path @mp --user "What is the capital of France?"
```

```bash title="Interactive chat"
ai chat --model-path @mp --interactive
```

```bash title="System prompts"
ai chat --model-path @mp --interactive --system @prompt.txt
```

```bash title="User and system prompts"
ai chat --model-path @mp --interactive --system @prompt.txt --user "Tell me a joke"
```

### Answers and chat history

```bash title="Output answer to a file"
ai chat --model-path @mp --interactive --output-answer answer.txt
```

```bash title="Output chat history to a file"
ai chat --model-path @mp --interactive --output-chat-history history.jsonl
```

```bash title="Input chat history"
ai chat --model-path @mp --interactive --input-chat-history history.jsonl
```