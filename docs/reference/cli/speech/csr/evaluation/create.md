# `ai speech csr evaluation create`

The `ai speech csr evaluation create` command creates a new custom speech recognition evaluation using previously created custom speech recognition models and dataset.

### Usage

``` bash
ai speech csr evaluation create [OPTIONS]
```

### Options

| Option                             | Description                                             |
|------------------------------------|---------------------------------------------------------|
| `--key KEY`                          | The API key for the Azure AI service.                   |
| `--region REGION`                    | The region of the Azure AI service.                      |
| `--project URL`                      | The URL of the project to use for evaluation.           |
| `--name NAME`                        | The name of the evaluation.                             |
| `--model1 URL`                       | The URL of the first custom speech recognition model.   |
| `--model2 URL`                       | The URL of the second custom speech recognition model.  |
| `--dataset URL`                      | The URL of the dataset to use for evaluation.           |
| `--language LANGUAGE`                | The language of the dataset.                            |
| `--description DESCRIPTION`          | The description of the evaluation.                      |
| `--output json FILENAME`             | Output the result as JSON to the specified file.        |
| `--output url @@FILE`                | Save the evaluation result URL to the specified file.   |
| `--output id @@FILE`                 | Save the evaluation ID to the specified file.           |
| `--wait [TIMEOUT]`                   | Wait for the evaluation to complete. Optionally specify a timeout. |
| `--input path PATH`                  | Specify an input path for the evaluation.               |
| `--output path PATH`                 | Specify an output path for the evaluation results.      |
| `--foreach in @FILENAME`             | Run the evaluation for each item in the specified file. |
| `--save FILENAME`                    | Save the evaluation configuration to the specified file.|
| `--zip ZIPFILE`                      | Create a ZIP file with the evaluation results.          |

### Examples

``` bash title="Create a new custom speech recognition evaluation"
ai speech csr evaluation create --key YOUR_API_KEY --region YOUR_REGION --project PROJECT_URL --name "Test Evaluation" --model1 MODEL1_URL --model2 MODEL2_URL --dataset DATASET_URL --language en-US --description "Evaluation Description" --output json results.json --wait
```