---
hide:
- navigation
- toc
---
# Speech-to-Text with Translation in C\#

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure Cognitive Services Speech SDK to perform speech-to-text translation in a C# console application.

[:material-file-code: Program.cs](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-translation-cs/Program.cs)  
[:material-file-code: SpeechToTextWithTranslation.csproj](https://github.dev/robch/book-of-ai/blob/main/docs/samples/speech-to-text-with-translation-cs/SpeechToTextWithTranslation.csproj)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new speech-to-text-with-translation --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text-with-translation' in 'speech-to-text-with-translation-cs' (2 files)...

    SpeechToTextWithTranslation.csproj
    Program.cs

    Generating 'speech-to-text-with-translation' in 'speech-to-text-with-translation-cs' (2 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables and initialize the input file name:

```csharp title="Program.cs"
var speechKey = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_KEY") ?? "<insert your Speech Service API key here>";
var speechRegion = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_REGION") ?? "<insert your Speech Service region here>";
var speechLanguage = "en-US"; // BCP-47 language code
var targetLanguages = new string[] { "de", "fr" };
var inputFileName = args.Length == 1 ? args[0] : null;
```

**STEP 2**: Check if the input file exists:

```csharp title="Program.cs"
if (inputFileName != null && !File.Exists(inputFileName))
{
    Console.WriteLine($"ERROR: Cannot find audio input file: {inputFileName}");
    return 1;
}
```

**STEP 3**: Initialize the speech translation config and audio config with the configuration settings:

```csharp title="Program.cs"
var config = SpeechTranslationConfig.FromSubscription(speechKey, speechRegion);
var audioConfig = inputFileName != null
    ? AudioConfig.FromWavFileInput(inputFileName)
    : AudioConfig.FromDefaultMicrophoneInput();
```

**STEP 4**: Set the source and target languages for translation:

```csharp title="Program.cs"
config.SpeechRecognitionLanguage = speechLanguage;
foreach (var targetLanguage in targetLanguages)
{
    config.AddTargetLanguage(targetLanguage);
}
```

**STEP 5**: Create the speech recognizer from the configuration information and handle events:

```csharp title="Program.cs"
using (var recognizer = new TranslationRecognizer(config, audioConfig))
{
    recognizer.Recognizing += (s, e) => HandleRecognizingEvent(e);
    recognizer.Recognized += (s, e) => HandleRecognizedEvent(e);
    recognizer.SessionStarted += (s, e) => HandleSessionStartedEvent(e);
    recognizer.SessionStopped += (s, e) => HandleSessionStoppedEvent(e, sessionStoppedNoError);
    recognizer.Canceled += (s, e) => HandleCanceledEvent(e, sessionStoppedNoError);
```

**STEP 6**: Start continuous recognition and wait for the user to stop it:

```csharp title="Program.cs"
    await recognizer.StartContinuousRecognitionAsync();
    Console.WriteLine("Listening; press ENTER to stop ...\n");

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

**STEP 7**: Implement event handlers to process recognition results and session events:

```csharp title="Program.cs"
private static void HandleRecognizingEvent(TranslationRecognitionEventArgs e)
{
    Console.WriteLine($"RECOGNIZING: {e.Result.Text}");
    foreach (var lang in e.Result.Translations.Keys)
    {
        Console.WriteLine($"TRANSLATING into '{lang}': {e.Result.Translations[lang]}");
    }
    Console.WriteLine();
}

private static void HandleRecognizedEvent(TranslationRecognitionEventArgs e)
{
    if (e.Result.Reason == ResultReason.TranslatedSpeech && e.Result.Text.Length != 0)
    {
        Console.WriteLine($"RECOGNIZED: {e.Result.Text}");
        foreach (var lang in e.Result.Translations.Keys)
        {
            Console.WriteLine($"TRANSLATED into '{lang}': {e.Result.Translations[lang]}");
        }
        Console.WriteLine();
    }
    else if (e.Result.Reason == ResultReason.RecognizedSpeech && e.Result.Text.Length != 0)
    {
        Console.WriteLine($"RECOGNIZED: {e.Result.Text} (text could not be translated)");
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

private static void HandleCanceledEvent(TranslationRecognitionCanceledEventArgs e, TaskCompletionSource<bool> sessionStoppedNoError)
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
