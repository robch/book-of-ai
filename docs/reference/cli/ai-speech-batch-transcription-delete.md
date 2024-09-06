# `ai speech batch transcription delete`

The `ai speech batch transcription delete` command deletes an existing batch transcription that has already completed.

### Usage
``` bash
ai speech batch transcription delete [...]
```

### Options/Arguments

| Option | Description |
|--------|-------------|
| `--key KEY` | The key to use for the command |
| `--region REGION` | The region to use for the command |
| `--transcription URL` | The URL of the transcription to delete |

### Examples

``` bash title="Deleting a batch transcription"
ai speech batch transcription delete --key your_key --region your_region --transcription your_transcription_url
```
