package main

import (
    "context"
    "errors"
    "io"

    "github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
    "github.com/Azure/azure-sdk-for-go/sdk/azcore"
    "github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
)

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