AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CHAT ASSISTANT UPDATE

  The ai chat assistant update command updates an existing OpenAI Assistant.

USAGE: ai chat assistant update [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  ASSISTANT
    --name NAME
    --deployment DEPLOYMENT
    --instructions INSTRUCTIONS

  FILE SEARCH
    --file FILE
    --files FILE1 [...]
    --file-id ID
    --file-ids ID1 [...]
    --file-search TRUE/FALSE

  TOOLS
    --code-interpreter TRUE/FALSE

EXAMPLEs

  ai chat assistant update --instructions "You answer questions about C# code"
  ai chat assistant update --files "**/*.cs"

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

