---
hide:
- navigation
- toc
---
# Speech Recognition in JavaScript

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the Speech Recognition API in a JavaScript application.

??? tip "How to generate this sample"

    ```bash title="Command"
    ai dev new speech-to-text --javascript
    ```
    ```text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'speech-to-text' in 'speech-to-text-js' (3 files)...

    package.json
    index.js

    Generating 'speech-to-text' in 'speech-to-text-js' (3 files)... DONE!
    ```

## `package.json`

This file contains the metadata about the project and the dependencies required to run the sample.

```json title="package.json"
{
  "name": "speech-to-text-js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "axios": "^0.21.1"
  }
}
```

## `index.js`

This file contains the main logic for the speech recognition sample.

```javascript title="index.js"
// Import necessary modules
const axios = require('axios');

// Function to recognize speech from audio
async function recognizeSpeech(audioFilePath) {
    // Configuration settings
    const apiKey = process.env.AZURE_SPEECH_API_KEY;
    const endpoint = process.env.AZURE_SPEECH_ENDPOINT;

    // Logic to read audio file and send to Azure Speech API
    // Placeholder code
    console.log(`Recognizing speech from ${audioFilePath}`);
    // Send request to Azure Speech API and handle response
    // let response = await axios.post(endpoint, { audio: audioFilePath }, { headers: { 'Ocp-Apim-Subscription-Key': apiKey } });
    // console.log(response.data);
}

// Main execution
recognizeSpeech('path_to_audio_file.wav');
```
