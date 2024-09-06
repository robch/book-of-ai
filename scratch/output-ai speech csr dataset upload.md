AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION DATASET UPLOAD

  The ai speech csr dataset upload command uploads a new dataset by
  getting the data from a specified local data file.

USAGE: ai speech csr dataset upload [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPLOAD
  --name NAME                   (see: ai help speech csr dataset name)
  --description DESCRIPTION     (see: ai help speech csr dataset description)
  --language LANGUAGE           (see: ai help speech csr dataset language)
  --data FILENAME               (see: ai help speech csr dataset data)
  --kind KIND                   (see: ai help speech csr dataset kind)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED                        (see: ai help speech csr advanced)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

