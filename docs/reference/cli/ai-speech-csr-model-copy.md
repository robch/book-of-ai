# `ai speech csr model copy`

The `ai speech csr model copy` command copies an existing custom speech recognition model from one region to another region.

!!! note
    Only adapted models are allowed to copy to another subscription.

### Usage
``` bash
ai speech csr model copy [...]
```

### Options
| Option | Description |
| ------ | ----------- |
| `--key KEY` | The API key for the speech service. |
| `--region REGION` | The region where your speech service is located. |
| `--model URL` | The URL of the model to be copied. |
| `--target SUBSCRIPTION` | The target subscription where the model will be copied to. |
| `--output json FILENAME` | Outputs the result in JSON format to a specified file. |
| `--output url @@FILE` | Outputs the result URL to a specified file. |
| `--output id @@FILE` | Outputs the result ID to a specified file. |
| `--wait [TIMEOUT]` | Waits for the operation to complete, with an optional timeout. |
| `--input path PATH` | Specifies the path for input files. |
| `--foreach in @FILENAME` | Executes the command for each line in the specified file. |
| `--output path PATH` | Specifies the path for output files. |
| `--foreach in @FILENAME` | Executes the command for each line in the specified file. |
| `--save FILENAME` | Saves the command options to a specified file. |
| `--zip ZIPFILE` | Specifies a ZIP file for the command. |

### Examples

``` bash title="Copy a custom speech recognition model to another region"
ai speech csr model copy --key my-key --region westus --model https://example.com/model --target my-target-subscription --output json result.json
```
