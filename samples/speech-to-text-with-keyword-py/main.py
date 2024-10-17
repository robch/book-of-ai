from concurrent.futures import Future
from azure.cognitiveservices.speech import SpeechConfig, SpeechRecognizer, AudioConfig, KeywordRecognitionModel, CancellationReason
import threading
import os
import sys

# Connection and configuration details required
speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or '<insert your Speech Service API key here>'
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or '<insert your Speech Service region here>'
speech_language = 'en-US'
input_file = sys.argv[1] if len(sys.argv) == 2 else None
keyword_file = 'keyword.table'

# Check to see if the input file exists
if input_file is not None and not os.path.exists(input_file):
    print(f'ERROR: Cannot find audio input file: {input_file}')
    sys.exit(1)

# Check to see if the keyword file exists
if not os.path.exists(keyword_file):
    print(f'ERROR: Cannot find keyword file: {keyword_file}')
    sys.exit(1)

# Create instances of a speech config and audio config
speech_config = SpeechConfig(subscription=speech_key, region=service_region, speech_recognition_language=speech_language)
audio_config = AudioConfig(filename=input_file) if input_file is not None else AudioConfig(use_default_microphone=True)

# Create the speech recognizer from the above configuration information
speech_recognizer = SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

# Subscribe to the recognizing and recognized events. As the user speaks individual
# utterances, intermediate recognition results are sent to the recognizing event,
# and the final recognition results are sent to the recognized event.
def recognizing(args):
    print(f'RECOGNIZING: {args.result.text}')

def recognized(args):
    if args.result.reason.name == 'RecognizedKeyword' and args.result.text != '':
        print(f'RECOGNIZED: {args.result.text}\n')
    elif args.result.reason.name == 'RecognizedSpeech' and args.result.text != '':
        print(f'RECOGNIZED: {args.result.text}\n')
    elif args.result.reason.name == 'NoMatch':
        print('NOMATCH: Speech could not be recognized.\n')

speech_recognizer.recognizing.connect(recognizing)
speech_recognizer.recognized.connect(recognized)

# Create a future to wait for the session to stop. This is needed in console apps to
# prevent the main thread from terminating while the recognition is running
# asynchronously on a separate background thread.
session_stopped_no_error = Future()

# Subscribe to session_started and session_stopped events. These events are useful for
# logging the start and end of a speech recognition session. In console apps, this is
# used to allow the application to block the main thread until recognition is complete.
def session_started(args):
    print(f'SESSION STARTED: {args.session_id}\n')

def session_stopped(args):
    print(f'SESSION STOPPED: {args.session_id}')

speech_recognizer.session_started.connect(session_started)
speech_recognizer.session_stopped.connect(session_stopped)

# Subscribe to the canceled event, which indicates that the recognition operation
# was stopped/canceled, likely due to an error of some kind.
def canceled(args):
    print(f'CANCELED: Reason={args.cancellation_details.reason}')

    # Check the CancellationReason for more detailed information.
    if args.cancellation_details.reason == CancellationReason.EndOfStream:
        print('CANCELED: End of the audio stream was reached.')
    elif args.cancellation_details.reason == CancellationReason.Error:
        print(f'CANCELED: ErrorDetails={args.cancellation_details.error_details}')
        print('CANCELED: Did you update the subscription info?')

    # Set the future's result so the main thread can exit
    session_stopped_no_error.set_result(args.cancellation_details.reason != CancellationReason.Error)

speech_recognizer.canceled.connect(canceled)

# Allow the user to press ENTER to stop recognition
threading.Thread(target=lambda: (
    input(''),
    speech_recognizer.stop_continuous_recognition())
).start()

# Start keyword recognition
keyword_model = KeywordRecognitionModel(filename=keyword_file)
speech_recognizer.start_keyword_recognition(keyword_model)
print('Listening for keyword; press ENTER to stop ...')

# Wait for the session to stop. result() will not return until the recognition
# session stops, and the result will indicate whether the session completed
# or was canceled.
exit_code = 0 if session_stopped_no_error.result() == True else 1
os._exit(exit_code)