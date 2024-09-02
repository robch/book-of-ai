Use `winget` to install the .NET 8 SDK,  
Use `dotnet` to install the Azure `ai` CLI:  

``` bash
winget install Microsoft.DotNet.SDK.8
dotnet tool install -g Microsoft.Azure.AI.CLI --prerelease
```

??? tip "If you don't have `winget` ..."

    [Install WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/#install-winget)  
    Walks you thru installing the Windows Package Manager.
