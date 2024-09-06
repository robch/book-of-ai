# `ai speech csr model update`

The `ai speech csr model update` command updates an existing custom speech recognition model with an updated name, description, and/or project reference.

### Usage

``` bash
ai speech csr model update [...]
```

### Options

| Option | Description |
| ------ | ----------- |
| `--key KEY` | The API key for accessing the Azure AI service. |
| `--region REGION` | The region where the Azure AI service is deployed. |
| `--model URL` | The URL of the model to update. |
| `--project URL` | The URL of the project to associate with the model. |
| `--name NAME` | A new name for the model. |
| `--description DESCRIPTION` | A new description for the model. |
| `--input path PATH` | Path to the input file. |
| `--output path PATH` | Path to the output file. |
| `--output json FILENAME` | Filename for the output in JSON format. |
| `--foreach in @FILENAME` | Iterate over each line in the specified file. |
| `--save FILENAME` | Save the command output to the specified file. |
| `--zip ZIPFILE` | Path to the zip file. |

### Examples

``` bash title="Update a custom speech recognition model with a new name and description"
ai speech csr model update --key YOUR_KEY --region YOUR_REGION --model MODEL_URL --name "New Model Name" --description "New Description"
```