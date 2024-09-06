AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION ENDPOINT UPDATE

  The ai speech csr endpoint update command updates an existing custom speech
  recognition endpoint with an updated name, description, and/or
  project reference.

USAGE: ai speech csr endpoint update [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPDATE
  --endpoint URL                (see: ai help speech csr endpoint update endpoint)
  --project URL                 (see: ai help speech csr endpoint project)
  --name NAME                   (see: ai help speech csr endpoint name)
  --description DESCRIPTION     (see: ai help speech csr endpoint description)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

