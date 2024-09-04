``` bash title="Generate sample code"
ai dev new text-to-speech --csharp
cd text-to-speech-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-cs/Program.cs)  
    [:material-file-code: TextToSpeechClass.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/text-to-speech-cs/TextToSpeechClass.cs)  

    [:material-file-document-outline: Deep dive on how it works](/speech/text-to-speech-cs/sample-overview.md)  

``` bash title="Install dependencies"
dotnet restore
```

``` bash title="Run the sample"
ai dev shell
dotnet run
```
