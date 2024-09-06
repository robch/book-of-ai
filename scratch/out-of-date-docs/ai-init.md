---
title: How to use the AI init command.
titleSuffix: Azure AI Studio
description: This article provides instructions on how to use the AI init command with the Azure AI CLI.
manager: nitinme
ms.service: azure-ai-studio
ms.topic: how-to
ms.date: 2/26/2024
ms.reviewer: eur
ms.author: eur
author: eric-urban
---

# How to use the AI init command

[!INCLUDE [Azure AI Studio preview](../../includes/preview-ai-studio.md)]

The `ai init` command allows interactive and non-interactive selection or creation of Azure AI Studio resources. When a resource is selected or created using this command, the associated resource keys and region are retrieved and automatically stored in the local AI CLI configuration datastore.

There are two main use cases for the `ai init` command:
- Create new Azure resources.
- Select existing Azure resources.

In both cases, the command can be used interactively or non-interactively. The end result is that the settings for the selected or created resources are stored in the local AI CLI configuration datastore.

> [!IMPORTANT]
> The datastore is in the `.ai/data` directory relative to where the `ai init` command is run. If you want to use the same or different settings elsewhere, change directories and run `ai init` again.

## Commands 

If you want to work with an Azure AI Studio project (now or in the future), use the `ai init` command to create or select an AI project. You have the option to connect existing resources to the project, such as Azure OpenAI Service and Azure AI Search.

The `ai init` command can be used to initialize Azure AI Studio resources or standalone resources. 
- If you want to work with an Azure AI Studio project (now or in the future), use the `ai init` command to create or select an AI project. You have the option to connect existing resources to the project, such as Azure OpenAI Service and Azure AI Search. See [Initialize resources for Azure AI Studio](#initialize-resources-for-azure-ai-studio).
- If you don't plan to use Azure AI Studio, you can use the `ai init` command to create or select standalone resources. See [Initialize standalone resources](#initialize-standalone-resources).

### Initialize resources for Azure AI Studio

Here's a table of the `ai init` commands for Azure AI Studio resources available in the Azure AI CLI:

| Command | Description |
| --- | --- |
| `ai init` | You're prompted to initialize your development environment with resources and connections for a new or existing Azure AI project. If you already configured your development environment with an existing AI project, it will be preselected by default. You can choose to initialize something else, such as a new project, an existing project, or standalone resources.<br/><br/>If you want to work with an existing Azure OpenAI Service resource in an Azure AI project, use `ai init` and follow the prompts to create a new AI project. |
| `ai init project new` | You're prompted to create a new Azure AI project. Working with an AI project is recommended when using the Azure AI Studio and/or connecting to multiple AI services. Projects come with an AI hub that houses related projects and shareable resources like compute and connections to services. Projects also allow you to connect code to cloud resources (such as storage and model deployments), save evaluation results, and host code behind online endpoints. |
| `ai init project select` | You're prompted to select an existing Azure AI project. You're not prompted to select or create an Azure AI hub resource. |
| `ai init resource` | You're prompted to create a new Azure AI hub resource or select an existing one. |

### Initialize standalone resources

If you don't plan to use Azure AI Studio, you can use the `ai init` command to create or select standalone resources.

Here's a table of the `ai init` commands for standalone resources available in the Azure AI CLI:

| Command | Description |
| --- | --- |
| `ai init aiservices` | This is recommended to use when you want to work with multiple AI services such as Azure AI Speech, Azure AI Vision, and Azure OpenAI Service. You can use the same provisioned API key to use all of the supported services. |
| `ai init cognitiveservices` | This is only recommended to use when you want to work with multiple AI services that aren't yet supported via `ai init aiservices`. For example, Azure AI Document Intelligence isn't yet supported with an Azure AI hub resource. |
| `ai init openai` | You're prompted to create or select an Azure OpenAI resource. You aren't prompted to create or select an AI hub or AI project.<br/><br/>Use this command when you want to work with an existing Azure OpenAI Service resource, but you don't need an Azure AI project. If you want to work with an existing Azure OpenAI Service resource in an Azure AI project, use `ai init` instead and follow the prompts to create a new AI project.|
| `ai init search` | You're prompted to create or select an Azure AI Search resource. You aren't prompted to create or select an AI hub or AI project.<br/><br/>Use this command when you want to work with an existing Azure AI Search resource, but you don't need an Azure AI project. If you want to work with an existing Azure AI Search resource in an Azure AI project, use `ai init` and follow the prompts to create a new AI project. |

### Example to initialize a new AI project

1. Run `ai init` and choose **Initialize new AI project**.
1. Select your subscription. You might be prompted to sign in through an interactive flow.
1. Select your Azure AI hub resource, or create a new one. An Azure AI hub resource can have multiple projects that can share resources.
1. Select the name of your new project. There are some suggested names, or you can enter a custom one. Once you submit, the project might take a minute to create.
1. Select the resources you want to attach to the project. You can skip resource types you don't want to attach.

### Example to initialize an existing AI project

1. Enter `ai init` and choose "Initialize an existing AI project".
1. Select your subscription. You might be prompted to sign in through an interactive flow.
1. Select the project from the list.
1. Select the resources you want to attach to the project. There should be a default selection based on what is already attached to the project. You can choose to create new resources to attach.

### Example to initialize standalone resources

You can use the AI CLI to work with the Azure OpenAI Service without creating an Azure AI Studio project if you want to.
1. Enter `ai init` and choose to initialize a standalone resource.
1. Select the type of resource you want to initialize.
1. Select your subscription. You might be prompted to sign in through an interactive flow.
1. Choose the resources that you want to use as prompted. You can use existing resources or create new resources to attach inline.


## Related content

- [Azure AI CLI reference](./commands-summary.md)
- [Install the Azure AI CLI](cli-get-started.md)
- [Develop with VS Code (Web) in Azure AI Studio](../../how-to/vscode-web.md)
