AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION MODEL CREATE

  The ai speech csr model create command creates a new custom speech recognition
  model using previously uploaded datasets and/or text supplied to the create
  command.

USAGE: ai speech csr model create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --project URL                 (see: ai help speech csr model project)
  --name NAME                   (see: ai help speech csr model name)
  --text @FILE                  (see: ai help speech csr model create text)
  --base URL                    (see: ai help speech csr model create base)
  --dataset URL                 (see: ai help speech csr model create dataset)
  --datasets URL1;URL2          (see: ai help speech csr model create datasets)
  --language LANGUAGE           (see: ai help speech csr model create language)
  --description DESCRIPTION     (see: ai help speech csr model description)

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

