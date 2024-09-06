# `ai speech csr evaluation`

### Usage

``` bash
a speech csr evaluation [command]
```

### Sub-commands

| Command | Description |
|---------|-------------|
| [ai speech csr evaluation create](ai-speech-csr-evaluation-create.md) | Creates a new custom speech recognition evaluation using previously created custom speech recognition models and dataset. |
| [ai speech csr evaluation delete](ai-speech-csr-evaluation-delete.md) | Deletes an existing custom speech recognition evaluation. |
| [ai speech csr evaluation list](ai-speech-csr-evaluation-list.md) | Lists details about existing custom speech recognition evaluations and/or its associated files. |
| [ai speech csr evaluation status](ai-speech-csr-evaluation-status.md) | Checks the asynchronous creation and execution status of a custom speech recognition evaluation. |

### Options

| Option | Description |
|--------|-------------|
| `--key KEY` | Specifies the API key to use. |
| `--region REGION` | Specifies the region to use. |
| `--project URL` | Specifies the project URL to use. |
| `--name NAME` | Specifies the name of the evaluation. |
| `--model1 URL` | Specifies the first model URL to use. |
| `--model2 URL` | Specifies the second model URL to use. |
| `--dataset URL` | Specifies the dataset URL to use. |
| `--language LANGUAGE` | Specifies the language to use. |
| `--description DESCRIPTION` | Provides a description for the evaluation. |
| `--evaluation URL` | Specifies the URL of the evaluation. |
| `--output json FILENAME` | Specifies the file to save the output in JSON format. |
| `--wait [TIMEOUT]` | Waits for the completion with an optional timeout. |
| `--input path PATH` | Specifies the input path. |
| `--output path PATH` | Specifies the output path. |
| `--foreach in @FILENAME` | Executes the command for each entry in the specified file. |
| `--save FILENAME` | Saves the command configuration to a file. |
| ` --zip ZIPFILE` | Specifies the zip file to use. |

### Examples

``` bash title="Create a new evaluation using specific models and dataset"
ai speech csr evaluation create --project [Project URL] --name MyEvaluation --model1 [Model1 URL] --model2 [Model2 URL] --dataset [Dataset URL] --language en-US --description "Test evaluation"
```

``` bash title="Delete an existing evaluation"
ai speech csr evaluation delete --evaluation [Evaluation URL]
```

``` bash title="List all evaluations and their associated files"
ai speech csr evaluation list --evaluations
```

``` bash title="Check the status of a specific evaluation"
ai speech csr evaluation status --evaluation [Evaluation URL]
```

