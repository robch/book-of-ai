---
hide:
- navigation
- toc
---
# Azure AI Inferencing Chat Streaming in C\#

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure AI Inference Chat API with streaming in a C# console application.

[:material-file-code: Program.cs](./samples/az-inference-chat-streaming-cs/Program.cs)  
[:material-file-code: AzureAIInferencingChatCompletionsStreamingClass.cs](./samples/az-inference-chat-streaming-cs/AzureAIInferencingChatCompletionsStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new az-inference-chat-streaming --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'az-inference-chat-streaming' in 'az-inference-chat-streaming-cs' (3 files)...

    AzureAIInferencingChatCompletionsStreaming.csproj
    AzureAIInferencingChatCompletionsStreamingClass.cs
    Program.cs

    Generating 'az-inference-chat-streaming' in 'az-inference-chat-streaming-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var aiChatAPIKey = Environment.GetEnvironmentVariable("AZURE_AI_CHAT_API_KEY") ?? "<insert your OpenAI API key here>";
var aiChatEndpoint = Environment.GetEnvironmentVariable("AZURE_AI_CHAT_ENDPOINT") ?? "<insert your OpenAI endpoint here>";
var aiChatModel = Environment.GetEnvironmentVariable("AZURE_AI_CHAT_MODEL"); // null is fine
var systemPrompt = Environment.GetEnvironmentVariable("SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` csharp title="Program.cs"
var chat = new AzureAIInferenceChatCompletionsStreaming(aiChatEndpoint, aiChatAPIKey, aiChatModel, systemPrompt);
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
        var text = update.ContentUpdate;
        Console.Write(text);
    });
    Console.WriteLine("\n");
}
```

## AzureAIInferencingChatCompletionsStreamingClass.cs

**STEP 1**: Create the client and initialize chat message history with a system message:

``` csharp title="AzureAIInferencingChatCompletionsStreamingClass.cs"
public AzureAIInferenceChatCompletionsStreaming(string aiChatEndpoint, string aiChatAPIKey, string? aiChatModel, string systemPrompt)
{
    _systemPrompt = systemPrompt;
    _aiChatModel = aiChatModel;

    _client = string.IsNullOrEmpty(aiChatAPIKey)
        ? new ChatCompletionsClient(new Uri(aiChatEndpoint), new DefaultAzureCredential())
        : new ChatCompletionsClient(new Uri(aiChatEndpoint), new AzureKeyCredential(aiChatAPIKey));
    _messages = new List<ChatRequestMessage>();

    ClearConversation();
}

public void ClearConversation()
{
    _messages.Clear();
    _messages.Add(new ChatRequestSystemMessage(_systemPrompt));
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` csharp title="AzureAIInferencingChatCompletionsStreamingClass.cs"
public async Task<string> GetChatCompletionsStreamingAsync(string userPrompt, Action<StreamingChatCompletionsUpdate>? callback = null)
{
    _messages.Add(new ChatRequestUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the streaming Azure AI Inference Chat API and process each update:

``` csharp title="AzureAIInferencingChatCompletionsStreamingClass.cs"
    var responseContent = string.Empty;
    var response = await _client.CompleteStreamingAsync(options);
    await foreach (var update in response)
    {
        var content = update.ContentUpdate;

        if (update.FinishReason == CompletionsFinishReason.ContentFiltered)
        {
            content = $"{content}\nWARNING: Content filtered!";
        }
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update:

``` csharp title="AzureAIInferencingChatCompletionsStreamingClass.cs"
        if (string.IsNullOrEmpty(content)) continue;

        responseContent += content;
        if (callback != null) callback(update);
    }
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response:

``` csharp title="AzureAIInferencingChatCompletionsStreamingClass.cs"
    _messages.Add(new ChatRequestAssistantMessage() { Content = responseContent });
    return responseContent;
}
```