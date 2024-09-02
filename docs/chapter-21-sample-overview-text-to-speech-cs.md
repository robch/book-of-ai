---
hide:
- navigation
- toc
---
# Text-to-Speech in C\#

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure Text-to-Speech API in a C# console application.

[:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-cs/Program.cs)  
[:material-file-code: TextToSpeechClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-cs/TextToSpeechClass.cs)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new text-to-speech --csharp
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'text-to-speech' in 'text-to-speech-cs' (3 files)...

    TextToSpeech.csproj
    TextToSpeechClass.cs
    Program.cs

    Generating 'text-to-speech' in 'text-to-speech-cs' (3 files)... DONE!
    ```


## Program.cs

**STEP 1**: Read the configuration settings from environment variables:

``` csharp title="Program.cs"
var azureAPIKey = Environment.GetEnvironmentVariable("AZURE_API_KEY") ?? "<insert your Azure API key here>";
var azureRegion = Environment.GetEnvironmentVariable("AZURE_REGION") ?? "<insert your Azure region here>";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` csharp title="Program.cs"
var tts = new TextToSpeechClass(azureAPIKey, azureRegion);
```

**STEP 3**: Obtain user input, use the helper class to synthesize speech, and play the audio output:

``` csharp title="Program.cs"
while (true)
{
    Console.Write("Text to synthesize: ");
    var text = Console.ReadLine();
    if (string.IsNullOrEmpty(text) || text == "exit") break;

    var audioData = await tts.SynthesizeSpeechAsync(text);
    // Code to play audioData
}
```

## TextToSpeechClass.cs

**STEP 1**: Create the client and initialize the speech synthesis service:

``` csharp title="TextToSpeechClass.cs"
public TextToSpeechClass(string azureAPIKey, string azureRegion)
{
    var config = SpeechConfig.FromSubscription(azureAPIKey, azureRegion);
    _synthesizer = new SpeechSynthesizer(config);
}
```

**STEP 2**: Synthesize speech from text input:

``` csharp title="TextToSpeechClass.cs"
public async Task<byte[]> SynthesizeSpeechAsync(string text)
{
    using var result = await _synthesizer.SpeakTextAsync(text);
    if (result.Reason == ResultReason.SynthesizingAudioCompleted)
    {
        return result.AudioData;
    }
    else
    {
        throw new Exception("Speech synthesis failed.");
    }
}
```