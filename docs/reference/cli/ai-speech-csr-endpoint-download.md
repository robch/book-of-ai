# `ai speech csr endpoint download`

The `ai speech csr endpoint download` command downloads one or more files associated with a custom speech recognition endpoint.

### Usage
``` bash
ai speech csr endpoint download [...]
```

### Options/Arguments
| Option | Description |
| --- | --- |
| `--key KEY` | Specifies the key for the connection (see Connection Details). |
| `--region REGION` | Specifies the region for the connection (see Connection Details). |
| `--endpoint log URL` | Specifies the endpoint log URL for downloading files. |
| `--output file FILENAME` | Specifies the output file name for the downloaded file(s). |
| `--output json FILENAME` | Specifies the output JSON file name for the downloaded file(s). |
| `--output URL @@FILE` | Specifies the output URL for the downloaded file(s). |
| `--url URL` | Specifies the download URL. |
| `--file URL` | Specifies the file URL. |
| `--input path PATH` | Specifies the input path for the operation. |
| `--output path PATH` | Specifies the output path for the operation. |
| `--foreach in @FILENAME` | Specifies a file containing a list of items to process. |
| `--save FILENAME` | Specifies the file name for saving the configuration. |
| `--zip ZIPFILE` | Specifies the zip file name for the downloaded content. |

### Examples
``` bash title="Download files associated with a custom speech recognition endpoint"
ai speech csr endpoint download --key "your-key" --region "your-region" --endpoint log "your-endpoint-log-url" --output file "output-filename"
```