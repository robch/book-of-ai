AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION DATASET UPDATE

  The ai speech csr dataset update command updates an existing custom speech
  recognition dataset with an updated name, description, and/or
  project reference.

USAGE: ai speech csr dataset update [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPDATE
  --dataset URL                 (see: ai help speech csr dataset update dataset)
  --project URL                 (see: ai help speech csr dataset project)
  --name NAME                   (see: ai help speech csr dataset name)
  --description DESCRIPTION     (see: ai help speech csr dataset description)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

