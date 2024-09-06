# `ai speech csr evaluation status`

The `ai speech csr evaluation status` command checks the asynchronous creation and execution status of a custom speech recognition evaluation.

### Usage

``` bash
ai speech csr evaluation status [...]
```

### Options

| Option | Description |
|--------|-------------|
| `--key KEY` | Specifies the API key to authenticate the request |
| `--region REGION` | Specifies the Azure region where the service is hosted |
| `--evaluation URL` | Specifies the URL of the evaluation to check the status for |
| `--output json FILENAME` | Outputs the result in JSON format to the specified file |
| `--wait [TIMEOUT]` | Wait for the evaluation to complete; optionally specify a timeout value |
| `--input path PATH` | Specifies the path for the input file |
| `--output path PATH` | Specifies the path for the output file |
| `--foreach in @FILENAME` | Specifies a file that contains a list of items to process |
| `--save FILENAME` | Saves the result to the specified file |
| `--zip ZIPFILE` | Specifies a zip file to process |

### Examples

``` bash title="Check the status of a custom speech recognition evaluation"
ai speech csr evaluation status --key YOUR_API_KEY --region YOUR_REGION --evaluation YOUR_EVALUATION_URL --output json status_output.json
```

``` bash title="Wait for the evaluation to complete with a timeout of 300 seconds"
ai speech csr evaluation status --key YOUR_API_KEY --region YOUR_REGION --evaluation YOUR_EVALUATION_URL --wait 300
```

``` bash title="Save the result to a specified file"
ai speech csr evaluation status --key YOUR_API_KEY --region YOUR_REGION --evaluation YOUR_EVALUATION_URL --save result.json
```