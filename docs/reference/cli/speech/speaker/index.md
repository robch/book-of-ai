# `ai speech speaker`

The `ai speech speaker` command manages identification/verification profiles, which are used in speaker recognition scenarios.

### Usage
``` bash
ai speech speaker [command]
```

### Sub-Commands
| Sub-Command                       | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| [identify](./identify.md) | Identify a speaker using the specified audio.     |
| [verify](./verify.md)     | Verify a speaker using the specified audio.       |

### Examples

``` bash title="Identify a speaker using specified audio"
ai speech speaker identify --audio-file /path/to/audio/file.wav
```

``` bash title="Verify a speaker using specified audio"
ai speech speaker verify --audio-file /path/to/audio/file.wav --profile-id your-profile-id
```
