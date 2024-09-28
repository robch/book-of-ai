---
hide:
- navigation
- toc
---
# OpenAI Assistants Streaming in C\#

This sample demonstrates how to use the OpenAI Assistants API with streaming in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-cs/Program.cs)  
[:material-file-code: OpenAIAssistantsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-cs/OpenAIAssistantsStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming' in 'openai-asst-streaming-cs' (3 files)...

    OpenAIAssistantsStreaming.csproj
    OpenAIAssistantsStreamingClass.cs
    Program.cs

    Generating 'openai-asst-streaming' in 'openai-asst-streaming-cs' (3 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables and validate them.

``` csharp title="Program.cs"
var assistantId = Environment.GetEnvironmentVariable("ASSISTANT_ID") ?? "<insert your OpenAI assistant ID here>";
var threadId = args.Length > 0 ? args[0] : null;

// Validate environment variables
var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";

if (string.IsNullOrEmpty(openAIAPIKey) || openAIAPIKey.StartsWith("<insert") ||
    string.IsNullOrEmpty(openAIEndpoint) || openAIEndpoint.StartsWith("<insert") ||
    string.IsNullOrEmpty(assistantId) || assistantId.StartsWith("<insert"))
{
    Console.WriteLine("To use Azure OpenAI, set the following environment variables:");
    Console.WriteLine("  ASSISTANT_ID\n  AZURE_OPENAI_API_KEY\n  AZURE_OPENAI_ENDPOINT");
    Environment.Exit(1);
}
```

**STEP 2**: Initialize the OpenAI client and the helper class.

``` csharp title="Program.cs"
var client = string.IsNullOrEmpty(openAIAPIKey)
    ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
    : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));

var assistant = new OpenAIAssistantsStreamingClass(client, assistantId);
```

**STEP 3**: Create or retrieve a thread, and get existing messages if a thread ID is provided.

``` csharp title="Program.cs"
if (string.IsNullOrEmpty(threadId))
{
    await assistant.CreateThreadAsync();
}
else
{
    await assistant.RetrieveThreadAsync(threadId);
    await assistant.GetThreadMessagesAsync((role, content) => 
    {
        Console.WriteLine($"{char.ToUpper(role[0]) + role.Substring(1)}: {content}\n");
    });
}
```

**STEP 4**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

``` csharp title="Program.cs"
while (true)
{
    Console.Write("User: ");
    var userPrompt = Console.ReadLine();
    if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

    Console.Write("\nAssistant: ");
    await assistant.GetResponseAsync(userPrompt, content => {
        Console.Write(content);
    });
}

Console.WriteLine($"Bye! (ThreadId: {assistant.Thread?.Id})");
```

## OpenAIAssistantsStreamingClass.cs

**STEP 1**: Initialize the helper class using the OpenAI client and assistant ID.

``` csharp title="OpenAIAssistantsStreamingClass.cs"
public OpenAIAssistantsStreamingClass(OpenAIClient client, string assistantId)
{
    _assistantClient = client.GetAssistantClient();
    _assistantId = assistantId;
}
```

**STEP 2**: Create or retrieve a thread.

``` csharp title="OpenAIAssistantsStreamingClass.cs"
public async Task CreateThreadAsync()
{
    var result = await _assistantClient.CreateThreadAsync();
    Thread = result.Value;
}

public async Task RetrieveThreadAsync(string threadId)
{
    var result = await _assistantClient.GetThreadAsync(threadId);
    Thread = result.Value;
}
```

**STEP 3**: Get existing messages from the thread and invoke the callback for each.

``` csharp title="OpenAIAssistantsStreamingClass.cs"
public async Task GetThreadMessagesAsync(Action<string, string> callback)
{
    var options = new MessageCollectionOptions() { Order = ListOrder.OldestFirst };
    await foreach (var message in _assistantClient.GetMessagesAsync(Thread, options).GetAllValuesAsync())
    {
        var content = string.Join("", message.Content.Select(c => c.Text));
        var role = message.Role == MessageRole.User ? "user" : "assistant";
        callback(role, content);
    }
}
```

**STEP 4**: When the user provides input, add the user message to the thread and create a new streaming run.

``` csharp title="OpenAIAssistantsStreamingClass.cs"
public async Task GetResponseAsync(string userInput, Action<string> callback)
{
    await _assistantClient.CreateMessageAsync(Thread, MessageRole.User, [ userInput ]);
    var assistant = await _assistantClient.GetAssistantAsync(_assistantId);
    var stream = _assistantClient.CreateRunStreamingAsync(Thread, assistant.Value);
```

**STEP 5**: Process the streaming updates, invoking the callback for each content update.

``` csharp title="OpenAIAssistantsStreamingClass.cs"
    await foreach (var update in stream) 
    {
        if (update is MessageContentUpdate contentUpdate)
        {
            callback(contentUpdate.Text);
        }

        if (update.UpdateKind == StreamingUpdateReason.RunStepCompleted)
        {
            callback("\n\n");
        }
    }
}
```