# `ai speech csr endpoint delete`

The `ai speech csr endpoint delete` command deletes an existing custom speech recognition endpoint.

### Usage

``` bash
ai speech csr endpoint delete [...]
```

### Options

| Option                       | Description |
|------------------------------|-------------|
| `--key KEY`                    | The subscription key to use |
| `--region REGION`              | The region to use |
| `--endpoint URL`               | The URL of the endpoint to delete |
| `--endpoint log URL`           | The URL of the endpoint log to delete |
| `--input path PATH`            | Additional paths to search for input files |
| `--output path PATH`           | Directory where all output files should be written |
| `--output json FILENAME`       | Save the service JSON response into the specified file |
| `--foreach in @FILENAME`       | Repeats a specific command multiple times using a TSV file |
| `--save FILENAME`              | Save the command line and related configuration data into a file |
| `--zip ZIPFILE`                | Specify a ZIP archive file |

### Examples

``` bash title="Delete a custom speech recognition endpoint using the region and key directly on the command line"
ai speech csr endpoint delete --region westus2 --key 436172626F6E20697320636F6F6C2121 --endpoint https://example.com/endpoint
```

``` bash title="Delete a custom speech recognition endpoint using the region and key from AI configuration"
ai config speech @region --set westus2
ai config speech @key --set 436172626F6E20697320636F6F6C2121
ai speech csr endpoint delete --region @region --key @key --endpoint https://example.com/endpoint
```
