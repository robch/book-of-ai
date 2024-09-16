# `ai speech csr dataset download`

The `ai speech csr dataset download` command downloads one or more files associated with a custom speech recognition dataset.

### Usage

``` bash
ai speech csr dataset download [...]
```

### Options

| Option | Description |
|--------|-------------|
| `--key` | API key for the Custom Speech Service |
| `--region` | Azure region where the Custom Speech Service is deployed |
| `--file` | URL of the file(s) to download |
| `--output-file` | Specify the output filename for the downloaded file |
| `--output-json` | Specify JSON format for the output |
| `--output-url` | Specify URL format for the output |
| `--url` | URL of the dataset |
| `--input-path` | Input path for the dataset |
| `--output-path` | Output path for the downloaded file(s) |
| `--foreach in` | Iterate over a list of URLs in a file |
| `--save` | Save the command's results in the specified file |
| `--zip` | Download and save as a ZIP file |

### Examples

``` bash title="Download a dataset file"
ai speech csr dataset download --key YOUR_API_KEY --region YOUR_REGION --file YOUR_FILE_URL --output file FILENAME
```