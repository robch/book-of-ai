### Speech-to-Text with Keyword Spotting in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Speech SDK for JavaScript to recognize speech with keyword spotting.

[:material-file-code: index.js](./samples/speech-to-text-with-keyword-js/index.js)  
[:material-file-code: package.json](./samples/speech-to-text-with-keyword-js/package.json)  

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new speech-to-text-with-keyword --javascript
    ```

    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text-with-keyword' in 'speech-to-text-with-keyword-js' (3 files)...

    index.js
    package.json
    README.md

    Generating 'speech-to-text-with-keyword' in 'speech-to-text-with-keyword-js' (3 files)... DONE!
    ```

## index.js

**STEP 1**: Set up the Speech SDK and configure the service with your subscription key and region:

```javascript title="index.js"
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");

const subscriptionKey = process.env.SPEECH_KEY || "YourSubscriptionKey";
const serviceRegion = process.env.SPEECH_REGION || "YourServiceRegion";
const keywordModel = "path/to/your/keyword.table";
```

**STEP 2**: Create a keyword recognition model and audio configuration from the keyword file and microphone input:

```javascript title="index.js"
const pushStream = sdk.AudioInputStream.createPushStream();
const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
const keywordRecognitionModel = sdk.KeywordRecognitionModel.fromFile(keywordModel);
```

**STEP 3**: Initialize the recognizer with the audio configuration and subscription details:

```javascript title="index.js"
const recognizer = new sdk.KeywordRecognizer(audioConfig);
```

**STEP 4**: Set up the event handlers for recognizing keywords and speech:

```javascript title="index.js"
recognizer.recognized = (s, e) => {
    if (e.result.reason === sdk.ResultReason.RecognizedKeyword) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
    }
};
```

**STEP 5**: Start continuous keyword recognition and handle the result:

```javascript title="index.js"
recognizer.startContinuousRecognitionAsync(() => {
    console.log("Recognition started.");
}, (err) => {
    console.trace("err - " + err);
});
```

## package.json

The `package.json` file lists the dependencies required for the sample:

```json title="package.json"
{
  "name": "speech-to-text-with-keyword-js",
  "version": "1.0.0",
  "description": "Sample code for speech recognition with keyword spotting using Azure Speech SDK in JavaScript",
  "main": "index.js",
  "dependencies": {
    "microsoft-cognitiveservices-speech-sdk": "^1.16.0"
  },
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC"
}
```