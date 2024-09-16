## Your goal

Find missing options mentioned in the doc page that are not mentioned in the reference docs.

doc page: `{f}`
ref docs: `docs/reference/cli/**/*.md`

**Report the missing options in the doc page, in the following format:**

| Option | Example how used in doc page |
|--------|-------------|
| `--missing-option` | `ai <command> --missing-option ...` |

**If there are no missing options, output the following:**

No missing options found.

## Steps to achieve the goal

1. Find the options mentioned in the doc page.
2. Find the options mentioned in the reference docs (using the `docs/reference/cli/**/*.md` glob pattern and the function that can find text in files).
3. Compare the options found in steps 1 and 2.
4. Report the missing options in the format mentioned above.

## Do it now

Now, go ahead and do the task. Don't tell me about it, just do it.

Only output in the format mentioned above.
