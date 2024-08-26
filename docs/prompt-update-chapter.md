## background

We're writing documentation (in mkdocs material format, which is a derivative of markdown) that we're calling "The Book of AI".  

The overall goal of all this documentation is to create a "tutorial" for the `ai` CLI, that:  
* Shows how to use various `ai ...` commands  
* Demonstrates how Azure AI can be used via the `ai` CLI  
* Demonstrates how to create code for key scenarios using the `ai dev new ...` command  

All chapters follow this file naming regex pattern: `chapter-\d+-*.md` and are in the current directory.  

The `mkdocs.yml` files is in the parent directory (e.g. `../mkdocs.yml`).  

**Current progress**:  
* There are 33 chapters overall.  
* We've completed chapters 1, 2, and 3.  
* Chapters 4 thru 33 are more similar to chapter 3 than to 1 or 2...  

## your task

Your task is to updated chapter {chapter} following the same style and format, using the draft notes/details that are in that chapter's markdown file already. 

The notes may not cover all the details needed to generate, build, or run the samples. You can find more details by reading the following:  
* `prompt--info--dev-new-list.md` - shows the output of `ai dev new list`.
* `prompt--info--ai-test-yaml-for-samples.md` - shows sample tests for various `ai` CLI capabilities (including how to generate, build, and run the samples output from `ai dev new ...`.

Tasks to perform:
1. Find all chapter files
2. Carefully read chapter 3: `chapter-3-openai-chat-completions-basics.md`
3. Analyze chapter 3 to understand how we're using mkdocs tabs, admonitions, etc., as well as our approach/style/format to documentation
4. Carefully read chapter {chapter}: `{chapter_filename}`
5. Analyze chapter {chapter} draft/notes to understand the examples you must include in the documentation
6. Carefully analyze the dev new list for the programming languages supported for chapter {chapter}
7. Carefully analyze the test yaml for the samples to understand how to generate, build, and run the samples for chapter {chapter}
8. Slowly consider all that you have learned from above, and determine what you will need to do to complete chapter {chapter}
9. Finally, write chapter {chapter} to disk using the filename you read the notes from.

Final notes:
* Do **NOT** create any new files; only update the appropriate file for chapter {chapter}
* Double check that you've covered each of the programming languages that are supported for chapter {chapter}'s scenario
* Do **NOT** use # headers inside `===` tabs (e.g. under w/CLI, C#, Go, Java, JavaScript, Python, ...)
* If there is a section in the notes called something like "Go over ...", put that information in a final tab called "..." (just like in Chapter 3)
* Don't forget to use `title=...` for bash code blocks
* For python and java, always remember to separate some parts of the gen/build/run w/ tabs for Windows/macOS/Linux

Now, do your work; don't tell me what you're going to do, just do it.

Write chapter {chapter}/save it into `{chapter_filename}` using the functions provided.

