# `ai dev`

The `ai dev` command in the Azure AI CLI provides a set of sub-commands to get started with templates and configuration settings.

### Usage

``` bash
ai dev <command> [...]
```

### Commands

| Command | Description |
| --- | --- |
| [ai dev new](/reference/cli/dev/new/index.md) | Creates or lists available templates. The available templates include quickstart sample code and helper functions. |
| [ai dev shell](/reference/cli/dev/shell.md) | Creates a fast path to providing configuration data (such as keys and endpoints) to a new shell (such as `cmd.exe` or `/bin/bash`) or to a specified command to run via environment variables. |

### Examples

``` bash title="Create a new template"
ai dev new openai-chat --language Python
```

``` bash title="Open a new shell populated with environment variables"
ai dev shell
```

``` bash title="Run a specific program with its environment populated"
ai dev shell --run "python myApp.py"
```
