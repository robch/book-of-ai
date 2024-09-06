AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CHAT ASSISTANT VECTOR-STORE UPDATE

  The ai chat assistant vector-store update command updates an OpenAI Assistant Vector Store.

USAGE: ai chat assistant vector-store udpate [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  FILES
    --file FILE
    --files FILE1 [...]

  VECTOR-STORE
    --id ID
    --name NAME

EXAMPLE

  ai chat assistant vector-store update --name "My Vector Store" --files "**/*.md"

SEE ALSO

  ai help chat assistant examples
  ai help chat assistant vector-store examples
  ai help find topics chat assistant vector-store

