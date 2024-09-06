# `ai speech csr model`

### Usage

``` bash
ai speech csr model <command> [...]
```

### Options

| Option                 | Description                                           |
|------------------------|-------------------------------------------------------|
| `--key KEY`              | Specifies the key to access the Azure AI service.     |
| `--region REGION`        | Specifies the region to access the Azure AI service.  |
| `--input path PATH`      | Provides the input path for the command.              |
| `--output path PATH`     | Provides the output path for the command.             |
| `--output json FILENAME` | Writes the output in JSON format to a file.           |
| `--foreach in @FILENAME` | Iterates over the list specified in the file.         |
| `--save FILENAME`        | Saves the current configuration to a file.            |
| `--zip ZIPFILE`          | Zips the output files into a ZIP file.                |

### Sub-Commands

| Sub-Command                               | Description                                                                                                                                                     |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ai speech csr model create](ai-speech-csr-model-create.md)   | Creates a new custom speech recognition model using previously uploaded datasets and/or text supplied to the create command.                                       |
| [ai speech csr model list](ai-speech-csr-model-list.md)       | Lists details about existing custom speech recognition models.                                                                                                    |
| [ai speech csr model delete](ai-speech-csr-model-delete.md)   | Deletes an existing custom speech recognition model.                                                                                                              |

### Examples

``` bash title="Create custom speech recognition model"
ai speech csr model create --key YOUR_KEY --region YOUR_REGION --project PROJECT_URL --name MODEL_NAME --base BASE_URL --dataset DATASET_URL --language LANGUAGE_CODE --description "Model Description"
```

``` bash title="List all custom speech recognition models"
ai speech csr model list --key YOUR_KEY --region YOUR_REGION --models
```

``` bash title="Delete a custom speech recognition model"
ai speech csr model delete --key YOUR_KEY --region YOUR_REGION --model MODEL_URL
```

