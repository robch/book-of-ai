AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION EVALUATION LIST

  The ai speech csr evaluation list command lists details about existing
  custom speech recognition evaluations and/or its associated files.

USAGE: ai speech csr evaluation list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

LIST
  --evaluations                 (see: ai help speech csr evaluation list evaluations)
  --languages                   (see: ai help speech csr evaluation list evaluations languages)

EVALUATION FILES                (see: ai help speech csr evaluation list files)
  --evaluation ID/URL
  --files

ADVANCED
  --project URL                 (see: ai help speech csr project)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

