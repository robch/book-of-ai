# `ai speech csr evaluation list`

The `ai speech csr evaluation list` command lists details about existing custom speech recognition evaluations and/or its associated files.

### Usage

``` bash
ai speech csr evaluation list [...]
```

### Options

| Option               | Description                                                    |
|----------------------|----------------------------------------------------------------|
| `--key KEY`          | Subscription key                                               |
| `--region REGION`    | Azure region                                                   |
| `--evaluations`      | List existing evaluations                                      |
| `--languages`        | List languages of evaluations                                  |
| `--evaluation ID/URL`| Specify the evaluation by ID or URL                            |
| `--files`            | List associated files                                          |
| `--project URL`      | Specify the project URL                                        |
| `--input path PATH`  | Specify the input path                                         |
| `--output path PATH` | Specify the output path                                        |
| `--output json FILFE`| Specify the output file in JSON format                         |
| `--foreach in @FILE` | Loop through each evaluation in specified file                 |
| `--save FILE`        | Save the list to a specific file                               |
| `--zip ZIPFILE`      | Create a zip file with the listed evaluations or their details |

### Examples

### List all existing evaluations in a specific region.
``` bash title="List all existing evaluations in a specific region"
ai speech csr evaluation list --region westus2 --key <your_subscription_key> --evaluations
```

### List evaluation languages for specific evaluation ID.
``` bash title="List evaluation languages for specific evaluation ID"
ai speech csr evaluation list --region westus2 --key <your_subscription_key> --evaluation 01234567-89ab-cdef-fedc-ba9876543210 --languages
```

### List all associated files for specific evaluation URL.
``` bash title="List all associated files for specific evaluation URL"
ai speech csr evaluation list --region westus2 --key <your_subscription_key> --evaluation https://example.com/eval/01234567-89ab-cdef-fedc-ba9876543210 --files
```

### Save evaluations list to a JSON file.
``` bash title="Save evaluations list to a JSON file"
ai speech csr evaluation list --region westus2 --key <your_subscription_key> --evaluations --output json evaluations_list.json
```
 
### Loop through evaluations listed in a file.
``` bash title="Loop through evaluations listed in a file"
ai speech csr evaluation list --region westus2 --key <your_subscription_key> --foreach in @evaluations.txt --output path ./evaluations
```

### See Also

- [ai speech csr evaluation](ai-speech-csr-evaluation.md)
