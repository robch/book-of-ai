---
hide:
- navigation
- toc
---
# OpenAI Chat Streaming in C\#

This sample demonstrates how to use the OpenAI Chat API with streaming in a C# console application.

[:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-cs/Program.cs)  
[:material-file-code: OpenAIChatCompletionsStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-streaming-cs/OpenAIChatCompletionsStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-cs' (3 files)...

    OpenAIChatCompletionsStreaming.csproj
    OpenAIChatCompletionsStreamingClass.cs
    Program.cs

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your OpenAI API key here>";
var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your OpenAI endpoint here>";
var openAIChatDeploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your OpenAI chat deployment name here>";
var openAISystemPrompt = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` csharp title="Program.cs"
var chat = new OpenAIChatCompletionsStreamingClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt);
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

## OpenAIChatCompletionsStreamingClass.cs

**STEP 1**: Create the client and initialize chat message history with a system message:

``` csharp title="OpenAIChatCompletionsStreamingClass.cs"
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
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` csharp title="OpenAIChatCompletionsStreamingClass.cs"
public async Task<string> GetChatCompletionsStreamingAsync(string userPrompt, Action<StreamingChatCompletionUpdate>? callback = null)
{
    _messages.Add(ChatMessage.CreateUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the streaming OpenAI Chat API and process each update:

``` csharp title="OpenAIChatCompletionsStreamingClass.cs"
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
```

**STEP 4**: For each non-empty update, accumulate the response, and invoke the callback for the update:

``` csharp title="OpenAIChatCompletionsStreamingClass.cs"
        if (string.IsNullOrEmpty(content)) continue;

        responseContent += content;
        if (callback != null) callback(update);
    }
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response:

``` csharp title="OpenAIChatCompletionsStreamingClass.cs"
    _messages.Add(ChatMessage.CreateAssistantMessage(responseContent));
    return responseContent;
}
```
