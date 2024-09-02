---
# Speech Recognition with Keyword Spotting in C\#

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure Cognitive Services Speech SDK to recognize speech with keyword spotting in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/speech-to-text-with-keyword-cs/Program.cs)

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new speech-to-text-with-keyword --csharp
    ```

    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text-with-keyword' in 'speech-to-text-with-keyword-cs' (3 files)...

    Program.cs

    Generating 'speech-to-text-with-keyword' in 'speech-to-text-with-keyword-cs' (1 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the connection and configuration details from environment variables:

```csharp title="Program.cs"
var speechKey = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_KEY") ?? "<insert your Speech Service API key here>";
var speechRegion = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_REGION") ?? "<insert your Speech Service region here>";
var speechLanguage = "en-US"; // BCP-47 language code
var inputFileName = args.Length == 1 ? args[0] : null;
var keywordFileName = "keyword.table";
```

**STEP 2**: Check if the input file and keyword file exist:

```csharp title="Program.cs"
if (inputFileName != null && !File.Exists(inputFileName))
{
    Console.WriteLine($"ERROR: Cannot find audio input file: {inputFileName}");
    return 1;
}

if (!File.Exists(keywordFileName))
{
    Console.WriteLine($"ERROR: Cannot find keyword file: {keywordFileName}");
    return 1;
}
```

**STEP 3**: Create instances of a speech config, source language config, and audio config:

```csharp title="Program.cs"
var config = SpeechConfig.FromSubscription(speechKey, speechRegion);
var sourceLanguageConfig = SourceLanguageConfig.FromLanguage(speechLanguage);
var audioConfig = inputFileName != null
    ? AudioConfig.FromWavFileInput(inputFileName)
    : AudioConfig.FromDefaultMicrophoneInput();
```

**STEP 4**: Create the speech recognizer and subscribe to events:

```csharp title="Program.cs"
using (var recognizer = new SpeechRecognizer(config, sourceLanguageConfig, audioConfig))
{
    recognizer.Recognizing += (s, e) => HandleRecognizingEvent(e);
    recognizer.Recognized += (s, e) => HandleRecognizedEvent(e);

    var sessionStoppedNoError = new TaskCompletionSource<bool>(TaskCreationOptions.RunContinuationsAsynchronously);
    recognizer.SessionStarted += (s, e) => HandleSessionStartedEvent(e);
    recognizer.SessionStopped += (s, e) => HandleSessionStoppedEvent(e);
    recognizer.Canceled += (s, e) => HandleCanceledEvent(e, sessionStoppedNoError);

    Task.Run(() =>
    {
        while (Console.ReadKey().Key != ConsoleKey.Enter) { }
        recognizer.StopContinuousRecognitionAsync();
    });

    var keywordModel = KeywordRecognitionModel.FromFile(keywordFileName);

    await recognizer.StartKeywordRecognitionAsync(keywordModel);
    Console.WriteLine("Listening for keyword; press ENTER to stop ...\n");

    return await sessionStoppedNoError.Task ? 0 : 1;
}
```

**STEP 5**: Define the event handlers:

```csharp title="Program.cs"
private static void HandleRecognizingEvent(SpeechRecognitionEventArgs e)
{
    Console.WriteLine($"RECOGNIZING: {e.Result.Text}");
}

private static void HandleRecognizedEvent(SpeechRecognitionEventArgs e)
{
    if (e.Result.Reason == ResultReason.RecognizedKeyword && !string.IsNullOrEmpty(e.Result.Text))
    {
        Console.WriteLine($"RECOGNIZED: {e.Result.Text}\n");
    }
    else if (e.Result.Reason == ResultReason.RecognizedSpeech && !string.IsNullOrEmpty(e.Result.Text))
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

private static void HandleSessionStoppedEvent(SessionEventArgs e)
{
    Console.WriteLine($"SESSION STOPPED: {e.SessionId}.");
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