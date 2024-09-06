# `ai dev shell`

The `ai dev shell` command provides a fast way to create configuration data (keys, endpoints, etc.) and supply them to a new shell (e.g., `cmd.exe` or `/bin/bash`), or to a specific command, via environment variables.

### Usage 

``` bash
ai dev shell [OPTIONS] --run COMMAND
```

### Options and Arguments

| Option                  | Description                                                                                             |
|-------------------------|---------------------------------------------------------------------------------------------------------|
| `--run COMMAND`         | Runs a specific program with its environment populated.                                                 |

### Examples

``` bash title="Opens a new shell populated with environment variables"
ai dev shell
```

``` bash title="Runs a specific program with its environment populated"
ai dev shell --run "python myApp.py"
```
