# `ai chat assistant get`

The `ai chat assistant get` command deletes an existing OpenAI Assistant.

### Usage

``` bash
ai chat assistant get [...]
```

### Connection

| Option       | Description                        |
|--------------|------------------------------------|
| `--endpoint` | Specify the endpoint for the AI service.        |
| `--key`      | Specify the key for accessing the AI service.    |

### Get

| Option | Description                       |
|--------|-----------------------------------|
| `--id` | Specify the ID of the assistant to retrieve. |

### Example

``` bash title="Example: Get an OpenAI Assistant by ID"
ai chat assistant get --id asst_UM1L8Z0yZzGCJoD5mgQYByeZ
```
