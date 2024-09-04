The `ai speech synthesize` command allows you to synthesize speech from text. You can synthesize speech with different voices, formats, and audio outputs.

--8<-- "tips/tip-speech-prereqs.md"

### Synthesize speech from text

``` bash title="Interactive mode"
ai speech synthesize --interactive
```

``` bash title="Synthesize text"
ai speech synthesize --text "Hello, world!"
```

``` bash title="Synthesize text with audio output"
ai speech synthesize --text "Hello, world!" --audio-output hello-world.wav
```

``` bash title="Synthesize text with specific format"
ai speech synthesize --text "Hello, world!" --audio-output hello-world.mp3 --format mp3
```

### List available voices

``` bash title="List voices"
ai speech synthesize --voices
```

### Synthesize speech with a specific voice

``` bash title="Synthesize with specific voice"
ai speech synthesize --text "Hello, world!" --voice en-US-AriaNeural
```
