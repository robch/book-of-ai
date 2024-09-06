# `ai speech csr project status`

The `ai speech csr project status` command checks the asynchronous creation status of a custom speech recognition project.

### Usage

``` bash
ai speech csr project status [...]
```

### Options

| Option          | Description                                                  |
|-----------------|--------------------------------------------------------------|
| `--key KEY`       | Azure Cognitive Services API key                             |
| `--region REGION` | Azure region                                                 |
| `--project URL`   | URL of the custom speech recognition project                 |
| `--input path PATH` | Path to the input file                                      |
| `--output path PATH` | Path to the output file                                   |
| `--output json FILENAME` | Filename to output JSON                               |
| `--foreach in @FILENAME` | Apply command to each item in the specified file       |
| `--save FILENAME` | Save the command output to a file                            |
| `--zip ZIPFILE`   | Create a zip file from the output                            |

### Examples

``` bash title="Check the status of a custom speech recognition project"
ai speech csr project status --key YOUR_API_KEY --region YOUR_REGION --project YOUR_PROJECT_URL
```
