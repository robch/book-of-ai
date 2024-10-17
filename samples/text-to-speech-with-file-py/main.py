from azure.cognitiveservices.speech import SpeechConfig, SpeechSynthesizer, SpeechSynthesisResult, SpeechSynthesisCancellationDetails, CancellationReason, ResultReason, SpeechSynthesisOutputFormat
from azure.cognitiveservices.speech.audio import AudioOutputConfig
import os

# Connection and configuration details required
speech_key = os.environ.get('AZURE_AI_SPEECH_KEY') or "<insert your Speech Service API key here>"
service_region = os.environ.get('AZURE_AI_SPEECH_REGION') or "<insert your Speech Service region here>"
voice_name = 'en-US-AndrewNeural'
output_file_name = 'output.wav'
output_format = SpeechSynthesisOutputFormat['Riff16Khz16BitMonoPcm']

# Create instances of a speech config and audio config, and set the voice name and output format to use
speech_config = SpeechConfig(subscription=speech_key, region=service_region)
speech_config.speech_synthesis_output_format = output_format
speech_config.speech_synthesis_voice_name = voice_name
audio_config = AudioOutputConfig(filename=output_file_name)

# Create the speech synthesizer from the above configuration information
speech_synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

# Get text from the user to synthesize
text = input('Enter text: ')

# Start speech synthesis, and return after it has completed
result = speech_synthesizer.speak_text_async(text).get()

# Check the result
if result.reason == ResultReason.SynthesizingAudioCompleted:
    print('SYNTHESIZED: {} byte(s) to {}'.format(len(result.audio_data), output_file_name))
elif result.reason == ResultReason.Canceled:
    cancellation_details = result.cancellation_details
    print('CANCELED: Reason={}'.format(cancellation_details.reason))
    if cancellation_details.reason == CancellationReason.Error:
        print('CANCELED: ErrorDetails={}'.format(cancellation_details.error_details))
        print('CANCELED: Did you update the subscription info?')