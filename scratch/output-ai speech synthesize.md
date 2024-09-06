AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

SYNTHESIZE

  The ai speech synthesize command synthesizes audio from text or SSML
  and render to the local device's speakers or write into local audio files.

USAGE: ai speech synthesize [...]

  CONNECTION                      (see: ai help speech synthesize connection)
    --key KEY                     (see: ai help speech synthesize key)
    --region REGION               (see: ai help speech synthesize region)

  VOICEs
    --voice NAME                  (see: ai help speech synthesize voice)
    --voices                      (see: ai help speech synthesize list voices)

  INPUT                           (see: ai help speech synthesize input)
    --interactive                 (see: ai help speech synthesize interactive)
    --text TEXT                   (see: ai help speech synthesize text)
    --ssml SSML                   (see: ai help speech synthesize ssml)
    --file FILE                   (see: ai help speech synthesize file)
    --files PATTERN               (see: ai help speech synthesize files)
    --files @FILELIST.txt         (see: ai help speech synthesize files)
    --format FORMAT               (see: ai help speech synthesize format)

  AUDIO OUTPUT                    (see: ai help speech synthesize output)
    --speakers                    (see: ai help speech synthesize speakers)
    --audio output FILENAME       (see: ai help speech synthesize output)

  ADVANCED
    --log FILENAME                (see: ai help speech synthesize log)
    --proxy HOSTNAME              (see: ai help speech synthesize proxy)
    --foreach in @ITEMS.txt       (see: ai help speech synthesize foreach)
    --threads NUMBER              (see: ai help speech synthesize threads)

SEE ALSO

  ai help speech setup
  ai help speech synthesize advanced
  ai help speech synthesize examples
  ai help find topics speech synthesize

