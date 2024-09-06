# `ai speech csr dataset upload`

The `ai speech csr dataset upload` command uploads a new dataset by getting the data from a specified local data file.

### Usage

``` bash
ai speech csr dataset upload [...]
```

### Options

| Option              | Description                                                                       |
|---------------------|-----------------------------------------------------------------------------------|
| `--key KEY`         | The API key to use for the request.                                              |
| `--region REGION`   | The region where the dataset will be uploaded.                                   |
| `--name NAME`       | The name of the dataset.                                                          |
| `--description DESCRIPTION` | A description for the dataset.                                        |
| `--language LANGUAGE` | The language of the dataset.                                                 |
| `--data FILENAME`   | The path to the local data file to be uploaded.                                   |
| `--kind KIND`       | The kind of dataset, e.g., 'audio', 'text'.                                       |
| `--output json FILENAME` | The path to the JSON output file.                                        |
| `--wait [TIMEOUT]`  | Wait for the operation to complete, optionally specifying a timeout.             |
| `--input path PATH` | The input path for advanced operations.                                           |
| `--output path PATH`| The output path for advanced operations.                                          |
| `--foreach in @FILENAME` | Apply the command to all items listed in the given file.                  |
| `--save FILENAME`   | Save the operation results to the specified file.                                 |
| `--zip ZIPFILE`     | The path to a zip file containing data to be uploaded.                            |

### Examples

``` bash title="Upload a new dataset"
ai speech csr dataset upload --key your_api_key --region your_region --name "MyDataset" --description "This is a test dataset" --language en-us --data /path/to/data/file --kind audio
```

This command uploads a new dataset with the name "MyDataset", a description, and specifies that the data file is in English (United States) and is of type audio.

---

For more information on the `ai speech csr dataset upload` command, refer to the [Azure AI CLI documentation](https://aka.ms/azure-ai-cli-public-preview).
