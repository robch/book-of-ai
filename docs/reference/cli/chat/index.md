# `ai chat`

The `ai chat` command initiates interactive or non-interactive conversations with an AI language model (e.g. OpenAI's GPT4).

### Usage

``` bash
ai chat [...]
ai chat <sub-command> [...]
```

### Options

| Option                       | Description                      |
|------------------------------|----------------------------------|
| `--deployment DEPLOYMENT`    | Specifies the deployment to use. |
| `--endpoint ENDPOINT`        | Specifies the endpoint to use. |
| `--key KEY`                  | Specifies the key to use. |
| `--interactive`              | Specifies whether the chat is interactive. |
| `--system PROMPT`            | Specifies the system prompt to use. |
| `--user MESSAGE`             | Specifies the user message to use. |
| `--chat-history FILE`        | Specifies the chat history file to use. |
| `--assistant-id ID`          | Specifies the assistant ID to use. |
| `--thread-id ID`             | Specifies the thread ID to use. |
| `--index-name INDEX`         | Specifies the index name to use. |
| `--search-endpoint ENDPOINT` | Specifies the search endpoint to use. |
| `--search-api-key KEY`       | Specifies the search API key to use. |
| `--built-in-functions TRUE`  | Specifies whether to use built-in functions. |
| `--custom-functions PATTERN` | Specifies the custom functions pattern to use. |
| `--temperature TEMPERATURE`  | Specifies the temperature to use. |
| `--max-tokens MAX_TOKENS`    | Specifies the maximum tokens to use. |
| `--top-p TOP_P`              | Specifies the top-p to use. |
| `--n N`                      | Specifies the n to use. |
| `--output-answer`            | Specifies the output answer file to use. |
| `--output-chat-history`      | Specifies the output chat history file to use. |
| `--input-chat-history`       | Specifies the input chat history file to use. |
| `--model`                    | Specifies the GitHub model to use. |

### Sub-Commands

| Sub-Command                    | Description                                                                                   |
|--------------------------------|-----------------------------------------------------------------------------------------------|
| [ai chat assistant](/reference/cli/chat/assistant/index.md) | Initiates an assistant with specific configurations (e.g., vector store-based solutions). |

### Examples

``` bash title="Initialize OpenAI and start an interactive session"
ai init openai
ai chat --interactive
```

``` bash title="Send a user message to the AI"
ai chat --user "What can you do?"
```

``` bash title="_Send a user message with a specific temperature_"
ai chat --user "Tell me a joke." --temperature 0.7
```