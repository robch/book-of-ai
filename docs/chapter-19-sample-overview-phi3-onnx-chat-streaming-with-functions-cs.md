---
hide:
- navigation
- toc
---
# ONNX Chat Streaming with Functions in C#

This sample demonstrates how to use the ONNX Chat API with streaming in a C# console application, including function calling.

[:material-file-code: Program.cs](./samples/phi3-onnx-chat-streaming-with-functions-cs/Program.cs)  
[:material-file-code: ONNXChatCompletionsStreamingWithFunctions.cs](./samples/phi3-onnx-chat-streaming-with-functions-cs/ONNXChatCompletionsStreamingWithFunctions.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new phi3-onnx-chat-streaming-with-functions --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'phi3-onnx-chat-streaming-with-functions' in 'phi3-onnx-chat-streaming-with-functions-cs' (3 files)...

    ONNXChatCompletionsStreamingWithFunctions.csproj
    ONNXChatCompletionsStreamingWithFunctions.cs
    Program.cs

    Generating 'phi3-onnx-chat-streaming-with-functions' in 'phi3-onnx-chat-streaming-with-functions-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var onnxAPIKey = Environment.GetEnvironmentVariable("AZURE_ONNX_API_KEY") ?? "<insert your ONNX API key here>";
var onnxEndpoint = Environment.GetEnvironmentVariable("AZURE_ONNX_ENDPOINT") ?? "<insert your ONNX endpoint here>";
var onnxChatDeploymentName = Environment.GetEnvironmentVariable("AZURE_ONNX_CHAT_DEPLOYMENT") ?? "<insert your ONNX chat deployment name here>";
var onnxSystemPrompt = Environment.GetEnvironmentVariable("AZURE_ONNX_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` csharp title="Program.cs"
var chat = new ONNXChatCompletionsStreamingWithFunctions(onnxEndpoint, onnxAPIKey, onnxChatDeploymentName, onnxSystemPrompt);
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

## ONNXChatCompletionsStreamingWithFunctions.cs

**STEP 1**: Create the client and initialize chat message history with a system message:

``` csharp title="ONNXChatCompletionsStreamingWithFunctions.cs"
public ONNXChatCompletionsStreamingWithFunctions(string onnxEndpoint, string onnxAPIKey, string onnxChatDeploymentName, string onnxSystemPrompt)
{
    _onnxSystemPrompt = onnxSystemPrompt;

    _client = string.IsNullOrEmpty(onnxAPIKey)
        ? new AzureONNXClient(new Uri(onnxEndpoint), new DefaultAzureCredential())
        : new AzureONNXClient(new Uri(onnxEndpoint), new AzureKeyCredential(onnxAPIKey));
    _chatClient = _client.GetChatClient(onnxChatDeploymentName);
    _messages = new List<ChatMessage>();

    ClearConversation();
}

public void ClearConversation()
{
    _messages.Clear();
    _messages.Add(ChatMessage.CreateSystemMessage(_onnxSystemPrompt));
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` csharp title="ONNXChatCompletionsStreamingWithFunctions.cs"
public async Task<string> GetChatCompletionsStreamingAsync(string userPrompt, Action<StreamingChatCompletionUpdate>? callback = null)
{
    _messages.Add(ChatMessage.CreateUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the streaming ONNX Chat API and process each update:

``` csharp title="ONNXChatCompletionsStreamingWithFunctions.cs"
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

``` csharp title="ONNXChatCompletionsStreamingWithFunctions.cs"
        if (string.IsNullOrEmpty(content)) continue;

        responseContent += content;
        if (callback != null) callback(update);
    }
```

**STEP 5**: Finally, add the assistant's response to the chat message history, and return response:

``` csharp title="ONNXChatCompletionsStreamingWithFunctions.cs"
    _messages.Add(ChatMessage.CreateAssistantMessage(responseContent));
    return responseContent;
}
```