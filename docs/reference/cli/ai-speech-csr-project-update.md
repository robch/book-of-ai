# `ai speech csr project update`

The `ai speech csr project update` command updates an existing custom speech recognition project with an updated name and/or description.


### Usage

``` bash
ai speech csr project update [OPTIONS]
```

### Options

| Option                     | Description                                                                |
|----------------------------|----------------------------------------------------------------------------|
| `--key KEY`                  | Azure Cognitive Services subscription key.                                 |
| `--region REGION`            | Azure region.                                                              |
| `--project URL`              | URL of the project to update.                                              |
| `--name NAME`                | New name for the project.                                                  |
| `--description DESCRIPTION`  | New description for the project.                                           |
| `--input path PATH`          | Input path for additional parameters.                                       |
| `--output path PATH`         | Output path for the results.                                               |
| `--output json FILENAME`     | Output results in JSON format to the specified file.                       |
| `--foreach in @FILENAME`     | Execute command for each item in the specified file, replacing placeholders.|
| `--save FILENAME`            | Save command output to the specified file.                                 |
| `--zip ZIPFILE`              | Compress the output into a ZIP file.                                        |

### Examples

``` bash title="Update a project name and description"
ai speech csr project update --key YOUR_KEY --region YOUR_REGION --project YOUR_PROJECT_URL --name "New Project Name" --description "New Project Description"
```