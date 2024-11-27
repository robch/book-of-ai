using System;
using System.Threading.Tasks;
using Azure.AI.OpenAI;
using Azure.AI.OpenAI.Chat;
using OpenAI;
using OpenAI.Assistants;
using OpenAI.Chat;

#pragma warning disable OPENAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

public class OpenAIAssistantsCodeInterpreterStreamingClass
{
    public AssistantThread? Thread;

    public OpenAIAssistantsCodeInterpreterStreamingClass(OpenAIClient client, string assistantId)
    {
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

    private readonly string _assistantId;
    private readonly AssistantClient _assistantClient;
}