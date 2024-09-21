---
hide:
- navigation
- toc
---
# Semantic Kernel Chat with Agents

This sample demonstrates how to use the Semantic Kernel Chat API with streaming in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/sk-chat-with-agents-cs/Program.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new sk-chat-with-agents --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    Generating 'sk-chat-with-agents' in 'sk-chat-with-agents-cs' (5 files)...

    Program.cs
    README.md
    SemanticKernelChatWithAgents.csproj

    Generating 'sk-chat-with-agents' in 'sk-chat-with-agents-cs' (5 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

```csharp title="Program.cs"
var AZURE_OPENAI_API_KEY = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY") ?? "<insert your Azure OpenAI API key here>";
var AZURE_OPENAI_ENDPOINT = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? "<insert your Azure OpenAI endpoint here>";
var AZURE_OPENAI_CHAT_DEPLOYMENT = Environment.GetEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT") ?? "<insert your Azure OpenAI chat deployment name here>";
var AZURE_OPENAI_SYSTEM_PROMPT = Environment.GetEnvironmentVariable("AZURE_OPENAI_SYSTEM_PROMPT") ?? "You are a helpful AI assistant.";
```

**STEP 2**: Initialize the kernel and agents:

```csharp title="Program.cs"
var builder = Kernel.CreateBuilder();
builder.AddAzureOpenAIChatCompletion(AZURE_OPENAI_CHAT_DEPLOYMENT!, AZURE_OPENAI_ENDPOINT!, AZURE_OPENAI_API_KEY!);
var newKernel = new Func<Kernel>(() => builder.Build());

ChatCompletionAgent writer = new()
{
    Instructions = WriterInstructions,
    Name = WriterName,
    Kernel = newKernel(),
};

ChatCompletionAgent reviewer = new()
{
    Instructions = ReviewerInstructions,
    Name = ReviewerName,
    Kernel = newKernel(),
};
```

**STEP 3**: Define selection and termination strategies:

```csharp title="Program.cs"
KernelFunction pickNextAgentFunction = KernelFunctionFactory.CreateFromPrompt(PickNextAgentPromptTemplate);
KernelFunctionSelectionStrategy selectionStrategy = new KernelFunctionSelectionStrategy(pickNextAgentFunction, newKernel())
{
    ResultParser = (result) => result.GetValue<string>() ?? WriterName,
    HistoryVariableName = "history",
    AgentsVariableName = "agents",
};

KernelFunction isChatDoneFunction = KernelFunctionFactory.CreateFromPrompt(IsChatDonePromptTemplate);
KernelFunctionTerminationStrategy terminationStrategy = new KernelFunctionTerminationStrategy(isChatDoneFunction, newKernel())
{
    Agents = [reviewer],
    ResultParser = (result) => result.GetValue<string>()?.Contains("yes", StringComparison.OrdinalIgnoreCase) ?? false,
    HistoryVariableName = "history",
    MaximumIterations = 10,
};
```

**STEP 4**: Run chat iteration in a loop until completion:

```csharp title="Program.cs"
while (true)
{
    Console.Write("User: ");
    var userPrompt = Console.ReadLine();
    if (string.IsNullOrEmpty(userPrompt) || userPrompt == "exit") break;

    Console.Write("\nAssistant: ");
    await GetChatMessageContentsAsync(userPrompt, newKernel);
    Console.WriteLine("\rAssistant: Done\n");
}
```

**STEP 5**: Create a group chat with the writer and reviewer agents, and the custom termination and selection strategies:

```csharp title="Program.cs"
var agents = new[] { writer, reviewer };
AgentGroupChat chat = new(agents)
{
    ExecutionSettings = new()
    {
        SelectionStrategy = selectionStrategy,
        TerminationStrategy = terminationStrategy
    }
};
```

**STEP 6**: Start the chat by adding the initial user input

```csharp title="Program.cs"
chat.AddChatMessage(new ChatMessageContent(AuthorRole.User, input));
```

**STEP 7**: Process the chat messages and output the responses as they arrive:

```csharp title="Program.cs"
await foreach (var content in chat.InvokeAsync())
{
    var hasAuthor = !string.IsNullOrEmpty(content.AuthorName);
    var output = hasAuthor
        ? $"{content.Role}-{content.AuthorName}: {content.Content}\n"
        : $"{content.Role}: {content.Content}\n";

    Console.ForegroundColor = ConsoleColor.DarkGray;
    Console.WriteLine($"\r{output}");
    responseContent.AppendLine(output);

    Console.ForegroundColor = ConsoleColor.White;
    Console.Write("Assistant: ");
}
```
