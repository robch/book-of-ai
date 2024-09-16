# `ai speech synthesize`

The `ai speech synthesize` command synthesizes audio from text or SSML and renders it to the local device's speakers or writes it into local audio files.

### Usage

``` bash
ai speech synthesize [...]
```

### Options

| Option                     | Description                                           |
|----------------------------|-------------------------------------------------------|
| `--key KEY`                  | Specifies the API key for authentication.             |
| `--region REGION`            | Specifies the region of the service.                  |
| `--voice NAME`               | Specifies the name of the voice to use.               |
| `--voices`                   | Lists available voices.                               |
| `--interactive`              | Enables interactive mode for input.                   |
| `--text TEXT`                | Specifies the text to synthesize.                     |
| `--ssml SSML`                | Specifies the SSML content to synthesize.             |
| `--file FILE`                | Specifies a file containing text or SSML to synthesize.|
| `--files PATTERN`            | Specifies a pattern to match multiple files to synthesize.|
| `--files @FILELIST.txt`      | Specifies a file containing a list of files to synthesize.|
| `--format FORMAT`            | Specifies the audio format for the output.            |
| `--speakers`                 | Renders the synthesized audio to the local speakers.  |
| `--audio-output FILENAME`    | Specifies the file to write the audio output to.      |
| `--log FILENAME`             | Specifies a file to log the synthesis process.        |
| `--proxy HOSTNAME`           | Specifies a proxy to use for the request.             |
| `--foreach in @ITEMS.txt`    | Executes the command for each item listed in a file.  |
| `--threads NUMBER`           | Specifies the number of threads to use for synthesis. |

### Examples

``` bash title="Synthesize text to speakers"
ai speech synthesize --text "Hello world" --speakers
```

``` bash title="Synthesize text to an audio file"
ai speech synthesize --text "Hello world" --audio-output output hello_world.wav
```
