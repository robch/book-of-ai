# `ai speech csr model status`

The `ai speech csr model status` command checks the asynchronous creation status of a custom speech recognition model.

### Usage
``` bash
ai speech csr model status [...]
```

### Options and Arguments

| Option | Description |
|--------|-------------|
| `--key KEY` | The key used to authenticate with the Azure AI service. |
| `--region REGION` | The region where the Azure AI service is hosted. |
| `--model URL` | The URL of the custom speech recognition model. |
| `--output json FILENAME` | The filename to save the output in JSON format. |
| `--wait [TIMEOUT]` | Wait for the operation to complete with an optional timeout. |
| `--input path PATH` | Path to input file. |
| `--output path PATH` | Path to output file. |
| `--foreach in @FILENAME` | Iterate over each input in the provided file. |
| `--save FILENAME` | Save the results to the specified filename. |
| `--zip ZIPFILE` | Specify the zip file for the operation. |

### Examples

``` bash title="Check the status of a custom speech recognition model"
ai speech csr model status --key YOUR_KEY --region YOUR_REGION --model YOUR_MODEL_URL --output json status.json
```