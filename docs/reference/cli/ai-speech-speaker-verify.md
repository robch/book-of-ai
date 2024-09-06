# `ai speech speaker verify`

### Description
The `ai speech speaker verify` command verifies a speaker in a given audio sample against a voice profile. The returned JSON will have a "result" field with an "Accept" or "Reject" value.

> **IMPORTANT:** The verification audio sample must contain between 1 to 15 seconds of speech to be successful.

### Usage
``` bash
a speech speaker verify --id ID --file AUDIO_SAMPLE_FILE
```

### Options
| Option          | Description                         |
|-----------------|-------------------------------------|
| `--id ID`         | Unique ID of the voice profile.     |
| `--file FILE`     | Path to the audio sample file.      |
| `--kind KIND`     | Type of speaker verification.       |
| `--key KEY`       | Subscription key for the service.   |
| `--region REGION` | Region associated with the service. |
| `--log FILENAME`  | Path to the log file.               |
| `--foreach in @ITEMS.txt` | Process each item in the specified file. |
| `--threads NUMBER` | Number of concurrent threads.      |

### Examples

``` bash title="Verify a speaker with a provided audio sample"
ai speech speaker verify --id <profile-id> --file <audio-sample.wav>
```

``` bash title="Verify a speaker with additional options"
ai speech speaker verify --id <profile-id> --file <audio-sample.wav> --kind <verification-kind> --log <logfile.log> --threads 4
```
