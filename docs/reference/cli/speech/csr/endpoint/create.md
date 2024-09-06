# `ai speech csr endpoint create`

### Usage
```
ai speech csr endpoint create [OPTIONS]
```

### Options

| Option                     | Description                                                                        |
|----------------------------|------------------------------------------------------------------------------------|
| `--key KEY`                  | Subscription key to authenticate with the Azure service                           |
| `--region REGION`            | Azure region where the endpoint will be created                                    |
| `--project URL`              | URL of the project to use for creating the endpoint                                |
| `--name NAME`                | Unique name for the new endpoint                                                   |
| `--text TEXT`                | Custom text to use for the speech recognition model                                |
| `--model URL`                | URL of the specific custom model to use                                            |
| `--language LANGUAGE`        | Language of the speech recognition model                                           |
| `--description DESCRIPTION`  | A brief description of the endpoint                                                |
| `--output json FILENAME`     | Output results in JSON format and save to specified filename                       |
| `--output url @@FILE`        | Output the URL of the newly created endpoint and save it to the specified file      |
| `--output id @@FILE`         | Output the ID of the newly created endpoint and save it to the specified file       |
| `--wait [TIMEOUT]`           | Wait for the command to complete, with an optional timeout                         |
| `--input path PATH`          | Specify the input file path                                                        |
| `--output path PATH`         | Specify the output file path                                                       |
| `--foreach in @FILENAME`     | Specify multiple entries in a file to iterate over                                 |
| `--save FILENAME`            | Save the command result in a specified filename                                    |
| `--zip ZIPFILE`              | Save the command result in a specified zip file                                    |

### Examples

``` bash title="Create a new custom speech recognition endpoint with a specific model"
ai speech csr endpoint create --name "MyCustomEndpoint" --region "westus" --model "https://example.com/customModel" --language "en-US"
```

``` bash title="Create a new endpoint with custom text"
ai speech csr endpoint create --name "TextBasedEndpoint" --region "eastus" --text "Custom speech text"
```

``` bash title="Create and wait for completion"
ai speech csr endpoint create --name "WaitForCompletionEndpoint" --region "centralus" --model "https://example.com/model" --wait 300
```