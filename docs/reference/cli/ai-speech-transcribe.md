# `ai speech transcribe`

Transcribe audio files using Azure speech services.

### Usage

``` bash
ai speech transcribe [options]
```

### Options

| Option | Description |
|--------|-------------|
| `--input` | Path to the input audio file. |
| `--locale` | Locale of the input audio (e.g., en-US). |
| `--output` | Path to save the transcription result. |

### Examples

``` bash title="Transcribe an audio file"
ai speech transcribe --input audiofile.wav --locale en-US --output transcription.txt
```
