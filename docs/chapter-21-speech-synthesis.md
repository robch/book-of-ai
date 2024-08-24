➡️ [Speech Synthesis](#chapter-21-speech-synthesis)  

**Synthesize speech from text**  
`ai speech synthesize --interactive`  
`ai speech synthesize --text "Hello, world!"`  
`ai speech synthesize --text "Hello, world!" --audio-output hello-world.wav`  
`ai speech synthesize --text "Hello, world!" --audio-output hello-world.mp3 --format mp3`  

**List available voices**  
`ai speech synthesize --voices`  

**Synthesize speech with a specific voice**  
`ai speech synthesize --text "Hello, world!" --voice en-US-AriaNeural`  

**Generate code for speech synthesis**  
`ai dev new list speech`  
`ai dev new text-to-speech --csharp` or `--python` or `--javascript` ...  
`ai dev new text-to-speech-with-file --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
