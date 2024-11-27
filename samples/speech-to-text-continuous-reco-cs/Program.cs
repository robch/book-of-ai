using System;
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

public class Program
{
    public static async Task<int> Main(string[] args)
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
            // Subscribe to the Recognizing and Recognized events. As the user speaks individual
            // utterances, intermediate recognition results are sent to the Recognizing event,
            // and the final recognition results are sent to the Recognized event.
            recognizer.Recognizing += (s, e) => HandleRecognizingEvent(e);
            recognizer.Recognized += (s, e) => HandleRecognizedEvent(e);

            // Create a task completion source to wait for the session to stop. This is needed in
            // console apps to prevent the main thread from terminating while the recognition is
            // running asynchronously on a separate background thread.
            var sessionStoppedNoError = new TaskCompletionSource<bool>(TaskCreationOptions.RunContinuationsAsynchronously);

            // Subscribe to SessionStarted and SessionStopped events. These events are useful for
            // logging the start and end of a speech recognition session. In console apps, this is
            // used to allow the application to block the main thread until recognition is complete.
            recognizer.SessionStarted += (s, e) => HandleSessionStartedEvent(e);
            recognizer.SessionStopped += (s, e) => HandleSessionStoppedEvent(e, sessionStoppedNoError);

            // Subscribe to the Canceled event, which indicates that the recognition operation
            // was stopped/canceled, likely due to an error of some kind.
            recognizer.Canceled += (s, e) => HandleCanceledEvent(e, sessionStoppedNoError);

            // Allow the user to press ENTER to stop recognition
            Task.Run(() =>
            {
                while (Console.ReadKey().Key != ConsoleKey.Enter) { }
                recognizer.StopContinuousRecognitionAsync();
            });

            // Start speech recognition
            await recognizer.StartContinuousRecognitionAsync();
            Console.WriteLine("Listening; press ENTER to stop ...\n");

            // Wait for the session to stop. The Task will not complete until the recognition
            // session stops, and the result will indicate whether the session completed
            // or was canceled.
            return await sessionStoppedNoError.Task ? 0 : 1;
        }
    }

    private static void HandleRecognizingEvent(SpeechRecognitionEventArgs e)
    {
        Console.WriteLine($"RECOGNIZING: {e.Result.Text}");
    }

    private static void HandleRecognizedEvent(SpeechRecognitionEventArgs e)
    {
        if (e.Result.Reason == ResultReason.RecognizedSpeech && !string.IsNullOrEmpty(e.Result.Text))
        {
            Console.WriteLine($"RECOGNIZED: {e.Result.Text}\n");
        }
        else if (e.Result.Reason == ResultReason.NoMatch)
        {
            Console.WriteLine($"NOMATCH: Speech could not be recognized.\n");
        }
    }

    private static void HandleSessionStartedEvent(SessionEventArgs e)
    {
        Console.WriteLine($"SESSION STARTED: {e.SessionId}.\n");
    }

    private static void HandleSessionStoppedEvent(SessionEventArgs e, TaskCompletionSource<bool> sessionStoppedNoError)
    {
        Console.WriteLine($"SESSION STOPPED: {e.SessionId}.");
        sessionStoppedNoError.TrySetResult(true); // Set the result so the main thread can exit
   }

    private static void HandleCanceledEvent(SpeechRecognitionCanceledEventArgs e, TaskCompletionSource<bool> sessionStoppedNoError)
    {
        Console.WriteLine($"CANCELED: Reason={e.Reason}");

        // Check the CancellationReason for more detailed information.
        if (e.Reason == CancellationReason.EndOfStream)
        {
            Console.WriteLine($"CANCELED: End of the audio stream was reached.");
        }
        else if (e.Reason == CancellationReason.Error)
        {
            Console.WriteLine($"CANCELED: ErrorCode={e.ErrorCode}");
            Console.WriteLine($"CANCELED: ErrorDetails={e.ErrorDetails}");
            Console.WriteLine($"CANCELED: Did you update the subscription info?");
        }

        // Set the task completion source result so the main thread can exit
        sessionStoppedNoError.TrySetResult(e.Reason != CancellationReason.Error);
    }
}