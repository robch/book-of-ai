# `ai speech csr list`

The `ai speech csr list` command shows details about speech recognition models.

### Usage

``` bash
ai speech csr list [OPTIONS]
```

### Options

| Option | Description |
|-----------------------|--------------------------------------------|
| `--key KEY` | Specify the key to use for the connection. |
| `--region REGION` | Specify the region of the resource. |
| `--projects` | List projects. |
| `--project languages` | List supported locales for projects. |
| `--datasets` | List datasets. |
| `--dataset languages` | List supported locales for datasets. |
| `--dataset URL` | Specify the dataset URL. |
| `--models` | List models. |
| `--model languages` | List supported locales for models. |
| `--evaluations` | List evaluations. |
| `--evaluation languages` | List supported locales for evaluations.|
| `--evaluation URL` | Specify the evaluation URL. |
| `--endpoints` | List endpoints. |
| `--endpoint languages` | List supported locales for endpoints. |
| `--endpoint URL` | Specify the endpoint URL. |
| `--project URL` | Specify the project URL. |
| `--input path PATH` | Specify the input path. |
| `--output path PATH` | Specify the output path. |
| `--output json FILENAME` | Specify the output JSON filename. |
| `--foreach in @FILENAME` | Specify the foreach filename. |
| `--save FILENAME` | Specify the save filename. |
| `--zip ZIPFILE` | Specify the zip file. |

### Examples

``` bash title="List all models"
ai speech csr list --models
```

``` bash title="List all datasets"
ai speech csr list --datasets
```

``` bash title="List all projects"
ai speech csr list --projects
```

``` bash title="List supported locales for models"
ai speech csr list --model languages
```

``` bash title="Specify the dataset URL"
ai speech csr list --dataset URL
```
