AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION PROJECT CREATE

  The ai speech csr project create command creates a new custom speech
  recognition project.

USAGE: ai speech csr project create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --name NAME                   (see: ai help speech csr project name)
  --language LANGUAGE           (see: ai help speech csr project create language)
  --description DESCRIPTION     (see: ai help speech csr project description)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

