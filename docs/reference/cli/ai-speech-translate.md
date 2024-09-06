# `ai speech translate`

The `ai speech translate` command translates streaming audio captured from a device microphone or stored in local or remote audio files into one or more languages.

### Usage

``` bash title="Usage: ai speech translate [...]"
ai speech translate [...]
```

### Options

### Connection

| Option | Description |
| --- | --- |
| `--key` | The subscription key for the Azure Speech service. |
| `--region` | The region where your Azure Speech service is deployed. |

### Language

| Option | Description |
| --- | --- |
| `--source` | The source language of the audio. |
| `--target` | The target language for translation. |

### Input

| Option | Description |
| --- | --- |
| `--microphone` | Capture audio from the device microphone. |
| `--file` | Translate audio from a local file. |
| `--files` | Translate audio from multiple local files matching a pattern or listed in a file. |
| `--format` | The format of the input audio files. |

### Translation

| Option | Description |
| --- | --- |
| `--once` | Perform a single translation. |
| `--continuous` | Perform continuous translation. |
| `--keyword` | Specify a keyword to start the translation. |

### Advanced

| Option | Description |
| --- | --- |
| `--log` | Specify a filename to log the translation. |
| `--proxy` | Specify a proxy hostname. |
| `--phrases` | Specify a file containing phrases to improve translation accuracy. |
| `--foreach` | Perform translation for each item in a specified file. |
| `--threads` | Number of threads to use for the translation. |

### Examples

### Translate audio from the microphone

``` bash title="Translate audio from the microphone"
ai speech translate --microphone --source en-US --target es-ES --key YOUR_KEY --region YOUR_REGION
```

### Translate audio from a file

``` bash title="Translate audio from a file"
ai speech translate --file audio.wav --source en-US --target fr-FR --key YOUR_KEY --region YOUR_REGION
```

### Continuous translation from the microphone

``` bash title="Continuous translation from the microphone"
ai speech translate --microphone --source en-US --target de-DE --continuous --key YOUR_KEY --region YOUR_REGION
```
