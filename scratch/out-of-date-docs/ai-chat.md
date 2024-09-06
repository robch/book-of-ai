---
title: How to use the AI chat command.
titleSuffix: Azure AI Studio
description: This article provides instructions on how to use the AI chat command with the Azure AI CLI.
manager: nitinme
ms.service: azure-ai-studio
ms.topic: how-to
ms.date: 2/26/2024
ms.reviewer: eur
ms.author: eur
author: eric-urban
---

# How to use the AI chat command

[!INCLUDE [Azure AI Studio preview](../../includes/preview-ai-studio.md)]

The `ai chat` command in the Azure AI CLI initiates interactive or non-interactive conversations with a large language model (LLM) such as GPT-4. For example, you can chat with your copilot application that's grounded in your custom data.

Here's a table of the `ai chat` commands available in the Azure AI CLI. For more information, see the help and examples for each command.

| Command | Description |
| --- | --- |
| [ai chat](#ai-chat-command) | Initiates interactive or non-interactive conversations with a large language model (LLM) such as GPT-4. |
| [ai chat run](#ai-chat-run-command) | Initiates bulk processing of inputs via a large language model (LLM) or Python function. |
| [ai chat evaluate](#ai-chat-evaluate-command) | Initiates GPT assisted metric evaluation of inputs and outputs via a large language model (LLM) or Python function. |

## Command options

The following table describes the parameters for the `ai chat` commands. Some parameters are required, while others are optional. For more information, see the help for each command.

| Option | Description |
| --- | --- |
| `--deployment DEPLOYMENT` | Specifies the deployment to use.<br/><br/>See `ai help chat deployment` for more information. |
| `--endpoint ENDPOINT` | Specifies the endpoint to use.<br/><br/>See `ai help chat endpoint` for more information. |
| `--key KEY` | Specifies the key to use.<br/><br/>See `ai help chat key` for more information. |
| `--interactive`<sup>1</sup> | Specifies whether the chat is interactive.<br/><br/>See `ai help chat interactive` for more information. |
| `--system PROMPT` | Specifies the system prompt to use.<br/><br/>See `ai help chat system prompt` for more information. |
| `--user MESSAGE` | Specifies the user message to use.<br/><br/>See `ai help chat user message` for more information. |
| `--chat-history FILE`<sup>1</sup> | Specifies the chat history file to use.<br/><br/>See `ai help chat history` for more information. |
| `--input-data FILE`<sup>2</sup> | Specifies the input data file to use.<br/><br/>See `ai help chat run input data` for more information. |
| `--input-data-mapping MAPPINGs`<sup>2</sup> | Specifies the input data mapping to use.<br/><br/>See `ai help chat run input data mapping` for more information. |
| `--index-name INDEX` | Specifies the index name to use.<br/><br/>See `ai help index name` for more information. |
| `--search-endpoint ENDPOINT` | Specifies the search endpoint to use.<br/><br/>See `ai help search endpoint` for more information. |
| `--search-api-key KEY` | Specifies the search API key to use.<br/><br/>See `ai help search key` for more information. |
| `--function MODULE:FUNCTION` | Specifies the function to use.<br/><br/>See `ai help chat function` for more information. |
| `--built-in-functions TRUE`<sup>1</sup> | Specifies whether to use built-in functions.<br/><br/>See `ai help chat built-in helper functions` for more information. |
| `--custom-functions PATTERN`<sup>1</sup> | Specifies the custom functions pattern to use.<br/><br/>See `ai help chat custom helper functions` for more information. |
| `--temperature TEMPERATURE` | Specifies the temperature to use.<br/><br/>See `ai help chat options temperature` for more information. |
| `--max-tokens MAX_TOKENS` | Specifies the maximum tokens to use.<br/><br/>See `ai help chat options max-tokens` for more information. |
| `--top-p TOP_P` | Specifies the top-p to use.<br/><br/>See `ai help chat options top-p` for more information. |
| `--n N` | Specifies the n to use.<br/><br/>See `ai help chat options n` for more information. |

<sup>1</sup> Only applicable for the `ai chat` command. Not available for the `ai chat run` or `ai chat evaluate` commands.
<sup>2</sup> Only applicable for the `ai chat run` and `ai chat evaluate` commands. Not available for the `ai chat` command.

## AI chat command

The `ai chat` command initiates interactive or non-interactive conversations with an AI language model (e.g. OpenAI's GPT4).

```bash
ai chat --system @prompt.txt --interactive
ai chat --system @prompt.txt --user "What can you do?"
```

## AI chat run command

The `ai chat run` command initiates bulk processing of inputs via a large language model (LLM) or Python function.

Bulk process inputs from JSONL file:

```bash
ai chat run --input-data questions.jsonl
```

Bulk process inputs using an Azure Search index:

```bash
ai chat run --input-data questions.jsonl --index-name contoso_product_index
```

Bulk process inputs using a python function:
```bash
ai chat run --input-data questions.jsonl --function copilot_aisdk:chat_completion 
```

## AI chat evaluate command

The `ai chat evaluate` command initiates GPT assisted metric evaluation of inputs and outputs via a large language model (LLM) or Python function.

Evaluate inputs and outputs from JSONL file:

```bash
ai chat run --input-data questions.jsonl --output-data answers.jsonl
ai chat evaluate --input-data answers.jsonl
```

Evaluate inputs using an Azure Search index:

```bash
ai chat evaluate --input-data questions.jsonl --index-name contoso_product_index
```

Bulk process inputs using a python function:

```bash
ai chat evaluate --input-data questions.jsonl --function copilot_aisdk:chat_completion 
```

## Remarks

For more information and examples, run the following commands in the Azure AI CLI:

```bash
ai help chat
ai help chat examples
ai help find topics chat
```

## Related content

- [Azure AI CLI reference](./commands-summary.md)
- [Install the Azure AI CLI](cli-get-started.md)
- [Develop with VS Code (Web) in Azure AI Studio](../../how-to/vscode-web.md)
