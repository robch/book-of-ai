AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

-----------
ai help dev
-----------
   ___  _____   ___  _____   __
  / _ |/_  _/  / _ \/ __/ | / /
 / __ |_/ /_  / // / _/ | |/ /
/_/ |_/____/ /____/___/ |___/
   
USAGE: ai dev <command> [...]

COMMANDS

  ai dev new [...]            (see: ai help dev new)
  ai dev shell [...]          (see: ai help dev shell)

ADDITIONAL TOPICS

  ai help dev examples
  ai help find topics dev

---------------
ai help dev new
---------------
DEV NEW

  The ai dev new command creates or lists available templates.

USAGE: ai dev new TEMPLATE_NAME
   OR: ai dev new list [...]

EXAMPLES

  EXAMPLE 1: List available templates

    ai dev new list

  EXAMPLE 2: Create an .env file containing Azure AI service settings

    ai dev new .env
  
  EXAMPLE 3: Create a new "helper functions" project

    ai dev new helper-functions

SEE ALSO

  ai help chat custom helper function examples
  ai help dev examples
  ai help find topics dev

-----------------
ai help dev shell
-----------------
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


