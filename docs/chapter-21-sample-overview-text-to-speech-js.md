---
hide:
- navigation
- toc
---
# Text to Speech in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Azure Cognitive Services Text to Speech API in a JavaScript application.

[:material-file-code: main.js](./samples/text-to-speech-js/main.js)  
[:material-file-code: package.json](./samples/text-to-speech-js/package.json)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new text-to-speech --javascript
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'text-to-speech' in 'text-to-speech-js' (3 files)...

    main.js
    package.json
    README.md

    Generating 'text-to-speech' in 'text-to-speech-js' (3 files)... DONE!
    ```


## main.js

**STEP 1**: Import the required modules and set up the configuration:

``` javascript title="main.js"
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');

const subscriptionKey = process.env.AZURE_TTS_KEY;
const serviceRegion = process.env.AZURE_REGION;
```

**STEP 2**: Create the SpeechConfig and AudioConfig objects:

``` javascript title="main.js"
const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
const audioConfig = sdk.AudioConfig.fromAudioFileOutput('output.wav');
```

**STEP 3**: Create the synthesizer and start the synthesis:

``` javascript title="main.js"
const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

synthesizer.speakTextAsync(
    'Hello, world!',
    result => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log('Speech synthesis finished.
        } else {
            console.error('Speech synthesis canceled, ' + result.errorDetails);
        }
    },
    error => {
        console.trace('Error:', error);
    }
);
```

**STEP 4**: Handle the synthesis result and close the synthesizer:

``` javascript title="main.js"
synthesizer.speakTextAsync(
    'Hello, world!',
    result => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log('Speech synthesis finished.'
        } else {
            console.error('Speech synthesis canceled, ' + result.errorDetails);
        }
        synthesizer.close();
    },
    error => {
        console.trace('Error:', error);
        synthesizer.close();
    }
);
```