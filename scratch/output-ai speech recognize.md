AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

RECOGNIZE

  The ai speech recognize command recognizes streaming audio captured
  from a device microphone or stored in local or remote audio files.

USAGE: ai speech recognize [...]

  CONNECTION                      (see: ai help speech recognize connection)
    --key KEY                     (see: ai help speech recognize key)
    --region REGION               (see: ai help speech recognize region)

  LANGUAGE                        (see: ai help speech recognize language)
    --language LANGUAGE
    --languages LANG1;LANG2[;...]

  INPUT                           (see: ai help speech recognize input)
    --microphone                  (see: ai help speech recognize microphone)
    --file FILE                   (see: ai help speech recognize file)
    --files PATTERN               (see: ai help speech recognize files)
    --files @FILELIST.txt         (see: ai help speech recognize files)
    --format FORMAT               (see: ai help speech recognize format)

  RECOGNITION
    --once[+]                     (see: ai help speech recognize once)
    --continuous                  (see: ai help speech recognize continuous)
    --keyword FILENAME            (see: ai help speech recognize keyword)

  ADVANCED
    --log FILENAME                (see: ai help speech recognize log)
    --proxy HOSTNAME              (see: ai help speech recognize proxy)
    --phrases @PHRASELIST.txt     (see: ai help speech recognize phrases)
    --foreach in @ITEMS.txt       (see: ai help speech recognize foreach)
    --threads NUMBER              (see: ai help speech recognize threads)

SEE ALSO

  ai help speech setup
  ai help speech recognize advanced
  ai help speech recognize examples
  ai help find topics speech recognize

