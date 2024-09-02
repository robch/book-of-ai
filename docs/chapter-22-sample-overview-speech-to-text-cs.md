---
hide:
- navigation
- toc
---
# Speech-to-Text in C\#

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure Cognitive Services Speech SDK to perform speech recognition in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/speech-to-text-cs/Program.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new speech-to-text --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text' in 'speech-to-text-cs' (2 files)...

    SpeechToText.csproj
    Program.cs

    Generating 'speech-to-text' in 'speech-to-text-cs' (2 files)... DONE!
    ```

## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var speechKey = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_KEY") ?? "<insert your Speech Service API key here>";
var speechRegion = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_REGION") ?? "<insert your Speech Service region here>";
var speechLanguage = "en-US"; // BCP-47 language code
```

**STEP 2**: Create instances of a speech config, source language config, and audio config:

``` csharp title="Program.cs"
var config = SpeechConfig.FromSubscription(speechKey, speechRegion);
var sourceLanguageConfig = SourceLanguageConfig.FromLanguage(speechLanguage);
var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
```

**STEP 3**: Create the speech recognizer from the above configuration information:

``` csharp title="Program.cs"
using (var recognizer = new SpeechRecognizer(config, sourceLanguageConfig, audioConfig))
{
    Console.WriteLine("Listening ...\n");
```

**STEP 4**: Start speech recognition, and return after a single utterance is recognized:

``` csharp title="Program.cs"
    var result = await recognizer.RecognizeOnceAsync();
```

**STEP 5**: Check the result:

``` csharp title="Program.cs"
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
```
