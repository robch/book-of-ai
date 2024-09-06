# `ai speech csr model list`

### Usage
``` bash title="List all custom speech recognition models"
ai speech csr model list --key YOUR_KEY --region YOUR_REGION --models
```

### Options

| Option                 | Description                                           |
|------------------------|-------------------------------------------------------|
| `--key KEY`              | Specifies the key to access the Azure AI service.     |
| `--region REGION`        | Specifies the region to access the Azure AI service.  |
| `--models`               | Lists all custom speech recognition models.           |
| `--languages`            | Lists all languages supported by models.             |
| `--base models`          | Lists all base models available.                     |
| `--project URL`          | URL of the project associated with the models.         |
| `--input path PATH`      | Provides the input path for the command.              |
| `--output path PATH`     | Provides the output path for the command.             |
| `--output json FILENAME` | Writes the output in JSON format to a file.           |
| `--foreach in @FILENAME` | Iterates over the list specified in the file.         |
| `--save FILENAME`        | Saves the current configuration to a file.            |
| `--zip ZIPFILE`          | Zips the output files into a ZIP file.                |

### Examples

``` bash title="List all custom speech recognition models"
ai speech csr model list --key YOUR_KEY --region YOUR_REGION --models
```
``` bash title="List all languages supported by models"
ai speech csr model list --key YOUR_KEY --region YOUR_REGION --languages
```
``` bash title="List all base models available"
ai speech csr model list --key YOUR_KEY --region YOUR_REGION --base models
```
