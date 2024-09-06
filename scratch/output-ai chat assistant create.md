AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CHAT ASSISTANT CREATE

  The ai chat assistant create command creates a new OpenAI Assistant.

USAGE: ai chat assistant create [...]

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

  OUTPUT
    --output-id @@FILE
    --output-name @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLEs

  ai chat assistant create --name "My Assistant" --instructions "You are a helpful Assistant."
  ai chat assistant create --name "My Assistant 2" --instructions "You are a helpful Assistant." --files "**/*.md"

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

