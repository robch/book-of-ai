---
hide:
- navigation
- toc
---
# OpenAI Assistants with Function Calling in C\#

This sample demonstrates how to use OpenAI Assistants with function calling in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/Program.cs)  
[:material-file-code: FunctionFactory.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/FunctionFactory.cs)  
[:material-file-code: HelperFunctionDescriptionAttribute.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/HelperFunctionDescriptionAttribute.cs)  
[:material-file-code: HelperFunctionParameterDescriptionAttribute.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/HelperFunctionParameterDescriptionAttribute.cs)  
[:material-file-code: OpenAIAssistantsCustomFunctions.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsCustomFunctions.cs)  
[:material-file-code: OpenAIAssistantsFunctionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-asst-streaming-with-functions-cs/OpenAIAssistantsFunctionsStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-functions --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-functions' in 'openai-asst-streaming-with-functions-cs' (7 files)...

    FunctionFactory.cs
    HelperFunctionDescriptionAttribute.cs
    HelperFunctionParameterDescriptionAttribute.cs
    OpenAIAssistantsCustomFunctions.cs
    OpenAIAssistantsFunctionsStreamingClass.cs
    Program.cs

    Generating 'openai-asst-streaming-with-functions' in 'openai-asst-streaming-with-functions-cs' (7 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables.

``` csharp title="Program.cs"
var assistantId = Environment.GetEnvironmentVariable("ASSISTANT_ID") ?? "<insert your OpenAI assistant ID here>";
var threadId = args.Length > 0 ? args[0] : null;

// Validate environment variables
var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";
```

**STEP 2**: Validate the environment variables.

``` csharp title="Program.cs"
if (string.IsNullOrEmpty(openAIAPIKey) || openAIAPIKey.StartsWith("<insert") ||
    string.IsNullOrEmpty(openAIEndpoint) || openAIEndpoint.StartsWith("<insert") ||
    string.IsNullOrEmpty(assistantId) || assistantId.StartsWith("<insert"))
{
    Console.WriteLine("To use Azure OpenAI, set the following environment variables:");
    Console.WriteLine("  ASSISTANT_ID\n  AZURE_OPENAI_API_KEY\n  AZURE_OPENAI_ENDPOINT");
    Environment.Exit(1);
}
```

**STEP 3**: Initialize OpenAI Client.

``` csharp title="Program.cs"
var client = string.IsNullOrEmpty(openAIAPIKey)
    ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
    : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));
```

**STEP 4**: Register custom functions.

``` csharp title="Program.cs"
var factory = new FunctionFactory();
factory.AddFunctions(typeof(OpenAIChatCompletionsCustomFunctions));
```

**STEP 5**: Initialize the helper class with the OpenAI client, assistant ID, and function factory.

``` csharp title="Program.cs"
var assistant = new OpenAIAssistantsFunctionsStreamingClass(client, assistantId, factory);
```

**STEP 6**: Create or retrieve a thread, and get existing messages if a thread ID is provided.

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

**STEP 7**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

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

## OpenAIAssistantsFunctionsStreamingClass.cs

**STEP 1**: Initialize the helper class using the OpenAI client, assistant ID, and function factory.

``` csharp title="OpenAIAssistantsFunctionsStreamingClass.cs"
public OpenAIAssistantsFunctionsStreamingClass(OpenAIClient client, string assistantId, FunctionFactory factory)
{
    _assistantClient = client.GetAssistantClient();
    _assistantId = assistantId;
    _functionFactory = factory;
```

**STEP 2**: Update the run options with the available tool definitions.

``` csharp title="OpenAIAssistantsFunctionsStreamingClass.cs"
    _runOptions=  new RunCreationOptions();
    foreach (var tool in _functionFactory.GetToolDefinitions())
    {
        _runOptions.ToolsOverride.Add(tool);
    }
}
```

**STEP 3**: Create or retrieve thread.

``` csharp title="OpenAIAssistantsFunctionsStreamingClass.cs"
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

**STEP 4**: Get existing messages from the thread and invoke the callback for each.

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

**STEP 5**: When the user provides input, add the user message to the thread and create a new streaming run with the run options containing the tool definitions.

``` csharp title="OpenAIAssistantsFunctionsStreamingClass.cs"
public async Task GetResponseAsync(string userInput, Action<string> callback)
{
    await _assistantClient.CreateMessageAsync(Thread, MessageRole.User, [ userInput ]);
    var assistant = await _assistantClient.GetAssistantAsync(_assistantId);
    var stream = _assistantClient.CreateRunStreamingAsync(Thread, assistant.Value, _runOptions);
```

**STEP 6**: Process the streaming updates, invoking the callback for each content update.

``` csharp title="OpenAIAssistantsFunctionsStreamingClass.cs"
    ThreadRun? run = null;
    List<ToolOutput> toolOutputs = [];
    do
    {
        await foreach (var update in stream)
        {
            if (update is MessageContentUpdate contentUpdate)
            {
                callback(contentUpdate.Text);
            }
```

**STEP 7**: If the update is a required action, try calling the requested function, and cache the tool outputs

``` csharp title="OpenAIAssistantsFunctionsStreamingClass.cs"
            else if (update is RequiredActionUpdate requiredActionUpdate)
            {
                if (_functionFactory.TryCallFunction(requiredActionUpdate.FunctionName, requiredActionUpdate.FunctionArguments, out var result))
                {
                    callback($"\rassistant-function: {requiredActionUpdate.FunctionName}({requiredActionUpdate.FunctionArguments}) => {result}\n");
                    callback("\nAssistant: ");
                    toolOutputs.Add(new ToolOutput(requiredActionUpdate.ToolCallId, result));
                }
            }

            if (update is RunUpdate runUpdate)
            {
                run = runUpdate;
            }

            if (run?.Status.IsTerminal == true)
            {
                callback("\n\n");
            }
        }
```

**STEP 7**: After processing all the updates, submit the tool outputs to the run if there are any.

``` csharp title="OpenAIAssistantsFunctionsStreamingClass.cs"
        if (toolOutputs.Count > 0 && run != null)
        {
            stream = _assistantClient.SubmitToolOutputsToRunStreamingAsync(run, toolOutputs);
            toolOutputs.Clear();
        }
    }
    while (run?.Status.IsTerminal == false);
}
```