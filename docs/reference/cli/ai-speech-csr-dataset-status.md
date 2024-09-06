# `ai speech csr dataset status`

The `ai speech csr dataset status` command checks the asynchronous creation status of a custom speech recognition dataset.

### Usage

``` bash
a speech csr dataset status [...]
```

### Options

| Option              | Description                                                                |
|---------------------|----------------------------------------------------------------------------|
| `--key KEY`           | The API key to authenticate the request.                                    |
| `--region REGION`     | The region where the speech service instance is located.                    |
| `--dataset URL`       | The URL of the dataset whose status needs to be checked.                    |
| `--output json FILE`  | The file to save the output in JSON format.                                 |
| `--wait [TIMEOUT]`    | Wait for the operation to complete and specify an optional timeout period.  |
| `--input path PATH`   | Specify the input path.                                                     |
| `--output path PATH`  | Specify the output path.                                                    |
| `--foreach in @FILE`  | Iterate over a list of items defined in a file.                             |
| `--save FILENAME`     | Save the command payload to a file.                                         |
| `--zip ZIPFILE`       | Save the output as a zip file.                                              |

### Examples

``` bash title="Check the status of a custom speech recognition dataset"
ai speech csr dataset status --key <YOUR_KEY> --region <YOUR_REGION> --dataset <DATASET_URL>
```

``` bash title="Check the status and save the output to a file in JSON format"
ai speech csr dataset status --key <YOUR_KEY> --region <YOUR_REGION> --dataset <DATASET_URL> --output json status_output.json
```
