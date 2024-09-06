# `ai speech batch transcription onprem endpoints`

### BATCH TRANSCRIPTION ONPREM ENDPOINTS

The `ai speech batch transcription onprem endpoints` command is used to set the target Azure Speech Container endpoints to use for processing all batches. This can be set dynamically even while a batch is in progress. This should be set before any batches are submitted, otherwise forward progress is paused.

### Usage

``` bash
ai speech batch transcription onprem endpoints [...]
```

### CREATE

| Option | Description |
|--------|-------------|
| `--config CONFIG` | Path to on-prem endpoints config file. |

### Examples

``` bash title="Set the target Azure Speech Container endpoints"
ai speech batch transcription onprem endpoints --config /path/to/endpoints-config-file.json
```
