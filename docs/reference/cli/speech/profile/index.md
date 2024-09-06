# `ai speech profile`

The `ai speech profile` command manages voice profiles, which are used in speaker recognition and transcription scenarios.

### Usage

``` bash
ai speech profile [command] [options]
```

### Sub-commands

| Sub-command                               | Description                                               |
|-------------------------------------------|-----------------------------------------------------------|
| [ai speech profile create](./create.md)   | Create a new voice profile.                               |
| [ai speech profile delete](./delete.md)   | Delete a given voice profile.                             |
| [ai speech profile enroll](./enroll.md)   | Enroll a given voice profile using an audio sample.       |
| [ai speech profile list](./list.md)       | List all voice profiles for the current key/region.       |
| [ai speech profile status](./status.md)   | Output information concerning the selected voice profile. |

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
