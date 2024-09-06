AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION MODEL COPY

  The ai speech csr model copy command copies an existing custom speech recognition
  model from one region to another region.
  
  NOTE: Only adapted models are allowed to copy to another subscription.

USAGE: ai speech csr model copy [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

COPY                            (see: ai help speech csr model copy examples)
  --model URL                   (see: ai help speech csr model copy model)
  --target SUBSCRIPTION         (see: ai help speech csr model copy target)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED                        (see: ai help speech csr advanced)
  --input path PATH             (see: ai help speech csr input path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

