---
hide:
- navigation
- toc
---
# OpenAI Chat with Data Streaming in C\#

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API incorporating data streaming from Azure AI Search in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-cs/Program.cs)  
[:material-file-code: OpenAIChatCompletionsWithDataStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-data-cs/OpenAIChatCompletionsWithDataStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-data --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-cs' (3 files)...

    OpenAIChatCompletionsWithDataStreaming.csproj
    OpenAIChatCompletionsWithDataStreamingClass.cs
    Program.cs

    Generating 'openai-chat-streaming-with-data' in 'openai-chat-streaming-with-data-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
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
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` csharp title="Program.cs"
var chat = new OpenAIChatCompletionsWithDataStreamingClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, searchEndpoint, searchApiKey, searchIndexName, openAIEmbeddingsEndpoint);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` csharp title="Program.cs"
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
```

## OpenAIChatCompletionsWithDataStreamingClass.cs

**STEP 1**: Create the client and initialize chat message history with a system message and set up data sources:

``` csharp title="OpenAIChatCompletionsWithDataStreamingClass.cs"
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
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` csharp title="OpenAIChatCompletionsWithDataStreamingClass.cs"
public async Task<string> GetChatCompletionsStreamingAsync(string userPrompt, Action<StreamingChatCompletionUpdate>? callback = null)
{
    _messages.Add(ChatMessage.CreateUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the streaming OpenAI Chat API and process each update:

``` csharp title="OpenAIChatCompletionsWithDataStreamingClass.cs"
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
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update:

``` csharp title="OpenAIChatCompletionsWithDataStreamingClass.cs"
        if (string.IsNullOrEmpty(content)) continue;

        responseContent += content;
        if (callback != null) callback(update);
    }
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response:

``` csharp title="OpenAIChatCompletionsWithDataStreamingClass.cs"
    _messages.Add(ChatMessage.CreateAssistantMessage(responseContent));
    return responseContent;
}
```