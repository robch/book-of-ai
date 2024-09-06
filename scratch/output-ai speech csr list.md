AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CUSTOM SPEECH RECOGNITION

The ai speech csr list command shows details about speech recognition models.

USAGE: ai speech csr list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

PROJECTS
  --projects                    List projects
  --project languages           List supported locales for projects

DATASETS
  --datasets                    List datasets
  --dataset languages           List supported locales for datasets

DATASET FILES                   (see: ai help speech csr list dataset files)
  --dataset URL

MODELS
  --models                      List models
  --model languages             List supported locales for models
  --base models                 (see: ai help speech csr list base models)

EVALUATIONS
  --evaluations                 List evaluations
  --evaluation languages        List supported locales for evaluations

EVALUATION FILES                (see: ai help speech csr list evaluation files)
  --evaluation URL

ENDPOINTS
  --endpoints                   List endpoints
  --endpoint languages          List supported locales for endpoints

ENDPOINT LOGS                   (see: ai help speech csr list endpoint logs)
  --endpoint URL

ADVANCED                        (see: ai help speech csr advanced)
  --project URL                 (see: ai help speech csr project)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

