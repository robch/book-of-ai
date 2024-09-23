---
hide:
- navigation
- toc
---
# Semantic Kernel Chat Streaming with Functions in C#

This sample demonstrates how to use the Semantic Kernel Chat API with streaming and kernel functions in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-streaming-with-functions-cs/Program.cs)  
[:material-file-code: SemanticKernelChatCompletionsFunctionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-streaming-with-functions-cs/SemanticKernelChatCompletionsFunctionsStreamingClass.cs)  
[:material-file-code: SemanticKernelCustomFunctions.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-streaming-with-functions-cs/SemanticKernelCustomFunctions.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new sk-chat-streaming-with-functions --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'sk-chat-streaming-with-functions' in 'sk-chat-streaming-with-functions-cs' (3 files)...

    sk-chat-streaming-with-functions.csproj
    SemanticKernelChatCompletionsFunctionsStreamingClass.cs
    Program.cs
    SemanticKernelCustomFunctions.cs

    Generating 'sk-chat-streaming-with-functions' in 'sk-chat-streaming-with-functions-cs' (4 files)... DONE!
    ```

## SemanticKernelCustomFunctions.cs

**STEP 1**: Define custom functions that can be auto-invoked by the kernel.

``` csharp title="SemanticKernelCustomFunctions.cs"
[KernelFunction, Description("Gets the current weather for a location.")]
public string GetCurrentWeather(string location)
{
    return $"The weather in {location} is 72 degrees and sunny.";
}

[KernelFunction, Description("Gets the current date.")]
public string GetCurrentDate()
{
    var date = DateTime.Now;
    return $"{date.Year}-{date.Month}-{date.Day}";
}

[KernelFunction, Description("Gets the current time.")]
public string GetCurrentTime()
{
    var date = DateTime.Now;
    return $"{date.Hour}:{date.Minute}:{date.Second}";
}
```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables and validate them.

``` csharp title="Program.cs"
var AZURE_OPENAI_API_KEY = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
var AZURE_OPENAI_ENDPOINT = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";
var AZURE_OPENAI_CHAT_DEPLOYMENT = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your Azure OpenAI chat deployment name here>";
var AZURE_OPENAI_SYSTEM_PROMPT = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";

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

**STEP 2**: Initialize the kernel with the configuration settings, add custom functions, and create the streaming chat completions helper.

``` csharp title="Program.cs"
var builder = Kernel.CreateBuilder();
builder.AddAzureOpenAIChatCompletion(AZURE_OPENAI_CHAT_DEPLOYMENT!, AZURE_OPENAI_ENDPOINT!, AZURE_OPENAI_API_KEY!);
builder.Plugins.AddFromType<SemanticKernelCustomFunctions>();
var kernel = builder.Build();
var chat = new SemanticKernelChatCompletionsFunctionsStreamingClass(AZURE_OPENAI_SYSTEM_PROMPT!, kernel);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

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

## SemanticKernelChatCompletionsFunctionsStreamingClass.cs

**STEP 1**: Initialize the kernel and chat message history with a system message.

``` csharp title="SemanticKernelChatCompletionsFunctionsStreamingClass.cs"
public SemanticKernelChatCompletionsFunctionsStreamingClass(string systemPrompt, Kernel kernel)
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

``` csharp title="SemanticKernelChatCompletionsFunctionsStreamingClass.cs"
public async Task<string> GetStreamingChatMessageContentsAsync(string userPrompt, Action<StreamingChatMessageContent>? callback = null)
{
    _history.AddUserMessage(userPrompt);
```

**STEP 3**: Send the chat message history to the streaming chat API and set the tool call behavior to auto-invoke kernel functions.

``` csharp title="SemanticKernelChatCompletionsFunctionsStreamingClass.cs"
    var settings = new OpenAIPromptExecutionSettings { ToolCallBehavior = ToolCallBehavior.AutoInvokeKernelFunctions };
    var responseContent = string.Empty;
    var response = _chatCompletionService.GetStreamingChatMessageContentsAsync(_history, settings, _kernel);
```

**STEP 4**: For each non-empty update, accumulate the assistant's response and invoke the callback for the update.

``` csharp title="SemanticKernelChatCompletionsFunctionsStreamingClass.cs"
    await foreach (var content in response)
    {
        if (!string.IsNullOrEmpty(content.Content))
        {
            responseContent += content.Content;
            if (callback != null) callback(content);
        }
    }
```

**STEP 5**: Add the assistant's response to the chat message history, and return the response.

``` csharp title="SemanticKernelChatCompletionsFunctionsStreamingClass.cs"
    _history.AddAssistantMessage(responseContent);
    return responseContent;
}
```
