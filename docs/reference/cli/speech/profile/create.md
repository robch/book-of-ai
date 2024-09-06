# `ai speech profile create`

The `ai speech profile create` command manages voice profiles used in speaker recognition and transcription scenarios. This command creates a new voice profile.

### Usage
``` bash
ai speech profile create [...]
```

### Options

| Option | Description |
| --- | --- |
| `--key` | The API key to authenticate the request. |
| `--region` | The region of the Azure service. |
| `--kind` | The kind of voice profile to create. |
| `--output id PATH` | The path to save the profile ID output. |

### Examples
``` bash title="Create a new voice profile"
ai speech profile create --key YOUR_API_KEY --region YOUR_REGION --kind YOUR_KIND
```
``` bash title="Create a new voice profile and save the ID output"
ai speech profile create --key YOUR_API_KEY --region YOUR REGION --kind YOUR_KIND --output id myProfile.id
```
