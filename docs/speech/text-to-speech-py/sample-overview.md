---
hide:
- navigation
- toc
---
# Azure Speech Synthesis in Python

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use Azure Speech Synthesis in a Python application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-py/main.py)  
[:material-file-code: requirements.txt](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-py/requirements.txt)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new text-to-speech --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'text-to-speech' in 'text-to-speech-py' (2 files)...

    main.py
    requirements.txt

    Generating 'text-to-speech' in 'text-to-speech-py' (2 files)... DONE!
    ```

## main.py

**STEP 1**: Import necessary modules and retrieve configuration from environment variables.

``` python title="main.py"
from azure.cognitiveservices.speech import SpeechConfig, SpeechSynthesizer, SpeechSynthesisResult, SpeechSynthesisCancellationDetails, CancellationReason, ResultReason
from azure.cognitiveservices.speech.audio import AudioOutputConfig
import os

speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or "<insert your Speech Service API key here>"
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or "<insert your Speech Service region here>"
voice_name = 'en-US-AndrewNeural'
```

**STEP 2**: Create instances of a speech config and audio config, and set the voice name to use.

``` python title="main.py"
speech_config = SpeechConfig(subscription=speech_key, region=service_region)
speech_config.speech_synthesis_voice_name = voice_name
audio_config = AudioOutputConfig(use_default_speaker=True)
```

**STEP 3**: Create the speech synthesizer from the above configuration information.

``` python title="main.py"
speech_synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
```

**STEP 4**: Get text from the user to synthesize.

``` python title="main.py"
text = input('Enter text: ')
```

**STEP 5**: Start speech synthesis, and return after it has completed.

``` python title="main.py"
result = speech_synthesizer.speak_text_async(text).get()
```

**STEP 6**: Check the result.

``` python title="main.py"
if result.reason == ResultReason.SynthesizingAudioCompleted:
    print('SYNTHESIZED: {} byte(s)'.format(len(result.audio_data)))
elif result.reason == ResultReason.Canceled:
    cancellation_details = result.cancellation_details
    print('CANCELED: Reason={}'.format(cancellation_details.reason))
    if cancellation_details.reason == CancellationReason.Error:
        print('CANCELED: ErrorDetails={}'.format(cancellation_details.error_details))
        print('CANCELED: Did you update the subscription info?')
```
