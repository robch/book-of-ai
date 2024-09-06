# `ai init`

The `ai init` command allows interactive and non-interactive selection or creation of Azure AI Services resources. When an AI resource is selected or created using this command, the associated resource keys and region are retrieved and automatically stored in the local AI configuration datastore.

### Usage

``` bash
ai init [...]
```

### Options

| Option                | Description                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `--subscription`      | Specify the subscription ID to use.                                                                      |
| `--interactive`       | Enable or disable interactive mode (true/false).                                                         |
| `--region`            | Specify the region for the resource.                                                                     |
| `--group`             | Specify the resource group name.                                                                         |
| `--name`              | Specify the name for the resource.                                                                       |

### Examples

``` bash title="Interactively select or create an Azure AI resource"
ai init
```

``` bash title="Interactively select a resource matching a set of criteria"
ai init --name "ai-westus2" --region westus2
```
