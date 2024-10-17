//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using System;

public class Program
{
    public static void Main(string[] args)
    {
        var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your OpenAI API key here>";
        var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your OpenAI endpoint here>";
        var openAIChatDeploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your OpenAI chat deployment name here>";
        var openAISystemPrompt = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";

		var chat = new OpenAIChatCompletionsClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt);

        while (true)
        {
            Console.Write("User: ");
            var userPrompt = Console.ReadLine();
            if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

            var response = chat.GetChatCompletion(userPrompt);
            Console.WriteLine($"\nAssistant: {response}\n");
        }
    }
}