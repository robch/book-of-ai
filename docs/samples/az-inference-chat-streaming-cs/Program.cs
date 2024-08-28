//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using System;

public class Program
{
    public static async Task Main(string[] args)
    {
        var aiChatAPIKey = Environment.GetEnvironmentVariable("AZURE_AI_CHAT_API_KEY") ?? "<insert your OpenAI API key here>";
        var aiChatEndpoint = Environment.GetEnvironmentVariable("AZURE_AI_CHAT_ENDPOINT") ?? "<insert your OpenAI endpoint here>";
        var aiChatModel = Environment.GetEnvironmentVariable("AZURE_AI_CHAT_MODEL"); // null is fine
        var systemPrompt = Environment.GetEnvironmentVariable("SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";

        if (string.IsNullOrEmpty(aiChatAPIKey) || aiChatAPIKey.StartsWith("<insert") ||
            string.IsNullOrEmpty(aiChatEndpoint) || aiChatEndpoint.StartsWith("<insert") ||
            string.IsNullOrEmpty(systemPrompt) || systemPrompt.StartsWith("<insert"))
        {
            Console.WriteLine("To use Azure AI Inference, set the following environment variables:");
            Console.WriteLine("- AZURE_AI_CHAT_API_KEY\n- AZURE_AI_CHAT_ENDPOINT\n- AZURE_AI_CHAT_MODEL (optional)\n- SYSTEM_PROMPT (optional)");
            Environment.Exit(1);
        }

		var chat = new AzureAIInferenceChatCompletionsStreaming(aiChatEndpoint, aiChatAPIKey, aiChatModel, systemPrompt);

        while (true)
        {
            Console.Write("User: ");
            var userPrompt = Console.ReadLine();
            if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

            Console.Write("\nAssistant: ");
            var response = await chat.GetChatCompletionsStreamingAsync(userPrompt, update => {
                var text = update.ContentUpdate;
                Console.Write(text);
            });
            Console.WriteLine("\n");
        }
    }
}