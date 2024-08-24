➡️ [Speech Translation](#chapter-23-speech-translation)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

**Translate speech from one language to another**  
`ai speech translate --microphone --source en-uS --target es-ES`  
`ai speech translate --file hello-world.wav --source en-uS --target es-ES`  
`ai speech translate --file hello-world.wav --source en-uS --targets es-ES;fr-FR;zh-CN`  

**Output SRT or VTT subtitles**  
`ai speech translate --file hello-world.wav --source en-uS --target es-ES --output-srt-file captions.srt`  

**Generate code for speech translation**  
`ai dev new list translate`  
`ai dev new speech-to-text-with-translation --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
