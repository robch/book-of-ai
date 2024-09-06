# `ai speech`

### Usage
``` bash
ai speech <command> [...]
```

### Sub-Commands

| Sub-Command                                       | Description                                              |
| ------------------------------------------------- | -------------------------------------------------------- |
| [ai speech intent](./intent.md)                   | Recognize intent from speech.                            |
| [ai speech recognize](./recognize.md)             | Recognize speech from an input source.                   |
| [ai speech synthesize](./synthesize.md)           | Synthesize speech from text.                             |
| [ai speech transcribe](./transcribe.md)           | Transcribe speech from an input source.                  |
| [ai speech translate](./translate.md)             | Translate speech from one language to another.           |
| [ai speech batch](./batch/index.md)               | Manage Azure Speech Service batch operations.            |
| [ai speech csr](./csr/index.md)                   | Manage Custom Speech Recognition endpoints and datasets. |
| [ai speech profile](./profile/index.md)           | Manage speech profiles for speaker recognition.          |
| [ai speech speaker](./speaker/index.md)           | Manage speaker identification and verification.          |

### Examples

``` bash title="Recognize speech from an audio file"
ai speech recognize --file audio.wav
```

``` bash title="Synthesize speech from text"
ai speech synthesize --text "Hello, world!" --output audio.wav
```

``` bash title="Translate speech from one language to another"
ai speech translate --input-language en-US --output-language es-ES --file audio.wav
```
