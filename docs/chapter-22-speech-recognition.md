➡️ [Speech Recognition](#chapter-22-speech-recognition)  

**Recognize speech from audio**  
`ai speech recognize --microphone`  
`ai speech recognize --file hello-world.wav`  
`ai speech recognize --file hello-world.mp3 --format mp3`  

**Recognize speech with a specific language**  
`ai speech recognize --microphone --language es-ES`  
`ai speech recognize --file hello-world.wav --languages es-ES;fr-FR`  

**Output SRT or VTT subtitles**  
`ai speech recognize --file hello-world.wav --output-srt-file captions.srt`  
`ai speech recognize --file hello-world.wav --output-vtt-file captions.vtt`  

**Generate code for speech recognition**  
`ai dev new list speech`  
`ai dev new speech-to-text --csharp` or `--python` or `--javascript` ...  
`ai dev new speech-to-text-continuous --csharp` or `--python` or `--javascript` ...  
`ai dev new speech-to-text-with-file --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
