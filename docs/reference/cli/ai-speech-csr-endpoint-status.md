# `ai speech csr endpoint status`

### Custom Speech Recognition Endpoint Status

The `ai speech csr endpoint status` command checks the asynchronous creation status of a custom speech recognition endpoint.

### Usage

``` bash
a speech csr endpoint status [OPTIONS]
```

### Options

| Option                 | Description                                                                                              |
|------------------------|----------------------------------------------------------------------------------------------------------|
| `--key KEY`            | The API key to authenticate with.                                                                        |
| `--region REGION`      | The Azure region where your resource is located.                                                         |
| `--endpoint URL`       | The endpoint URL of the custom speech recognition service.                                               |
| `--output json FILENAME` | Outputs the result in JSON format to the specified file.                                                |
| `--wait [TIMEOUT]`     | Waits for the operation to complete, with an optional timeout.                                           |
| `--input path PATH`    | Path to the input data.                                                                                  |
| `--output path PATH`   | Path to save the output data.                                                                            |
| `--foreach in @FILENAME`| Perform the operation for each item in the specified file.                                               |
| `--save FILENAME`      | Saves the current configuration to a file.                                                               |
| `--zip ZIPFILE`        | Specifies the ZIP file to use.                                                                           |

### Examples

### Check the status of a custom speech recognition endpoint

``` bash title="Check the status of a custom speech recognition endpoint"
ai speech csr endpoint status --key your_key --region your_region --endpoint your_endpoint
```

### Check the status and output the result to a JSON file

``` bash title="Check the status and output the result to a JSON file"
ai speech csr endpoint status --key your_key --region your_region --endpoint your_endpoint --output json result.json
```

### Check the status and wait for the operation to complete

``` bash title="Check the status and wait for the operation to complete"
ai speech csr endpoint status --key your_key --region your_region --endpoint your_endpoint --wait
```
