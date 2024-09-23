---
hide:
- navigation
- toc
---
# Sample Overview: OpenAI Chat Streaming (Go)

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API with streaming in a Go application. The sample covers the following aspects:

- Getting connection information and secrets from environment variables
- Using a helper class to encapsulate the OpenAI API calls
- Getting input from the user
- Sending the input to the helper class
- Getting the response from the helper class
- Deeper dive into the helper class

## Files in this sample

- [`go.mod`](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-go/go.mod): The module definition and dependencies for this Go application.
- [`main.go`](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-go/main.go): The main entry point of the application where user input is handled and the chat completions are streamed.
- [`openai_chat_completions_streaming_hello_world.go`](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-go/openai_chat_completions_streaming_hello_world.go): The helper class that interacts with the OpenAI Chat API.

## `go.mod`

```go title="go.mod"
module openai_chat_completions_streaming_hello_world
require (
	github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai v0.4.1
	github.com/Azure/azure-sdk-for-go/sdk/azcore v1.9.1
)
```

## `main.go`

**STEP 1**: Read the configuration settings from environment variables.

```go title="main.go"
openAIAPIKey := os.Getenv("AZURE_OPENAI_API_KEY")
if openAIAPIKey == "" {
    openAIAPIKey = "<insert your OpenAI API key here>"
}
openAIEndpoint := os.Getenv("AZURE_OPENAI_ENDPOINT")
if openAIEndpoint == "" {
    openAIEndpoint = "<insert your OpenAI endpoint here>"
}
openAIChatDeploymentName := os.Getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")
if openAIChatDeploymentName == "" {
    openAIChatDeploymentName = "<insert your OpenAI chat deployment name here>"
}
openAISystemPrompt := os.Getenv("AZURE_OPENAI_SYSTEM_PROMPT")
if openAISystemPrompt == "" {
    openAISystemPrompt = "You are a helpful AI assistant."
}
```

**STEP 2**: Validate the environment variables and exit if any required variable is missing.

```go title="main.go"
if openAIEndpoint == "" || openAIAPIKey == "" || openAIChatDeploymentName == "" || openAISystemPrompt == "" {
    fmt.Println("Please set the environment variables.")
    os.Exit(1)
}
```

**STEP 3**: Initialize the chat helper with the configuration settings.

```go title="main.go"
chat, err := NewOpenAIChatCompletionsStreamingExample(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt)
if err != nil {
    log.Fatalf("ERROR: %s", err)
}
```

**STEP 4**: Enter user interaction loop to read input, get chat completions, and print responses.

```go title="main.go"
for {
    fmt.Print("User: ")
    input, _ := getUserInput()
    if input == "exit" || input == "" {
        break
    }

    fmt.Printf("\nAssistant: ")
    _, err := chat.GetChatCompletionsStream(input, func(content string) {
        fmt.Printf("%s", content)
    })
    if err != nil {
        log.Fatalf("ERROR: %s", err)
    }
    fmt.Printf("\n\n")
}
```

## `openai_chat_completions_streaming_hello_world.go`

**STEP 1**: Initialize the helper class with provided settings.

```go title="openai_chat_completions_streaming_hello_world.go"
func NewOpenAIChatCompletionsStreamingExample(openAIEndpoint string, openAIAPIKey string, openAIChatDeploymentName string, openAISystemPrompt string) (*OpenAIChatCompletionsStreamingExample, error) {
    keyCredential := azcore.NewKeyCredential(openAIAPIKey)

    client, err := azopenai.NewClientWithKeyCredential(openAIEndpoint, keyCredential, nil)
    if err != nil {
        return nil, err
    }

    messages := []azopenai.ChatRequestMessageClassification{
        &azopenai.ChatRequestSystemMessage{
            Content: &openAISystemPrompt,
        },
    }

    options := &azopenai.ChatCompletionsOptions{
        DeploymentName: &openAIChatDeploymentName,
        Messages: messages,
    }

    return &OpenAIChatCompletionsStreamingExample {
        client: client,
        options: options,
    }, nil
}
```

**STEP 2**: Clear conversation history.

```go title="openai_chat_completions_streaming_hello_world.go"
func (chat *OpenAIChatCompletionsStreamingExample) ClearConversation() {
    chat.options.Messages = chat.options.Messages[:1]
}
```

**STEP 3**: Get chat completions stream, invoke callback for each message, and update message history.

```go title="openai_chat_completions_streaming_hello_world.go"
func (chat *OpenAIChatCompletionsStreamingExample) GetChatCompletionsStream(userPrompt string, callback func(content string)) (string, error) {
    chat.options.Messages = append(chat.options.Messages, &azopenai.ChatRequestUserMessage{Content: azopenai.NewChatRequestUserMessageContent(userPrompt)})

    resp, err := chat.client.GetChatCompletionsStream(context.TODO(), *chat.options, nil)
    if err != nil {
        return "", err
    }
    defer resp.ChatCompletionsStream.Close()

    responseContent := ""
    for {
        chatCompletions, err := resp.ChatCompletionsStream.Read()
        if errors.Is(err, io.EOF) {
            break
        }
        if err != nil {
            return "", err
        }

        for _, choice := range chatCompletions.Choices {

            content := ""
            if choice.Delta.Content != nil {
                content = *choice.Delta.Content
            }

            if choice.FinishReason != nil {
                finishReason := *choice.FinishReason
                if finishReason == azopenai.CompletionsFinishReasonTokenLimitReached {
                    content = content + "\nWARNING: Exceeded token limit!"
                }
            }

            if content == "" {
                continue
            }

            callback(content)
            responseContent += content
        }
    }

    chat.options.Messages = append(chat.options.Messages, &azopenai.ChatRequestAssistantMessage{Content: to.Ptr(responseContent)})
    return responseContent, nil
}
```