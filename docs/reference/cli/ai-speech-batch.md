# `ai speech batch`

The `ai speech batch` command manages Azure Speech Service batch operations.

### Usage

``` bash
ai speech batch <command> [...]
```

### Options

| Option           | Description                                                     |
|------------------|-----------------------------------------------------------------|
| `--key` KEY      | Specifies the subscription key to authenticate with the service.|
| `--region` REGION| Specifies the service region.                                   |

### Sub-Commands

| Sub-Command                                        | Description                                      |
|----------------------------------------------------|--------------------------------------------------|
| `ai speech batch transcription create`  | Creates a new transcription batch job.           |
| `ai speech batch transcription status`  | Gets the status of a transcription batch job.    |
| `ai speech batch transcription list`      | Lists all transcription batch jobs.              |
| `ai speech batch transcription download` | Downloads results of a transcription batch job. |
| `ai speech batch transcription update`  | Updates details of a transcription batch job.    |
| `ai speech batch transcription delete`  | Deletes a transcription batch job.               |
| `ai speech batch transcription onprem`  | Manages on-premise transcription batch jobs.     |

### Examples

``` bash title="Creating a transcription batch job"
ai speech batch transcription create --name "Example 1" --content https://crbn.us/hello.wav
```

``` bash title="Listing all transcription batch jobs"
ai speech batch transcription list
```

``` bash title="Downloading transcription results"
ai speech batch transcription download --url @file-url.txt --output file file.contents
```

### Additional Information

For more details on each sub-command, please refer to their respective documentation pages.

---