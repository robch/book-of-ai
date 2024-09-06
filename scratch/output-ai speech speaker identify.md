AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

SPEAKER IDENTIFY

IMPORTANT: The identification audio sample must contain 30 seconds or more of speech to be successful.

  The speaker identify command identifies speakers in a given audio sample against one or more voice profiles.

USAGE: ai speech speaker identify --id ID --file AUDIO_SAMPLE_FILE
   OR: ai speech speaker identify --ids [ID1, ID2, ..., ID10] --file AUDIO_SAMPLE_FILE

  CONNECTION                      (see: ai help speech speaker connection)
    --key KEY                     (see: ai help speech speaker key)
    --region REGION               (see: ai help speech speaker region)

  INPUT
    --id ID                       (see: ai help speech speaker id)
    --file FILE                   (see: ai help speech speaker file)

  ADVANCED
    --log FILENAME                (see: ai help speech speaker log)
    --foreach in @ITEMS.txt       (see: ai help speech speaker foreach)
    --threads NUMBER              (see: ai help speech speaker threads)

SEE ALSO

  ai help speech speaker verify
  ai help speech speaker examples
  ai help find topics speech speaker

