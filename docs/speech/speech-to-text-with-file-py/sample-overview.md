---
hide:
- toc
---
# Speech to Text with File in Python

This sample demonstrates how to use Azure Cognitive Services to perform speech recognition on an audio file in a Python application.

[:material-file-code: main.py](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/speech-to-text-with-file-py/main.py)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new speech-to-text-with-file --python
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text-with-file' in 'speech-to-text-with-file-py' (2 files)...

    main.py
    requirements.txt

    Generating 'speech-to-text-with-file' in 'speech-to-text-with-file-py' (2 files)... DONE!
    ```

## main.py

**STEP 1**: Read the configuration settings from environment variables.

``` python title="main.py"
speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or "<insert your Speech Service API key here>"
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or "<insert your Speech Service region here>"
input_file = sys.argv[1] if len(sys.argv) == 2 else "audio.wav"
```

**STEP 2**: Check if the input file exists.

``` python title="main.py"
if not os.path.exists(input_file):
    print("ERROR: Cannot find audio input file: {}".format(input_file))
    sys.exit(1)
```

**STEP 3**: Create instances of a speech config and audio config.

``` python title="main.py"
speech_config = SpeechConfig(subscription=speech_key, region=service_region, speech_recognition_language="en-US")
audio_config = AudioConfig(filename=input_file)
```

**STEP 4**: Create the speech recognizer from the above configuration information.

``` python title="main.py"
speech_recognizer = SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
```

**STEP 5**: Subscribe to the recognizing and recognized events.

``` python title="main.py"
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

**STEP 6**: Create a future to wait for the session to stop.

``` python title="main.py"
session_stopped_no_error = Future()
```

**STEP 7**: Subscribe to session_started and session_stopped events.

``` python title="main.py"
def session_started(args):
    print("SESSION STARTED: {}\n".format(args.session_id))

def session_stopped(args):
    print("SESSION STOPPED: {}".format(args.session_id))
    session_stopped_no_error.set_result(True)

speech_recognizer.session_started.connect(session_started)
speech_recognizer.session_stopped.connect(session_stopped)
```

**STEP 8**: Subscribe to the canceled event.

``` python title="main.py"
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

**STEP 9**: Allow the user to press ENTER to stop recognition.

``` python title="main.py"
threading.Thread(target=lambda: (
    input(""),
    speech_recognizer.stop_continuous_recognition())
).start()
```

**STEP 10**: Start speech recognition.

``` python title="main.py"
speech_recognizer.start_continuous_recognition()
print("Listening, press ENTER to stop...")
```

**STEP 11**: Wait for the session to stop.

``` python title="main.py"
exit_code = 0 if session_stopped_no_error.result() == True else 1
os._exit(exit_code)
```

## requirements.txt

``` text title="requirements.txt"
azure-cognitiveservices-speech>=1.35.0
```