---
hide:
- navigation
- toc
---
# Speech-to-Text Continuous Recognition in C\#

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to perform continuous speech recognition using the Speech SDK in a C# console application. The application listens for speech from the default microphone and prints recognized text to the console in real-time.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/speech-to-text-continuous-reco-cs/Program.cs)

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new speech-to-text-continuous-reco --csharp
    ```

    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text-continuous-reco' in 'speech-to-text-continuous-reco-cs' (2 files)...

    SpeechToTextContinuousReco.csproj
    Program.cs

    Generating 'speech-to-text-continuous-reco' in 'speech-to-text-continuous-reco-cs' (2 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables.

```csharp title="Program.cs"
var speechKey = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_KEY") ?? "<insert your Speech Service API key here>";
var speechRegion = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_REGION") ?? "<insert your Speech Service region here>";
var speechLanguage = "en-US"; // BCP-47 language code
```

**STEP 2**: Create instances of a speech config, source language config, and audio config.

```csharp title="Program.cs"
var config = SpeechConfig.FromSubscription(speechKey, speechRegion);
var sourceLanguageConfig = SourceLanguageConfig.FromLanguage(speechLanguage);
var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
```

**STEP 3**: Create the speech recognizer from the above configuration information.

```csharp title="Program.cs"
using (var recognizer = new SpeechRecognizer(config, sourceLanguageConfig, audioConfig))
{
    recognizer.Recognizing += (s, e) => HandleRecognizingEvent(e);
    recognizer.Recognized += (s, e) => HandleRecognizedEvent(e);
    var sessionStoppedNoError = new TaskCompletionSource<bool>(TaskCreationOptions.RunContinuationsAsynchronously);
    recognizer.SessionStarted += (s, e) => HandleSessionStartedEvent(e);
    recognizer.SessionStopped += (s, e) => HandleSessionStoppedEvent(e, sessionStoppedNoError);
    recognizer.Canceled += (s, e) => HandleCanceledEvent(e, sessionStoppedNoError);
```

**STEP 4**: Subscribe to recognizing and recognized events for handling intermediate and final recognition results.

```csharp title="Program.cs"
    recognizer.Recognizing += (s, e) => HandleRecognizingEvent(e);
    recognizer.Recognized += (s, e) => HandleRecognizedEvent(e);
```

**STEP 5**: Subscribe to session started, stopped, and canceled events for handling session events and cancellations.

```csharp title="Program.cs"
    recognizer.SessionStarted += (s, e) => HandleSessionStartedEvent(e);
    recognizer.SessionStopped += (s, e) => HandleSessionStoppedEvent(e, sessionStoppedNoError);
    recognizer.Canceled += (s, e) => HandleCanceledEvent(e, sessionStoppedNoError);
```

**STEP 6**: Start continuous recognition and wait for user input to stop.

```csharp title="Program.cs"
    Task.Run(() =>
    {
        while (Console.ReadKey().Key != ConsoleKey.Enter) { }
        recognizer.StopContinuousRecognitionAsync();
    });
    await recognizer.StartContinuousRecognitionAsync();
    Console.WriteLine("Listening; press ENTER to stop ...\n");
    return await sessionStoppedNoError.Task ? 0 : 1;
}
```

**STEP 7**: Handle intermediate and final recognition results.

```csharp title="Program.cs"
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
```

**STEP 8**: Handle session start, stop, and cancellation events.

```csharp title="Program.cs"
private static void HandleSessionStartedEvent(SessionEventArgs e)
{
    Console.WriteLine($"SESSION STARTED: {e.SessionId}.\n");
}

private static void HandleSessionStoppedEvent(SessionEventArgs e, TaskCompletionSource<bool> sessionStoppedNoError)
{
    Console.WriteLine($"SESSION STOPPED: {e.SessionId}.");
    sessionStoppedNoError.TrySetResult(true);
}

private static void HandleCanceledEvent(SpeechRecognitionCanceledEventArgs e, TaskCompletionSource<bool> sessionStoppedNoError)
{
    Console.WriteLine($"CANCELED: Reason={e.Reason}");
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
    sessionStoppedNoError.TrySetResult(e.Reason != CancellationReason.Error);
}
```
