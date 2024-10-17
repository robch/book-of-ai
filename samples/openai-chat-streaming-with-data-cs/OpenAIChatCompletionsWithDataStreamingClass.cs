//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using Azure;
using Azure.AI.OpenAI;
using Azure.AI.OpenAI.Chat;
using Azure.Identity;
using OpenAI;
using OpenAI.Chat;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

#pragma warning disable AOAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

public class OpenAIChatCompletionsWithDataStreamingClass
{
    public OpenAIChatCompletionsWithDataStreamingClass(string openAIEndpoint, string openAIAPIKey, string openAIChatDeploymentName, string openAISystemPrompt, string searchEndpoint, string searchApiKey, string searchIndexName, string embeddingsEndpoint)
    {
        _openAISystemPrompt = openAISystemPrompt;

        _client = string.IsNullOrEmpty(openAIAPIKey)
            ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
            : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));

        _chatClient = _client.GetChatClient(openAIChatDeploymentName);
        _messages = new List<ChatMessage>();

        _options = new();
        _options.AddDataSource(new AzureSearchChatDataSource()
        {
            Authentication = DataSourceAuthentication.FromApiKey(searchApiKey),
            Endpoint = new Uri(searchEndpoint),
            IndexName = searchIndexName,
            QueryType = DataSourceQueryType.VectorSimpleHybrid, // Use VectorSimpleHybrid to get the best vector and keyword search query types.
            VectorizationSource = DataSourceVectorizer.FromEndpoint(new Uri(embeddingsEndpoint), DataSourceAuthentication.FromApiKey(openAIAPIKey))
        });

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
        var response = _chatClient.CompleteChatStreamingAsync(_messages, _options);
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
    private ChatCompletionOptions _options;
    private OpenAIClient _client;
    private ChatClient _chatClient;
    private List<ChatMessage> _messages;
}