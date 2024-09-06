# `ai speech csr dataset list`

The `ai speech csr dataset list` command lists details about existing custom speech recognition datasets and/or its associated files.

### Usage

``` bash
ai speech csr dataset list [...]
```

### Options

| Option               | Description                                                                   |
|----------------------|-------------------------------------------------------------------------------|
| `--key KEY`            | The subscription key for accessing the Azure Speech service.                  |
| `--region REGION`      | The region of the Azure Speech service.                                       |
| `--datasets`           | List the custom speech recognition datasets.                                  |
| `--languages`          | List the languages available in the custom speech recognition datasets.       |
| `--dataset ID/URL`     | Specify the dataset ID or URL.                                                |
| `--files`              | List the files associated with a specific dataset.                            |
| `--project URL`        | Specify the project URL.                                                      |
| `--input path PATH`    | Specify the input path.                                                       |
| `--output path PATH`   | Specify the output path.                                                      |
| `--output json FILENAME` | Specify the filename for the output in JSON format.                        |
| `--foreach in @FILENAME` | Specify a file containing a list of items to process with the command.    |
| `--save FILENAME`      | Save the command output to a file.                                            |
| `--zip ZIPFILE`        | Specify the zip file for the dataset.                                         |

### Examples

``` bash title="List custom speech recognition datasets"
ai speech csr dataset list --datasets
```

``` bash title="List languages available in custom speech recognition datasets"
ai speech csr dataset list --languages
```

``` bash title="List files associated with a specific dataset"
ai speech csr dataset list --dataset <ID/URL> --files
```
