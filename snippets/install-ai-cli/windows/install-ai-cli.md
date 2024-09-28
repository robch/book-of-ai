Use `winget` to install the .NET 8 SDK,  
Use `winget` to install the Azure CLI (`az`),   
Use `dotnet` to install the Azure AI CLI (`ai`).  

``` bash
winget install -e --id Microsoft.DotNet.SDK.8
winget install -e --id Microsoft.AzureCLI
dotnet tool install -g Azure.AI.CLI --prerelease
```

??? tip "If you don't have `winget` ..."

    [Install WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget)  
    Walks you thru installing the Windows Package Manager.
