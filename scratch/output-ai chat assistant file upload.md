AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CHAT ASSISTANT FILE UPLOAD

  The ai chat assistant file upload command uploads a new OpenAI Assistant file.

USAGE: ai chat assistant file upload [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  UPLOAD
    --file FILE
    --files FILE1 [...]

  OUTPUT
    --output-id @@FILE
    --output-name @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLE

  ai chat assistant file upload --file README.md
  ai chat assistant file upload --files **\*.md

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

