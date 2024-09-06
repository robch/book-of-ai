# `ai speech speaker identify`

The `ai speaker identify` command identifies speakers in a given audio sample against one or more voice profiles.

### Usage

``` bash
ai speech speaker identify [...]
```

??? note "Audio sample length requirements"

    The identification audio sample must contain 30 seconds or more of speech to be successful.

### Options

| Option/Argument     | Description |
|---------------------|-------------|
| `--key KEY`           | API Key for authentication |
| `--region REGION`     | Azure region for the resource |
| `--id ID`             | ID of the voice profile |
| `--file FILE`         | Path to the audio sample file |
| `--log FILENAME`      | Path to the log file |
| `--foreach in @ITEMS.txt` | Batch process multiple items |
| `--threads NUMBER`    | Number of threads to use for the command |

### Examples

``` bash title="Identify speaker in an audio sample against a single voice profile"
ai speech speaker identify --id <VOICE_PROFILE_ID> --file <AUDIO_SAMPLE_FILE>
```

``` bash title="Identify speaker in an audio sample against multiple voice profiles"
ai speech speaker identify --ids [<VOICE_PROFILE_ID1>, <VOICE_PROFILE_ID2>, ...] --file <AUDIO_SAMPLE_FILE>
```
