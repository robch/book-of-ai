AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

DEV SHELL

  The ai dev shell command creates a fast path to providing configuration
  data (keys, endpoints, etc.) to a new shell (e.g. cmd.exe or /bin/bash)
  or to a specified command to run via environment variables.

USAGE: ai dev shell --run COMMAND

EXAMPLES

  EXAMPLE 1: Opens a new shell populated with environment variables.

    ai dev shell

  EXAMPLE 2: Runs a specific program with it's environment populated

    ai dev shell --run "python myApp.py"

SEE ALSO

  ai help dev examples
  ai help find topics dev

