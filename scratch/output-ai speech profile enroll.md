AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

PROFILE ENROLL

IMPORTANT: For TextIndependentIdentification, the enrollment audio sample must contain 30 seconds or more of speech to be successful. 
  For TextIndependentVerification, three or more samples with a combined 15 seconds or more of speech are required.

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

  The profile enroll function enrolls a given voice profile using an audio sample.

USAGE: ai speech profile enroll --id ID --file AUDIO_SAMPLE_FILE --kind KIND

CONNECTION                      (see: ai help speech profile connection)
  --key KEY                     (see: ai help speech profile key)
  --region REGION               (see: ai help speech profile region)

ID
  --id ID                       (see: ai help speech profile id)

FILE
  --file FILE                   (see: ai help speech profile file)

KIND
  --kind KIND                   (see: ai help speech profile kind)

ADVANCED                        
  --output file PATH            (see: ai help speech profile output file)
  --output json PATH            (see: ai help speech profile output json)

SEE ALSO

  ai help speech profile
  ai help speech profile kind

