# `ai chat assistant file`

The `ai chat assistant file` commands manage OpenAI Assistant files. These commands provide functionality to upload, delete, and list the assistant files.

### Usage

``` bash
ai chat assistant file [command] [options]
```

### Commands

| Command | Description |
|---------|-------------|
| [ai chat assistant file delete](/reference/cli/chat/assistant/file/delete.md) | Deletes an OpenAI Assistant file. |
| [ai chat assistant file list](/reference/cli/chat/assistant/file/list.md) | Lists OpenAI Assistant files. |
| [ai chat assistant file upload](/reference/cli/chat/assistant/file/upload.md) | Uploads a new OpenAI Assistant file. |

### Examples

``` bash title="Upload an assistant file"
ai chat assistant file upload --file README.md
```

``` bash title="Upload multiple assistant files"
ai chat assistant file upload --files **/*.md
```

``` bash title="List all assistant files"
ai chat assistant file list
```

``` bash title="Delete an assistant file"
ai chat assistant file delete --id assistant-rWdFtg0oCGtlZFZzZGC3rGhQ
```
