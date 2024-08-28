---
hide:
- navigation
- toc
---
# Speech-to-Text Continuous Recognition in Python

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure Cognitive Services Speech SDK for continuous speech recognition in a Python console application.

[:material-file-code: main.py](./samples/speech-to-text-continuous-reco-py/main.py)  

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new speech-to-text-continuous-reco --python
    ```

    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text-continuous-reco' in 'speech-to-text-continuous-reco-py' (2 files)...

    main.py
    requirements.txt

    Generating 'speech-to-text-continuous-reco' in 'speech-to-text-continuous-reco-py' (2 files)... DONE!
    ```

## main.py

**STEP 1**: Import necessary modules and set up configuration:

```python title="main.py"
from concurrent.futures import Future
from azure.cognitiveservices.speech import SpeechConfig, SpeechRecognizer, AudioConfig, CancellationReason
import threading
import os

# Connection and configuration details required
speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or "<insert your Speech Service API key here>"
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or "<insert your Speech Service region here>"
speech_language = "en-US"
```

**STEP 2**: Create instances of speech config and audio config:

```python title="main.py"
speech_config = SpeechConfig(subscription=speech_key, region=service_region, speech_recognition_language=speech_language)
audio_config = AudioConfig(use_default_microphone=True)
```

**STEP 3**: Create the speech recognizer and set up event handlers:

```python title="main.py"
speech_recognizer = SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

def recognizing(args):
    print("RECOGNIZING: {}".format(args.result.text))

def recognized(args):
    if args.result.reason.name == "RecognizedSpeech" and args.result.text != "":
        print("RECOGNIZED: {}\n".format(args.result.text))
    elif args.result.reason.name == "NoMatch":
        print("NOMATCH: Speech could not be recognized.\n")

speech_recognizer.recognizing.connect(recognizing)
speech_recognizer.recognized.connect(recognized)
```

**STEP 4**: Handle session events and cancellation:

```python title="main.py"
session_stopped_no_error = Future()

def session_started(args):
    print("SESSION STARTED: {}\n".format(args.session_id))

def session_stopped(args):
    print("SESSION STOPPED: {}".format(args.session_id))
    session_stopped_no_error.set_result(True)

speech_recognizer.session_started.connect(session_started)
speech_recognizer.session_stopped.connect(session_stopped)

def canceled(args):
    print("CANCELED: Reason={}".format(args.cancellation_details.reason))

    if args.cancellation_details.reason == CancellationReason.EndOfStream:
        print("CANCELED: End of the audio stream was reached.")
    elif args.cancellation_details.reason == CancellationReason.Error:
        print("CANCELED: ErrorDetails={}".format(args.cancellation_details.error_details))
        print("CANCELED: Did you update the subscription info?")

    session_stopped_no_error.set_result(args.cancellation_details.reason != CancellationReason.Error)

speech_recognizer.canceled.connect(canceled)
```

**STEP 5**: Start continuous recognition and wait for user input to stop:

```python title="main.py"
threading.Thread(target=lambda: (
    input(""),
    speech_recognizer.stop_continuous_recognition())
).start()

speech_recognizer.start_continuous_recognition()
print("Listening, press ENTER to stop...")

exit_code = 0 if session_stopped_no_error.result() == True else 1
os._exit(exit_code)
```

## requirements.txt

```text title="requirements.txt"
azure-cognitiveservices-speech>=1.35.0
```