# `ai speech batch download`

The `ai speech batch download` command downloads files from Azure Speech Service batch operations.

### Usage

``` bash
ai speech batch download [options]
```

### Options

| Option             | Description                          |
|--------------------|--------------------------------------|
| `--key KEY`          | The API key for the Azure region.    |
| `--region REGION`    | The Azure region for the service.    |
| `--file URL`         | The URL of the file to download.     |
| `--output file FILENAME` | The name of the output file. |

### Examples

``` bash title="Download a file from Azure Speech Service batch operations"
ai speech batch download --key YOUR_API_KEY --region YOUR_REGION --file FILE_URL --output file OUTPUT_FILENAME
```