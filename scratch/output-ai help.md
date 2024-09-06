AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

   ___  _____   __ __ ___ _   ___ 
  / _ |/_  _/  / // / __/ /  / _ \
 / __ |_/ /_  / _  / _// /__/ ___/
/_/ |_/____/ /_//_/___/____/_/   


AI HELP

  Interactively browse and explore commands, options, and examples. 

    - ↑↓ and <TAB> to move around.
    - <ENTER> to follow a link.
    - <ESC> to exit or go back.

  To get started with ai: 
  
    TRY: ai init

USAGE: ai <command> [...]

HELP

  ai help
  ai help init

COMMANDS

  ai init [...]             (see: ai help init)
  ai config [...]           (see: ai help config)

  ai dev [...]              (see: ai help dev)
  ai test [...]             (see: ai help test)

  ai chat [...]             (see: ai help chat)

  ai search [...]           (see: ai help search)
  ai speech [...]           (see: ai help speech)

EXAMPLES

  ai init
  ai chat --interactive --system @prompt.txt

  ai search index update --name MyIndex --files *.md
  ai chat --interactive --system @prompt.txt --index-name MyIndex

ADDITIONAL HELP

  ai help examples

  ai help find "prompt"
  ai help find "prompt" --expand

  ai help find topics "examples"
  ai help list topics

  ai help documentation

