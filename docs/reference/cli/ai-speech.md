# `ai speech`

### Usage
``` bash
ai speech <command> [...]
```

### Sub-Commands

| Sub-Command                             | Description                                                      |
| --------------------------------------- | ---------------------------------------------------------------- |
| [ai speech recognize](ai-speech-recognize.md)       | Recognize speech from an input source.                             |
| [ai speech synthesize](ai-speech-synthesize.md)     | Synthesize speech from text.                                      |
| [ai speech intent](ai-speech-intent.md)             | Recognize intent from speech.                                     |
| [ai speech translate](ai-speech-translate.md)       | Translate speech from one language to another.                    |
| [ai speech batch](ai-speech-batch.md)               | Manage Azure Speech Service batch operations.                     |
| [ai speech csr](ai-speech-csr.md)                   | Manage Custom Speech Recognition endpoints and datasets.          |
| [ai speech profile](ai-speech-profile.md)           | Manage speech profiles for speaker recognition.                   |
| [ai speech speaker](ai-speech-speaker.md)           | Manage speaker identification and verification.                   |

### Examples

### Recognize speech from an audio file
``` bash title="Recognize speech from an audio file"
ai speech recognize --file audio.wav
```

### Synthesize speech from text
``` bash title="Synthesize speech from text"
ai speech synthesize --text "Hello, world!" --output audio.mp3
```

### Translate speech from one language to another
``` bash title="Translate speech from one language to another"
ai speech translate --input-language en-US --output-language es-ES --file input.wav
```

### Create a batch transcription for an audio file
``` bash title="Create a batch transcription for an audio file"
ai speech batch transcription create --name "Example 1" --content https://crbn.us/hello.wav
```

### Create and initialize a speech profile
``` bash title="Create and initialize a speech profile"
ai speech profile create --name "MyProfile"
```

### Identify a speaker from an audio file
``` bash title="Identify a speaker from an audio file"
ai speech speaker identify --profile-id myProfileId --file speaker.wav
```

---

This file should be saved as `docs/reference/cli/ai-speech.md`. The sub-command files referenced should also be created with relevant details in the `docs/reference/cli/` directory.