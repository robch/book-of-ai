using System.Text;
using Microsoft.ML.OnnxRuntimeGenAI;
using System.Text.Json;

public class OnnxGenAIChatStreamingClass
{
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

    public void ClearMessages()
    {
        _messages.Clear();
        _messages.Add(new OnnxGenAIChatContentMessage { Role = "system", Content = _systemPrompt });
    }

    public string GetChatCompletionStreaming(string userPrompt, Action<string>? callback = null)
    {
        var debug = Environment.GetEnvironmentVariable("DEBUG") != null;

        _messages.Add(new OnnxGenAIChatContentMessage { Role = "user", Content = userPrompt });

        var responseContent = string.Empty;
        while (true)
        {
            var history = string.Join("\n", _messages
                .Select(m => $"<|{m.Role}|>\n{m.Content}\n<|end|>"))
                + "<|assistant|>\n";

            // Console.WriteLine("\n**************** History ****************");
            // Console.WriteLine(history);
            // Console.WriteLine("----------------------------------------\n");

            using var tokens = _tokenizer.Encode(history);

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

                var startAnswerAt = sb.ToString().LastIndexOf("<|answer|>");
                var endAnswerAt = sb.ToString().LastIndexOf("<|end_answer|>");
                var insideAnswer = startAnswerAt >= 0 && startAnswerAt > endAnswerAt;

                var output = _tokenizer.Decode(newToken);
                sb.Append(output);

                if (insideAnswer || debug) callback?.Invoke(output);

                if (sb.ToString().Contains("<|end_answer|>")) break;
                if (_functionCallContext.CheckForFunctions(sb)) break;
            }

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
    }

    private static string UpdateSystemPrompt(string systemPrompt, FunctionFactory factory)
    {
        var functionsSchemaStartsAt = systemPrompt.IndexOf("<|functions_schema|>");
        if (functionsSchemaStartsAt >= 0)
        {
            var functionsSchemaEndsAt = systemPrompt.IndexOf("<|end_functions_schema|>", functionsSchemaStartsAt);
            if (functionsSchemaEndsAt >= 0)
            {
                var asYaml = new StringBuilder();
                var tools = factory.GetChatTools().ToList();
                foreach (var tool in tools)
                {
                    asYaml.Append($"- name: {tool.Name}\n");
                    asYaml.Append($"  description: {tool.Description}\n");
                    asYaml.Append($"  parameters: |\n");
                    asYaml.Append($"    {tool.Parameters}\n");
                }

                systemPrompt = systemPrompt.Remove(functionsSchemaStartsAt, functionsSchemaEndsAt - functionsSchemaStartsAt + "<|end_functions_schema|>".Length);

                var newFunctionsSchema = "<|functions_schema|>\n" + asYaml + "\n<|end_functions_schema|>";
                systemPrompt = systemPrompt.Insert(functionsSchemaStartsAt, newFunctionsSchema);
            }
        }

        return systemPrompt;
    }

    private string _modelDirectory;
    private string _systemPrompt;
    private FunctionFactory _factory;

    private Model _model;
    private Tokenizer _tokenizer;
    private List<OnnxGenAIChatContentMessage> _messages;
    private OnnxGenAIChatFunctionCallContext _functionCallContext;
}