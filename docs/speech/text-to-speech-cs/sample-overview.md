---
hide:
- navigation
- toc
---
# Text-to-Speech in C\#

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the Azure Text-to-Speech API in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-cs/Program.cs)

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new text-to-speech --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'text-to-speech' in 'text-to-speech-cs' (2 files)...

    TextToSpeech.csproj
    Program.cs

    Generating 'text-to-speech' in 'text-to-speech-cs' (2 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables.

``` csharp title="Program.cs"
var speechKey = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_KEY") ?? "<insert your Speech Service API key here>";
var speechRegion = Environment.GetEnvironmentVariable("AZURE_AI_SPEECH_REGION") ?? "<insert your Speech Service region here>";
var voiceName = "en-US-AndrewNeural"; // You can list voice names with `ai speech synthesize --list-voices`
```

**STEP 2**: Create instances of a speech config and audio config, and set the voice name to use.

``` csharp title="Program.cs"
var config = SpeechConfig.FromSubscription(speechKey, speechRegion);
var audioConfig = AudioConfig.FromDefaultSpeakerOutput();
config.SpeechSynthesisVoiceName = voiceName;
```

**STEP 3**: Create the speech synthesizer from the above configuration information.

``` csharp title="Program.cs"
using (var synthesizer = new SpeechSynthesizer(config, audioConfig))
```

**STEP 4**: Get text from the user to synthesize.

``` csharp title="Program.cs"
Console.Write("Enter text: ");
var text = Console.ReadLine();
```

**STEP 5**: Start speech synthesis, and return after it has completed.

``` csharp title="Program.cs"
var result = await synthesizer.SpeakTextAsync(text);
```

**STEP 6**: Check the result.

``` csharp title="Program.cs"
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
```