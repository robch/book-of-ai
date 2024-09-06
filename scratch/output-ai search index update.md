AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

SEARCH INDEX UPDATE

  The ai search index update command updates a vector index.

USAGE: ai index update [...]

  AZURE AI
    --subscription SUBSCRIPTION             (see: ai help search subscription)
    --project PROJECT                       (see: ai help search project)
    --group group                           (see: ai help search group)

  AZURE SEARCH
    --index-name NAME                       (see: ai help search index name)
    --index-kind KIND                       (see: ai help search index kind)
    --search-api-key KEY                    (see: ai help search api key)
    --search-endpoint ENDPOINT              (see: ai help search endpoint)

  AZURE SEARCH DATA SOURCE
    --data-source-connection NAME           (see: ai help search data source connection)
    --blob-container ENDPOINT/NAME          (see: ai help search data source blob container)
    --indexer-name NAME                     (see: ai help search indexer name)
    --skillset-name NAME                    (see: ai help search skillset name)
    --id-field NAME                         (see: ai help search id field name)
    --content-field NAME                    (see: ai help search content field name)
    --vector-field NAME                     (see: ai help search vector field name)

  OPENAI EMBEDDINGS
    --embedding-deployment DEPLOYMENT       (see: ai help search embedding deployment)
    --embedding-model MODEL                 (see: ai help search embedding model)

  DATA
    --file FILE                             (see: ai help search index file)
    --files FILEs                           (see: ai help search index files)
    --external-source                       (see: ai help search index external source)

EXAMPLE

  ai search index update --index-name product-info --files "*.md" --blob-container https://crbn.blob.core.windows.net/product-info

SEE ALSO

  ai help search index examples
  ai help find topics search index

