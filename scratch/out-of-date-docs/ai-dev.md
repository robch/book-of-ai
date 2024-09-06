---
title: How to use the AI dev command.
titleSuffix: Azure AI Studio
description: This article provides instructions on how to use the AI dev command with the Azure AI CLI.
manager: nitinme
ms.service: azure-ai-studio
ms.topic: how-to
ms.date: 2/26/2024
ms.reviewer: eur
ms.author: eur
author: eric-urban
---

# How to use the AI dev command

[!INCLUDE [Azure AI Studio preview](../../includes/preview-ai-studio.md)]

The `ai dev` command in the Azure AI CLI provides a set of commands to get started with templates and configuration settings. 

Here's a table of the `ai dev` commands available in the Azure AI CLI. For more information, see the help and examples for each command.

| Command | Description |
| --- | --- |
| [ai dev new](#ai-dev-new-command) | Creates or lists available templates. The available templates include quickstart sample code and helper functions. |
| [ai dev shell](#ai-dev-shell-command) | Creates a fast path to providing configuration data (such as keys and endpoints) to a new shell (such as `cmd.exe` or `/bin/bash`) or to a specified command to run via environment variables. |

## AI dev new command

The `ai dev new` command creates or lists available templates.

| Command | Description |
| --- | --- |
| `ai dev new list` | List available templates. |
| `ai dev new TEMPLATE_NAME` | Create a new template. |

The following table describes the available templates for the `ai dev new` command.

| `Template name` | Description | Language |
|------|------|------|
| `.env` | File that contains environment variables for resources and services that you set up with the [ai init](./ai-init.md) or [ai config](./ai-config.md) commands. | Not applicable |
| `helper-functions` | Helper function class library. | C# |
| `openai-chat` | Azure OpenAI chat completions. | C#, Go, Java, JavaScript, Python |
| `openai-chat-streaming` | Azure OpenAI chat completions (streaming). | C#, Go, Java, JavaScript, Python |
| `openai-chat-streaming-with-data` | Azure OpenAI chat completions (with data + AI search). | C#, Go, Java, JavaScript, Python |
| `openai-chat-streaming-with-functions` | Azure OpenAI chat completions (with functions). | C#, Go, JavaScript, Python |
| `openai-webpage` | Azure OpenAI webpage. | JavaScript, TypeScript |
| `openai-webpage-with-functions` | Azure OpenAI webpage (with functions). | JavaScript, TypeScript |


### Example to list available templates

You can list available templates by running the `ai dev new list` command.

```bash
`ai dev new list`
```

Output similar to this example is displayed in the terminal:

> [!NOTE]
> The "OpenAI" templates refer to templates for the Azure OpenAI Service.

```terminal
Name                                             Short Name                              Language
---------------------------------------------    ------------------------------------    --------------------------------
Environment Variables                            .env
Helper Function Class Library                    helper-functions                        C#
OpenAI Chat Completions                          openai-chat                             C#, Go, Java, JavaScript, Python
OpenAI Chat Completions (Streaming)              openai-chat-streaming                   C#, Go, Java, JavaScript, Python
OpenAI Chat Completions (w/ Data + AI Search)    openai-chat-streaming-with-data         C#, Go, Java, JavaScript, Python
OpenAI Chat Completions (w/ Functions)           openai-chat-streaming-with-functions    C#, Go, JavaScript, Python
OpenAI Webpage                                   openai-webpage                          JavaScript, TypeScript
OpenAI Webpage (w/ Functions)                    openai-webpage-with-functions           JavaScript, TypeScript
```

### Example to create a new .env file

To connect your code to the Azure resources, you need environment variables that the Azure AI SDK can use. You might be used to creating environment variables manually, which is much tedious work. The Azure AI CLI saves you time.

You can create a new `.env` file by running the `ai dev new` command with the `.env` template name. The `.env` file contains environment variables for resources and services that you set up with the [ai init](./ai-init.md) or [ai config](./ai-config.md) commands.

```bash
ai dev new .env
```

> [!WARNING]
> If you already have an `.env` file in your working directory, running this command will overwrite the existing file with settings from the local AI CLI configuration datastore.

Output similar to this example is displayed in the terminal:

```terminal
.env (saved at 'C:\dev\ai-gen-sdk')
```

The `.env` file is created with the following content:

```text
AZURE_AI_PROJECT_NAME = contoso-outdoor-proj
AZURE_AI_SEARCH_ENDPOINT = https://contoso-outdoor-proj-search.search.windows.net
AZURE_AI_SEARCH_INDEX_NAME = product-info
AZURE_AI_SEARCH_KEY = YourAzureAISearchKey
AZURE_AI_SPEECH_ENDPOINT = https://ai-contosoaihub-aiservices-1891736009.cognitiveservices.azure.com/
AZURE_AI_SPEECH_KEY = 8c0a****************************
AZURE_AI_SPEECH_REGION = eastus2
AZURE_COGNITIVE_SEARCH_KEY = YourAzureAISearchKey
AZURE_COGNITIVE_SEARCH_TARGET = https://contoso-outdoor-proj-search.search.windows.net
AZURE_OPENAI_API_KEY = 8c0a****************************
AZURE_OPENAI_API_VERSION = 2023-12-01-preview
AZURE_OPENAI_CHAT_DEPLOYMENT = gpt-35-turbo-16k-0613
AZURE_OPENAI_CHAT_MODEL = gpt-35-turbo-16k
AZURE_OPENAI_EMBEDDING_DEPLOYMENT = text-embedding-ada-002-2
AZURE_OPENAI_EMBEDDING_MODEL = text-embedding-ada-002
AZURE_OPENAI_ENDPOINT = https://ai-contosoaihub-aiservices-1891736009.cognitiveservices.azure.com/
AZURE_OPENAI_EVALUATION_DEPLOYMENT = gpt-35-turbo-16k-0613
AZURE_OPENAI_EVALUATION_MODEL = gpt-35-turbo-16k
AZURE_OPENAI_KEY = 8c0a****************************
AZURE_RESOURCE_GROUP = rg-contosoaihub
AZURE_SUBSCRIPTION_ID = YourAzureSubscriptionID
OPENAI_API_BASE = https://ai-contosoaihub-aiservices-1891736009.cognitiveservices.azure.com/
OPENAI_API_KEY = 8c0a****************************
OPENAI_API_TYPE = azure
OPENAI_API_VERSION = 2023-12-01-preview
```

### Example to create a new Python template

You can create a new template by running the `ai dev new` command with the name of the template you want to create. For example, to create a template for an Azure OpenAI chat completions application in Python, run the following command:

```bash
ai dev new openai-chat --language Python
```

Output similar to this example is displayed in the terminal:

```terminal
Generating 'openai-chat-py' (2 files)...

  openai_chat_completions.py
  requirements.txt

Generating 'openai-chat-py' (2 files)... DONE!
```

A new directory is created with the name `openai-chat-py` that contains the following files:
- `openai_chat_completions.py`
- `requirements.txt`

The contents of the `openai_chat_completions.py` file are similar to the following:

```python
from openai import AzureOpenAI
import os
import sys

openai_api_version = os.getenv('AZURE_OPENAI_API_VERSION', '2023-12-01-preview')
openai_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your Azure OpenAI endpoint here>')
openai_key = os.getenv('AZURE_OPENAI_API_KEY', '<insert your Azure OpenAI API key here>')
openai_chat_deployment_name = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', '<insert your OpenAI chat deployment name here>')
openai_system_prompt = os.getenv('AZURE_OPENAI_SYSTEM_PROMPT', 'You are a helpful AI assistant.')

client = AzureOpenAI(
  api_key=openai_key,
  api_version=openai_api_version,
  azure_endpoint = openai_endpoint
)

messages=[
    {'role': 'system', 'content': openai_system_prompt},
]

def get_chat_completions(user_input) -> str:
    messages.append({'role': 'user', 'content': user_input})

    response = client.chat.completions.create(
        model=openai_chat_deployment_name,
        messages=messages,
    )

    response_content = response.choices[0].message.content
    messages.append({'role': 'assistant', 'content': response_content})

    return response_content

def main():
    while True:
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break

        response_content = get_chat_completions(user_input)
        print(f"\nAssistant: {response_content}\n")

if __name__ == '__main__':
    try:
        main()
    except EOFError:
        pass
    except Exception as e:
        print(f"The sample encountered an error: {e}")
        sys.exit(1)
```

### Example to create new helper functions in C#

You can create a new template by running the `ai dev new` command with the name of the template you want to create. For example, to create a template for a helper function class library in C#, run the following command:

```bash
ai dev new helper-functions
```

Output similar to this example is displayed in the terminal:

```terminal
Generating 'helper_functions' in 'C:\dev\ai-gen-sdk\helper-functions' (4 files)...

  .ai/prompt.md
  .ai/system.md
  HelperFunctionClass.cs
  HelperFunctionsProject.csproj

Generating 'helper_functions' in 'C:\dev\ai-gen-sdk\helper-functions' (4 files)... DONE!
```

A new directory is created with the name `helper-functions` that contains the following files for a C# project:
- `.ai/prompt.md`
- `.ai/system.md`
- `HelperFunctionClass.cs`
- `HelperFunctionsProject.csproj`

The contents of the `HelperFunctionClass.cs` file are similar to the following:

```csharp
using Azure.AI.Details.Common.CLI.Extensions.HelperFunctions;

public static class HelperFunctionClass
{
    [HelperFunctionDescription("Gets the user's name")]
    public static string GetUsersName()
    {
        return Environment.UserName;
    }
}
```

## AI dev shell command

The `ai dev shell` command creates a fast path to providing configuration data (such as keys and endpoints) to a new shell (such as `cmd.exe` or `/bin/bash`) or to a specified command to run via environment variables.

| Command | Description |
|---------|-------------|
| `ai dev shell` | Opens a new shell populated with environment variables. |
| `ai dev shell --run` | Runs a specific program with its environment populated. |


### Example to open a new shell populated with environment variables

You can open a new shell populated with environment variables by running the `ai dev shell` command.

```bash
ai dev shell
```

Output similar to this example is displayed in the terminal along with the environment variables populated:

```terminal
Environment populated:
{List of environment variables}
```

### Example to run a specific program with its environment populated

You can run a specific program with its environment populated by running the `ai dev shell --run` command.

```bash
ai dev shell --run "python myApp.py"
```

Output similar to this example is displayed in the terminal along with the environment variables populated:

```terminal
Environment populated:
{List of environment variables}
Running command: python myApp.py
```

## Related content

- [Azure AI CLI reference](./commands-summary.md)
- [Install the Azure AI CLI](cli-get-started.md)
- [Develop with VS Code (Web) in Azure AI Studio](../../how-to/vscode-web.md)
