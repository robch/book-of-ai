//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.md file in the project root for full license information.
//

using OpenAI.Chat;
using System;
using System.Collections.Generic;
using System.Text;

public class FunctionCallContext
{
    public FunctionCallContext(FunctionFactory functionFactory, IList<ChatMessage> messages)
    {
        _functionFactory = functionFactory;
        _messages = messages;
    }

    
    public bool CheckForUpdate(StreamingChatCompletionUpdate streamingUpdate)
    {
        var updated = false;

        foreach (var update in streamingUpdate.ToolCallUpdates)
        {
            if (!string.IsNullOrEmpty(update.Id))
            {
                updated = true;
                _indexToToolCallId[update.Index] = update.Id;
            }
            if (!string.IsNullOrEmpty(update.FunctionName))
            {
                updated = true;
                _indexToFunctionName[update.Index] = update.FunctionName;
            }
            if (!string.IsNullOrEmpty(update.FunctionArgumentsUpdate))
            {
                updated = true;

                var needToAdd = !_indexToArguments.ContainsKey(update.Index);
                if (needToAdd) _indexToArguments[update.Index] = new StringBuilder();

                _indexToArguments[update.Index].Append(update.FunctionArgumentsUpdate);
            }
        }

        return updated;
    }

    public bool TryCallFunctions(string content)
    {
        if (_indexToArguments.Count == 0) return false;

        List<ChatToolCall> toolCalls = [];
        foreach (var item in _indexToToolCallId)
        {
            toolCalls.Add(ChatToolCall.CreateFunctionToolCall(
                item.Value,
                _indexToFunctionName[item.Key],
                _indexToArguments[item.Key].ToString()));
        }

        _messages.Add(new AssistantChatMessage(toolCalls, content));

        foreach (var toolCall in toolCalls)
        {
            var functionName = toolCall.FunctionName;
            var functionArguments = toolCall.FunctionArguments;

            var ok = _functionFactory.TryCallFunction(functionName, functionArguments, out var result);
            if (!ok) return false;

            Console.WriteLine($"\rassistant-function: {functionName}({functionArguments}) => {result}");
            Console.Write("\nAssistant: ");

            _messages.Add(ChatMessage.CreateToolChatMessage(toolCall.Id, result));
        }

        return true;
    }

    public void Clear()
    {
        _indexToToolCallId.Clear();
        _indexToFunctionName.Clear();
        _indexToArguments.Clear();
    }

    private FunctionFactory _functionFactory;
    private IList<ChatMessage> _messages;

    private Dictionary<int, string> _indexToToolCallId = [];
    private Dictionary<int, string> _indexToFunctionName = [];
    private Dictionary<int, StringBuilder> _indexToArguments = [];
}