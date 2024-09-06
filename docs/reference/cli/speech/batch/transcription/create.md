# `ai speech batch transcription create`

The `ai speech batch transcription create` command creates new requests to transcribe remote audio streams.

### Usage

``` bash
ai speech batch transcription create [...]
```

### Options

| Option            | Description                                                                              |
|-------------------|------------------------------------------------------------------------------------------|
| `--key KEY`         | Specifies the subscription key to use for authentication.                                |
| `--region REGION`   | Specifies the region for the speech resource.                                            |
| `--name NAME`       | Specifies the display name of the transcription.                                         |
| `--model URL`       | Specifies the custom speech model to use to transcribe the content.                      |
| `--content URL`     | Specifies the content to be transcribed, referring to audio data stored remotely at URLs.|
| `--content @URLs.txt` | Specifies the content using a text file containing one or more URLs.                     |
| `--language LANGUAGE` | Specifies a single spoken language in BCP-47 format. Defaults to `en-US` if not specified.|
| `--threads NUMBER`     | Specifies the maximum number of threads to use when parallelizing tasks.                 |
| `--processes NUMBER`   | Specifies the maximum number of sub-processes to use when parallelizing tasks.           |
| `--project URL`        | Specifies the URL of the project.                                                        |
| `--wait [TIMEOUT]`     | Waits for the operation to complete, optionally specifying a timeout.                    |

### Examples

``` bash title="Create a batch transcription for an audio file"
ai speech batch transcription create --name "Example 1" --content https://crbn.us/hello.wav
```

``` bash title="Create a batch transcription for two remote audio files"
ai config @audio.urls.txt --clear
ai config @audio.urls.txt --add http://crbn.us/hello.wav
ai config @audio.urls.txt --add http://crbn.us/whatstheweatherlike.wav
ai speech batch transcription create --name "Example 2" --content @audio.urls.txt
```

``` bash title="Create and save a batch transcription job"
ai config @audio.urls.txt --clear
ai config @audio.urls.txt --add http://crbn.us/hello.wav
ai config @audio.urls.txt --add http://crbn.us/whatstheweatherlike.wav
ai speech batch transcription create --name "Example 3" --content @audio.urls.txt --save transcription.job
```

``` bash title="Execute a saved transcription job and wait for completion"
ai speech batch transcription create @transcription.job --wait
```
