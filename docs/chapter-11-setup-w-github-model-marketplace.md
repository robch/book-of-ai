# GitHub Model Setup

``` bash title="Initialize connection to GitHub Model Marketplace"
ai init github
```

⇛ Enter your GitHub personal access token from [https://github.com/settings/tokens](https://github.com/settings/tokens)  
⇛ Enter the model you want to use (e.g. `gpt-4o`, `gpt-4o-mini`, `Mistral-large-2407`, etc.)  

``` bash title="See the persisted config from `ai init github`"
ai config @chat.endpoint
ai config @chat.key
```

??? tip "If you don't know what models are available..."
    [GitHub Model Marketplace](https://github.com/marketplace/models/)  
    See what models you can experiment with for free.
    