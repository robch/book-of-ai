# `ai speech profile`

The `ai speech profile` command manages voice profiles, which are used in speaker recognition and transcription scenarios.

### Usage

``` bash
ai speech profile [command] [options]
```

### Options

| Option              | Description                                             |
|---------------------|---------------------------------------------------------|
| `--help`              | Show help information.                                  |
| `--key KEY`           | The subscription key for the Azure Speech service.      |
| `--region REGION`     | The region associated with the subscription key.        |

### Sub-commands

| Sub-command              | Description                                      |
|--------------------------|--------------------------------------------------|
| [create](./ai-speech-profile-create.md)   | Create a new voice profile.                    |
| [delete](./ai-speech-profile-delete.md)   | Delete a given voice profile.                   |
| [enroll](./ai-speech-profile-enroll.md)   | Enroll a given voice profile using an audio sample. |
| [list](./ai-speech-profile-list.md)       | List all voice profiles for the current key/region. |
| [status](./ai-speech-profile-status.md)   | Output information concerning the selected voice profile. |

### Examples

``` bash title="Create a new voice profile"
ai speech profile create --key YOUR_KEY --region YOUR_REGION
```

``` bash title="Delete a voice profile"
ai speech profile delete --id PROFILE_ID --key YOUR_KEY --region YOUR_REGION
```

``` bash title="Enroll a voice profile using an audio sample"
ai speech profile enroll --id PROFILE_ID --file AUDIO_SAMPLE_FILE --kind KIND --key YOUR_KEY --region YOUR_REGION
```

``` bash title="List all voice profiles"
ai speech profile list --key YOUR_KEY --region YOUR_REGION
```

``` bash title="Get the status of a voice profile"
ai speech profile status --id PROFILE_ID --key YOUR_KEY --region YOUR_REGION
```
