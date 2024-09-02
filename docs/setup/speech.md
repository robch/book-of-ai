---
hide:
- toc
icon: material/server-network-outline
---

# Setup with Speech

The `ai init speech` command initializes the Azure Speech resource. This command is used to select or create an Azure Speech resource. The Azure Speech resource is required to use the Azure Speech service.

--8<-- "tips/tip-setup-prereqs.md"

```bash title="Select or create Azure Speech resource"
ai init speech
```

> **STEP 1**: ⇛ Select your Azure subscription  
> **STEP 2**: ⇛ Select or create your Azure Speech resource  

### View Configuration

To view the persisted configuration, use the following commands:

```bash title="Get speech endpoint"
ai config @speech.endpoint
```

```bash title="Get speech key"
ai config @speech.key
```
