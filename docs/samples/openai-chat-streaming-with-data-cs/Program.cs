//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using OpenAI.Chat;
using System;

public class Program
{
    public static async Task Main(string[] args)
    {
        var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your OpenAI API key here>";
        var openAIApiVersion = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_VERSION") ?? "<insert your open api version here>";
        var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your OpenAI endpoint here>";
        var openAIChatDeploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your OpenAI chat deployment name here>";
        var openAISystemPrompt = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";

        var openAIEmbeddingsDeploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_EMBEDDING_DEPLOYMENT") ?? "<insert your OpenAI embeddings deployment name here>";
        var openAIEmbeddingsEndpoint = $"{openAIEndpoint.Trim('/')}/openai/deployments/{openAIEmbeddingsDeploymentName}/embeddings?api-version={openAIApiVersion}";

        var searchApiKey = Environment.GetEnvironmentVariable("AZURE_AI_SEARCH_KEY") ?? "<insert your search api key here>";
        var searchEndpoint = Environment.GetEnvironmentVariable("AZURE_AI_SEARCH_ENDPOINT") ?? "<insert your search endpoint here>";
        var searchIndexName = Environment.GetEnvironmentVariable("AZURE_AI_SEARCH_INDEX_NAME") ?? "<insert your search index name here>";

        var chat = new OpenAIChatCompletionsWithDataStreamingClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, searchEndpoint, searchApiKey, searchIndexName, openAIEmbeddingsEndpoint);

        while (true)
        {
            Console.Write("User: ");
            var userPrompt = Console.ReadLine();
            if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

            Console.Write("\nAssistant: ");
            var response = await chat.GetChatCompletionsStreamingAsync(userPrompt, update => {
                var text = string.Join("", update.ContentUpdate
                    .Where(x => x.Kind == ChatMessageContentPartKind.Text)
                    .Select(x => x.Text)
                    .ToList());
                Console.Write(text);
            });
            Console.WriteLine("\n");
        }
    }
}