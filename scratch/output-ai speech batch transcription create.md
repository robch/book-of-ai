AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

BATCH TRANSCRIPTION CREATE

  The ai speech batch transcription create command creates new
  requests to transcribe remote audio streams.

USAGE: ai speech batch transcription create [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  CREATE
    --name NAME                   (see: ai help speech batch transcription name)
    --model URL                   (see: ai help speech batch transcription create model)
    --content URL                 (see: ai help speech batch transcription create content)
    --content @URLs.txt           (see: ai help speech batch transcription create content)
    --language LANGUAGE           (see: ai help speech batch transcription create language)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --project URL                 (see: ai help speech batch transcription project)
    --wait [TIMEOUT]              (see: ai help speech batch transcription wait)

SEE ALSO

  ai help speech setup
  ai help speech batch output
  ai help speech batch transcription examples
  ai help speech batch transcription create advanced

