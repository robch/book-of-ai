# `ai speech profile delete`

The `ai speech profile` command manages voice profiles, which are used in speaker recognition and transcription scenarios.

The `profile delete` function deletes a given voice profile.

### Usage
``` bash
a speech profile delete --id ID
a speech profile delete --file @FILE /* [THIS DELETES ALL PROFILES LISTED IN GIVEN FILE] */
```

### Options
| Option | Description |
|--------|-------------|
| `--id` | ID of the voice profile to delete |
| `--file` | Path to a file containing a list of profile IDs to delete |

### Examples

``` bash title="Delete a voice profile by ID"
ai speech profile delete --id 12345
```

``` bash title="Delete multiple voice profiles listed in a file"
ai speech profile delete --file @profiles.txt
```
