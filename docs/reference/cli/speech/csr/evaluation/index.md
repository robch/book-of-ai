# `ai speech csr evaluation`

The `ai speech csr evaluation` command is used to manage custom speech recognition evaluations in Azure AI services.

### Usage

``` bash
ai speech csr evaluation [command]
```

### Sub-commands

| Command | Description |
|---------|-------------|
| [ai speech csr evaluation create](./create.md) | Creates a new custom speech recognition evaluation using previously created custom speech recognition models and dataset. |
| [ai speech csr evaluation delete](./delete.md) | Deletes an existing custom speech recognition evaluation. |
| [ai speech csr evaluation list](./list.md) | Lists details about existing custom speech recognition evaluations and/or its associated files. |
| [ai speech csr evaluation status](./status.md) | Checks the asynchronous creation and execution status of a custom speech recognition evaluation. |
| [ai speech csr evaluation update](./update.md) | Updates an existing custom speech recognition evaluation. |

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
