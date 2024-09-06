AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

SPEAKER VERIFY

IMPORTANT: The verification audio sample must contain between 1 to 15 seconds of speech to be successful.

  The speaker verify command verifies a speaker in a given audio sample against a voice profile. The returned JSON will have a "result" field with an "Accept" or "Reject" value.

USAGE: ai speech speaker verify --id ID --file AUDIO_SAMPLE_FILE

  CONNECTION                      (see: ai help speech speaker connection)
    --key KEY                     (see: ai help speech speaker key)
    --region REGION               (see: ai help speech speaker region)

  INPUT
    --id ID                       (see: ai help speech speaker id)
    --file FILE                   (see: ai help speech speaker file)
    --kind KIND                   (see: ai help speech speaker kind)

  ADVANCED
    --log FILENAME                (see: ai help speech speaker log)
    --foreach in @ITEMS.txt       (see: ai help speech speaker foreach)
    --threads NUMBER              (see: ai help speech speaker threads)

SEE ALSO

  ai help speech speaker identify
  ai help speech speaker examples
  ai help find topics speech speaker

