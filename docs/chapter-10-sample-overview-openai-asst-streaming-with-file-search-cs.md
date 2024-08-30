---
hide:
- navigation
- toc
---
# OpenAI Assistants with File Search Streaming in C\#

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use OpenAI Assistants with file search streaming in a C# console application.

[:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-file-search-cs/Program.cs)  
[:material-file-code: OpenAIAssistantsFileSearchStreamingClass.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-asst-streaming-with-file-search-cs/OpenAIAssistantsFileSearchStreamingClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-asst-streaming-with-file-search --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-asst-streaming-with-file-search' in 'openai-asst-streaming-with-file-search-cs' (3 files)...

    OpenAIAssistantsFileSearchStreaming.csproj
    OpenAIAssistantsFileSearchStreamingClass.cs
    Program.cs

    Generating 'openai-asst-streaming-with-file-search' in 'openai-asst-streaming-with-file-search-cs' (3 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var assistantId = Environment.GetEnvironmentVariable("ASSISTANT_ID") ?? "<insert your OpenAI assistant ID here>";
var openAIAPIKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
var openAIEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` csharp title="Program.cs"
var client = string.IsNullOrEmpty(openAIAPIKey)
    ? new AzureOpenAIClient(new Uri(openAIEndpoint), new DefaultAzureCredential())
    : new AzureOpenAIClient(new Uri(openAIEndpoint), new AzureKeyCredential(openAIAPIKey));

var assistant = new OpenAIAssistantsFileSearchStreamingClass(client, assistantId);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

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
```

## OpenAIAssistantsFileSearchStreamingClass.cs

**STEP 1**: Create the client and initialize chat message history with a system message:

``` csharp title="OpenAIAssistantsFileSearchStreamingClass.cs"
public OpenAIAssistantsFileSearchStreamingClass(OpenAIClient client, string assistantId)
{
    _fileClient = client.GetFileClient();
    _assistantClient = client.GetAssistantClient();
    _assistantId = assistantId;
}

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

**STEP 2**: When the user provides input, add the user message to the chat message history and process streaming responses:

``` csharp title="OpenAIAssistantsFileSearchStreamingClass.cs"
public async Task GetResponseAsync(string userInput, Action<string> callback)
{
    await _assistantClient.CreateMessageAsync(Thread, [ userInput ]);
    var assistant = await _assistantClient.GetAssistantAsync(_assistantId);
    var stream = _assistantClient.CreateRunStreamingAsync(Thread, assistant.Value);

    var cachedContent = string.Empty;
    await foreach (var update in stream) 
    {
        if (update is MessageContentUpdate contentUpdate)
        {
            var content = contentUpdate.Text;
            var hasContent = !string.IsNullOrEmpty(content);

            var replace = contentUpdate.TextAnnotation?.TextToReplace;
            var hasAnnotation = !string.IsNullOrEmpty(replace);
            
            var hasLenticularBrackets = hasContent && content.Contains("\u3010") && content.Contains("\u3011");
            var shouldCache = hasLenticularBrackets && !hasAnnotation;
            if (shouldCache)
            {
                cachedContent = cachedContent + content;
                continue;
            }

            var hasCache = !string.IsNullOrEmpty(cachedContent);
            if (hasCache)
            {
                content = cachedContent + content;
                cachedContent = string.Empty;
            }

            if (hasAnnotation)
            {
                var fileId = contentUpdate.TextAnnotation!.InputFileId;
                var file = await _fileClient.GetFileAsync(fileId);
                var fileName = file.Value.Filename ?? fileId;

                var citation = $"[{contentUpdate.TextAnnotation!.ContentIndex}](file:{fileName})";
                var hasReplacement = !string.IsNullOrEmpty(content) && content.Contains(replace!);
                content = hasReplacement
                    ? content.Replace(replace!, citation)
                    : $"{citation} ";
            }

            callback(content);
        }

        if (update.UpdateKind == StreamingUpdateReason.RunStepCompleted)
        {
            callback("\n\n");
        }
    }
}
```