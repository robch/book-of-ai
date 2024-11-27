using System.Text;
using Microsoft.ML.OnnxRuntimeGenAI;

public class ContentMessage
{
    public ContentMessage()
    {
        Role = string.Empty;
        Content = string.Empty;
    }

    public string Role { get; set; }
    public string Content { get; set; }
}

public class OnnxGenAIChatStreamingClass
{
    public OnnxGenAIChatStreamingClass(string modelDirectory, string systemPrompt)
    {
        _modelDirectory = modelDirectory;
        _systemPrompt = systemPrompt;

        _messages = new List<ContentMessage>();
        _messages.Add(new ContentMessage { Role = "system", Content = systemPrompt });

        _model = new Model(modelDirectory);
        _tokenizer = new Tokenizer(_model);
    }

    public void ClearMessages()
    {
        _messages.Clear();
        _messages.Add(new ContentMessage { Role = "system", Content = _systemPrompt });
    }

    public string GetChatCompletionStreaming(string userPrompt, Action<string>? callback = null)
    {
        _messages.Add(new ContentMessage { Role = "user", Content = userPrompt });

        var responseContent = string.Empty;
        using var tokens = _tokenizer.Encode(string.Join("\n", _messages
            .Select(m => $"<|{m.Role}|>\n{m.Content}\n<|end|>"))
            + "<|assistant|>\n");

        using var generatorParams = new GeneratorParams(_model);
        generatorParams.SetSearchOption("max_length", 2048);
        generatorParams.SetInputSequences(tokens);

        using var generator = new Generator(_model, generatorParams);

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

        responseContent = sb.ToString();
        _messages.Add(new ContentMessage { Role = "assistant", Content = responseContent });

        return responseContent;
    }

    private string _modelDirectory;
    private string _systemPrompt;
    private Model _model;
    private Tokenizer _tokenizer;

    private List<ContentMessage> _messages;
}