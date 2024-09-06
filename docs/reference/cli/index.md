# `ai` CLI

The Azure AI Command-Line Interface (the `ai` CLI) is a cross-platform command-line tool to connect and immediately use Azure AI services with or without writing code.

### Usage

``` bash
ai <command> [...]
```
### Commands

| Command | Description |
| --- | --- |
| [ai init](/reference/cli/init.md) | Allows interactive and non-interactive selection or creation of Azure AI Services resources. |
| [ai config](/reference/cli/config.md) | Creates, queries, or deletes AI configuration data. |
| [ai chat](/reference/cli/chat/index.md) | Initiates interactive or non-interactive conversations with an AI language model. |
| [ai chat assistant](/reference/cli/chat/assistant/index.md) | Manages OpenAI Assistants and related resources. |
| [ai dev](/reference/cli/dev/index.md) | Enables quick development of GenAI applications. |
| [ai search](/reference/cli/search/index/index.md) | Creates or updates Azure AI Search indexes. |
| [ai speech](/reference/cli/speech/index.md) | Allows speech recognition and synthesis and related tasks. |
| [ai test](/reference/cli/test/index.md) | Enables GenAI based testing of console applications. |

??? tip "Where can I use the `ai` CLI?"

    The CLI allows the execution of commands through a terminal using interactive command-line prompts or via script.

    The `ai` CLI is available on Windows, macOS, and Linux. You can also use it in a Visual Studio Code Dev Container or GitHub Codespaces.

    [Install the `ai` CLI](/install-ai-cli.md) to get started.

??? tip "Do I have to write code to use the `ai` CLI?"

    No, you don't have to write code to use the `ai` CLI.

    You can easily use the `ai` CLI to experiment with key Azure AI service features and see how they work with your use cases. Within minutes, you can setup the required Azure resources, and build a customized GenAI experiences. You can try it out interactively, or script larger processes to automate your own workflows as part of your CI/CD system.

??? tip  "Can I use it to integrate GenAI with my own applications?"

    Yes, you can use the `ai` CLI to create and manage Azure AI resources, and to develop and test GenAI applications.

    Use the `ai dev` command to quickly develop GenAI applications in C#, Go, Java, JavaScript, Python, or TypeScript.  
    Use the `ai test` command to easily test console applications using GenAI based testing.  

