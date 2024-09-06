AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CONFIG

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

USAGE: ai config [HIVE] [COMMAND] [@FILE] [...]

  --set [NAME=]VALUE            (see: ai help config set)
  --clear NAME                  (see: ai help config clear)

EXAMPLES

  ai config @key
  ai config --set key 436172626F6E20697320636F6F6C2121
  ai config --set region westus2

SEE ALSO

  ai help init
  ai help config advanced
  ai help config examples
  ai help find topics config

