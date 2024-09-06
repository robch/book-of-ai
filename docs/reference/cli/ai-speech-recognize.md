# `ai speech recognize`

The `ai speech recognize` command recognizes streaming audio captured from a device microphone or stored in local or remote audio files.

### Usage

```
ai speech recognize [...]
```

### Options

| Option                      | Description                                          |
|-----------------------------|------------------------------------------------------|
| `--key KEY`                 | API key for the Azure Speech service resource.       |
| `--region REGION`           | Azure region where the service resource is deployed. |
| `--language LANGUAGE`       | The language to use for speech recognition.          |
| `--languages LANG1;LANG2...`| Semicolon-separated list of languages for recognition. |
| `--microphone`              | Use device microphone for audio input.               |
| `--file FILE`               | Recognize speech from a local audio file.            |
| `--files PATTERN`           | Recognize speech from multiple local audio files matching pattern. |
| `--files @FILELIST.txt`     | Recognize speech from a list of local audio files.   |
| `--format FORMAT`           | Specify audio format.                               |
| `--once[+]`                 | Perform single-turn speech recognition (set flag with `+`). |
| `--continuous`              | Perform continuous speech recognition.              |
| `--keyword FILENAME`        | Specify a file containing a keyword for recognition. |
| `--log FILENAME`            | Save recognition log to a file.                     |
| `--proxy HOSTNAME`          | Use a proxy server for the recognition service.     |
| `--phrases @PHRASELIST.txt` | Use a list of custom phrases to improve recognition accuracy. |
| `--foreach in @ITEMS.txt`   | Recognize speech for each audio input listed in the provided file. |
| `--threads NUMBER`          | Specify the number of threads to use for processing. |

### Examples

``` bash title="Recognize speech from a local audio file"
ai speech recognize --file myaudio.wav --key myapikey --region westus
```

``` bash title="Perform continuous speech recognition using a microphone"
ai speech recognize --microphone --continuous --key myapikey --region westus
```

``` bash title="Recognize speech from multiple local audio files"
ai speech recognize --files "*.wav" --key myapikey --region westus
```

``` bash title="Recognize speech with custom phrases to improve accuracy"
ai speech recognize --file myaudio.wav --key myapikey --region westus --phrases @phrases.txt
```

This documentation provides an overview of how to use the `ai speech recognize` command along with various options to configure speech recognition.
