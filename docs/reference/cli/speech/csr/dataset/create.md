# `ai speech csr dataset create`

The `ai speech csr dataset create` command creates a new dataset by getting the data from a specified URL.

### Usage

```
ai speech csr dataset create [options]
```

### Options

| Option                  | Description                                       |
|-------------------------|---------------------------------------------------|
| `--key KEY`               | The API key to use for the connection.            |
| `--region REGION`         | The region of your Azure resource.                |
| `--project URL`           | The URL of the project to associate the dataset with. |
| `--name NAME`             | The name of the dataset.                          |
| `--kind KIND`             | The kind of dataset being created (e.g., text, audio). |
| `--content URL`           | The URL where the content for the dataset is located. |
| `--language LANGUAGE`     | The language of the dataset content.              |
| `--description DESCRIPTION` | A description of the dataset.                    |
| `--output json FILENAME`  | Save the output as a JSON file.                   |
| `--output url @@FILE`     | Save the output URL in the specified file.        |
| `--output id @@FILE`      | Save the output ID in the specified file.         |
| `--wait [TIMEOUT]`        | Wait for the operation to complete. Optionally specify a timeout. |
| `--input path PATH`       | Read input from the specified path.               |
| `--output path PATH`      | Write output to the specified path.               |
| `--foreach in @FILENAME`  | Iterate over multiple inputs specified in a file. |
| `--save FILENAME`         | Save the state to a file.                         |
| `--zip ZIPFILE`           | Zip the content specified.                        |

### Examples

``` bash title="Create a new dataset with specified project and content URL"
ai speech csr dataset create --key your_api_key --region your_region --project https://example.com/project --name your_dataset_name --kind text --content https://example.com/content --language en-US --description "Sample dataset"
```
