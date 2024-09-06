AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION DATASET DOWNLOAD

  The ai speech csr dataset download command downloads one more more files
  associated with a custom speech recognition dataset.

USAGE: ai speech csr dataset download [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DOWNLOAD
  --file URL                    (see: ai help speech csr dataset download file)

OUTPUT                          (see: ai help speech csr output)
  --output file FILENAME        (see: ai help speech csr output file)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)

ADVANCED
  --url URL
  --file URL                    (see: ai help speech csr dataset download file)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

