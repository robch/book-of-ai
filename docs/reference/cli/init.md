# `ai init`

The `ai init` command allows interactive and non-interactive selection or creation of Azure AI resources. When an AI resource is selected or created using this command, the associated resource keys and region are retrieved and automatically stored in the local AI configuration datastore.

### Usage

``` bash
ai init <command> [...]
```

### Options

| Option                | Description                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `--subscription`      | Specify the subscription ID to use.                                                                      |
| `--interactive`       | Enable or disable interactive mode (true/false).                                                         |
| `--region`            | Specify the region for the resource.                                                                     |
| `--group`             | Specify the resource group name.                                                                         |
| `--name`              | Specify the name for the resource.                                                                       |

### Sub-commands

| Command               | Description                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `ai init openai`      | Creates or selects an Azure OpenAI resource. |
| `ai init inference`   | Initializes the connection to the Azure AI Inference endpoint. |
| `ai init github`      | Initializes the connection to the GitHub Model Marketplace. |
| `ai init speech`      | Creates or selects an Azure Speech resource. |
| `ai init search`      | Creates or selects an Azure Search resource. |


### Examples

``` bash title="Interactively select or create an Azure AI resource"
ai init
```

``` bash title="Interactively select a resource matching a set of criteria"
ai init --name "ai-westus2" --region westus2
```
