---
hide:
- navigation
- toc
---
# OpenAI Chat Completions in C\#

This sample demonstrates how to use the OpenAI Chat Completions API in a C# console application.

[:material-file-code: Program.cs](./samples/openai-chat-cs/Program.cs)  
[:material-file-code: OpenAIChatCompletionsClass.cs](./samples/openai-chat-cs/OpenAIChatCompletionsClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat' in 'openai-chat-cs' (3 files)...

    OpenAIChatCompletions.csproj
    OpenAIChatCompletionsClass.cs
    Program.cs

    Generating 'openai-chat' in 'openai-chat-cs' (3 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "...";
var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "...";
var openAIChatDeploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "...";
var openAISystemPrompt = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "...";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` csharp title="Program.cs"
var chat = new OpenAIChatCompletionsClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display the response:

``` csharp title="Program.cs"
while (true)
{
    Console.Write("User: ");
    var userPrompt = Console.ReadLine();
    if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

    var response = chat.GetChatCompletion(userPrompt);
    Console.WriteLine($"\nAssistant: {response}\n");
}
```

## OpenAIChatCompletionsClass.cs

**STEP 1**: Create the client and initialize chat message history with a system message:

``` csharp title="OpenAIChatCompletionsClass.cs"
public OpenAIChatCompletionsClass(string openAIEndpoint, string openAIAPIKey, string openAIChatDeploymentName, string openAISystemPrompt)
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

``` csharp title="OpenAIChatCompletionsClass.cs"
public string GetChatCompletion(string userPrompt)
{
    _messages.Add(ChatMessage.CreateUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the OpenAI Chat Completions API and process the response:

``` csharp title="OpenAIChatCompletionsClass.cs"
    var response = _chatClient.CompleteChat(_messages);
    var responseText = string.Join("", response.Value.Content
        .Where(x => x.Kind == ChatMessageContentPartKind.Text)
        .Select(x => x.Text)
        .ToList());
```

**STEP 4**: Add the assistant's response to the chat message history:

``` csharp title="OpenAIChatCompletionsClass.cs"
    _messages.Add(ChatMessage.CreateAssistantMessage(responseText));
    return responseText;
}
```
