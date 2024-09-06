# `ai speech csr model delete`

The `ai speech csr model delete` command deletes an existing custom speech recognition model.

### Usage
``` bash
ai speech csr model delete [...]
```

### Options
| Option/Argument               | Description                                                                                          |
|-------------------------------|------------------------------------------------------------------------------------------------------|
| `--key KEY`                     | The key for the Azure AI services connection.                                                        |
| `--region REGION`               | The region for the Azure AI services connection.                                                     |
| `--model URL`                   | The URL of the model to be deleted.                                                                  |
| `--input path PATH`             | Input path to a custom configuration for the command.                                                |
| `--output path PATH`            | Output path to save the results of the command.                                                      |
| `--output json FILENAME`        | Output file path to save the results in JSON format.                                                 |
| `--foreach in @FILENAME`        | Iterate over multiple inputs specified in the provided file, executing the command for each.         |
| `--save FILENAME`               | The file path where the results should be saved.                                                     |
| `--zip ZIPFILE`                 | The path to a ZIP file to store the command results.                                                 |

### Examples

``` bash title="Delete a custom speech recognition model"
ai speech csr model delete --key YOUR_KEY --region YOUR_REGION --model URL_OF_THE_MODEL
```

``` bash title="Delete a custom speech recognition model and save the output to a specific path"
ai speech csr model delete --key YOUR_KEY --region YOUR_REGION --model URL_OF_THE_MODEL --output path OUTPUT_PATH
```
