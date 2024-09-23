---
hide:
- navigation
- toc
---
# ONNX Chat Streaming in C\#

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the ONNX Chat API with streaming in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/Program.cs)  
[:material-file-code: OnnxGenAIChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/OnnxGenAIChatCompletionsStreamingClass.cs)  
[:material-file-code: get-phi3-mini-onnx.cmd](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/get-phi3-mini-onnx.cmd)  
[:material-file-code: Phi3ChatStreaming.csproj](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-cs/Phi3ChatStreaming.csproj)  

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new phi3-onnx-chat-streaming --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'phi3-onnx-chat-streaming' in 'phi3-onnx-chat-streaming-cs' (4 files)...

    OnnxGenAIChatCompletionsStreamingClass.cs
    Program.cs
    get-phi3-mini-onnx.cmd
    Phi3ChatStreaming.csproj

    Generating 'phi3-onnx-chat-streaming' in 'phi3-onnx-chat-streaming-cs' (4 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables.

```csharp title="Program.cs"
var modelDirectory = Environment.GetEnvironmentVariable("ONNX_GENAI_MODEL_PATH") ?? "<insert your ONNX GenAI model path here>";
var systemPrompt = Environment.GetEnvironmentVariable("ONNX_GENAI_SYSTEM_PROMPT") ?? "You are a helpful assistant.";
```

**STEP 2**: Validate the configuration settings.

```csharp title="Program.cs"
if (string.IsNullOrEmpty(modelDirectory) || modelDirectory.StartsWith("<insert") ||
    string.IsNullOrEmpty(systemPrompt) || systemPrompt.StartsWith("<insert"))
{
    Console.WriteLine("To use this ONNX GenAI sample, set the following environment variables:");
    Console.WriteLine("  ONNX_GENAI_MODEL_PATH\n  ONNX_GENAI_SYSTEM_PROMPT");
    Environment.Exit(1);
}
```

**STEP 3**: Initialize the helper class with the configuration settings.

```csharp title="Program.cs"
var chat = new OnnxGenAIChatStreamingClass(modelDirectory, systemPrompt);
```

**STEP 4**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received.

```csharp title="Program.cs"
while (true)
{
    Console.Write("User: ");
    var input = Console.ReadLine();
    if (string.IsNullOrEmpty(input) || input == "exit") break;

    Console.Write("\nAssistant: ");
    chat.GetChatCompletionStreaming(input, update => {
        Console.Write(update);
    });
    Console.WriteLine("\n");
}
```

## OnnxGenAIChatCompletionsStreamingClass.cs

**STEP 1**: Create the client and initialize chat message history with a system message.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
public OnnxGenAIChatStreamingClass(string modelDirectory, string systemPrompt)
{
    _modelDirectory = modelDirectory;
    _systemPrompt = systemPrompt;

    _messages = new List<ContentMessage>();
    _messages.Add(new ContentMessage { Role = "system", Content = systemPrompt });

    _model = new Model(modelDirectory);
    _tokenizer = new Tokenizer(_model);
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
public string GetChatCompletionStreaming(string userPrompt, Action<string>? callback = null)
{
    _messages.Add(new ContentMessage { Role = "user", Content = userPrompt });
```

**STEP 3**: Encode the chat message history.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
    var responseContent = string.Empty;
    using var tokens = _tokenizer.Encode(string.Join("\n", _messages
        .Select(m => $"<|{m.Role}|>\n{m.Content}\n<|end|>"))
        + "<|assistant|>\n");
```

**STEP 4**: Set the generator parameters and input sequences.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
    using var generatorParams = new GeneratorParams(_model);
    generatorParams.SetSearchOption("max_length", 2048);
    generatorParams.SetInputSequences(tokens);
```

**STEP 5**: Generate the response by computing logits and generating tokens until completion.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
    using var generator = new Generator(_model, generatorParams);
```

**STEP 6**: Decode the generated tokens and accumulate the response.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
    var sb = new StringBuilder();
    while (!generator.IsDone())
    {
        generator.ComputeLogits();
        generator.GenerateNextToken();

        var outputTokens = generator.GetSequence(0);
        var newToken = outputTokens.Slice(outputTokens.Length - 1, 1);

        var output = _tokenizer.Decode(newToken);
        sb.Append(output);
```

**STEP 7**: Invoke the callback with each update.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
        callback?.Invoke(output);
    }
```

**STEP 8**: Add the assistant's response to the chat message history and return the response.

```csharp title="OnnxGenAIChatCompletionsStreamingClass.cs"
    responseContent = sb.ToString();
    _messages.Add(new ContentMessage { Role = "assistant", Content = responseContent });

    return responseContent;
}
```
