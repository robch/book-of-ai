# `ai speech profile status`

The `ai speech profile status` command manages voice profiles, which are used in speaker recognition and transcription scenarios.

### Usage

``` bash
ai speech profile status [...]
```

### Options

| Option | Description |
| --- | --- |
| `--id` | The ID of the voice profile. |
| `--kind` | The kind of the voice profile. |
| `--key` | The key for the voice profile. |
| `--region` | The region for the voice profile. |
| `--output file PATH` | Output the status to a file at the specified path. |
| `--output json PATH` | Output the status to a JSON file at the specified path. |

### Examples
``` bash title="Get status of a voice profile"
ai speech profile status --id <profile-id>
```
