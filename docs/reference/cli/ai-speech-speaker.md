# `ai speech speaker`

### Usage
``` bash
ai speech speaker [command]
```

### Options
| Option         | Description                                         |
| -------------- | --------------------------------------------------- |
| `--help`       | Show the help message and exit.                     |

### Sub-Commands
| Sub-Command                       | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| [identify](./ai-speech-speaker-identify.md) | Identify a speaker using the specified audio.     |
| [verify](./ai-speech-speaker-verify.md)     | Verify a speaker using the specified audio.       |
| [connection](./ai-speech-speaker-connection.md) | Manage speaker identification/verification connections. |

### Examples

``` bash title="Identify a speaker using specified audio"
ai speech speaker identify --audio-file /path/to/audio/file.wav
```

``` bash title="Verify a speaker using specified audio"
ai speech speaker verify --audio-file /path/to/audio/file.wav --profile-id your-profile-id
```

``` bash title="Manage speaker identification/verification connections"
ai speech speaker connection --operation list
```

---

This command supports managing speaker identification and verification processes using Azure AI Services. Specific commands allow you to identify and verify speakers using provided audio files, as well as manage connections for these operations.
