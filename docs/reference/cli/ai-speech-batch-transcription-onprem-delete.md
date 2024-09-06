# `ai speech batch transcription onprem delete`

The `ai speech batch transcription onprem delete` command deletes a previously submitted batch. This will cancel the batch if it is currently running.

### Usage

``` bash
ai speech batch transcription onprem delete --id ID
```

### Options/Arguments

| Option/Argument  | Description                              |
|------------------|------------------------------------------|
| `--id ID`          | Id of previously submitted batch.        |

### Examples

``` bash title="Delete a previously submitted batch by ID"
ai speech batch transcription onprem delete --id <BATCH_ID>
```
