//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

public class Program
{
    public static async Task<int> Main(string[] args)
    {
        var AZURE_OPENAI_SYSTEM_PROMPT = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";

        // NOTE: Never deploy your API Key in client-side environments like browsers or mobile apps
        // SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety

        // Get the required environment variables
        var AZURE_OPENAI_API_KEY = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
        var AZURE_OPENAI_API_VERSION = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_VERSION") ?? "<insert your Azure OpenAI API version here>";
        var AZURE_OPENAI_ENDPOINT = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";
        var AZURE_OPENAI_CHAT_DEPLOYMENT = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your Azure OpenAI chat deployment name here>";
        var AZURE_AI_SEARCH_KEY = Environment.GetEnvironmentVariable("AZURE_AI_SEARCH_KEY") ?? "<insert your Azure AI Search key here>";
        var AZURE_AI_SEARCH_ENDPOINT = Environment.GetEnvironmentVariable("AZURE_AI_SEARCH_ENDPOINT") ?? "<insert your Azure AI Search endpoint here>";
        var AZURE_AI_SEARCH_INDEX_NAME = Environment.GetEnvironmentVariable("AZURE_AI_SEARCH_INDEX_NAME") ?? "<insert your Azure AI Search index name here>";
        var AZURE_OPENAI_EMBEDDING_DEPLOYMENT = Environment.GetEnvironmentVariable("AZURE_OPENAI_EMBEDDING_DEPLOYMENT") ?? "<insert your OpenAI embeddings deployment name here>";

        // Check if the required environment variables are set
        var azureOk = 
            AZURE_OPENAI_API_KEY != null && !AZURE_OPENAI_API_KEY.StartsWith("<insert") &&
            AZURE_OPENAI_API_VERSION != null && !AZURE_OPENAI_API_VERSION.StartsWith("<insert") &&
            AZURE_OPENAI_CHAT_DEPLOYMENT != null && !AZURE_OPENAI_CHAT_DEPLOYMENT.StartsWith("<insert") &&
            AZURE_OPENAI_ENDPOINT != null && !AZURE_OPENAI_ENDPOINT.StartsWith("<insert");
        var searchOk = 
            AZURE_AI_SEARCH_KEY != null && !AZURE_AI_SEARCH_KEY.StartsWith("<insert") &&
            AZURE_AI_SEARCH_ENDPOINT != null && !AZURE_AI_SEARCH_ENDPOINT.StartsWith("<insert") &&
            AZURE_AI_SEARCH_INDEX_NAME != null && !AZURE_AI_SEARCH_INDEX_NAME.StartsWith("<insert");

        var ok = azureOk && searchOk &&
            AZURE_OPENAI_SYSTEM_PROMPT != null && !AZURE_OPENAI_SYSTEM_PROMPT.StartsWith("<insert");

        if (!ok)
        {
            Console.WriteLine(
                "To use Azure OpenAI, set the following environment variables:\n" +
                "\n  AZURE_AI_SEARCH_KEY" +
                "\n  AZURE_AI_SEARCH_ENDPOINT" +
                "\n  AZURE_AI_SEARCH_INDEX_NAME" +
                "\n  AZURE_OPENAI_SYSTEM_PROMPT" +
                "\n  AZURE_OPENAI_API_KEY" +
                "\n  AZURE_OPENAI_API_VERSION" +
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

        #pragma warning disable SKEXP0010
        var dataConfig = new AzureOpenAIChatCompletionWithDataConfig
        {
            CompletionModelId = AZURE_OPENAI_CHAT_DEPLOYMENT!,
            CompletionEndpoint = AZURE_OPENAI_ENDPOINT!,
            CompletionApiKey = AZURE_OPENAI_API_KEY!,
            CompletionApiVersion = AZURE_OPENAI_API_VERSION!,
            DataSourceEndpoint = AZURE_AI_SEARCH_ENDPOINT!,
            DataSourceApiKey = AZURE_AI_SEARCH_KEY!,
            DataSourceIndex = AZURE_AI_SEARCH_INDEX_NAME!
        };

        // Create a kernel with the Azure OpenAI chat completion service
        var builder = Kernel.CreateBuilder();
        builder.AddAzureOpenAIChatCompletion(dataConfig);

        var AZURE_OPENAI_EMBEDDING_ENDPOINT = $"{AZURE_OPENAI_ENDPOINT!.Trim('/')}/openai/deployments/{AZURE_OPENAI_EMBEDDING_DEPLOYMENT}/embeddings?api-version={AZURE_OPENAI_API_VERSION}";
        builder.AddAzureOpenAITextEmbeddingGeneration(
            AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
            AZURE_OPENAI_EMBEDDING_ENDPOINT,
            AZURE_OPENAI_API_KEY!);

        var kernel = builder.Build();
        #pragma warning restore SKEXP0010

        // Create the streaming chat completions helper
        var chat = new SemanticKernelChatCompletionsWithDataStreamingClass(AZURE_OPENAI_SYSTEM_PROMPT!, kernel);

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
