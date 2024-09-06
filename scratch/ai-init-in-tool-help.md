AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

------------
ai help init
------------
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

---------------------
ai help init advanced
---------------------
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
    --region REGION               (see: ai help init region)
    --group GROUP                 (see: ai help init group)
    --name NAME                   (see: ai help init name)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help init threads)
    --processes NUMBER            (see: ai help init processes)
    --repeat NUMBER
    --max NUMBER

  ADVANCED
    --foreach in @ITEMS.txt       (see: ai help init foreach)
    --save FILENAME               (see: ai help init save)
    --zip ZIPFILE                 (see: ai help init zip)

SEE ALSO

  ai help config
  ai help config hive
  ai help init examples
  ai help find topics init

---------------------
ai help init examples
---------------------
INIT EXAMPLES

  EXAMPLE 1: interactively select or create an Azure AI resource

    ai init

  EXAMPLE 2: interactively select a resource matching a set of criteria

    ai init --name "ai-westus2" --region westus2

  EXAMPLE 3: non-interactively select or create a resource by specifying all parameters

    ai init --interactive false --subscription "Pay-As-You-Go" --region westus2 --group "ai-westus2-436172626F6E"

SEE ALSO

  ai help init
  ai help init advanced


