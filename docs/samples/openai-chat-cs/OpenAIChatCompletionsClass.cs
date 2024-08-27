//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using Azure;
using OpenAI;
using OpenAI.Chat;
using Azure.AI.OpenAI;
using Azure.Identity;
using System;

public class OpenAIChatCompletionsClass
{
    public OpenAIChatCompletionsClass(string openAIEndpoint, string openAIAPIKey, string openAIChatDeploymentName, string openAISystemPrompt)
    {
        _openAISystemPrompt = openAISystemPrompt;

        _client = string.IsNullOrEmpty(openAIAPIKey)
            ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
            : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));
        _chatClient = _client.GetChatClient(openAIChatDeploymentName);
        _messages = new List<ChatMessage>();

        ClearConversation();
    }

    public void ClearConversation()
    {
        _messages.Clear();
        _messages.Add(ChatMessage.CreateSystemMessage(_openAISystemPrompt));
    }

    public string GetChatCompletion(string userPrompt)
    {
        _messages.Add(ChatMessage.CreateUserMessage(userPrompt));

        var response = _chatClient.CompleteChat(_messages);
        var responseText = string.Join("", response.Value.Content
            .Where(x => x.Kind == ChatMessageContentPartKind.Text)
            .Select(x => x.Text)
            .ToList());

        _messages.Add(ChatMessage.CreateAssistantMessage(responseText));
        return responseText;
    }

    private string _openAISystemPrompt;
    private OpenAIClient _client;
    private ChatClient _chatClient;
    private List<ChatMessage> _messages;
}