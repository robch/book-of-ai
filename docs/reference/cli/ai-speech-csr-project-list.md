# `ai speech csr project list`

### `ai speech csr project list`

The `ai speech csr project list` command lists details about existing custom speech recognition projects.

### Usage

``` bash
ai speech csr project list [...]
```

### Options

| Option                   | Description                                      |
|--------------------------|--------------------------------------------------|
| `--key KEY`              | Subscription key to use.                         |
| `--region REGION`        | Region of the Azure AI service.                  |
| `--projects`             | List of projects.                                |
| `--languages`            | List of project languages.                       |
| `--input path PATH`      | Input file path.                                 |
| `--output path PATH`     | Output file path.                                |
| `--output json FILENAME` | Output results in JSON format.                   |
| `--foreach in @FILENAME` | Execute command for each item in the input file. |
| `--save FILENAME`        | Save command output to a file.                   |
| `--zip ZIPFILE`          | ZIP the output files.                            |

### Examples

``` bash title="List all custom speech recognition projects"
ai speech csr project list --key YOUR_KEY --region YOUR_REGION --projects
```

``` bash title="List languages of a specific project"
ai speech csr project list --key YOUR_KEY --region YOUR_REGION --languages
```

### Additional Information

For more details about configuring and using the Azure AI CLI, see the [Azure AI CLI documentation](https://aka.ms/azure-ai-cli-public-preview).
