---
title: Get started with the Azure AI CLI
titleSuffix: Azure AI Studio
description: This article provides instructions on how to install and get started with the Azure AI CLI.
manager: nitinme
ms.service: azure-ai-studio
ms.custom:
  - ignite-2023
ms.topic: how-to
ms.date: 11/15/2023
ms.reviewer: eur
ms.author: eur
author: eric-urban
---

# Get started with the Azure AI CLI

[!INCLUDE [Azure AI Studio preview](../../includes/preview-ai-studio.md)]

The Azure AI command-line interface (CLI) is a cross-platform command-line tool to connect to Azure AI services and execute control-plane and data-plane operations without having to write any code. The Azure AI CLI allows the execution of commands through a terminal using interactive command-line prompts or via script. 

You can easily use the Azure AI CLI to experiment with key Azure AI features and see how they work with your use cases. Within minutes, you can set up all the required Azure resources needed, and build a customized copilot using Azure OpenAI chat completions APIs and your own data. You can try it out interactively, or script larger processes to automate your own workflows and evaluations as part of your CI/CD system.

## Prerequisites

To use the Azure AI CLI, you need to install the prerequisites: 
 * The Azure AI SDK, following the instructions [here](../../how-to/sdk-install.md)
 * The Azure CLI (`az`), following the instructions [here](/cli/azure/install-azure-cli)
 * The .NET SDK, following the instructions [here](/dotnet/core/install/) for your operating system and distro

> [!NOTE]
> If you launched VS Code from [Azure AI Studio](https://ai.azure.com), you don't need to install the prerequisites. See options without installing later in this article.

## Install the CLI

The following set of commands are provided for a few popular operating systems.

# [Windows](#tab/windows)

To install the .NET SDK, Azure CLI, and Azure AI CLI, run the following command. 

```bash
dotnet tool install --prerelease --global Azure.AI.CLI
```

To update the Azure AI CLI, run the following command:

```bash
dotnet tool update --prerelease --global Azure.AI.CLI
```

# [Linux](#tab/linux)

To install the .NET SDK, Azure CLI, and Azure AI CLI on Debian and Ubuntu, run the following command:

```
curl -sL https://aka.ms/InstallAzureAICLIDeb | bash
```

Alternatively, you can run the following command:

```bash
dotnet tool install --prerelease --global Azure.AI.CLI
```

To update the Azure AI CLI, run the following command:

```bash
dotnet tool update --prerelease --global Azure.AI.CLI
```

# [macOS](#tab/macos)

To install the .NET SDK, Azure CLI, and Azure AI CLI on macOS 10.14 or later, run the following command:

```bash
dotnet tool install --prerelease --global Azure.AI.CLI
```

To update the Azure AI CLI, run the following command:

```bash
dotnet tool update --prerelease --global Azure.AI.CLI
```

---

## Learn about scenarios that the CLI supports

The AI CLI offers many capabilities, including Azure AI hub and project setup, connections with services such as Azure OpenAI Service and Azure AI Search, prompt flow tools, and an interactive chat experience.

If you plan to use the AI CLI as part of your development, we recommend you start by running [ai init](./ai-init.md), which guides you through setting up your Azure resources and connections in your development environment.

You can use the AI CLI to do the following:
- Select or create resources.
- Explore the capabilities with the AI CLI or Azure AI Studio.
- Explore the kinds of code we can create for you in a variety of languages.
- Create code in the language of your choice for the scenario of your choice.
- Use the CLI to bridge the "secrets" and "endpoints" goo for you.
- Use your language mechanisms to restore packages and run the code.

For example, you might do the following:
1. Use the `ai init openai` command to select or create your Azure OpenAI Service resource. You're also prompted to select or create chat, embeddings, and evaluation deployments. 
1. Use the `ai chat` command to explore the use of the resource. For example, run `ai chat --user "Tell me about Azure AI Studio"` to see how the chat capabilities work.
1. Use the `ai dev new` to create the code for your language.
1. Use the `ai dev shell` or `ai dev new .env` to populate an interactive shell with environment variables, or to create an `.env` file with the right stuff.

## Initialize resources

If your development environment hasn't already been configured with an existing project, or you select the **Initialize something else** option, there will be a few flows you can choose when running `ai init`: **Initialize a new AI project**, **Initialize an existing AI project**, or **Initialize standalone resources**.

The following table describes the scenarios for each flow.

| Scenario | Description |
| --- | --- |
| Initialize a new AI project | Choose if you don't have an existing AI project that you have been working with in the Azure AI Studio. The `ai init` command walks you through creating or attaching resources. |
| Initialize an existing AI project | Choose if you have an existing AI project you want to work with. The `ai init` command checks your existing linked resources, and asks you to set anything that hasn't been set before. |
| Initialize standalone resources| Choose if you're building a simple solution connected to a single AI service, or if you want to attach more resources to your development environment. |

The following resources can be initialized standalone, or attached to projects:

- Azure AI services: Includes Azure OpenAI, Azure AI Speech, and Azure AI Vision.
- Azure OpenAI: Provides access to Azure OpenAI Service.
- Azure AI Search: Provides keyword, vector, and hybrid search capabilities.

Connections are established to attached resources and allow you to integrate services with your project. When you run `ai init` your project connections get set in your development environment, allowing seamless integration with AI services. You can view these connections by running `ai service connection list`, and further manage these connections with [ai service connection](ai-service.md#ai-service-connection-command).

## Chat with the AI CLI

Once you have initialized resources and have a deployment, you can chat interactively or non-interactively with the AI language model using the `ai chat` command. The CLI has more examples of ways to use the `ai chat` capabilities, simply enter `ai chat` to try them. Once you have tested the chat capabilities, you can add in your own data.

# [Terminal](#tab/terminal)

Here's an example of interactive chat:

```bash
ai chat --interactive --system @prompt.txt
```

Here's an example of non-interactive chat:

```bash
ai chat --system @prompt.txt --user "Tell me about Azure AI Studio"
```


# [PowerShell](#tab/powershell)

Here's an example of interactive chat:

```powershell
ai --% chat --interactive --system @prompt.txt
```

Here's an example of non-interactive chat:

```powershell
ai --% chat --system @prompt.txt --user "Tell me about Azure AI Studio"
```

> [!NOTE]
> If you're using PowerShell, use the `--%` stop-parsing token to prevent the terminal from interpreting the `@` symbol as a special character. 

---

#### Chat with your data

Once you have tested the basic chat capabilities, you can add your own data using an Azure AI Search vector index.

1. Create a search index based on your data.
1. Interactively chat with an AI system grounded in your data.
1. Clear the index to prepare for other chat explorations.

```bash
ai search index update --name <index_name> --files "*.md"
ai chat --index-name <index_name> --interactive
```

When you use `search index update` to create or update an index, `ai config` stores that index name. Run `ai config` in the CLI to see more usage details.

If you want to set a different existing index for subsequent chats, use:
```bash
ai config --set search.index.name <index_name>
```

If you want to clear the set index name, use:
```bash 
ai config --clear search.index.name
```

## Learn about underlying services with AI debug

You can insert `debug` (immediately following `ai`) into any of the commands to see the python script that's used and a few more messages. For example, use `ai debug service project list` to see the code and any errors that might be happening when you try to get the list of projects.

Try `ai help` to learn more about these capabilities.



## Next steps

- [Try the Azure AI CLI from Azure AI Studio in a browser](../../how-to/develop-in-vscode.md)












