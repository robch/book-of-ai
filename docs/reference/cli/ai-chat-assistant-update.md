# `ai chat assistant update`

The `ai chat assistant update` command updates an existing OpenAI Assistant.

### Usage

``` bash
ai chat assistant update [...]
```

### Options

| Option          | Description                                                               |
|-----------------|---------------------------------------------------------------------------|
| `--endpoint`    | The endpoint of the Azure OpenAI resource.                                |
| `--key`         | The key for the Azure OpenAI resource.                                    |
| `--name`        | The name of the assistant.                                                |
| `--deployment`  | The deployment identifier for the assistant.                              |
| `--instructions`| Instructions to be updated for the assistant.                             |
| `--file`        | The file to update.                                                       |
| `--files`       | Multiple files to update.                                                 |
| `--file-id`     | The ID of the file to update.                                             |
| `--file-ids`    | The IDs of multiple files to update.                                      |
| `--file-search` | Enable or disable file searching (TRUE/FALSE).                            |
| `--code-interpreter` | Enable or disable the code interpreter tool (TRUE/FALSE).            |

### Examples

``` bash title="Update assistant instructions"
ai chat assistant update --instructions "You answer questions about C# code"
```

``` bash title="Update assistant with multiple C# files"
ai chat assistant update --files "**/*.cs"
```
