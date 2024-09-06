AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

BATCH TRANSCRIPTION ONPREM ENDPOINTS

  The ai speech batch transcription onprem endpoints command is used to set the
  target Azure Speech Container endpoints to use for processing all batches.
  This can be set dynamically even while a batch is in progress. This should
  be set before any batches are submitted, otherwise forward progress is paused.

USAGE: ai speech batch transcription onprem endpoints [...]

  CREATE
    --config CONFIG               Path to on-prem endpoints config file.

SEE ALSO

  ai help speech setup
  ai help speech batch transcription onprem examples

  For syntax of the endpoints config file, please refer to:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-batch-processing?tabs=oneshot#endpoint-configuration

  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

