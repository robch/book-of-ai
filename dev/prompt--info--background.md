## BACKGROUND

We're writing a set of documentation that we're calling "The Book of AI".  

The overall goal of all this documentation is to create tutorials, how-to's, explanations, and reference documentation for users to "get up and running" with Azure AI services.

To that end, we'll be creating docs that will:
* Demonstrate how to get started with Azure AI services.  
* Demonstrate how Azure AI can be used via the `ai` CLI.  
* Demonstrate how to create code for key scenarios using the `ai dev new ...` command.  

We will prioritize "greatness" and "ease of consumption" over our own convenience in writing or maintaining the documentation.

However, we're also trying to make the documentation highly componentized, so we can utilize AI to generate or modify the documentation.

## WHERE WE ARE

We're using `Material` for `mkdocs`, writing all our documentation using markdown files.  
- The `mkdocs.yml` files is in the repository root.  
- The `docs` directory contains all the top level markdown files.  
- The `snippets` directory contains all the text and code snippets (included via the `--8<--` syntax).  

**CURRENT STATE**:  
We've written about 14k lines of markdown in the `docs` and `snippets` directories.

To learn more, you can take a look at the `mkdocs.yml` file in the repository root.
