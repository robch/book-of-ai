# `ai speech csr dataset delete`

The `ai speech csr dataset delete` command deletes an existing custom speech recognition dataset.

### Usage

``` bash title="Delete a Custom Speech Recognition Dataset"
ai speech csr dataset delete --dataset <URL> --key <API_KEY> --region <REGION>
```

### Options

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| `--key KEY`              | Specify the API key for authentication.                       |
| `--region REGION`        | Specify the Azure region.                                     |
| `--dataset URL`          | The dataset URL to be deleted.                                |
| `--input path PATH`      | Optional input file path.                                     |
| `--output path PATH`     | Optional output file path.                                    |
| `--output json FILENAME` | Optional output file name for JSON format.                    |
| `--foreach in @FILENAME` | Execute the command for each entry in the specified file.     |
| `--save FILENAME`        | Save the command output to the specified file.                |
| `--zip ZIPFILE`          | Zip the specified output file.                                |
