# `ai speech csr endpoint list`

The `ai speech csr endpoint list` command lists details about existing custom speech recognition endpoints.

### Usage

``` bash
ai speech csr endpoint list [...]
```

### Options

| Option                | Description                                                       |
|-----------------------|-------------------------------------------------------------------|
| `--key KEY`             | The API key for authenticating the request.                       |
| `--region REGION`       | The region associated with the API key.                           |
| `--endpoints`           | Lists the available custom speech recognition endpoints.          |
| `--languages`           | Lists the languages supported by the endpoints.                   |
| `--endpoint URL`        | Specifies the URL of the specific endpoint to retrieve logs for.  |
| `--logs`                | Retrieves logs for the specified endpoint.                        |
| `--project URL`         | The URL of the project associated with the endpoints.             |
| `--input path PATH`     | The input path for files related to the endpoint.                 |
| `--output path PATH`    | The output path for files related to the endpoint.                |
| `--output json FILENAME`| The filename for the output in JSON format.                       |
| `--foreach in @FILENAME`| Specifies a file containing multiple endpoints to iterate over.  |
| `--save FILENAME`       | Saves the configuration to the specified filename.                |
| `--zip ZIPFILE`         | Specifies the Zip file to use for the operations.                 |

### Examples

``` bash title="List all available custom speech recognition endpoints"
ai speech csr endpoint list --endpoints
```

``` bash title="List the languages supported by the endpoints"
ai speech csr endpoint list --languages
```

``` bash title="Retrieve logs for a specific endpoint"
ai speech csr endpoint list --endpoint {YourEndpointURL} --logs
```

``` bash title="Save the configuration to a file"
ai speech csr endpoint list --save {YourFilename}
```
