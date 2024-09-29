Use `brew` to install the .NET 8 SDK,  
Use `brew` to install the Azure CLI (`az`),   
Use `dotnet` to install the Azure AI CLI (`ai`).  

``` bash
brew install --cask dotnet-sdk
brew install azure-cli
dotnet tool install -g Azure.AI.CLI --prerelease
```

??? tip "If you don't have brew ..."

    [Install Homebrew](https://brew.sh/)  
    Walks you through installing Homebrew, a package manager for macOS.
