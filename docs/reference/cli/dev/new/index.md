# `ai dev new`

The `ai dev new` command creates or lists available templates.

### Usage

```bash
ai dev new TEMPLATE_NAME [...]
```

### Options

| Option                            | Description                                   |
|---------------------------------- |----------------------------------------------|
| `--language LANGUAGE`             | Specifies the language for the new template. |
| `--csharp`                        | Alias for `--language csharp`.               |
| `--go`                            | Alias for `--language go`.                   |
| `--java`                          | Alias for `--language java`.                 |
| `--javascript`                    | Alias for `--language javascript`.           |
| `--python`                        | Alias for `--language python`.               |
| `--instructions "INSTRUCTIONS"`   | Specifies the instructions for the template. Not all templates support this option. |

### Sub-commands

| Sub-command           | Description                                                                     |
|---------------------- |---------------------------------------------------------------------------------|
| [list](./list.md)     | Lists available templates.                                                      |

### Examples

``` bash title="Create an .env file containing Azure AI service settings"
ai dev new .env
```

??? tip "Why create an `.env` file?"

    To connect your code to the Azure resources, you need environment variables that the Azure AI SDK can use. You might be used to creating environment variables manually, which is much tedious work. The Azure AI CLI saves you time.

    You can create a new `.env` file by running the `ai dev new` command with the `.env` template name. The `.env` file contains environment variables for resources and services that you set up with the [ai init](/reference/cli/init.md) or [ai config](/reference/cli/config.md) commands.

    > [!WARNING]
    > If you already have an `.env` file in your working directory, running this command will overwrite the existing file with settings from the local AI CLI configuration datastore.

    ??? abstract "Output"

        ```terminal
        .env (saved at 'C:\dev\ai-gen-sdk')
        ```

        The `.env` file is created with the following content:

        ```text
        AZURE_AI_PROJECT_NAME = contoso-outdoor-proj
        AZURE_AI_SEARCH_ENDPOINT = https://contoso-outdoor-proj-search.search.windows.net
        AZURE_AI_SEARCH_INDEX_NAME = product-info
        AZURE_AI_SEARCH_KEY = YourAzureAISearchKey
        AZURE_AI_SPEECH_ENDPOINT = https://ai-contosoaihub-aiservices-1891736009.cognitiveservices.azure.com/
        AZURE_AI_SPEECH_KEY = 8c0a****************************
        AZURE_AI_SPEECH_REGION = eastus2
        AZURE_COGNITIVE_SEARCH_KEY = YourAzureAISearchKey
        AZURE_COGNITIVE_SEARCH_TARGET = https://contoso-outdoor-proj-search.search.windows.net
        AZURE_OPENAI_API_KEY = 8c0a****************************
        AZURE_OPENAI_API_VERSION = 2023-12-01-preview
        AZURE_OPENAI_CHAT_DEPLOYMENT = gpt-35-turbo-16k-0613
        AZURE_OPENAI_CHAT_MODEL = gpt-35-turbo-16k
        AZURE_OPENAI_EMBEDDING_DEPLOYMENT = text-embedding-ada-002-2
        AZURE_OPENAI_EMBEDDING_MODEL = text-embedding-ada-002
        AZURE_OPENAI_ENDPOINT = https://ai-contosoaihub-aiservices-1891736009.cognitiveservices.azure.com/
        AZURE_OPENAI_EVALUATION_DEPLOYMENT = gpt-35-turbo-16k-0613
        AZURE_OPENAI_EVALUATION_MODEL = gpt-35-turbo-16k
        AZURE_OPENAI_KEY = 8c0a****************************
        AZURE_RESOURCE_GROUP = rg-contosoaihub
        AZURE_SUBSCRIPTION_ID = YourAzureSubscriptionID
        OPENAI_API_BASE = https://ai-contosoaihub-aiservices-1891736009.cognitiveservices.azure.com/
        OPENAI_API_KEY = 8c0a****************************
        OPENAI_API_TYPE = azure
        OPENAI_API_VERSION = 2023-12-01-preview
        ```


``` bash title="Create a new helper-functions template with instructions"
ai dev new helper-functions --instructions "Add helper functions that can retrieve text from a HTTP GET request with a supplied URL."
```

``` bash title="Create a new openai-chat-streaming template in JavaScript"
ai dev new openai-chat-streaming --javascript
```
