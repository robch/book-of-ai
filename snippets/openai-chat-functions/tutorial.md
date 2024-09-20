The `ai chat` `--built-in-functions` option enables CLI-provided "custom functions".

--8<-- "tips/tip-openai-prereqs.md"

### Access information

Often, you need to access information that is not available to the OpenAI model. For example, you might want to know the current date and time, perform mathematical calculations, or read/write files. With custom functions provided by the CLI, you can easily access this information.

``` bash title="Date and time"
ai chat --question "What time is it?" --built-in-functions
```

``` bash title="Math"
ai chat --question "What is 3.5 to the power of 9?" --built-in-functions
```

``` bash title="File input"
ai chat --question "What is in the README.md file?" --built-in-functions
```

### Perform actions

``` bash title="File output"
ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
```

--8<-- "generate-code-for-scenarios-button-section.md"
