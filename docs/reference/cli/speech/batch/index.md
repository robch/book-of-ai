# `ai speech batch`

The `ai speech batch` command manages Azure Speech Service batch operations.

### Usage

``` bash
ai speech batch <command> [...]
```

### Sub-commands

| Sub-command | Description |
| ----------- | ----------- |
| [ai speech batch transcription create](./create.md) | Creates new requests to transcribe remote audio streams |
| [ai speech batch transcription delete](./delete.md) | Deletes an existing batch transcription that has already completed |
| [ai speech batch transcription download](./download.md) | Downloads files from batch transcriptions that have already completed |
| [ai speech batch transcription list](./list.md) | Lists details about existing batch transcriptions |
| [ai speech batch transcription status](./status.md) | Checks the status of existing batch transcriptions, providing additional details |

### Examples

``` bash title="Create a batch transcription"
ai speech batch transcription create --name "transcription1" --model "<model_url>" --content "<content_url>" --language "en-US"
```

``` bash title="Delete a batch transcription"
ai speech batch transcription delete --transcription "<transcription_url>"
```

``` bash title="Download transcription file"
ai speech batch transcription download --file "<file_url>" --output "<output_filename>"
```

``` bash title="List batch transcriptions"
ai speech batch transcription list --transcriptions
```

``` bash title="Check transcription status"
ai speech batch transcription status --transcription "<transcription_url>"
```
