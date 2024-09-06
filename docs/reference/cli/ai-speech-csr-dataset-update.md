# `ai speech csr dataset update`

Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

### CUSTOM SPEECH RECOGNITION DATASET UPDATE

The `ai speech csr dataset update` command updates an existing custom speech recognition dataset with an updated name, description, and/or project reference.

### USAGE

``` bash title="Usage"
ai speech csr dataset update [...]
```

### CONNECTION OPTIONS

| Option        | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `--key KEY`     | Specify the subscription key to use                                         |
| `--region REGION` | Specify the region for the speech resource                                |

### UPDATE OPTIONS

| Option        | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `--dataset URL` | Specify the dataset URL                                                     |
| `--project URL` | Specify the project URL                                                     |
| `--name NAME`   | Specify the name for the dataset                                            |
| `--description DESCRIPTION` | Specify the description for the dataset                         |

### ADVANCED OPTIONS

| Option        | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `--input path PATH` | Specify the input path                                                  |
| `--output path PATH` | Specify the output path                                               |
| `--output json FILENAME` | Specify the output file for JSON response                          |
| `--foreach in @FILENAME` | Repeat a command multiple times leveraging options in a file       |
| `--save FILENAME` | Package command line and related configuration into a file               |
| `--zip ZIPFILE` | Specify a ZIP file                                                          |

### EXAMPLES

``` bash title="Update dataset name and description"
ai speech csr dataset update --key YOUR_KEY --region westus2 --dataset DATASET_URL --name "New Dataset Name" --description "Updated description."
```

``` bash title="Update dataset project reference"
ai speech csr dataset update --key YOUR_KEY --region westus2 --dataset DATASET_URL --project PROJECT_URL
```
