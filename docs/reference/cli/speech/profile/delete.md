# `ai speech profile delete`

The `ai speech profile delete` command delete a voice profiles.

### Usage
``` bash
ai speech profile delete [...]
```

### Options
| Option | Description |
|--------|-------------|
| `--id` | ID of the voice profile to delete |
| `--file` | Path to a file containing a list of profile IDs to delete |

### Examples

``` bash title="Delete a voice profile by ID"
ai speech profile delete --id 12345
```

``` bash title="Delete multiple voice profiles listed in a file"
ai speech profile delete --file @profiles.txt
```
