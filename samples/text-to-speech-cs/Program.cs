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
        var voiceName = "en-US-AndrewNeural"; // You can list voice names with `ai speech synthesize --list-voices`

        // Create instances of a speech config and audio config, and set the voice name to use
        var config = SpeechConfig.FromSubscription(speechKey, speechRegion);
        var audioConfig = AudioConfig.FromDefaultSpeakerOutput();
        config.SpeechSynthesisVoiceName = voiceName;

        // Create the speech synthesizer from the above configuration information
        using (var synthesizer = new SpeechSynthesizer(config, audioConfig))
        {
            // Get text from the user to synthesize
            Console.Write("Enter text: ");
            var text = Console.ReadLine();

            // Start speech synthesis, and return after it has completed
            var result = await synthesizer.SpeakTextAsync(text);

            // Check the result
            if (result.Reason == ResultReason.SynthesizingAudioCompleted)
            {
                Console.WriteLine($"SYNTHESIZED: {result.AudioData.Length} byte(s)");
            }
            else if (result.Reason == ResultReason.Canceled)
            {
                var cancellation = SpeechSynthesisCancellationDetails.FromResult(result);
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