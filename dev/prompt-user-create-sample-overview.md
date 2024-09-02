## background

We're writing documentation (in mkdocs material format, which is a derivative of markdown) that we're calling "The Book of AI".  

The overall goal of all this documentation is to create a "tutorial" for the `ai` CLI, that:  
* Shows how to use various `ai ...` commands  
* Demonstrates how Azure AI can be used via the `ai` CLI  
* Demonstrates how to create code for key scenarios using the `ai dev new ...` command  
* All code for the `ai dev new` generated samples lives in the `samples` directory (e.g. `samples/openai-chat-streaming-with-functions-cs`)

All chapters follow this file naming regex pattern: `chapter-\d+-*.md` and are in the current directory.  

The `mkdocs.yml` files is in the parent directory (e.g. `../mkdocs.yml`).  

**Current progress**:  
* There are 33 chapters overall.  
* We've completed chapters 1 thru 24

## your task

Your task is to updated chapter {chapter} to include a new link to a new page discussing the {language} sample(s). 

Tasks to perform:
1. Carefully read the chapter `chapter-3-sample-overview-openai-chat-streaming-cs.md`
2. Analyze how we've documented the steps in the sample from the source files.
3. Now, carefully read chapter {chapter}: `{chapter_filename}`
4. Find in the chapter the section discussing a {language} sample that has not yet been documented.
5. Find the directory name for the {language} sample(s) in the `samples` directory.
6. Read all the files in that sample directory to understand the code.
7. Create an new markdown page called `chapter-{chapter}-sample-overview-XXX.md` where `XXX` is the basename of the sample directory.
8. In the new markdown page, follow the same format as `chapter-3-sample-overview-openai-chat-streaming-cs.md`.
9. Save the new markdown page into the current directory.
10. Carefully read `chapter-3-openai-chat-completions-basics.md` and see how we added a link to the new page.
11. Update chapter {chapter} to include a link to the new page you just created using markdown like you learned just now. It'll look something like this:

    ```markdown
        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/openai-chat-streaming-cs/Program.cs)  
            [:material-file-code: OpenAIChatCompletionsStreamingClass.cs](./samples/openai-chat-streaming-cs/OpenAIChatCompletionsStreamingClass.cs)  

            [:material-file-document-outline: Deep dive on how it works](./chapter-3-sample-overview-openai-chat-streaming-cs.md)  
    ```
12. Save the updated chapter {chapter} into the current directory with the new links.

Final notes:
* Do **NOT** create any new files, other than the one new sample overview file; don't forget to update the appropriate file for chapter {chapter}
* Double check that you've covered the key points in the sample(s) in the new page like were covered in `chapter-3-sample-overview-openai-chat-streaming-cs.md`
* Don't forget to use `title=...` for bash code blocks

Now, do your work; don't tell me what you're going to do, just do it.

Write chapter {chapter} and save it into `{chapter_filename}` using the functions provided.
Write the new sample overview page and save it into `chapter-{chapter}-sample-overview-XXX.md` using the functions provided.
