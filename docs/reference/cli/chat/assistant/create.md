# `ai chat assistant create`

### Usage
``` bash
ai chat assistant create [...]
```

### Options

| Option               | Description                                    |
|----------------------|------------------------------------------------|
| `--endpoint ENDPOINT`  | The endpoint to connect to.                    |
| `--key KEY`            | The key to use for authentication.             |
| `--name NAME`          | The name of the assistant.                     |
| `--deployment DEPLOYMENT`  | The deployment to use.                     |
| `--instructions INSTRUCTIONS` | Instructions for the assistant.        |
| `--file FILE`          | File to include in the assistant.              |
| `--files FILE1 [...]`  | Multiple files to include in the assistant.    |
| `--file-id ID`         | File ID to include in the assistant.           |
| `--file-ids ID1 [...]` | Multiple file IDs to include in the assistant. |
| `--file-search TRUE/FALSE` | Enable or disable file search.             |
| `--code-interpreter TRUE/FALSE` | Enable or disable code interpreter.   |
| `--output-id @@FILE`   | Output ID specified in the file.               |
| `--output-name @@FILE` | Output name specified in the file.             |
| `--output-add-id @@FILE` | Add output ID from the file.                 |
| `--output-add-name @@FILE` | Add output name from the file.             |

### Examples

### Create an assistant with a name and instructions
``` bash title="Create an assistant with a name and instructions"
ai chat assistant create --name "My Assistant" --instructions "You are a helpful Assistant."
```

### Create an assistant with files
``` bash title="Create an assistant with files"
ai chat assistant create --name "My Assistant 2" --instructions "You are a helpful Assistant." --files "**/*.md"
```
