# `ai` CLI Installation

=== "Windows (install)"

    Use `winget` to install the .NET 8 SDK,  
    Use `dotnet` to install the Azure `ai` CLI:  
    ``` bash
    winget install Microsoft.DotNet.SDK.8
    dotnet tool install -g Microsoft.Azure.AI.CLI --prerelease
    ```

    ??? tip "If you don't have `winget` ..."

        [Install WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget)  
        Walks you thru installing the Windows Package Manager.

=== "Mac (install)"

    Use `curl` to download the script,  
    Use `bash` to run the script:  

    ``` bash
    curl -sL https://aka.ms/InstallAzureAICLIDeb | sudo bash
    ```

=== "Linux (install)"

    Use `curl` to download the script,  
    Use `bash` to run the script:  

    ``` bash
    curl -sL https://aka.ms/InstallAzureAICLIDeb | sudo bash
    ```

=== "Dev Container (VS Code)"

    Use `git` to clone the repository,  
    Use `code` to open the folder:  

    ``` bash
    git clone https://github.com/Azure/azure-ai-cli
    code azure-ai-cli
    ```

    Then, click the "*Reopen in Container*" button in the notification.

    ??? tip "If the "Reopen in Container" notification does not appear ..."
        Open the command palette and run the `Dev Containers: Reopen in Container` command.

    ??? info "Learn more about Dev Containers ..."
        [Installation instructions](https://code.visualstudio.com/docs/devcontainers/containers#_installation)  
        Walks you through installing and configuring the required software.

        [VS Code Dev Containers Tutorial](https://code.visualstudio.com/docs/devcontainers/tutorial)  
        Walks you through running Dev Containers using the VS Code Extension.

=== "Codespaces (GitHub)"

    You can run the Azure `ai` CLI in a browser using GitHub Codespaces:

    [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/Azure/azure-ai-cli?quickstart=1)

    ??? info "Learn more about GitHub Codespaces ..."
        [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)  
        Walks you through creating and using Codespaces.