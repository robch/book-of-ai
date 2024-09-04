The `ai speech recognize` `--keyword` option allows you to recognize speech with keyword spotting. You can recognize speech from a microphone or a file, and output the recognized text.

--8<-- "tips/tip-speech-prereqs.md"

### Recognize Speech with Keyword Spotting

```bash title="Interactive recognition with keyword spotting"
ai speech recognize --interactive --keyword keyword.table
```

```bash title="Recognize speech from an audio file with keyword spotting"
ai speech recognize --file hello-world.wav --keyword keyword.table
```

??? tip "If you don't have a custom keyword file..."

    [Custom Keyword Portal](https://speech.microsoft.com/portal/customkeyword)  
    Create your custom keyword `.table` file.

    [Custom Keyword Docs](https://learn.microsoft.com/azure/ai-services/speech-service/custom-keyword-basics)  
    Learn more about creating custom keywords.  
