---
hide:
- navigation
- toc
---
# OpenAI Chat in Go

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API in a Go console application.

[:material-file-code: main.go](./samples/openai-chat-go/main.go)  
[:material-file-code: openai_chat_completions_hello_world.go](./samples/openai-chat-go/openai_chat_completions_hello_world.go)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat --go
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat' in 'openai-chat-go' (3 files)...

    go.mod
    main.go
    openai_chat_completions_hello_world.go

    Generating 'openai-chat' in 'openai-chat-go' (3 files)... DONE!
    ```

## main.go

**STEP 1**: Read the configuration settings from environment variables:

``` go title="main.go"
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

**STEP 2**: Initialize the helper class with the configuration settings:

``` go title="main.go"
chat, err := NewOpenAIChatCompletionsExample(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt)
if err != nil {
    log.Fatalf("ERROR: %s", err)
}
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` go title="main.go"
for {
    fmt.Print("User: ")
    input, _ := getUserInput()
    if input == "exit" || input == "" {
        break
    }

    response, err := chat.GetChatCompletions(input)
    if err != nil {
        log.Fatalf("ERROR: %s", err)
    }

    fmt.Printf("Assistant: %s\n\n", response)
}
```

## openai_chat_completions_hello_world.go

**STEP 1**: Create the client and initialize chat message history with a system message:

``` go title="openai_chat_completions_hello_world.go"
client, err := azopenai.NewClientWithKeyCredential(openAIEndpoint, keyCredential, nil)
if err != nil {
    return nil, err
}

messages := []azopenai.ChatRequestMessageClassification{
    &azopenai.ChatRequestSystemMessage{
        Content: &openAISystemPrompt,
    },
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` go title="openai_chat_completions_hello_world.go"
func (chat *OpenAIChatCompletionsExample) GetChatCompletions(userPrompt string) (string, error) {
    chat.options.Messages = append(chat.options.Messages, &azopenai.ChatRequestUserMessage{Content: azopenai.NewChatRequestUserMessageContent(userPrompt)})
```

**STEP 3**: Send the chat message history to the OpenAI Chat API and process the response:

``` go title="openai_chat_completions_hello_world.go"
resp, err := chat.client.GetChatCompletions(context.TODO(), *chat.options, nil)
if err != nil {
    return "", err
}

responseContent := *resp.Choices[0].Message.Content
chat.options.Messages = append(chat.options.Messages, &azopenai.ChatRequestAssistantMessage{Content: to.Ptr(responseContent)})

return responseContent, nil
}
```