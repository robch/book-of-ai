---
hide:
- navigation
- toc
---
# OpenAI Assistants in C\#

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Assistants API in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-cs/Program.cs)  
[:material-file-code: OpenAIAssistantsClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-cs/OpenAIAssistantsClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst' in 'openai-asst-cs' (3 files)...

    OpenAIAssistants.csproj
    OpenAIAssistantsClass.cs
    Program.cs

    Generating 'openai-asst' in 'openai-asst-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

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

**STEP 2**: Initialize the OpenAI client and the assistant helper class:

``` csharp title="Program.cs"
var client = string.IsNullOrEmpty(openAIAPIKey)
    ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
    : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));

var assistant = new OpenAIAssistantsClass(client, assistantId);
```

**STEP 3**: Create or retrieve a thread and get thread messages if a thread ID is provided:

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

**STEP 4**: Loop to handle user input and display the assistant response:

``` csharp title="Program.cs"
while (true)
{
    Console.Write("User: ");
    var userPrompt = Console.ReadLine();
    if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

    Console.Write("\nAssistant: ");
    var response = await assistant.GetResponseAsync(userPrompt);
    Console.WriteLine($"{response}\n");
}

Console.WriteLine($"Bye! (ThreadId: {assistant.Thread?.Id})");
```

## OpenAIAssistantsClass.cs

**STEP 1**: Initialize the assistant client and assign the assistant ID:

``` csharp title="OpenAIAssistantsClass.cs"
public OpenAIAssistantsClass(OpenAIClient client, string assistantId)
{
    _assistantClient = client.GetAssistantClient();
    _assistantId = assistantId;
}
```

**STEP 2**: Create a new thread:

``` csharp title="OpenAIAssistantsClass.cs"
public async Task CreateThreadAsync()
{
    var result = await _assistantClient.CreateThreadAsync();
    Thread = result.Value;
}
```

**STEP 3**: Retrieve an existing thread by ID:

``` csharp title="OpenAIAssistantsClass.cs"
public async Task RetrieveThreadAsync(string threadId)
{
    var result = await _assistantClient.GetThreadAsync(threadId);
    Thread = result.Value;
}
```

**STEP 4**: Get messages from the thread and invoke a callback for each message:

``` csharp title="OpenAIAssistantsClass.cs"
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

**STEP 5**: Send user input to the assistant and get a response:

``` csharp title="OpenAIAssistantsClass.cs"
public async Task<string> GetResponseAsync(string userInput)
{
    await _assistantClient.CreateMessageAsync(Thread, [ userInput ]);
    var assistant = await _assistantClient.GetAssistantAsync(_assistantId);

    var result = await _assistantClient.CreateRunAsync(Thread, assistant);
    var run = result.Value;

    while (!run.Status.IsTerminal)
    {
        System.Threading.Thread.Sleep(TimeSpan.FromMilliseconds(100));
        result = _assistantClient.GetRun(run.ThreadId, run.Id);
        run = result.Value;
    }

    await foreach (var message in _assistantClient.GetMessagesAsync(run.ThreadId, ListOrder.NewestFirst))
    {
        if (message.Role == MessageRole.Assistant)
        {
            var content = string.Join("", message.Content.Select(c => c.Text));
            return content;
        }
    }

    return string.Empty;
}
```
