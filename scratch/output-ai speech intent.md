AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

INTENT

  The ai speech intent command recognizes streaming audio captured
  from a device microphone or stored in local or remote audio files 
  and returns intent information from that recognition using PATTERNS
  or a previously authored and deployed LUIS model.

USAGE: ai speech intent [...]

  CONNECTION                      (see: ai help speech intent connection)
    --key KEY                     (see: ai help speech intent key)
    --region REGION               (see: ai help speech intent region)

  PATTERNS
    --pattern PATTERN             (see: ai help speech intent pattern)
    --pattern INTENTID=PATTERN
    --patterns PATTERN1;PATTERN2  (see: ai help speech intent patterns)
    --patterns @PATTERNS.txt

  LUIS                            (see: ai help speech intent luis)
    --luis key KEY                (see: ai help speech intent luis key)
    --luis region REGION          (see: ai help speech intent luis region)
    --luis appid APPID            (see: ai help speech intent luis appid)

  INPUT                           (see: ai help speech intent input)
    --microphone                  (see: ai help speech intent microphone)
    --file FILE                   (see: ai help speech intent file)
    --files PATTERN               (see: ai help speech intent files)
    --files @FILELIST.txt         (see: ai help speech intent files)
    --format FORMAT               (see: ai help speech intent format)

  RECOGNITION
    --once[+]                     (see: ai help speech intent once)
    --continuous                  (see: ai help speech intent continuous)
    --keyword FILENAME            (see: ai help speech intent keyword)
    --language LANGUAGE           (see: ai help speech intent language)

  ADVANCED
    --log FILENAME                (see: ai help speech intent log)
    --proxy HOSTNAME              (see: ai help speech intent proxy)
    --foreach in @ITEMS.txt       (see: ai help speech intent foreach)
    --threads NUMBER              (see: ai help speech intent threads)

SEE ALSO

  ai help speech setup
  ai help speech intent advanced
  ai help speech intent examples
  ai help find topics speech intent

