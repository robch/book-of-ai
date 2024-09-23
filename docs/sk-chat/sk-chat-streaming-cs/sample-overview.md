---
hide:
- navigation
- toc
---
# Semantic Kernel Chat Streaming in C#

This sample demonstrates how to use the Semantic Kernel Chat API with streaming in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-streaming-cs/Program.cs)  
[:material-file-code: SemanticKernelChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-streaming-cs/SemanticKernelChatCompletionsStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new sk-chat-streaming --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'sk-chat-streaming' in 'sk-chat-streaming-cs' (3 files)...

    sk-chat-streaming.csproj
    SemanticKernelChatCompletionsStreamingClass.cs
    Program.cs

    Generating 'sk-chat-streaming' in 'sk-chat-streaming-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables.

``` csharp title="Program.cs"
var AZURE_OPENAI_API_KEY = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
var AZURE_OPENAI_ENDPOINT = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";
var AZURE_OPENAI_CHAT_DEPLOYMENT = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your Azure OpenAI chat deployment name here>";
var AZURE_OPENAI_SYSTEM_PROMPT = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";
```

**STEP 2**: Check if the required environment variables are set.

``` csharp title="Program.cs"
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
```

**STEP 3**: Initialize the kernel with the configuration settings and create the streaming chat completions helper.

``` csharp title="Program.cs"
var builder = Kernel.CreateBuilder();
builder.AddAzureOpenAIChatCompletion(AZURE_OPENAI_CHAT_DEPLOYMENT!, AZURE_OPENAI_ENDPOINT!, AZURE_OPENAI_API_KEY!);
var kernel = builder.Build();
var chat = new SemanticKernelChatCompletionsStreamingClass(AZURE_OPENAI_SYSTEM_PROMPT!, kernel);
```

**STEP 4**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

``` csharp title="Program.cs"
while (true)
{
    Console.Write("User: ");
    var userPrompt = Console.ReadLine();
    if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

    Console.Write("\nAssistant: ");
    await chat.GetStreamingChatMessageContentsAsync(userPrompt, content =>
        Console.Write(content.Content)
    );
    Console.WriteLine("\n");
}
```

## SemanticKernelChatCompletionsStreamingClass.cs

**STEP 1**: Initialize the kernel and chat message history with a system message.

``` csharp title="SemanticKernelChatCompletionsStreamingClass.cs"
public SemanticKernelChatCompletionsStreamingClass(string systemPrompt, Kernel kernel)
{
    _systemPrompt = systemPrompt;
    _kernel = kernel;

    _history = new ChatHistory(_systemPrompt);
    _chatCompletionService = _kernel.GetRequiredService<IChatCompletionService>();
}

public void ClearConversation()
{
    _history.RemoveRange(1, _history.Count);
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history.

``` csharp title="SemanticKernelChatCompletionsStreamingClass.cs"
public async Task<string> GetStreamingChatMessageContentsAsync(string userPrompt, Action<StreamingChatMessageContent>? callback = null)
{
    _history.AddUserMessage(userPrompt);
```

**STEP 3**: Send the chat message history to the streaming chat API.

``` csharp title="SemanticKernelChatCompletionsStreamingClass.cs"
    var responseContent = string.Empty;
    var response = _chatCompletionService.GetStreamingChatMessageContentsAsync(_history);
```

**STEP 4**: For each non-empty update, accumulate the assistant's response and invoke the callback for the update.

``` csharp title="SemanticKernelChatCompletionsStreamingClass.cs"
    await foreach (var content in response)
    {
        if (!string.IsNullOrEmpty(content.Content))
        {
            responseContent += content.Content;
            if (callback != null) callback(content);
        }
    }
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return the response.

``` csharp title="SemanticKernelChatCompletionsStreamingClass.cs"
    _history.AddAssistantMessage(responseContent);
    return responseContent;
}
```