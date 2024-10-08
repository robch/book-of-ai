# `ai speech csr project`

The `ai speech csr project` command group is used to manage custom speech recognition projects in Azure AI services.

### Usage

``` bash
ai speech csr project [subcommand] [options]
```

### Sub-commands

| Sub-command                     | Description                                                                       |
|---------------------------------|-----------------------------------------------------------------------------------|
| [ai speech csr project create](./create.md) | Creates a new custom speech recognition project                               |
| [ai speech csr project delete](./delete.md) | Deletes an existing custom speech recognition project                        |
| [ai speech csr project list](./list.md)     | Lists details about existing custom speech recognition projects              |
| [ai speech csr project status](./status.md) | Checks the asynchronous creation status of a custom speech recognition project|
| [ai speech csr project update](./update.md) | Updates an existing custom speech recognition project with new name/description|

### Examples

``` bash title="Create a new custom speech recognition project"
ai speech csr project create --key <your-key> --region <your-region> --name <project-name> --language <language-code> --description <project-description>
```

``` bash title="Delete an existing custom speech recognition project"
ai speech csr project delete --key <your-key> --region <your-region> --project <project-url>
```

``` bash title="List all custom speech recognition projects"
ai speech csr project list --key <your-key> --region <your-region>
```

``` bash title="Check the status of a custom speech recognition project"
ai speech csr project status --key <your-key> --region <your-region> --project <project-url>
```

``` bash title="Update a custom speech recognition project"
ai speech csr project update --key <your-key> --region <your-region> --project <project-url> --name <new-name> --description <new-description>
```
