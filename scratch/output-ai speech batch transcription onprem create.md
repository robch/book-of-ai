AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

BATCH TRANSCRIPTION ONPREM CREATE

  The ai speech batch transcription onprem create command submits a new batch
  of audio files to be transcribed using the user-supplied on-premise speech container endpoints.

  Endpoints should already have been configured using ai speech batch transcription onprem endpoints.

USAGE: ai speech batch transcription onprem create [...]

  CREATE
    --files /file/path1;file/path2;...
        OR
    --files @FILES.txt

    --language LANGUAGE           e.g. en-US
    --nbest NBEST                 How many transcript alternatives to return.
    --diarization DIARIZATION     Options: None, Identity, Anonymous.
    --resume RESUME               Permit resume from previous failure? Options: true, false.
    --combine COMBINE             Combine output jsons into single output json. Options: true, false.

SEE ALSO

  ai help speech setup
  ai help speech batch transcription onprem examples
  
  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

