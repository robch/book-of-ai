The `ai` CLI allows you to extend OpenAI's models with custom functions (e.g. dates, times, math, filesystem).

--8<-- "tips/tip-openai-prereqs.md"

### Create an Assistant

```bash title="Create an assistant"
ai chat assistant create --name MyFunctionAssistant
```

### Use the Assistant with Built-in Function Calling

```bash title="Ask the assistant the current time"
ai chat --user "What time is it?" --built-in-functions
```

```bash title="Calculate a power"
ai chat --user "What is 3.5 to the power of 9?" --built-in-functions
```

```bash title="Read a file"
ai chat --user "What is in the README.md file?" --built-in-functions
```

```bash title="Save content to a file"
ai chat --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
```

### Delete the Assistant

```bash title="Delete the assistant"
ai chat assistant delete
ai config --clear assistant.id
```
