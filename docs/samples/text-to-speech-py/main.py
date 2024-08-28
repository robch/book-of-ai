from azure.cognitiveservices.speech import SpeechConfig, SpeechSynthesizer, SpeechSynthesisResult, SpeechSynthesisCancellationDetails, CancellationReason, ResultReason
from azure.cognitiveservices.speech.audio import AudioOutputConfig
import os

# Connection and configuration details required
speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or "<insert your Speech Service API key here>"
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or "<insert your Speech Service region here>"
voice_name = 'en-US-AndrewNeural'

# Create instances of a speech config and audio config, and set the voice name to use
speech_config = SpeechConfig(subscription=speech_key, region=service_region)
speech_config.speech_synthesis_voice_name = voice_name
audio_config = AudioOutputConfig(use_default_speaker=True)

# Create the speech synthesizer from the above configuration information
speech_synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

# Get text from the user to synthesize
text = input('Enter text: ')

# Start speech synthesis, and return after it has completed
result = speech_synthesizer.speak_text_async(text).get()

# Check the result
if result.reason == ResultReason.SynthesizingAudioCompleted:
    print('SYNTHESIZED: {} byte(s)'.format(len(result.audio_data)))
elif result.reason == ResultReason.Canceled:
    cancellation_details = result.cancellation_details
    print('CANCELED: Reason={}'.format(cancellation_details.reason))
    if cancellation_details.reason == CancellationReason.Error:
        print('CANCELED: ErrorDetails={}'.format(cancellation_details.error_details))
        print('CANCELED: Did you update the subscription info?')