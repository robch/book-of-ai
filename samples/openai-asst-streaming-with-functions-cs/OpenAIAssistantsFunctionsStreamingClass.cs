using System;
using System.Threading.Tasks;
using Azure.AI.OpenAI;
using Azure.AI.OpenAI.Chat;
using OpenAI;
using OpenAI.Assistants;
using OpenAI.Chat;

#pragma warning disable OPENAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

public class OpenAIAssistantsFunctionsStreamingClass
{
    public AssistantThread? Thread;

    public OpenAIAssistantsFunctionsStreamingClass(OpenAIClient client, string assistantId, FunctionFactory factory)
    {
        _assistantClient = client.GetAssistantClient();
        _assistantId = assistantId;
        _functionFactory = factory;

        _runOptions=  new RunCreationOptions();
        foreach (var tool in _functionFactory.GetToolDefinitions())
        {
            _runOptions.ToolsOverride.Add(tool);
        }
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
        var options = new MessageCollectionOptions() { Order = ListOrder.OldestFirst };
        await foreach (var message in _assistantClient.GetMessagesAsync(Thread, options).GetAllValuesAsync())
        {
            var content = string.Join("", message.Content.Select(c => c.Text));
            var role = message.Role == MessageRole.User ? "user" : "assistant";
            callback(role, content);
        }
    }

    public async Task GetResponseAsync(string userInput, Action<string> callback)
    {
        await _assistantClient.CreateMessageAsync(Thread, MessageRole.User, [ userInput ]);
        var assistant = await _assistantClient.GetAssistantAsync(_assistantId);
        var stream = _assistantClient.CreateRunStreamingAsync(Thread, assistant.Value, _runOptions);

        ThreadRun? run = null;
        List<ToolOutput> toolOutputs = [];
        do
        {
            await foreach (var update in stream)
            {
                // Console.Write($"{update.UpdateKind}\n\n");
                if (update is MessageContentUpdate contentUpdate)
                {
                    callback(contentUpdate.Text);
                }
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

            if (toolOutputs.Count > 0 && run != null)
            {
                stream = _assistantClient.SubmitToolOutputsToRunStreamingAsync(run, toolOutputs);
                toolOutputs.Clear();
            }
        }
        while (run?.Status.IsTerminal == false);
    }

    private readonly string _assistantId;
    private FunctionFactory _functionFactory;
    private RunCreationOptions _runOptions;
    private readonly AssistantClient _assistantClient;
}