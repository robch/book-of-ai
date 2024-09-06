# `ai speech csr model create`

### Usage
``` bash
ai speech csr model create [OPTIONS]
```

### Options

| Option            | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `--key KEY`       | Specifies the key for the custom speech service connection.                 |
| `--region REGION` | Specifies the region of the custom speech service connection.               |
| `--project URL`   | URL of the project to which the custom model should be added.               |
| `--name NAME`     | Name of the custom speech recognition model.                                |
| `--text @FILE`    | Path to the text file containing training data.                             |
| `--base URL`      | URL of the base model to use for creating the custom model.                 |
| `--dataset URL`   | URL of the dataset to be used for training.                                 |
| `--datasets URL1;URL2` | Semicolon-separated URLs of multiple datasets to use for training.   |
| `--language LANGUAGE` | Language code for the custom speech recognition model.                 |
| `--description DESCRIPTION` | Description of the custom model being created.                  |
| `--output json FILENAME` | Save the output in JSON format to the specified file.            |
| `--output url @@FILE`    | Save the output URL to the specified file.                         |
| `--output id @@FILE`     | Save the output ID to the specified file.                          |
| `--wait [TIMEOUT]`       | Wait for the operation to complete with an optional timeout.       |
| `--input path PATH`      | Path to the input data for creating the model.                     |
| `--output path PATH`     | Specifies the output path for the resultant model.                |
| `--foreach in @FILENAME` | Apply the command to each item in the specified file.              |
| `--save FILENAME`        | Save the command output to the specified file.                    |
| `--zip ZIPFILE`          | Create a ZIP file of the output data.                              |

### Examples

``` bash title="Create a custom speech recognition model with a specified project and name"
ai speech csr model create --project https://myprojecturl --name "MyCustomModel" --key myapikey --region westus --text @/path/to/textfile --base https://basemodelurl --dataset https://dataseturl --language en-US --description "Custom model for specific domain"
```

``` bash title="Create a custom speech recognition model with multiple datasets"
ai speech csr model create --project https://myprojecturl --name "MyCustomModelMultiDataset" --key myapikey --region westus --text @/path/to/textfile --base https://basemodelurl --datasets https://dataseturl1;https://dataseturl2 --language en-US --description "Custom model using multiple datasets"
```
