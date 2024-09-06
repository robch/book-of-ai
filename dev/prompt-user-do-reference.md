## background

We're writing documentation (in mkdocs material format, which is a derivative of markdown) that we're calling "The Book of AI".  

The overall goal of all this documentation is to create a "tutorial" for the `ai` CLI, that:  
* Shows how to use various `ai ...` commands  
* Demonstrates how Azure AI can be used via the `ai` CLI  
* Demonstrates how to create code for key scenarios using the `ai dev new ...` command  
* Provides reference documentation for the `ai` CLI commands

The `mkdocs.yml` files is in the parent directory (e.g. `../mkdocs.yml`).  

## your task

Your task is to create reference documentation for the `ai` CLI commands.

Specifically, you'll be documenting the `{doc_command}` command.

Please locate and read relevant existing documentation for the `{doc_command}` command, using the functions provided to find appropriate markdown files to learn from. 
- Look in scratch\out-of-date-docs\**\*.md for docs written earlier this year.
- We no longer support `ai chat run` or `ai chat evaluate` anymore. 
- Look in scratch\*output*.md for outputs from the tool invocation without parameters for high level understanding.
- Search existing uploaded documents for relevant information.

Tasks to perform:
1. Understand the `--help` output for the `{doc_command}` command:

```plaintext
{@scratch/output-{doc_command}.md}
```

2. Find additional information in the `scratch` directory using the functions provided.
3. Read that information to understand the `{doc_command}` command using the functions provided.
4. Find additional information in the uploaded documents, if any
5. Analyze all that you've learned.
6. Craft a markdown file in the `docs/reference/cli/` directory for the `{doc_command}` command.
7. The format of that markdown file should closely resemble the output from the `--help` command.
8. Do not include any `(see: ai help ...)` references from that command's help output.

**Formatting notes**:  
- Use `###` for headers
- Use markdown tables to list all options/arguments (option in first column; description in second column)
- Use markdown tables for sub-commands (sub-command in first column; description in second column)
- Link the sub-commands to their respective markdown files in the `docs/reference/cli/` directory
- options/arguments come first, followed by sub-commands
- usage should be before options/sub-commands, following similar formatting as in command help output
- Examples should be after options/sub-commands
- Examples should be in bash code blocks with a title describing what the example does
- If there are examples, be sure and put them in bash code blocks.
- Don't use "headers" for the example code block, if a title can suffice (which it usually can)
- Don't forget to use `title=...` for bash code blocks to describe what the example does, it goes on the same line as the tripple backticks, like this:

    ``` bash title="This is a title"
    ai chat --question "blah blah blah"
    ```


**Final notes**:  
* Put the new markdown file(s) in the `docs/reference/cli/` directory.
* Name the file(s) `{doc_command}.md` with dashes for spaces (e.g. `ai-dev-new.md`).
* Put additional information in the markdown file as needed.

## DO IT!
Write the reference documentation for the `{doc_command}` command using the information you've gathered using the functions provided. 

You **MUST** save your new markdown file in the `docs/reference/cli/` directory with the name `{doc_command}.md` with dashes for spaces (e.g. `ai-dev-new.md`).

Now, do your work; don't tell me what you're going to do, just do it.

