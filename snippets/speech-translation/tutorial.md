The `ai speech translate` command allows you to translate speech from one language to another. You can translate speech from a microphone or a file, and output subtitles in SRT format.

--8<-- "tips/tip-speech-prereqs.md"

### Translate Speech

```bash title="Translate from microphone"
ai speech translate --microphone --source en-US --target es-ES
```

```bash title="Translate from file"
ai speech translate --file hello-world.wav --source en-US --target es-ES
```

```bash title="Translate to multiple languages"
ai speech translate --file hello-world.wav --source en-US --targets es-ES;fr-FR;zh-CN
```

### Output Subtitles

```bash title="Output SRT subtitles"
ai speech translate --file hello-world.wav --source en-US --target es-ES --output-srt-file captions.srt
```

--8<-- "generate-code-for-scenarios-button-section.md"
