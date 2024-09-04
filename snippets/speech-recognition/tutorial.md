The `ai speech recognize` command allows you to recognize speech from audio. You can recognize speech from a microphone or a file, and output subtitles in SRT or VTT format.

--8<-- "tips/tip-speech-prereqs.md"

### Recognize speech from audio

```bash title="From microphone"
ai speech recognize --microphone
```

```bash title="From WAV file"
ai speech recognize --file hello-world.wav
```

```bash title="From MP3 file"
ai speech recognize --file hello-world.mp3 --format mp3
```

### Recognize speech with a specific language

```bash title="From microphone in Spanish"
ai speech recognize --microphone --language es-ES
```

```bash title="From WAV file in multiple languages"
ai speech recognize --file hello-world.wav --languages es-ES;fr-FR
```

### Output subtitles

```bash title="Output SRT subtitles"
ai speech recognize --file hello-world.wav --output-srt-file captions.srt
```

```bash title="Output VTT subtitles"
ai speech recognize --file hello-world.wav --output-vtt-file captions.vtt
```