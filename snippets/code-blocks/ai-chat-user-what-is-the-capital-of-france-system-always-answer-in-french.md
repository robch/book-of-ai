--8<-- "code-blocks/ai-chat-user-what-is-the-capital-of-france-system-always-answer-in-french.md"
``` { .bash .cli-command title="System prompts are special instructions for the model" }
ai chat --user "What is the capital of France." --system "Always answer in French."
```

``` { .plaintext .cli-output hl_lines="6" }
AI - Azure AI CLI, Version 1.0.0
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

user@CHAT: What is the capital of France.

assistant: La capitale de la France est Paris.
```
