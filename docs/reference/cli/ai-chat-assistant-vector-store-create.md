# `ai chat assistant vector-store create`

The `ai chat assistant vector-store create` command creates a new OpenAI Assistant Vector Store.

### Usage
``` bash
ai chat assistant vector-store create [OPTIONS]
```

### Options

| Option                | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `--endpoint` ENDPOINT | URL of the endpoint to connect to.                                          |
| `--key` KEY           | API key for authentication.                                                 |
| `--file` FILE         | Path to a single file to include in the vector store.                       |
| `--files` FILE1 [...] | Paths to multiple files to include in the vector store.                     |
| `--file-id` ID        | ID of a single file to include in the vector store.                         |
| `--file-ids` ID1 [...]| IDs of multiple files to include in the vector store.                       |
| `--name` NAME         | Name of the vector store to be created.                                     |
| `--output-id` @@FILE  | Output ID information to the specified file.                                |
| `--output-name` @@FILE| Output name information to the specified file.                              |
| `--output-add-id` @@FILE | Append ID information to the specified file.                           |
| `--output-add-name` @@FILE| Append name information to the specified file.                         |

### Example

``` bash title="Create a Vector Store with multiple files"
ai chat assistant vector-store create --name "My Vector Store" --files "**/*.md"
```

For further details on managing OpenAI Assistant Vector Stores, refer to the [ai chat assistant vector-store documentation](./ai-chat-assistant-vector-store.md).