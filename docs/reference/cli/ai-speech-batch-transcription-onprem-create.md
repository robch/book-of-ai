# `ai speech batch transcription onprem create`

### Batch Transcription OnPrem Create

The `ai speech batch transcription onprem create` command submits a new batch of audio files to be transcribed using the user-supplied on-premise speech container endpoints.

Endpoints should already have been configured using `ai speech batch transcription onprem endpoints`.

### Usage
``` bash
ai speech batch transcription onprem create [...]
```

### Options

| Option                          | Description                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `--files /file/path1;file/path2;...` OR `--files @FILES.txt`     | Specify the list of audio files to be transcribed.                                                       |
| `--language LANGUAGE`           | Specify the language of the audio files (e.g. en-US).                                                   |
| `--nbest NBEST`                 | How many transcript alternatives to return.                                                             |
| `--diarization DIARIZATION`     | Specify diarization options: `None`, `Identity`, `Anonymous`.                                           |
| `--resume RESUME`               | Specify whether to permit resume from previous failure: `true`, `false`.                                |
| `--combine COMBINE`             | Specify whether to combine output JSON files into a single output JSON: `true`, `false`.                |

### Examples

### Submit a new batch of audio files for transcription
``` bash title="Submit a new batch of audio files for transcription"
ai speech batch transcription onprem create --files /path/to/file1.wav;/path/to/file2.wav --language en-US --nbest 5 --diarization Identity --resume true --combine true
```

### Submit a batch of audio files listed in a file
``` bash title="Submit a batch of audio files listed in a file"
ai speech batch transcription onprem create --files @audio_files_list.txt --language en-US --nbest 3 --diarization Anonymous --resume false --combine false
```

### Related Content

- [Azure Cognitive Services Speech Service](https://docs.microsoft.com/azure/cognitive-services/speech-service/)
- [Running On-Premise Speech Containers](https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto)