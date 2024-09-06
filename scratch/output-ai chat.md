AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

CHAT

  The ai chat command initiates interactive or non-interactive conversations
  with an AI language model (e.g. OpenAI's GPT4).

USAGE: ai chat [...]
   OR: ai chat <sub-command> [...]

  CONNECTION                            (see: ai help connection)
    --deployment DEPLOYMENT             (see: ai help chat deployment)
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  INPUT                                 (see: ai help chat input)
    --interactive                       (see: ai help chat interactive)
    --system PROMPT                     (see: ai help chat system prompt)
    --user MESSAGE                      (see: ai help chat user message)
    --chat-history FILE                 (see: ai help chat history)

  CHAT WITH ASSISTANT
    --assistant-id ID                   (see: ai help chat assistant id)
    --thread-id ID                      (see: ai help chat thread id)

  CHAT WITH DATA                        (see: ai help chat with data)
    --index-name INDEX                  (see: ai help index name)
    --search-endpoint ENDPOINT          (see: ai help search endpoint)
    --search-api-key KEY                (see: ai help search key)

  HELPER FUNCTIONS                      (see: ai help chat helper functions)
    --built-in-functions TRUE           (see: ai help chat built-in helper functions)
    --custom-functions PATTERN          (see: ai help chat custom helper functions)

  OPTIONS                               (see: ai help chat options)
    --temperature TEMPERATURE           (see: ai help chat options temperature)
    --max-tokens MAX_TOKENS             (see: ai help chat options max-tokens)
    --top-p TOP_P                       (see: ai help chat options top-p)
    --n N                               (see: ai help chat options n)

  SUB-COMMANDS
    ai chat assistant [...]             (see: ai help chat assistant)

EXAMPLEs

  ai init openai
  ai chat --interactive
  ai chat --user "What can you do?"

SEE ALSO

  ai help chat examples
  ai help find topics chat

