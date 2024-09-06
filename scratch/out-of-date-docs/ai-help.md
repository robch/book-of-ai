---
title: How to use the AI help command.
titleSuffix: Azure AI Studio
description: This article provides instructions on how to use the AI help command with the Azure AI CLI.
manager: nitinme
ms.service: azure-ai-studio
ms.topic: how-to
ms.date: 2/26/2024
ms.reviewer: eur
ms.author: eur
author: eric-urban
---

# How to use the AI help command

[!INCLUDE [Azure AI Studio preview](../../includes/preview-ai-studio.md)]

The `ai help` command in the Azure AI CLI provides an interactive experience to get help with other commands.

Here's a table of the `ai help` commands available in the Azure AI CLI. For more information, see the help and examples for each command.

| Command | Description |
| --- | --- |
| [ai help](#ai-help-command) | Get help for the Azure AI CLI command that follows the `ai help` command. For example, `ai help dev` provides help for the `ai dev` command. |
| [ai help documentation](#ai-help-documentation-command) | Find help documentation for the Azure AI CLI. |
| [ai help examples](#ai-help-examples-command) | Find examples for the Azure AI CLI. |
| [ai help find TEXT](#ai-help-find-text-command) | Find help topics that contain the specified text. |
| [ai help list topics](#ai-help-list-topics-command) | List help topics for the Azure AI CLI. |


## AI help command

The `ai help` command provides an interactive experience to get help with other commands. For example, `ai help dev` provides help for the `ai dev` command.


## AI help documentation command

The `ai help documentation` command provides help documentation for the Azure AI CLI.


## AI help examples command

The `ai help examples` command provides examples for the Azure AI CLI.


## AI help find TEXT command

The `ai help find TEXT` command finds help topics that contain the specified text.


## AI help list topics command

The `ai help list topics` command lists help topics for the Azure AI CLI.


### Example to list help topics

To get a list of help topics for commands available in the Azure AI CLI:

```bash
ai help list topics
```

### Example to dump help topic contents

Use the `--dump` option to dump the help topic contents. For example, instead of showing a list of topics that it found, it'll dump them as files.

```bash
ai help list topics --dump
```

You can also use the `--dump` option with the `ai help find` command:

```bash
ai help find topics --dump
```

## Related content

- [Azure AI CLI reference](./commands-summary.md)
- [Install the Azure AI CLI](cli-get-started.md)
- [Develop with VS Code (Web) in Azure AI Studio](../../how-to/vscode-web.md)
