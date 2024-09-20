The `ai chat` command allows you to interact w/ GitHub Marketplace models from the command line.  

--8<-- "tips/tip-github-prereqs.md"

### User and System Prompts

The `ai chat` command sends a user prompt to GitHub's AI Inference service and displays the response.

--8<-- "code-blocks/ai-chat-user-what-is-the-capital-of-france.md"

--8<-- "code-blocks/ai-chat-user-what-is-the-capital-of-france-system-always-answer-in-french.md"

--8<-- "code-blocks/ai-chat-question-what-is-the-capital-of-france.md"

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

### Model Selection

``` bash title="Use a different model"
ai chat --interactive --model Mistral-large-2407
```

``` bash title="Set default model"
ai config --set chat.model Mistral-large-2407
```

``` bash title="Use default model"
ai chat --interactive
```

--8<-- "generate-code-for-scenarios-button-section.md"
