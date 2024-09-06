---
title: How to use the AI config command.
titleSuffix: Azure AI Studio
description: This article provides instructions on how to use the AI config command with the Azure AI CLI.
manager: nitinme
ms.service: azure-ai-studio
ms.topic: how-to
ms.date: 2/26/2024
ms.reviewer: eur
ms.author: eur
author: eric-urban
---

# How to use the AI config command

[!INCLUDE [Azure AI Studio preview](../../includes/preview-ai-studio.md)]

The `ai config` command can set, add, find, clear, or remove settings stored in the local AI CLI configuration datastore.

## Configuration options

The general usage pattern for the `ai config` command is `ai config [HIVE] [COMMAND] [@FILE] [...]`.

The following table describes the parameters for the `ai config` commands. Some parameters are required, while others are optional. For more information, see the help for each command.

| Option | Description |
|--------|-------------|
| `--set [NAME=]VALUE` | Sets the value for a configuration option.<br/><br/>See `ai help config set` for more information. |
| `--add [NAME=]VALUE` | Adds a configuration option with the specified value.<br/><br/>See `ai help config add` for more information. |
| `--find NAME` | Finds a configuration option with the specified name.<br/><br/>See `ai help config find` for more information. |
| `--clear [NAME]` | Removes the value of a configuration option.<br/><br/>See `ai help config clear` for more information. |
| `--hive HIVE` | Specifies the configuration hive to use.<br/><br/>See `ai help config hive` for more information. |
| `--region REGION` | Sets the region [scope for the configuration](#configuration-scopes).<br/><br/><br/><br/>See `ai help config region` for more information. |
| `--command COMMAND` | Specifies the command [scope for the configuration](#configuration-scopes). For example, the `chat` or `complete` commands.<br/><br/>See `ai help config command` for more information. |

## Configuration scopes

The configuration `@files` can exist at region or command level scopes. 

- Region specific scopes enable AI configuration data to vary based on what region is specified for each `ai` command. For example, you likely use different subscription keys depending on which region your Azure AI service is running.
- Command specific scopes enable AI configuration data to vary based on what command is being used. For example, for `ai chat` commands you may want to use one specific `ENDPOINT`, whereas, for `ai complete` commands you may
want to use a different `ENDPOINT` with a `PROXY`.

## Set the value for a configuration option

The `--set` option sets AI configuration data in a new ai configuration datastore file, or overwrite configuration data in an existing AI configuration datastore file.

| Usage | Description |
|---------|-------------|
| `ai config --set NAME VALUE` | Sets the value of `NAME` to `VALUE` |
| `ai config @NAME --set VALUE` | Sets the value of `NAME` to `VALUE` |
| `ai config @CONFIG-FILENAME --set NAME VALUE` | Sets the value of `NAME` to `VALUE` using the specified configuration file |

> [!NOTE]
> If no `HIVE` is specified, the first `HIVE` found will be used.

### Example of setting the chat region

Here's an example of how to use the `ai config` command to set the value for the `chat.region` configuration option.

```bash
ai config chat --set region eastus2
```

The previous command returns the following output:

```terminal
chat.region (saved at 'C:\dev\ai-gen-sdk\.ai\data')

  eastus2
```

### Example of setting a configuration option

Here's an example of how to use the `ai config` command to set the value for the `key` configuration option.

```bash
ai config --set key 436172626F6E20697320636F6F6C2121
```

Here's an example of how to use the `ai config` command to get the value of the `key` configuration option.

```bash
ai config @key
```

The command returns the following output:

```terminal
key (found at 'C:\dev\ai-gen-sdk\.ai\data')

  436172626F6E20697320636F6F6C2121
```

> [!NOTE]
> If you're using PowerShell, use the `--%` stop-parsing token to prevent the terminal from interpreting the `@` symbol as a special character. For example, `ai --% config @key`.

## Adding a configuration option

The `--add` option adds AI configuration data to a new or an existing AI configuration datastore file.

There are three ways to use the `--add` option:
- `ai config --add NAME VALUE`
- `ai config @NAME --add VALUE`
- `ai config @CONFIG-FILENAME --add NAME VALUE`


The `NAME` represents the name of the `VALUE` to add. Alternatively, `CONFIG-FILENAME` is the name of the configuration file where the `NAME` and `VALUE` are added.

If no `HIVE` is specified, the first configuration file found will be used. If no existing configuration file is found, the first `HIVE` found will be used.

Here are some examples of how to use the `--add` option.

```bash
ai config @my.files --clear
ai config @my.files --add hello.wav
ai config @my.files --add howareyou.wav
ai complete --files @my.files
```

## Clear configuration options

The `--clear` option removes AI configuration data from an existing AI configuration datastore file.

- `ai config --clear NAME`
- `ai config @NAME --clear`
- `ai config @CONFIG-FILENAME --clear`

The `NAME` represents the name of the `VALUE` to clear. Alternatively, `CONFIG-FILENAME` is the name of the configuration file to remove.

In this example, the `--clear` option removes all configuration data from the `@my.files` configuration file. Then, the `--add` option adds two files to the `@my.files` configuration file. Finally, the `ai complete` command uses the `@my.files` configuration file for completions.

```bash
ai config @my.files --clear
ai config @my.files --add prompt1.txt
ai config @my.files --add prompt2.txt
ai complete --files @my.files
```

## CONFIG COMMAND

The `--command` option specifies the configuration data scope of use based on the command in use.

- `ai config [@FILE] --command COMMAND [...]`
- `ai config COMMAND [@FILE] [...]`

  WHERE: COMMAND is `chat`
     OR: COMMAND is `complete`


## CONFIG EXAMPLES

Set the default subscription key and region:

```bash
ai config --set key 436172626F6E20697320636F6F6C2121
ai config --set region westus2
```

Recognize multiple files from a file list: 

```bash
ai config @my.files --clear
ai config @my.files --add prompt1.txt
ai config @my.files --add prompt2.txt
ai complete --files @my.files
```

Set the default subscription keys for specific regions: 

```bash
ai config --region westus2 --set key 436172626F6E20697320636F6F6C2121
ai config --region eastus2 --set key 436172626F6E20697320636F6F6C2020

ai config --set region westus2
```

Set the default subscription keys for a specific command:

```bash
ai config chat --set region westus2
ai config chat --set key 436172626F6E20697320636F6F6C2121
```

Update default.output for chat command:

```bash
ai config chat @default.output --clear
ai config chat @default.output --add output.id true
ai config chat @default.output --add output.text true
```

Disable all defaults for all commands:

```bash
ai config --set ai.defaults @@none
```

## Find a configuration option

The `--find` option locates AI configuration data stored inside existing AI configuration datastore files.

- `ai config --find CONFIG-NAME`
- `ai config --find CONFIG-FILENAME`
- `ai config --find CONFIG-FILENAME-PATTERN`

Here are some examples of how to use the `--find` option.

```bash
ai config --find key
ai config --find key --region westus2
ai config --find key --region *
```

If you want to find the `key` for any region, use the following command:

```bash
ai config --find key
```

The previous command returns the following output:

```terminal
LOCATION: ai.exe/.ai/config (ai)

  key

LOCATION: C:\dev\ai-gen-sdk\.ai\data (local)

  chat.evaluation.key
  chat.key
  search.embedding.key
  search.key

LOCATION: ai.exe/.ai/config (ai)

  chat.search.key
  embedding.key
```

## Configure the hive

The `--hive` option specifies which configuration data `HIVE` to use.

The usage of the `--hive` option is as follows:
- `ai config [@FILE] --hive `HIVE` [...]`
- `ai config `HIVE` [@FILE] [...]`

The `HIVE` represents the configuration data scope of use. The `HIVE` can be one of the following values:

| Hive Scope | Description | Location | Example |
|------------|-------------|----------|---------|
| `.`        | Working directory | `./` | `ai config . --set key 436172626F6E20697320636F6F6C2121` |
| `local`    | Working directory config | `./.ai/` | `ai config local --set key 436172626F6E20697320636F6F6C2121` |
| `user`     | Local user directory config | `C:\Users\USERNAME/.ai/` | `ai config user --set key 436172626F6E20697320636F6F6C2121` |
| `global`   | Roaming user directory config | `C:\Users\USERNAME\AppData\Roaming\.ai/` | `ai config global --set key 436172626F6E20697320636F6F6C2121` |
| `system`   | AI process file location config | `where ai.exe` | `ai config system --set key 436172626F6E20697320636F6F6C2121` |

> [!NOTE]
> Hives are searched or used in the order specified above.

## Configure the region

The `--region` option specifies the configuration data scope of use based on the region in use. Region is the name of the region such as `westus2` or `eastus`.

Here are some examples of how to configure the region for various commands.

```bash
ai config --set key 436172626F6E20697320636F6F6C2121 --region westus2
ai config --set key 436172626F6E20697320636F6F6C2020 --region eastus
ai config --find key --region *

ai config --set region westus2
ai complete --file prompt.txt

ai config --set region eastus
ai complete --file prompt.txt

ai complete --nodefaults --foreach region in eastus;westus2 --key @@key --file prompt.txt
```


## Related content

- [Azure AI CLI reference](./commands-summary.md)
- [Install the Azure AI CLI](cli-get-started.md)
- [Develop with VS Code (Web) in Azure AI Studio](../../how-to/vscode-web.md)
