# `ai speech batch transcription download`

The `ai speech batch transcription download` command downloads files from batch transcriptions that have already completed.

### USAGE
``` bash
ai speech batch transcription download [...]
```

### OPTIONS/ARGUMENTS

| Option | Description |
| --- | --- |
| `--key KEY` | API key for the speech service |
| `--region REGION` | Region where the speech service is located |
| `--file URL` | URL of the transcription file to download |
| `--output file FILENAME` | Name of the output file where the transcription will be saved |

### EXAMPLES

``` bash title="Download a transcription file and save it to a specific output file"
ai speech batch transcription download --key YOUR_API_KEY --region YOUR_REGION --file TRANSCRIPTION_FILE_URL --output file YOUR_OUTPUT_FILE.txt
```