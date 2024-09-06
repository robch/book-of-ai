{@prompt--info--background.md}

## The General Task

I want to compare a given new page of documentation with older documentation.

The older docs live here: `scratch/out-of-date-docs/`:

```
ai-chat.md
ai-config.md
ai-dev.md
ai-help.md
ai-init.md
ai-search.md
cli-get-started.md
cli-option-defaults.md
commands-summary.md
```

The older documentation is in a different style than the new documentation.  
I **DO NOT** care about the style/formatting of the older documentation.  

I **DO** very much care about the content differences.   

## The new documentation

For one page, is in a file named: `{file1}`

```markdown
{@{file1}}
```

## The task

1. Read the new documentation.
2. Read the older documentation.
3. Compare the two.
4. If there are things in the older documentation pertinent to the command this file is documenting, add them to the new documentation.
5. Save the new documentation in the same file as originally read from: `{file1}`.

**NOTES**:  
- We no longer support `ai chat run` and `ai chat evaluate` commands.
- Examples are under the `### Examples` heading and each example is "titled" with `bash title="Example title"`
- Each individual example **DOES NOT** get it's own `###` heading.
- Do not document these NOTES in the new documentation.

## Do it now

Do it now. Don't tell me what you're doing or did, just do it. 

Now, save the new documentation in `{file1}`.

