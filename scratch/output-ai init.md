AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

INIT

  The ai init command allows interactive and non-interactive selection
  or creation of Azure AI Services resources.

  When an AI resource is selected or created using this command, the
  associated resource keys and region are retrieved and automatically
  stored in the local AI configuration datastore.

USAGE: ai init [...]

  AZURE
    --subscription SUBSCRIPTION   (see: ai help init subscription)

  INTERACTIVE
    --interactive BOOL            (see: ai help init interactive)

  RESOURCE
    --region region               (see: ai help init region)
    --group GROUP                 (see: ai help init group)
    --name NAME                   (see: ai help init name)

EXAMPLES

  EXAMPLE 1: interactively select or create an Azure AI resource

    ai init

  EXAMPLE 2: interactively select a resource matching a set of criteria

    ai init --name "ai-westus2" --region westus2

SEE ALSO

  ai help config
  ai help config hive
  ai help init advanced
  ai help init examples
  ai help find topics init

