# `ai speech csr project create`

The `ai speech csr project create` command creates a new custom speech recognition project.

### Usage

``` bash title="Usage for ai speech csr project create command"
ai speech csr project create [OPTIONS]
```

### Options

| Option            | Description                                             |
|-------------------|---------------------------------------------------------|
| `--key KEY`         | The API key for the speech service.                     |
| `--region REGION`   | The region of the speech service.                       |
| `--name NAME`       | The name of the custom speech recognition project.      |
| `--language LANGUAGE` | The language of the custom speech recognition project. |
| `--description DESCRIPTION` | The description of the custom speech recognition project. |
| `--output json FILENAME` | Output the result in JSON format to a file.        |
| `--output url @@FILE` | Output the result URL to a file.                      |
| `--output id @@FILE` | Output the project ID to a file.                       |
| `--input path PATH` | The input path for the project files.                   |
| `--output path PATH` | The output path for the project files.                 |
| `--foreach in @FILENAME` | Apply the command to each line in the file.        |
| `--save FILENAME`   | Save the command output to a file.                      |
| `--zip ZIPFILE`     | Create a zip file of the project.                       |

### Examples

``` bash title="Creating a new custom speech recognition project"
ai speech csr project create --key YOUR_API_KEY --region YOUR_REGION --name "MyProject" --language "en-US" --description "My custom speech recognition project"
```

### See Also

- [ai speech](ai-speech.md)
- [ai speech csr](ai-speech-csr.md)