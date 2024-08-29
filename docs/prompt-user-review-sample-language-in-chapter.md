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
* We've completed first drafts for chapters 1 thru 24

## your task

Your task is to review what we have for chapter {chapter} focusing specifically on the sample-overview for `{sample_name}` in the `{language}` language (where cs = C#, js = JavaScript, py = Python, etc.).  

Tasks to perform:  
1. Carefully read chapter {chapter}: `{chapter_filename}`  
2. In that chapter {chapter}, find the section discussing `{sample_name}` for `{language}` under the "Sample Code" tab.  
3. That section will also link to the sample overview markdown page (`chapter-{chapter}-sample-overview-{sample_name}-{language}.md`).  
4. That sample over is based on the sample in the `samples/{sample_name}-{language}` directory.  
5. Find the files in the sample directory, and understand each of the `{language}` files.  
6. Read the `chapter-{chapter}-sample-overview-{sample_name}-{language}.md` to see how we've documented the sample thus far.  
7. Carefully consider the "chunks" of code that are shown in the sample overview, and determine if they're demonstrating the key "chunks" of code in the sample.  
8. If you find missing "chunks" or that the existing "chunks" aren't segmented well, update the sample overview page to better reflect the key "chunks" of code in the sample.  
9. Save the updated sample overview page into the same location with the same filename.  
10. If you need to update the chapter {chapter} (in the `{chapter_filename}` file), please do so.

Final notes:
* Do **NOT** create any new files, unless we're missing a sample overview page for the `{sample_name}-{language}` sample.  
* Don't forget to use `title=...` for bash code blocks.  
* Do **NOT** remove any sections that are already in the sample overview page unless the underlying sample doesn't contain that code anymore.  
* Do **NOT** discuss the `ReadLineWrapper` capabilities in the sample overview page for js samples.  
* Do **NOT** document or discuss imports or using statements in the sample overview page.   
* Do **NOT** arbitrarily the indentation of existing code blocks (unless it's to fix a formatting issue that you're confident you'll be fixing by changing).  

If applicable, write chapter {chapter} and save it into `{chapter_filename}` using the functions provided.  
If applicable, Write the updated sample overview page and save it into `chapter-{chapter}-sample-overview-{sample_name}-{language}.md` using the functions provided.  

Now, do your work; don't tell me what you're going to do, just call the functions with your updated content for the chapter and sample overview page.  
