# `ai speech profile enroll`

The `ai speech profile enroll` command enrolls a given voice profile using an audio sample.

### Usage
``` bash
ai speech profile enroll [...]
```

??? note "Audio sample length requirements"
    For TextIndependentIdentification, the enrollment audio sample must contain 30 seconds or more of speech to be successful. For TextIndependentVerification, three or more samples with a combined 15 seconds or more of speech are required.

### Options

| Option                | Description                                                                                      |
|-----------------------|--------------------------------------------------------------------------------------------------|
| `--key KEY`             | The subscription key to use.                                                                     |
| `--region REGION`       | The region for the speech resource.                                                              |
| `--id ID`               | The ID of the voice profile to enroll.                                                           |
| `--file FILE`           | The path to the audio sample file used for enrollment.                                           |
| `--kind KIND`           | The kind of profile enrollment (`TextIndependentIdentification` or `TextIndependentVerification`).|
| `--output file PATH`    | The output file path to save the resulting data.                                                 |
| `--output json PATH`    | The output JSON file path to save the resulting data.                                            |

### Examples

``` bash title="Enroll a voice profile with a specific ID, audio sample file, and kind"
ai speech profile enroll --id "1234abcd" --file "sample.wav" --kind "TextIndependentIdentification"
```
