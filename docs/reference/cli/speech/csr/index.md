# `ai speech csr`

The ai speech csr commands manage custom speech recognition models and related resources.

### Usage

``` bash
ai speech csr [command]
```

### Sub-Commands

| Sub-command       | Description               |
|-------------------|---------------------------|
| [ai speech csr dataset](./dataset/index.md)     | Manage CSR datasets          |
| [ai speech csr endpoint](./endpoint/index.md)   | Manage CSR endpoints         |
| [ai speech csr evaluation](./evaluation/index.md) | Manage CSR evaluations       |
| [ai speech csr model](./model/index.md)         | Manage CSR models            |
| [ai speech csr project](./project/index.md)     | Manage CSR projects          |

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
