---
hide:
- navigation
- toc
---
# OpenAI Chat with Functions Streaming in C\#

This sample demonstrates how to use the OpenAI Chat API with function calling in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-cs/Program.cs)  
[:material-file-code: OpenAIChatCompletionsFunctionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsFunctionsStreamingClass.cs)  
[:material-file-code: OpenAIChatCompletionsCustomFunctions.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-cs/OpenAIChatCompletionsCustomFunctions.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-functions --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-cs' (4 files)...

    OpenAIChatCompletionsFunctionsStreaming.csproj
    OpenAIChatCompletionsFunctionsStreamingClass.cs
    OpenAIChatCompletionsCustomFunctions.cs
    Program.cs

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-cs' (4 files)... DONE!
    ```

## OpenAIChatCompletionsCustomFunctions.cs

**STEP 1**: Define helper functions that can be called by the assistant:

``` csharp title="OpenAIChatCompletionsCustomFunctions.cs"
[HelperFunctionDescription("Gets the current weather for a location.")]
public static string GetCurrentWeather(string location)
{
    return $"The weather in {location} is 72 degrees and sunny.";
}

[HelperFunctionDescription("Gets the current date.")]
public static string GetCurrentDate()
{
    var date = DateTime.Now;
    return $"{date.Year}-{date.Month}-{date.Day}";
}

[HelperFunctionDescription("Gets the current time.")]
public static string GetCurrentTime()
{
    var date = DateTime.Now;
    return $"{date.Hour}:{date.Minute}:{date.Second}";
}
```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your OpenAI API key here>";
var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your OpenAI endpoint here>";
var openAIChatDeploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your OpenAI chat deployment name here>";
var openAISystemPrompt = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";
```

**STEP 2**: Create a function factory, add functions from the `OpenAIChatCompletionsCustomFunctions` class

``` csharp title="Program.cs"
var factory = new FunctionFactory();
factory.AddFunctions(typeof(OpenAIChatCompletionsCustomFunctions));
```

**STEP 3**: Initialize the helper class with the configuration settings and the function factory:

``` csharp title="Program.cs"
var chat = new OpenAIChatCompletionsFunctionsStreamingClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, factory);
```


**STEP 4**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

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

## OpenAIChatCompletionsFunctionsStreamingClass.cs

**STEP 1**: Create the client, initialize chat message history with a system message, and add available factory functions:

``` csharp title="OpenAIChatCompletionsFunctionsStreamingClass.cs"
public OpenAIChatCompletionsFunctionsStreamingClass(string openAIEndpoint, string openAIAPIKey, string openAIChatDeploymentName, string openAISystemPrompt, FunctionFactory factory)
{
    _openAISystemPrompt = openAISystemPrompt;
    _functionFactory = factory;

    _client = string.IsNullOrEmpty(openAIAPIKey)
        ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
        : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));

    _chatClient = _client.GetChatClient(openAIChatDeploymentName);
    _messages = new List<ChatMessage>();

    _options = new ChatCompletionOptions();
    foreach (var tool in _functionFactory.GetChatTools())
    {
        _options.Tools.Add(tool);
    }

    _functionCallContext = new FunctionCallContext(_functionFactory, _messages);
    ClearConversation();
}

public void ClearConversation()
{
    _messages.Clear();
    _messages.Add(ChatMessage.CreateSystemMessage(_openAISystemPrompt));
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` csharp title="OpenAIChatCompletionsFunctionsStreamingClass.cs"
public async Task<string> GetChatCompletionsStreamingAsync(string userPrompt, Action<StreamingChatCompletionUpdate>? callback = null)
{
    _messages.Add(ChatMessage.CreateUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the streaming API, processing each update, including checking for function calls:

``` csharp title="OpenAIChatCompletionsFunctionsStreamingClass.cs"
    var responseContent = string.Empty;
    while (true)
    {
        var response = _chatClient.CompleteChatStreamingAsync(_messages, _options);
        await foreach (var update in response)
        {
            _functionCallContext.CheckForUpdate(update);

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

``` csharp title="OpenAIChatCompletionsFunctionsStreamingClass.cs"
            if (string.IsNullOrEmpty(content)) continue;

            responseContent += content;
            if (callback != null) callback(update);
        }
```

**STEP 5**: Check if the response contained function calls, and process them:

``` csharp title="OpenAIChatCompletionsFunctionsStreamingClass.cs"
        if (_functionCallContext.TryCallFunctions(responseContent))
        {
            _functionCallContext.Clear();
            continue;
        }
```

**STEP 6**: Finally, add the assistant's response to the chat message history, and return the response:

``` csharp title="OpenAIChatCompletionsFunctionsStreamingClass.cs"
        _messages.Add(ChatMessage.CreateAssistantMessage(responseContent));
        return responseContent;
    }
}
```
