//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using Azure;
using Azure.AI.OpenAI;
using Azure.Identity;
using OpenAI;
using OpenAI.Chat;
using System;

public class OpenAIChatCompletionsStreamingClass
{
    public OpenAIChatCompletionsStreamingClass(string openAIEndpoint, string openAIAPIKey, string openAIChatDeploymentName, string openAISystemPrompt)
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

    public async Task<string> GetChatCompletionsStreamingAsync(string userPrompt, Action<StreamingChatCompletionUpdate>? callback = null)
    {
        _messages.Add(ChatMessage.CreateUserMessage(userPrompt));

        var responseContent = string.Empty;
        var response = _chatClient.CompleteChatStreamingAsync(_messages);
        await foreach (var update in response)
        {
            var content = string.Join("", update.ContentUpdate
                .Where(x => x.Kind == ChatMessageContentPartKind.Text)
                .Select(x => x.Text)
                .ToList());

            if (update.FinishReason == ChatFinishReason.ContentFilter)
            {
                content = $"{content}\nWARNING: Content filtered!";
            }

            if (string.IsNullOrEmpty(content)) continue;

            responseContent += content;
            if (callback != null) callback(update);
        }

        _messages.Add(ChatMessage.CreateAssistantMessage(responseContent));
        return responseContent;
    }

    private string _openAISystemPrompt;
    private OpenAIClient _client;
    private ChatClient _chatClient;
    private List<ChatMessage> _messages;
}