//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

public class OnnxGenAIChatFunctionCallContext
{
    public OnnxGenAIChatFunctionCallContext(FunctionFactory functionFactory, IList<OnnxGenAIChatContentMessage> messages)
    {
        _functionFactory = functionFactory;
        _messages = messages;
    }
    
    public bool CheckForFunctions(StringBuilder content)
    {
        _functionCallsTagStartsAt = content.ToString().IndexOf("<|function_calls|>");
        if (_functionCallsTagStartsAt < 0) return false;

        _endFunctionCallsTagStartsAt = content.ToString().IndexOf("<|end_function_calls|>", _functionCallsTagStartsAt);
        return _functionCallsTagStartsAt >= 0 && _endFunctionCallsTagStartsAt >= 0;
    }

    public bool TryCallFunctions(StringBuilder content)
    {
        if (!CheckForFunctions(content)) return false;
        if (!ExtractFunctions(content)) return false;

        var contentBeforeFunctionCallsTag = content.ToString().Substring(0, _functionCallsTagStartsAt);
        if (!string.IsNullOrWhiteSpace(contentBeforeFunctionCallsTag))
        {
            _messages.Add(new OnnxGenAIChatContentMessage { Role = "assistant", Content = contentBeforeFunctionCallsTag });
        }

        var contentIncludingEndFunctionCallsTag = content.ToString().Substring(0, _endFunctionCallsTagStartsAt + "<|end_function_calls|>".Length);
        content.Remove(0, contentIncludingEndFunctionCallsTag.Length);

        var contentInsideFunctionCallsTag = contentIncludingEndFunctionCallsTag.Substring(_functionCallsTagStartsAt, _endFunctionCallsTagStartsAt - _functionCallsTagStartsAt + "<|end_function_calls|>".Length);
        if (!string.IsNullOrWhiteSpace(contentInsideFunctionCallsTag))
        {
            _messages.Add(new OnnxGenAIChatContentMessage { Role = "assistant", Content = contentInsideFunctionCallsTag });
        }

        var hasPlaceholders = _indexToArguments.Any(x => x.Value.Any(y => y.Value.Contains("PLACEHOLDER")));
        if (hasPlaceholders)
        {
            _messages.Add(new OnnxGenAIChatContentMessage { Role = "assistant", Content = "Oh, wait! I can't use placeholders in function calls. use answer and end_answer to ask the user for the missing information." });
            return true;
        }

        var results = new StringBuilder();
        for (var index = 0; index < _indexToFunctionName.Count; index++)
        {
            var functionName = _indexToFunctionName[index];
            var functionArguments = _indexToArguments[index];
            var asJson = JsonFromArguments(functionArguments);

            var result = TryCatchCallFunction(functionName, asJson);
            Console.WriteLine($"\rassistant-function: {functionName}({asJson}) => {result}");

            results.AppendLine($"- api: {functionName}");
            results.AppendLine($"  result: {result}");
            results.AppendLine();
        }

        Console.Write("\nAssistant: ");

        var functionCallResults = results.ToString().Trim(' ', '\n', '\r');
        functionCallResults = $"\n{functionCallResults}\n<|end_function_call_results|>\n";
        _messages.Add(new OnnxGenAIChatContentMessage { Role = "function_call_results", Content = functionCallResults });

        return true;
    }

    public void Clear()
    {
        _indexToFunctionName.Clear();
        _indexToArguments.Clear();
        _functionCallsTagStartsAt = -1;
        _endFunctionCallsTagStartsAt = -1;
    }

    private bool ExtractFunctions(StringBuilder content)
    {
        var lines = content.ToString()
            .Substring(_functionCallsTagStartsAt, _endFunctionCallsTagStartsAt - _functionCallsTagStartsAt)
            .Split('\n', StringSplitOptions.RemoveEmptyEntries);

        var currentFunctionIndex = -1;
        for (var i = 0; i < lines.Length; i++)
        {
            var line = lines[i].Trim(' ', '\r', '\n', '-');
            if (string.IsNullOrEmpty(line)) continue;

            if (line.StartsWith("api:"))
            {
                var api = line.Substring("api:".Length).Trim();
                _indexToFunctionName[++currentFunctionIndex] = api;
                _indexToArguments[currentFunctionIndex] = new List<KeyValuePair<string, string>>();
                continue;
            }

            if (currentFunctionIndex >= 0)
            {
                var colonIndex = line.IndexOf(':');
                if (colonIndex < 0) continue;

                var key = line.Substring(0, colonIndex).Trim();
                var value = line.Substring(colonIndex + 1).Trim();
                _indexToArguments[currentFunctionIndex].Add(new KeyValuePair<string, string>(key, value));
            }
        }

        return _indexToFunctionName.Count > 0;
    }

    private string JsonFromArguments(List<KeyValuePair<string, string>> functionArguments)
    {
        var tryExpandParametersJson = functionArguments.Any(x => x.Key == "parameters" && !string.IsNullOrEmpty(x.Value));
        if (tryExpandParametersJson)
        {
            var parametersSpecifiedAsJson = functionArguments.First(x => x.Key == "parameters");
            functionArguments.Remove(parametersSpecifiedAsJson);
            var parameters = JsonSerializer.Deserialize<Dictionary<string, string>>(parametersSpecifiedAsJson.Value);
            if (parameters != null)
            {
                foreach (var parameter in parameters)
                {
                    functionArguments.Add(new KeyValuePair<string, string>(parameter.Key, parameter.Value));
                }
            }
        }

        using var stream = new MemoryStream();
        using var writer = new Utf8JsonWriter(stream, new JsonWriterOptions { Indented = false });
        writer.WriteStartObject();

        foreach (var argument in functionArguments)
        {
            writer.WritePropertyName(argument.Key);
            writer.WriteStringValue(argument.Value);
        }

        writer.WriteEndObject();
        writer.Flush();

        return Encoding.UTF8.GetString(stream.ToArray());
    }

    private string? TryCatchCallFunction(string functionName, string asJson)
    {
        string? result;
        try
        {
            var ok = _functionFactory.TryCallFunction(functionName, asJson, out result);
            if (!ok) result = $"Function '{functionName}' not found.";
        }
        catch (Exception ex)
        {
            result = $"Error calling function '{functionName}': {ex.Message}";
        }

        return result;
    }


    private FunctionFactory _functionFactory;
    private IList<OnnxGenAIChatContentMessage> _messages;

    private int _functionCallsTagStartsAt = -1;
    private int _endFunctionCallsTagStartsAt = -1;

    private Dictionary<int, string> _indexToFunctionName = [];
    private Dictionary<int, List<KeyValuePair<string, string>>> _indexToArguments = [];
}