AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION ENDPOINT CREATE

  The ai speech csr endpoint create command creates a new custom speech recognition
  endpoint using previously created custom speech recognition model or text
  supplied to the create command.

USAGE: ai speech csr endpoint create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --project URL                 (see: ai help speech csr endpoint project)
  --name NAME                   (see: ai help speech csr endpoint name)
  --text TEXT                   (see: ai help speech csr endpoint create text)
  --model URL                   (see: ai help speech csr endpoint create model)
  --language LANGUAGE           (see: ai help speech csr endpoint create language)
  --description DESCRIPTION     (see: ai help speech csr endpoint description)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

