---
hide:
- navigation
- toc
---
# OpenAI Assistants with Code Interpreter Streaming in C\#

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API with the Code Interpreter feature in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-code-cs/Program.cs)  
[:material-file-code: OpenAIAssistantsCodeInterpreterStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-code-cs/OpenAIAssistantsCodeInterpreterStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-code --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-code' in 'openai-asst-streaming-with-code-cs' (3 files)...

    OpenAIAssistantsCodeInterpreterStreaming.csproj
    OpenAIAssistantsCodeInterpreterStreamingClass.cs
    Program.cs

    Generating 'openai-asst-streaming-with-code' in 'openai-asst-streaming-with-code-cs' (3 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var assistantId = Environment.GetEnvironmentVariable("ASSISTANT_ID") ?? "<insert your OpenAI assistant ID here>";
var threadId = args.Length > 0 ? args[0] : null;

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

**STEP 2**: Initialize the OpenAI client and the helper class with the configuration settings:

``` csharp title="Program.cs"
var client = string.IsNullOrEmpty(openAIAPIKey)
    ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
    : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));

var assistant = new OpenAIAssistantsCodeInterpreterStreamingClass(client, assistantId);
```

**STEP 3**: Create or retrieve a thread, and get existing messages if a thread ID is provided:

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

**STEP 4**: Enter a loop to get user input, send it to the assistant, and display the responses as they are received:

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

## OpenAIAssistantsCodeInterpreterStreamingClass.cs

**STEP 1**: Initialize the assistant client with the OpenAI client and assistant ID:

``` csharp title="OpenAIAssistantsCodeInterpreterStreamingClass.cs"
public OpenAIAssistantsCodeInterpreterStreamingClass(OpenAIClient client, string assistantId)
{
    _assistantClient = client.GetAssistantClient();
    _assistantId = assistantId;
}
```

**STEP 2**: Create or retrieve a thread:

``` csharp title="OpenAIAssistantsCodeInterpreterStreamingClass.cs"
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

**STEP 3**: Get existing messages from the thread and invoke the callback for each message:

``` csharp title="OpenAIAssistantsCodeInterpreterStreamingClass.cs"
public async Task GetThreadMessagesAsync(Action<string, string> callback)
{
    await foreach (var message in _assistantClient.GetMessagesAsync(Thread, ListOrder.OldestFirst))
    {
        var content = string.Join("", message.Content.Select(c => c.Text));
        var role = message.Role == MessageRole.User ? "user" : "assistant";
        callback(role, content);
    }
}
```

**STEP 4**: Send user input to the assistant, stream and process each update:

``` csharp title="OpenAIAssistantsCodeInterpreterStreamingClass.cs"
public async Task GetResponseAsync(string userInput, Action<string> callback)
{
    await _assistantClient.CreateMessageAsync(Thread, [ userInput ]);
    var assistant = await _assistantClient.GetAssistantAsync(_assistantId);
    var stream = _assistantClient.CreateRunStreamingAsync(Thread, assistant.Value);

    await foreach (var update in stream) 
    {
        if (update is MessageContentUpdate contentUpdate)
        {
            callback(contentUpdate.Text);
        }
        else if (update is RunStepDetailsUpdate runStepDetailsUpdate)
        {
            var input = runStepDetailsUpdate.CodeInterpreterInput;
            if (input != null)
            {
                callback(input);
            }
        }

        if (update.UpdateKind == StreamingUpdateReason.RunStepCompleted)
        {
            callback("\n\n");
        }
    }
}
```
