# `ai speech csr evaluation update`

Update a specific evaluation of a custom speech recognition model.

### Usage

``` bash
ai speech csr evaluation update --evaluation-id <evaluation_id> --name <new_name> --description <new_description>
```

### Options

| Option                  | Description                                                                              |
|-------------------------|------------------------------------------------------------------------------------------|
| `--evaluation-id`       | The ID of the evaluation to update.                                                      |
| `--name`                | The new name for the evaluation.                                                         |
| `--description`         | The new description for the evaluation.                                                  |

### Examples

``` bash title="Update the name and description of an evaluation"
ai speech csr evaluation update --evaluation-id abc123 --name "New Evaluation Name" --description "Updated evaluation description"
```
