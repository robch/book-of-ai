---
hide:
- navigation
- toc
---
# ONNX Chat Streaming with Functions in C\#

This sample demonstrates how to use the ONNX Chat API with streaming in a C# console application, including function calling.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-with-functions-cs/Program.cs)  
[:material-file-code: OnnxGenAIChatCompletionsStreamingClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/phi3-onnx-chat-streaming-with-functions-cs/OnnxGenAIChatCompletionsStreamingClass.cs)  

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

    FunctionFactory.cs
    OnnxGenAIChatCompletionsStreamingClass.cs
    Program.cs

    Generating 'phi3-onnx-chat-streaming-with-functions' in 'phi3-onnx-chat-streaming-with-functions-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables.

``` csharp title="Program.cs"
var modelDirectory = Environment.GetEnvironmentVariable("ONNX_GENAI_MODEL_PATH") ?? "<insert your ONNX GenAI model path here>";
var systemPrompt = Environment.GetEnvironmentVariable("ONNX_GENAI_SYSTEM_PROMPT") ?? "@system.txt";

if (string.IsNullOrEmpty(modelDirectory) || modelDirectory.StartsWith("<insert") ||
    string.IsNullOrEmpty(systemPrompt) || systemPrompt.StartsWith("<insert"))
{
    Console.WriteLine("To use this ONNX GenAI sample, set the following environment variables:");
    Console.WriteLine("  ONNX_GENAI_MODEL_PATH\n  ONNX_GENAI_SYSTEM_PROMPT");
    Environment.Exit(1);
}

if (systemPrompt.StartsWith("@") && File.Exists(systemPrompt.Substring(1)))
{
    systemPrompt = File.ReadAllText(systemPrompt.Substring(1));
}
```

**STEP 2**: Validate the configuration settings.

``` csharp title="Program.cs"
if (string.IsNullOrEmpty(modelDirectory) || modelDirectory.StartsWith("<insert") ||
    string.IsNullOrEmpty(systemPrompt) || systemPrompt.StartsWith("<insert"))
{
    Console.WriteLine("To use this ONNX GenAI sample, set the following environment variables:");
    Console.WriteLine("  ONNX_GENAI_MODEL_PATH\n  ONNX_GENAI_SYSTEM_PROMPT");
    Environment.Exit(1);
}
```

**STEP 3**: Initialize `FunctionFactory` with custom functions.

``` csharp title="Program.cs"
var factory = new FunctionFactory();
factory.AddFunctions(typeof(OnnxGenAIChatCompletionsCustomFunctions));
```

**STEP 4**: Initialize the `OnnxGenAIChatStreamingClass` with model directory, system prompt, and factory.

``` csharp title="Program.cs"
var chat = new OnnxGenAIChatStreamingClass(modelDirectory, systemPrompt, factory);
```

**STEP 5**: Obtain user input, read from file if necessary, and use the helper class to get the assistant's response, displaying responses as they are received.

``` csharp title="Program.cs"
while (true)
{
    Console.Write("User: ");
    var input = Console.ReadLine();
    if (string.IsNullOrEmpty(input) || input == "exit") break;

    if (input.StartsWith('@') && File.Exists(input.Substring(1)))
    {
        input = File.ReadAllText(input.Substring(1));
    }

    Console.Write("\nAssistant: ");
    chat.GetChatCompletionStreaming(input, update => {
        Console.Write(update);
    });
    Console.WriteLine("\n");
}
```

## OnnxGenAIChatStreamingClass.cs

**STEP 1**: Initialize the chat model and tokenizer, setting up the function call context.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
public OnnxGenAIChatStreamingClass(string modelDirectory, string systemPrompt, FunctionFactory factory)
{
    systemPrompt = UpdateSystemPrompt(systemPrompt, factory);

    _modelDirectory = modelDirectory;
    _systemPrompt = systemPrompt;
    _factory = factory;

    _messages = new List<OnnxGenAIChatContentMessage>();
    _messages.Add(new OnnxGenAIChatContentMessage { Role = "system", Content = _systemPrompt });

    _model = new Model(_modelDirectory);
    _tokenizer = new Tokenizer(_model);

    _functionCallContext = new OnnxGenAIChatFunctionCallContext(_factory, _messages);
}
```

**STEP 2**: Clear previous messages and initialize chat message history with a system message.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
public void ClearMessages()
{
    _messages.Clear();
    _messages.Add(new OnnxGenAIChatContentMessage { Role = "system", Content = _systemPrompt });
}
```

**STEP 3**: When the user provides input, add the user message to the chat message history.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
public string GetChatCompletionStreaming(string userPrompt, Action<string>? callback = null)
{
    var debug = Environment.GetEnvironmentVariable("DEBUG") != null;

    _messages.Add(new OnnxGenAIChatContentMessage { Role = "user", Content = userPrompt });
```

**STEP 4**: Encode the chat message history.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
    var responseContent = string.Empty;
    using var tokens = _tokenizer.Encode(string.Join("\n", _messages
        .Select(m => $"<|{m.Role}|>\n{m.Content}\n<|end|>"))
        + "<|assistant|>\n");
```

**STEP 5**: Set the generator parameters and input sequences.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
    using var generatorParams = new GeneratorParams(_model);
    generatorParams.SetSearchOption("max_length", 2048);
    generatorParams.SetInputSequences(tokens);
```

**STEP 6**: Generate the response by computing logits and generating tokens until completion.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
    using var generator = new Generator(_model, generatorParams);
```

**STEP 7**: Decode the generated tokens and accumulate the response.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
    var sb = new StringBuilder();
    while (!generator.IsDone())
    {
        generator.ComputeLogits();
        generator.GenerateNextToken();

        var outputTokens = generator.GetSequence(0);
        var newToken = outputTokens.Slice(outputTokens.Length - 1, 1);

        var output = _tokenizer.Decode(newToken);
        sb.Append(output);

        callback?.Invoke(output);
    }
```

**STEP 8**: Check for functions within the response and call them if necessary.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
    if (_functionCallContext.TryCallFunctions(sb))
    {
        _functionCallContext.Clear();
        continue;
    }

    responseContent = sb.ToString();
    var ok = !string.IsNullOrWhiteSpace(responseContent);
    if (ok)
    {
        _messages.Add(new OnnxGenAIChatContentMessage { Role = "assistant", Content = responseContent });
    }

    return responseContent;
}
```

**STEP 9**: Add the assistant's response to the chat message history and return the response.

``` csharp title="OnnxGenAIChatStreamingClass.cs"
    _messages.Add(new OnnxGenAIChatContentMessage { Role = "assistant", Content = responseContent });
    return responseContent;
}
```