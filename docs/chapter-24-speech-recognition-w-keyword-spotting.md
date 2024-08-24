➡️ [Speech Recognition w/ Keyword Spotting](#chapter-24-speech-recognition-w-keyword-spotting)  

🛑 Setup w/ Speech in [chapter 20](#chapter-20-setup-w-speech)  

**Create and download custom keyword model**  
◦ https://speech.microsoft.com/portal/customkeyword  
◦ https://learn.microsoft.com/azure/ai-services/speech-service/custom-keyword-basics  

**Recognize speech from audio with keyword spotting**  
`ai speech recognize --interactive --keyword keyword.table`  
`ai speech recognize --file hello-world.wav --keyword keyword.table`  

**Generate code for speech recognition with keyword spotting**  
`ai dev new list keyword`  
`ai dev new speech-to-text-with-keyword --csharp` or `--python` or `--javascript` ...  

**Go over what was generated in the console app**  
◦ getting connection info/secrets from environment variables  

**Install the dependencies**  
`dotnet restore` or `pip install -r requirements.txt` or `npm install` ...  

**Run the console app**  
`ai dev shell`  
`dotnet run` or `python main.py` or `node main.js` ...  
