# `ai speech batch transcription onprem status`

The `ai speech batch transcription onprem status` command queries for the status of a previously submitted batch.

### Usage

``` bash
ai speech batch transcription onprem status [...]
```

### Options

| Option     | Description                                                                          |
|------------|--------------------------------------------------------------------------------------|
| `--id ID`    | Id of previously submitted batch.                                                    |
| `--waitms WAITMS` | Milliseconds to wait if batch is not finished or failed. Omit or provide 0 for no wait. |

### Examples

``` bash title="Check the status of a previously submitted batch with ID 12345"
ai speech batch transcription onprem status --id 12345
```

``` bash title="Check the status of a previously submitted batch with ID 12345 and wait 5000ms if not finished"
ai speech batch transcription onprem status --id 12345 --waitms 5000
```
