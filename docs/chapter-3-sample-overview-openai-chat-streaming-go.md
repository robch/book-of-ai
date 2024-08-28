---
hide:
- toc
---

# Sample Overview: OpenAI Chat Streaming (Go)

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat Completions API with streaming in a Go application. The sample covers the following aspects:

- Getting connection information and secrets from environment variables
- Using a helper class to encapsulate the OpenAI API calls
- Getting input from the user
- Sending the input to the helper class
- Getting the response from the helper class
- Deeper dive into the helper class

## Files in this sample

- [`go.mod`](./samples/openai-chat-streaming-go/go.mod): The module definition and dependencies for this Go application.
- [`main.go`](./samples/openai-chat-streaming-go/main.go): The main entry point of the application where user input is handled and the chat completions are streamed.
- [`openai_chat_completions_streaming_hello_world.go`](./samples/openai-chat-streaming-go/openai_chat_completions_streaming_hello_world.go): The helper class that interacts with the OpenAI Chat Completions API.

## `go.mod`

```go
title="go.mod"
{{ read_file('samples/openai-chat-streaming-go/go.mod') }}
```

## `main.go`

```go
title="main.go"
{{ read_file('samples/openai-chat-streaming-go/main.go') }}
```

## `openai_chat_completions_streaming_hello_world.go`

```go
title="openai_chat_completions_streaming_hello_world.go"
{{ read_file('samples/openai-chat-streaming-go/openai_chat_completions_streaming_hello_world.go') }}
```

## How It Works

### Environment Variables

The application expects the following environment variables to be set:

- `AZURE_OPENAI_API_KEY`: The API key for the OpenAI service.
- `AZURE_OPENAI_ENDPOINT`: The endpoint URL for the OpenAI service.
- `AZURE_OPENAI_CHAT_DEPLOYMENT`: The deployment name for the OpenAI chat service.
- `AZURE_OPENAI_SYSTEM_PROMPT`: The system prompt to use for the chat completions.

### Main Application Flow (`main.go`)

1. **Read Environment Variables**: The application reads the required environment variables and sets default values if they are not provided.
2. **Initialize Chat Completion Helper**: An instance of `OpenAIChatCompletionsStreamingExample` is created using the provided environment variables.
3. **User Interaction Loop**: The application enters a loop where it reads user input, sends it to the chat completion helper, and prints the response.

### Helper Class (`openai_chat_completions_streaming_hello_world.go`)

1. **Initialization**: The `NewOpenAIChatCompletionsStreamingExample` function initializes the helper class with the provided endpoint, API key, deployment name, and system prompt.
2. **Clear Conversation**: The `ClearConversation` method clears the conversation history, retaining only the system prompt.
3. **Get Chat Completions Stream**: The `GetChatCompletionsStream` method sends the user input to the OpenAI service and streams the response back, invoking a callback function for each received message.
