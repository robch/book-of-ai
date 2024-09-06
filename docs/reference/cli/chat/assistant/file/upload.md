# `ai chat assistant file upload`

The `ai chat assistant file upload` command uploads a new OpenAI Assistant file.

### Usage

``` bash
ai chat assistant file upload [...]
```

### Options

| Option               | Description                                                                |
|----------------------|----------------------------------------------------------------------------|
| `--endpoint`         | Specifies the endpoint to use.                                              |
| `--key`              | Specifies the key to use.                                                   |
| `--file`             | Specifies a file to upload.                                                 |
| `--files`            | Specifies multiple files to upload.                                         |
| `--output-id`        | Outputs the ID of the uploaded file.                                        |
| `--output-name`      | Outputs the name of the uploaded file.                                      |
| `--output-add-id`    | Adds the ID of the uploaded file to a specified file.                       |
| `--output-add-name`  | Adds the name of the uploaded file to a specified file.                     |

### Examples

``` bash title="Upload a single file"
ai chat assistant file upload --file README.md
```

``` bash title="Upload multiple files"
ai chat assistant file upload --files **/*.md
```
