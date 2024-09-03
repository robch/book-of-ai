The `ai chat` command allows you to interact w/ Azure AI models from the command line.

--8<-- "tips/tip-ai-studio-prereqs.md"

### User and System Prompts

The `ai chat` command sends a user prompt to GitHub's AI Inference service and displays the response.

``` bash title="User prompts are questions or statements to the model"
ai chat --user "What is the capital of France?"
```

``` bash title="System prompts are special instructions for the model"
ai chat --user "What is the capital of France." --system "Always answer in French."
```

``` bash title="--question is an alias for --user"
ai chat --question "What is the capital of France?"
```

### User and System prompts from Files

``` bash title="User prompt from a file"
ai chat --question "@question.txt"
```

``` bash title="System prompt from a file"
ai chat --question "What is the capital of France?" --system "@system.txt"
```

### Interactive Chat

The `--interactive` flag allows back-and-forth conversations with the model.

``` bash title="Interactive chat"
ai chat --interactive
```

``` bash title="Interactive with an initial question"
ai chat --interactive --question "What is the capital of France?"
```

``` bash title="Interactive with a system prompt"
ai chat --interactive --system "Always answer in French."
```

### Answers and chat history

``` bash title="Output answer to a file"
ai chat --question "What is the capital of France?" --output-answer answer.txt
```

``` bash title="Output chat history to a file"
ai chat --interactive --output-chat-history history.jsonl
```

``` bash title="Input chat history from a file"
ai chat --interactive --input-chat-history history.jsonl
```