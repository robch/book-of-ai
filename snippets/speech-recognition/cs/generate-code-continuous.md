Generate a C# sample that continuously recognizes speech from the microphone.

```bash
ai dev new speech-to-text-continuous-reco --csharp
cd speech-to-text-continuous-reco-cs
```

??? example "See the code; learn how it works..."

    [:material-file-code: Program.cs](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/speech-to-text-continuous-reco-cs/Program.cs)

    [:material-file-document-outline: Deep dive on how it works](/speech/speech-to-text-continuous-reco-cs/sample-overview.md)  

```bash title="Install dependencies"
dotnet restore
```

```bash title="Run the sample"
ai dev shell
dotnet run
```