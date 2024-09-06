# `ai speech csr`

### Usage

``` bash
ai speech csr [command]
```

### Available Commands

| Sub-command       | Description               |
|-------------------|---------------------------|
| [dataset](ai-speech-csr-dataset.md)     | Manage CSR datasets          |
| [endpoint](ai-speech-csr-endpoint.md)   | Manage CSR endpoints         |
| [evaluation](ai-speech-csr-evaluation.md) | Manage CSR evaluations       |
| [model](ai-speech-csr-model.md)         | Manage CSR models            |
| [project](ai-speech-csr-project.md)     | Manage CSR projects          |

### Examples

``` bash title="Create a new CSR project"
ai speech csr project create --name "MyProject" --description "This is a test project"
```

``` bash title="List all CSR models"
ai speech csr model list
```

``` bash title="Upload a dataset to a CSR project"
ai speech csr dataset upload --project-id 1234 --file-path /path/to/dataset.zip
```

``` bash title="Delete a CSR endpoint"
ai speech csr endpoint delete --endpoint-id 5678
```
