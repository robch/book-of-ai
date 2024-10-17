//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using Microsoft.SemanticKernel;

public class Program
{
    public static async Task<int> Main(string[] args)
    {
        var AZURE_OPENAI_SYSTEM_PROMPT = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";

        // NOTE: Never deploy your API Key in client-side environments like browsers or mobile apps
        // SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety

        // Get the required environment variables
        var AZURE_OPENAI_API_KEY = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
        var AZURE_OPENAI_ENDPOINT = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";
        var AZURE_OPENAI_CHAT_DEPLOYMENT = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your Azure OpenAI chat deployment name here>";

        // Check if the required environment variables are set
        var azureOk = 
            AZURE_OPENAI_API_KEY != null && !AZURE_OPENAI_API_KEY.StartsWith("<insert") &&
            AZURE_OPENAI_CHAT_DEPLOYMENT != null && !AZURE_OPENAI_CHAT_DEPLOYMENT.StartsWith("<insert") &&
            AZURE_OPENAI_ENDPOINT != null && !AZURE_OPENAI_ENDPOINT.StartsWith("<insert");

        var ok = azureOk &&
            AZURE_OPENAI_SYSTEM_PROMPT != null && !AZURE_OPENAI_SYSTEM_PROMPT.StartsWith("<insert");

        if (!ok)
        {
            Console.WriteLine(
                "To use Azure OpenAI, set the following environment variables:\n" +
                "\n  AZURE_OPENAI_SYSTEM_PROMPT" +
                "\n  AZURE_OPENAI_API_KEY" +
                "\n  AZURE_OPENAI_CHAT_DEPLOYMENT" +
                "\n  AZURE_OPENAI_ENDPOINT"
            );
            Console.WriteLine(
                "\nYou can easily do that using the Azure AI CLI by doing one of the following:\n" +
                "\n  ai init" +
                "\n  ai dev shell" +
                "\n  dotnet run" +
                "\n" +
                "\n  or" +
                "\n" +
                "\n  ai init" +
                "\n  ai dev shell --run \"dotnet run\""
            );

            return 1;
        }


        // Create a kernel with the Azure OpenAI chat completion service
        var builder = Kernel.CreateBuilder();
        builder.AddAzureOpenAIChatCompletion(AZURE_OPENAI_CHAT_DEPLOYMENT!, AZURE_OPENAI_ENDPOINT!, AZURE_OPENAI_API_KEY!);
        var kernel = builder.Build();

        // Create the streaming chat completions helper
        var chat = new SemanticKernelChatCompletionsStreamingClass(AZURE_OPENAI_SYSTEM_PROMPT!, kernel);

        // Loop until the user types 'exit'
        while (true)
        {
            // Get user input
            Console.Write("User: ");
            var userPrompt = Console.ReadLine();
            if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

            // Get the response
            Console.Write("\nAssistant: ");
            await chat.GetStreamingChatMessageContentsAsync(userPrompt, (content) =>
                Console.Write(content.Content)
            );

            Console.WriteLine("\n");
        }

        return 0;
    }
}
