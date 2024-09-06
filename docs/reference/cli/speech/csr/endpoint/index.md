# `ai speech csr endpoint`

### Usage
```
ai speech csr endpoint COMMAND [OPTIONS]
```

### Sub-commands
| Sub-command                                    | Description                                            |
|------------------------------------------------|--------------------------------------------------------|
| [ai speech csr endpoint create](./create.md) | Create a new speech endpoint                          |
| [ai speech csr endpoint delete](./delete.md) | Delete an existing speech endpoint                     |
| [ai speech csr endpoint download](./download.md) | Download the details of a specific speech endpoint    |
| [ai speech csr endpoint list](./list.md)     | List all available speech endpoints                    |
| [ai speech csr endpoint status](./status.md) | Check the status of a specific speech endpoint         |
| [ai speech csr endpoint update](./update.md) | Update the details of a specific speech endpoint       |

### Examples

``` bash title="Create a new speech endpoint"
ai speech csr endpoint create --name "NewEndpoint" --region "westus"
```
``` bash title="Delete a speech endpoint"
ai speech csr endpoint delete --name "OldEndpoint"
```
``` bash title="Download details of an endpoint"
ai speech csr endpoint download --name "ExampleEndpoint"
```
``` bash title="List all speech endpoints"
ai speech csr endpoint list
```
``` bash title="Check status of a speech endpoint"
ai speech csr endpoint status --name "CheckEndpoint"
```
``` bash title="Update a speech endpoint"
ai speech csr endpoint update --name "UpdateEndpoint" --region "eastus"
```
