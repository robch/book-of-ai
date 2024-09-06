AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

TEST LIST

  The ai test list command lists CLI YAML tests.

USAGE: ai test list [...]

  FILES
    --file FILE
    --files FILE1 [FILE2 [...]]
    --files PATTERN1 [PATTERN2 [...]]

  TESTS
    --test TEXT
    --tests TEXT1 [TEXT2 [...]]

  FILTERING
    --contains TEXT1 [TEXT2 [...]]
    --remove TEXT1 [TEXT2 [...]]

EXAMPLES

  EXAMPLE 1: Lists all available tests

    ai test list

  EXAMPLE 2: Lists tests from files under current directory, that contain 'setup' or 'nightly', and 'java', but not 'skip'

    ai test list --tests setup nightly --contains java --remove skip

  EXAMPLE 3: Lists tests from files under 'tests' directory, that contain 'test3', but not 'skip'

    ai test list --files ../tests/**/*.yaml --contains test3 --remove skip

SEE ALSO

  ai help test examples
  ai help find topics test

