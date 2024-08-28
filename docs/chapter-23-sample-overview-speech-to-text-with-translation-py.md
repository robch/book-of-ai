---
hide:
- navigation
- toc
---
# Speech Translation with Python

This sample demonstrates how to use the Azure Cognitive Services Speech SDK to perform speech-to-text translation in a Python console application.

[:material-file-code: main.py](./samples/speech-to-text-with-translation-py/main.py)  
[:material-file-code: requirements.txt](./samples/speech-to-text-with-translation-py/requirements.txt)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new speech-to-text-with-translation --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text-with-translation' in 'speech-to-text-with-translation-py' (3 files)...

    main.py
    requirements.txt

    Generating 'speech-to-text-with-translation' in 'speech-to-text-with-translation-py' (3 files)... DONE!
    ```


## main.py

**STEP 1**: Import necessary libraries and set up configuration:

``` python title="main.py"
from concurrent.futures import Future
from azure.cognitiveservices.speech.translation import SpeechTranslationConfig, TranslationRecognizer, ResultReason
from azure.cognitiveservices.speech import AudioConfig, CancellationReason
import threading
import os
import sys

speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or "<insert your Speech Service API key here>"
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or "<insert your Speech Service region here>"
speech_language = "en-US"
target_languages = ['de', 'fr']
input_file = sys.argv[1] if len(sys.argv) == 2 else None

if input_file is not None and not os.path.exists(input_file):
    print("ERROR: Cannot find audio input file: {}".format(input_file))
    sys.exit(1)
```

**STEP 2**: Create instances of a speech translation config and audio config:

``` python title="main.py"
speech_config = SpeechTranslationConfig(subscription=speech_key, region=service_region)
audio_config = AudioConfig(filename=input_file) if input_file is not None else AudioConfig(use_default_microphone=True)

speech_config.speech_recognition_language = speech_language
for target_language in target_languages:
    speech_config.add_target_language(target_language)

speech_recognizer = TranslationRecognizer(translation_config=speech_config, audio_config=audio_config)
```

**STEP 3**: Subscribe to Recognizing and Recognized events to process intermediate and final results:

``` python title="main.py"
def recognizing(args):
    print("RECOGNIZING: {}".format(args.result.text))
    for lang in args.result.translations.keys():
        print("TRANSLATING into '{}': {}".format(lang, args.result.translations[lang]))
    print()

def recognized(args):
    if args.result.reason == ResultReason.TranslatedSpeech and args.result.text:
        print("RECOGNIZED: {}".format(args.result.text))
        for lang in args.result.translations.keys():
            print("TRANSLATED into '{}': {}".format(lang, args.result.translations[lang]))
        print()
    elif args.result.reason == ResultReason.RecognizedSpeech and args.result.text:
        print("RECOGNIZED: {} (text could not be translated)".format(args.result.text))
    elif args.result.reason == ResultReason.NoMatch:
        print("NOMATCH: Speech could not be recognized.\n")

speech_recognizer.recognizing.connect(recognizing)
speech_recognizer.recognized.connect(recognized)
```

**STEP 4**: Handle session start/stop and cancellation events:

``` python title="main.py"
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

**STEP 5**: Start continuous recognition and wait for ENTER to stop:

``` python title="main.py"
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

The `requirements.txt` file specifies the required packages for this sample:

``` text title="requirements.txt"
azure-cognitiveservices-speech>=1.35.0
```