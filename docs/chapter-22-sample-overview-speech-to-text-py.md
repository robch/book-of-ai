---
hide:
- navigation
- toc
---
# Speech Recognition in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure Speech Service for speech-to-text recognition in Python.

[:material-file-code: main.py](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-py/main.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new speech-to-text --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text' in 'speech-to-text-py' (1 file)...

    main.py

    Generating 'speech-to-text' in 'speech-to-text-py' (1 file)... DONE!
    ```


## main.py

**STEP 1**: Import necessary modules and get configuration details:

``` python title="main.py"
from concurrent.futures import Future
from azure.cognitiveservices.speech import SpeechConfig, SpeechRecognizer, AudioConfig, CancellationReason
import threading
import os

# Connection and configuration details required
speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or "<insert your Speech Service API key here>"
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or "<insert your Speech Service region here>"
speech_language = "en-US"
```

**STEP 2**: Create instances of a speech config and audio config:

``` python title="main.py"
speech_config = SpeechConfig(subscription=speech_key, region=service_region, speech_recognition_language=speech_language)
audio_config = AudioConfig(use_default_microphone=True)
```

**STEP 3**: Create the speech recognizer from the above configuration information:

``` python title="main.py"
speech_recognizer = SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
```

**STEP 4**: Start speech recognition and handle the result:

``` python title="main.py"
# Start speech recognition, and return after a single utterance is recognized. The end of a
# single utterance is determined by listening for silence at the end or until a maximum of 15
# seconds of audio is processed.
print("Listening ...\n")
result = speech_recognizer.recognize_once()

# Check the result
if result.reason.name == "RecognizedSpeech" and result.text != "":
    print("RECOGNIZED: {}".format(result.text))
elif result.reason.name == "NoMatch":
    print("NOMATCH: Speech could not be recognized.")
elif result.reason.name == "Canceled":
    cancellation_details = result.cancellation_details
    print("CANCELED: Reason={}".format(cancellation_details.reason))
    if cancellation_details.reason == CancellationReason.Error:
        print("CANCELED: ErrorDetails={}".format(cancellation_details.error_details))
        print("CANCELED: Did you update the subscription info?")
```