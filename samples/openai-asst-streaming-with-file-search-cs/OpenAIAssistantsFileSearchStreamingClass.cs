using System;
using System.Threading.Tasks;
using Azure.AI.OpenAI;
using Azure.AI.OpenAI.Chat;
using OpenAI;
using OpenAI.Assistants;
using OpenAI.Chat;
using OpenAI.Files;

#pragma warning disable OPENAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.

public class OpenAIAssistantsFileSearchStreamingClass
{
    public AssistantThread? Thread;

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

    private readonly string _assistantId;
    private readonly FileClient _fileClient;
    private readonly AssistantClient _assistantClient;
}