# `ai speech csr project delete`

The `ai speech csr project delete` command deletes an existing custom speech recognition project.

### Usage

``` bash
ai speech csr project delete [OPTIONS]
```

### Options

| Option               | Description                                                          |
|----------------------|----------------------------------------------------------------------|
| `--key KEY`            | The API key to authenticate the request                              |
| `--region REGION`      | The region where your Azure AI services are deployed                 |
| `--project URL`        | The URL of the project to delete                                     |
| `--input path PATH`    | Specify the input file path                                          |
| `--output path PATH`   | Specify the output file path                                         |
| `--output json FILENAME` | Specify a JSON file to output                                      |
| `--foreach in @FILENAME` | Execute the command for each item in the specified file            |
| `--save FILENAME`      | Specify a file to save the command output                            |
| `--zip ZIPFILE`        | Specify a ZIP file to compress the output                            |

### Examples

``` bash title="Delete a custom speech recognition project"
ai speech csr project delete --key your_api_key --region your_region --project your_project_url
```

This command deletes the custom speech recognition project specified by the `--project` URL.
