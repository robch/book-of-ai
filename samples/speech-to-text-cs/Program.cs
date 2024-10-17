using System;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

public class Program
{
    public static async Task Main(string[] args)
    {
        // Connection and configuration details required
        var speechKey = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_KEY") ?? "<insert your Speech Service API key here>";
        var speechRegion = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_REGION") ?? "<insert your Speech Service region here>";
        var speechLanguage = "en-US"; // BCP-47 language code

        // Create instances of a speech config, source language config, and audio config
        var config = SpeechConfig.FromSubscription(speechKey, speechRegion);
        var sourceLanguageConfig = SourceLanguageConfig.FromLanguage(speechLanguage);
        var audioConfig = AudioConfig.FromDefaultMicrophoneInput();

        // Create the speech recognizer from the above configuration information
        using (var recognizer = new SpeechRecognizer(config, sourceLanguageConfig, audioConfig))
        {
            Console.WriteLine("Listening ...\n");

            // Start speech recognition, and return after a single utterance is recognized. The end of a
            // single utterance is determined by listening for silence at the end or until a maximum of 15
            // seconds of audio is processed.
            var result = await recognizer.RecognizeOnceAsync();

            // Check the result
            if (result.Reason == ResultReason.RecognizedSpeech)
            {
                Console.WriteLine($"RECOGNIZED: {result.Text}");
            }
            else if (result.Reason == ResultReason.NoMatch)
            {
                Console.WriteLine($"NOMATCH: Speech could not be recognized.");
            }
            else if (result.Reason == ResultReason.Canceled)
            {
                var cancellation = CancellationDetails.FromResult(result);
                Console.WriteLine($"CANCELED: Reason={cancellation.Reason}");

                if (cancellation.Reason == CancellationReason.Error)
                {
                    Console.WriteLine($"CANCELED: ErrorCode={cancellation.ErrorCode}");
                    Console.WriteLine($"CANCELED: ErrorDetails={cancellation.ErrorDetails}");
                    Console.WriteLine($"CANCELED: Did you update the subscription info?");
                }
            }
        }
    }
}