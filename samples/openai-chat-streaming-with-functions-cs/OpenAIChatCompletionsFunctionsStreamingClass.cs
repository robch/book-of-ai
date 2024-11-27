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

public class OpenAIChatCompletionsFunctionsStreamingClass
{
    public OpenAIChatCompletionsFunctionsStreamingClass(string openAIEndpoint, string openAIAPIKey, string openAIChatDeploymentName, string openAISystemPrompt, FunctionFactory factory)
    {
        _openAISystemPrompt = openAISystemPrompt;
        _functionFactory = factory;

        _client = string.IsNullOrEmpty(openAIAPIKey)
            ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
            : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));

        _chatClient = _client.GetChatClient(openAIChatDeploymentName);
        _messages = new List<ChatMessage>();

        _options = new ChatCompletionOptions();
        foreach (var tool in _functionFactory.GetChatTools())
        {
            _options.Tools.Add(tool);
        }

        _functionCallContext = new FunctionCallContext(_functionFactory, _messages);
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
        while (true)
        {
            var response = _chatClient.CompleteChatStreamingAsync(_messages, _options);
            await foreach (var update in response)
            {
                _functionCallContext.CheckForUpdate(update);

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

            if (_functionCallContext.TryCallFunctions(responseContent))
            {
                _functionCallContext.Clear();
                continue;
            }

            _messages.Add(ChatMessage.CreateAssistantMessage(responseContent));
            return responseContent;
        }
    }

    private string _openAISystemPrompt;
    private FunctionFactory _functionFactory;
    private FunctionCallContext _functionCallContext;
    private ChatCompletionOptions _options;
    private OpenAIClient _client;
    private ChatClient _chatClient;
    private List<ChatMessage> _messages;
}