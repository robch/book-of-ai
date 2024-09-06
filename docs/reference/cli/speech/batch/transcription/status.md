# `ai speech batch transcription status`

The `ai speech batch transcription status` command checks the status of existing batch transcriptions, providing additional details.

### Usage

``` bash
ai speech batch transcription status [...]
```

### Options

| Option            | Description                                                                                 |
|-------------------|---------------------------------------------------------------------------------------------|
| `--key KEY`         | The API key for authenticating requests.                                                    |
| `--region REGION`   | The region where your speech service is deployed.                                           |
| `--transcription URL` | The URL of the transcription you want to check the status of.                               |

### Examples

``` bash title="Check the status of a specific batch transcription"
ai speech batch transcription status --key YOUR_KEY --region YOUR_REGION --transcription YOUR_TRANSCRIPTION_URL
```

This will return the status and additional details of the specified batch transcription.