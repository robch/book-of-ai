# `ai speech profile status`

`ai speech profile status` manages voice profiles, which are used in speaker recognition and transcription scenarios. It outputs information such as enrollment status, created date, and locale concerning the selected voice profile.

**Usage**:
``` bash
ai speech profile status --id ID [...]
```
OR
``` bash
ai speech profile status --id @FILE [...]
```

**Options**:

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
