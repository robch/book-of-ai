AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

TRANSLATE

  The ai speech translate command translates streaming audio captured
  from a device microphone or stored in local or remote audio files into one
  or more languages.

USAGE: ai speech translate [...]

  CONNECTION                      (see: ai help speech translate connection)
    --key KEY                     (see: ai help speech translate key)
    --region REGION               (see: ai help speech translate region)

  LANGUAGE                        (see: ai help speech translate language)
    --source LANGUAGE
    --target LANGUAGE

  INPUT                           (see: ai help speech translate input)
    --microphone                  (see: ai help speech translate microphone)
    --file FILE                   (see: ai help speech translate file)
    --files PATTERN               (see: ai help speech translate files)
    --files @FILELIST.txt         (see: ai help speech translate files)
    --format FORMAT               (see: ai help speech translate format)

  TRANSLATION
    --once[+]                     (see: ai help speech translate once)
    --continuous                  (see: ai help speech translate continuous)
    --keyword FILENAME            (see: ai help speech translate keyword)

  ADVANCED
    --log FILENAME                (see: ai help speech translate log)
    --proxy HOSTNAME              (see: ai help speech translate proxy)
    --phrases @PHRASES.txt        (see: ai help speech translate phrases)
    --foreach in @ITEMS.txt       (see: ai help speech translate foreach)
    --threads NUMBER              (see: ai help speech translate threads)

SEE ALSO

  ai help speech setup
  ai help speech translate advanced
  ai help speech translate examples
  ai help find topics speech translate

