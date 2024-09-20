{@dev/prompt--info--background.md}

## your task

Your task is to updated documentation for the sk-chat-basics area to create/update a page discussing the C# sample (which lives in `docs/samples/sk-chat-streaming-cs`).

Tasks to perform:
1. Carefully read the chapter `docs/openai-chat/openai-chat-streaming-cs/sample-overview.md`
2. Analyze how we've documented the steps in the sample from the source files.
3. Now, carefully read `docs/sk-chat/basics.md` and its associated include files.
4. Find the section discussing the C# sample that has not yet been documented.
5. Read all the files in that sample directory to understand the code.
6. Create an new markdown page called `sample-overview.md` in the `docs/sk-chat/sk-chat-streaming-cs` directory.
7. In the new markdown page, follow the same format as `docs/openai-chat/openai-chat-streaming-cs/sample-overview.md`.
8. Save the new markdown page into the `docs/sk-chat/sk-chat-streaming-cs` directory.
9. Carefully read `snippets/sk-chat-basics/cs/generate-code.md` and ensure the links to the sample overview and the key source files are correct.
10. Those to the `sample-overview.md` and the key source files should look something like this (but with the correct paths/filenames for this sample):

    ```markdown
        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/sk-chat-streaming-cs/Program.cs)  
            [:material-file-code: SKChatStreamingClass.cs](./samples/sk-chat-streaming-cs/SemanticKernelChatCompletionsStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./sk-chat-streaming-cs/sample-overview.md)
    ```

11. Save the updated files to the correct directories using the functions provided.

Final notes:
* Do **NOT** create any new files, other than the one new sample overview file.
* Double check that you've covered the key points in the sample(s) in the new page like were covered in `docs/openai-chat/openai-chat-streaming-cs/sample-overview.md`
* Don't forget to use `title=...` for bash code blocks

Now, do your work; don't tell me what you're going to do, just do it.

