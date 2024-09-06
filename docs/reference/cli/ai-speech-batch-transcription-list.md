# `ai speech batch transcription list`

The `ai speech batch transcription list` command lists details about existing batch transcriptions.

### Usage

``` bash
ai speech batch transcription list [...]
```

### Options

| Option              | Description                                             |
|---------------------|---------------------------------------------------------|
| `--key KEY`         | The Azure Speech key to use for the connection.         |
| `--region REGION`   | The Azure Speech region to use for the connection.      |
| `--transcriptions`  | Lists the transcriptions.                               |
| `--languages`       | Lists the languages available for transcription.        |
| `--transcription URL`| URL of the transcription resource.                     |
| `--files`           | Lists the files associated with a transcription.        |

### Examples

``` bash title="List all batch transcriptions"
ai speech batch transcription list --key YOUR_KEY --region YOUR_REGION --transcriptions
```

``` bash title="List all languages available for transcription"
ai speech batch transcription list --key YOUR_KEY --region YOUR_REGION --languages
```

``` bash title="List all files associated with a transcription"
ai speech batch transcription list --key YOUR_KEY --region YOUR_REGION --files --transcription URL YOUR_TRANSCRIPTION_URL
```
