package main

import (
    "context"
    "errors"
    "io"

    "github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
    "github.com/Azure/azure-sdk-for-go/sdk/azcore"
    "github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
)

type OpenAIChatCompletionsStreamingExample struct {
    client   *azopenai.Client
    options  *azopenai.ChatCompletionsOptions
}

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

func (chat *OpenAIChatCompletionsStreamingExample) ClearConversation() {
    chat.options.Messages = chat.options.Messages[:1]
}

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