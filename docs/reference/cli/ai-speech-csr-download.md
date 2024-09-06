# `ai speech csr download`

### Usage
``` bash
ai speech csr download [OPTIONS]
```

### Options
| Option                    | Description |
|---------------------------|-------------|
| `--key`                   | Specify the Azure AI key |
| `--region`                | Specify the Azure AI region |
| `--url`                   | URL to download from |
| `--file`                  | File to download from |
| `--dataset file URL`      | URL of the dataset file to download |
| `--evaluation file URL`   | URL of the evaluation file to download |
| `--endpoint log URL`      | URL of the endpoint log to download |
| `--output file FILENAME`  | Specify the output file name|
| `--output json FILENAME`  | Specify the output JSON file name |
| `--output url @@FILE`     | Specify the output URL file |
| `--input path PATH`       | Input path for the files |
| `--output path PATH`      | Output path for the files |
| `--foreach in @FILENAME`  | Apply changes to each entry in the specified file |
| `--save FILENAME`         | Save the result into the specified file |
| `--zip ZIPFILE`           | Zip the downloaded file |

### Examples

``` bash title="Download a dataset file"
ai speech csr download --dataset file URL https://example.com/dataset --output file dataset.zip
```

``` bash title="Download an endpoint log"
ai speech csr download --endpoint log URL https://example.com/endpointlog --output file log.zip
```