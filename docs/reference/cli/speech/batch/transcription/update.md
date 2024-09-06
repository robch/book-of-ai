# `ai speech batch transcription update`

The `ai speech batch transcription update` command updates an existing transcription request with a new name, description, or project association.

### Usage

``` bash
ai speech batch transcription update [...]
```

### Options

| Option              | Description                                          |
|---------------------|------------------------------------------------------|
| `--key KEY`         | The key for the Azure Speech service.                |
| `--region REGION`   | The region for the Azure Speech service.             |
| `--project URL`     | The URL of the project to associate with the request.|
| `--name NAME`       | The new name for the transcription request.          |
| `--description DESCRIPTION` | The new description for the transcription request. |
| `--transcription URL` | The URL of the transcription request.              |

### Examples

``` bash title="Update a transcription request with a new name"
ai speech batch transcription update --key YOUR_KEY --region YOUR_REGION --transcription URL --name "NewName"
```

``` bash title="Update a transcription request with a new description"
ai speech batch transcription update --key YOUR_KEY --region YOUR_REGION --transcription URL --description "NewDescription"
```

``` bash title="Update a transcription request with a new project association"
ai speech batch transcription update --key YOUR_KEY --region YOUR_REGION --transcription URL --project "ProjectURL"
```
