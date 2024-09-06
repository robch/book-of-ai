# `ai speech csr model`

### Usage

``` bash
ai speech csr model <command> [...]
```

### Sub-Commands

| Sub-Command                               | Description                                                                                                                                                     |
|-------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ai speech csr model create](./create.md) | Creates a new custom speech recognition model using previously uploaded datasets and/or text supplied to the create command.                                  |
| [ai speech csr model status](./status.md) | Checks the status of a custom speech recognition model.                                                                                                       |
| [ai speech csr model list](./list.md)     | Lists details about existing custom speech recognition models.                                                                                                |
| [ai speech csr model update](./update.md) | Updates an existing custom speech recognition model.                                                                                                          |
| [ai speech csr model delete](./delete.md) | Deletes an existing custom speech recognition model.                                                                                                          |
| [ai speech csr model copy](./copy.md)     | Copies an existing custom speech recognition model.                                                                                                           |

### Examples

``` bash title="Create custom speech recognition model"
ai speech csr model create --key YOUR_KEY --region YOUR_REGION --project PROJECT_URL --name MODEL_NAME --base BASE_URL --dataset DATASET_URL --language LANGUAGE_CODE --description "Model Description"
```

``` bash title="List all custom speech recognition models"
ai speech csr model list --key YOUR_KEY --region YOUR_REGION --models
```

``` bash title="Delete a custom speech recognition model"
ai speech csr model delete --key YOUR_KEY --region YOUR_REGION --model MODEL_URL
```

