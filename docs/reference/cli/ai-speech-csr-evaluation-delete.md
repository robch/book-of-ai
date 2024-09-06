# `ai speech csr evaluation delete`

The `ai speech csr evaluation delete` command deletes an existing custom speech recognition evaluation.

### USAGE:
``` bash title="Delete a Custom Speech Recognition Evaluation"
ai speech csr evaluation delete [...]
```

### OPTIONS:
|Option|Description|
|------|-----------|
|--key KEY|API Key for authentication|
|--region REGION|Azure region|
|--evaluation URL|URL of the evaluation to delete|
|--input path PATH|Path to the input file|
|--output path PATH|Path to the output file|
|--output json FILENAME|Path to the output JSON file|
|--foreach in @FILENAME|Process each item in the specified file|
|--save FILENAME|Path to save the command output|
|--zip ZIPFILE|Path to the ZIP file|

### EXAMPLES:
``` bash title="Delete an Evaluation by URL"
ai speech csr evaluation delete --evaluation https://example.com/evaluation123 --key your_api_key --region your_region
```