package main

import (
    "context"
    "errors"
    "io"

    "github.com/Azure/azure-sdk-for-go/sdk/ai/azopenai"
    "github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
)

type OpenAIChatCompletionsFunctionsStreamingExample struct {
    client              *azopenai.Client
    options             *azopenai.ChatCompletionsOptions
    functionFactory     *FunctionFactory
    functionCallContext *FunctionCallContext
}

func NewOpenAIChatCompletionsFunctionsStreamingExample(openAIEndpoint string, openAIAPIKey string, openAIChatDeploymentName string, openAISystemPrompt string, functionFactory *FunctionFactory) (*OpenAIChatCompletionsFunctionsStreamingExample, error) {
    keyCredential, err := azopenai.NewKeyCredential(openAIAPIKey)
    if err != nil {
        return nil, err
    }
    client, err := azopenai.NewClientWithKeyCredential(openAIEndpoint, keyCredential, nil)
    if err != nil {
        return nil, err
    }

    messages := []azopenai.ChatMessage{
        {Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr(openAISystemPrompt)},
    }

    options := &azopenai.ChatCompletionsOptions{
        Deployment: openAIChatDeploymentName,
        Messages: messages,
        FunctionCall: &azopenai.ChatCompletionsOptionsFunctionCall{
            Value: to.Ptr("auto"),
        },
        Functions: functionFactory.GetFunctionSchemas(),
    }

    return &OpenAIChatCompletionsFunctionsStreamingExample{
        client: client,
        options: options,
        functionCallContext: NewFunctionCallContext(functionFactory, options),
    }, nil
}

func (chat *OpenAIChatCompletionsFunctionsStreamingExample) ClearConversation() {
    chat.options.Messages = chat.options.Messages[:1]
}

func (chat *OpenAIChatCompletionsFunctionsStreamingExample) GetChatCompletionsStream(userPrompt string, callback func(content string)) (string, error) {
    chat.options.Messages = append(chat.options.Messages, azopenai.ChatMessage{Role: to.Ptr(azopenai.ChatRoleUser), Content: to.Ptr(userPrompt)})

    responseContent := ""
    for {
        resp, err := chat.client.GetChatCompletionsStream(context.TODO(), *chat.options, nil)
        if err != nil {
            return "", err
        }
        defer resp.ChatCompletionsStream.Close()

        for {
            chatCompletions, err := resp.ChatCompletionsStream.Read()
            if errors.Is(err, io.EOF) {
                break
            }
            if err != nil {
                return "", err
            }

            for _, choice := range chatCompletions.Choices {

                chat.functionCallContext.CheckForUpdate(choice)

                content := ""
                if choice.Delta.Content != nil {
                    content = *choice.Delta.Content
                }

                if choice.FinishReason != nil {
                    finishReason := *choice.FinishReason
                    if finishReason == azopenai.CompletionsFinishReasonLength {
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

        if chat.functionCallContext.TryCallFunction() != "" {
            chat.functionCallContext.Clear()
            continue
        }

        chat.options.Messages = append(chat.options.Messages, azopenai.ChatMessage{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr(responseContent)})
        return responseContent, nil
    }
}