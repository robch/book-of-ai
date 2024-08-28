---
hide:
- navigation
- toc
---
# OpenAI Chat Completions Streaming with Data in Go

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat Completions API with data streaming in a Go console application.

[:material-file-code: main.go](./samples/openai-chat-streaming-with-data-go/main.go)  
[:material-file-code: openai_chat_completions_streaming_with_data_hello_world.go](./samples/openai-chat-streaming-with-data-go/openai_chat_completions_streaming_with_data_hello_world.go)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-data --go
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-go' (3 files)...

    go.mod
    main.go
    openai_chat_completions_streaming_with_data_hello_world.go

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-go' (3 files)... DONE!
    ```


## main.go

**STEP 1**: Read the configuration settings from environment variables:

``` go title="main.go"
openAIAPIKey := os.Getenv("AZURE_OPENAI_API_KEY")
if openAIAPIKey == "" {
    openAIAPIKey = "<insert your OpenAI API key here>"
}
openAIApiVersion := os.Getenv("AZURE_OPENAI_API_VERSION")
if openAIApiVersion == "" {
    openAIApiVersion = "<insert your open api version here>"
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

openAIEmbeddingsDeploymentName := os.Getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT")
if openAIEmbeddingsDeploymentName == "" {
    openAIEmbeddingsDeploymentName = "<insert your OpenAI embeddings deployment name here>"
}

openAIEndpoint = strings.TrimSuffix(openAIEndpoint, "/")

azureSearchApiKey := os.Getenv("AZURE_AI_SEARCH_KEY")
if azureSearchApiKey == "" {
    azureSearchApiKey = "<insert your search api key here>"
}

azureSearchEndpoint := os.Getenv("AZURE_AI_SEARCH_ENDPOINT")
if azureSearchEndpoint == "" {
    azureSearchEndpoint = "<insert your search endpoint here>"
}

azureSearchIndexName := os.Getenv("AZURE_AI_SEARCH_INDEX_NAME")
if azureSearchIndexName == "" {
    azureSearchIndexName = "<insert your search index name here>"
}

if openAIEndpoint == "" || openAIAPIKey == "" || openAIChatDeploymentName == "" || openAISystemPrompt == "" {
    fmt.Println("Please set the environment variables.")
    os.Exit(1)
}

chat, err := NewOpenAIChatCompletionsWithDataStreamingExample(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, azureSearchEndpoint, azureSearchApiKey, azureSearchIndexName, openAIEmbeddingsDeploymentName)
if err != nil {
    log.Fatalf("ERROR: %s", err)
}

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

**STEP 2**: Initialize the helper class with the configuration settings:

``` go title="main.go"
chat, err := NewOpenAIChatCompletionsWithDataStreamingExample(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, azureSearchEndpoint, azureSearchApiKey, azureSearchIndexName, openAIEmbeddingsDeploymentName)
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

## openai_chat_completions_streaming_with_data_hello_world.go

**STEP 1**: Create the client and initialize chat message history with a system message:

``` go title="openai_chat_completions_streaming_with_data_hello_world.go"
type OpenAIChatCompletionsWithDataStreamingExample struct {
    client   *azopenai.Client
    options  *azopenai.ChatCompletionsOptions
}

func NewOpenAIChatCompletionsWithDataStreamingExample(
    openAIEndpoint string,
    openAIAPIKey string,
    openAIChatDeploymentName string,
    openAISystemPrompt string,
    azureSearchEndpoint string,
    azureSearchApiKey string,
    azureSearchIndexName string,
    openAIEmbeddingsDeploymentName string,
    ) (*OpenAIChatCompletionsWithDataStreamingExample, error) {
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
            Messages:       messages,
            AzureExtensionsOptions: []azopenai.AzureChatExtensionConfigurationClassification{
                &azopenai.AzureCognitiveSearchChatExtensionConfiguration{
                    Parameters: &azopenai.AzureCognitiveSearchChatExtensionParameters{
                        Endpoint:  &azureSearchEndpoint,
                        IndexName: &azureSearchIndexName,
                        Authentication: &azopenai.OnYourDataAPIKeyAuthenticationOptions{
                            Key: &azureSearchApiKey,
                        },
                        QueryType: to.Ptr(azopenai.AzureCognitiveSearchQueryTypeVectorSimpleHybrid),
                        EmbeddingDependency: &azopenai.OnYourDataDeploymentNameVectorizationSource{
                            DeploymentName: &openAIEmbeddingsDeploymentName,
                            Type:           to.Ptr(azopenai.OnYourDataVectorizationSourceTypeDeploymentName),
                        },
                    },
                },
            },
        }

        return &OpenAIChatCompletionsWithDataStreamingExample{
            client:  client,
            options: options,
        }, nil
    }
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` go title="openai_chat_completions_streaming_with_data_hello_world.go"
func (chat *OpenAIChatCompletionsWithDataStreamingExample) ClearConversation() {
    chat.options.Messages = chat.options.Messages[:1]
}

func (chat *OpenAIChatCompletionsWithDataStreamingExample) GetChatCompletionsStream(userPrompt string, callback func(content string)) (string, error) {
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

            if callback != nil {
                callback(content)
            }
            responseContent += content
        }
    }

    chat.options.Messages = append(chat.options.Messages, &azopenai.ChatRequestAssistantMessage{Content: to.Ptr(responseContent)})
    return responseContent, nil
}
```