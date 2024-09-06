# `ai chat assistant file`

### Overview

The `ai chat assistant file` commands manage OpenAI Assistant files. These commands provide functionality to upload, delete, and list the assistant files.

### Usage

``` bash
ai chat assistant file [command] [options]
```

### Commands

| Command | Description |
|---------|-------------|
| [ai chat assistant file upload](./ai-chat-assistant-file-upload.md) | Uploads a new OpenAI Assistant file. |
| [ai chat assistant file delete](./ai-chat-assistant-file-delete.md) | Deletes an OpenAI Assistant file. |
| [ai chat assistant file list](./ai-chat-assistant-file-list.md) | Lists OpenAI Assistant files. |

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

---

This documentation provides a comprehensive guide to manage OpenAI Assistant files using the `ai chat assistant file` command. For specific command details and options, please refer to the linked sub-command documentation.