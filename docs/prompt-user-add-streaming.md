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
* We've completed chapters 1 thru 24.
* Chapter 3 and 7 only show "non-streaming" use of "openai-chat" and "openai-asst" templates.

## your task

Your task is to updated chapter {chapter} to add streaming (e.g. "openai-chat-streaming" or "openai-asst-streaming" templates), following the same style and format:
* You'll do this by adding tabs for "Non-streaming" and "Streaming" to the C#, Go, Java, JavaScript, and Python tabs.
* You'll keep the List samples portion above the new tabs.
* You'll update the List samples portion to include the new streaming sample.
* You'll move the "non-streaming" information to the "Non-streaming" tab.
* You'll add the "streaming" information to the "Streaming" tab.
* The w/ CLI tab should remain the same.

You can find more details by reading the following:  
* `prompt--info--dev-new-list.md` - shows the output of `ai dev new list`.
* `prompt--info--ai-test-yaml-for-samples.md` - shows sample tests for various `ai` CLI capabilities (including how to generate, build, and run the samples output from `ai dev new ...`.

Tasks to perform:
1. Carefully read chapter {chapter}: `{chapter_filename}`
2. Analyze chapter {chapter} to understand:
   - How we're using mkdocs tabs, admonitions, etc.
   - What our approach/style/format to documentation is.
   - The existing information on "non-streaming" in the C#, Go, Java, JavaScript, and Python tabs.
3. Find the appropriate template in the dev new list for each of the programming languages supported for chapter {chapter}
4. Carefully analyze the test yaml for the samples to understand how to generate, build, and run the samples for chapter {chapter}
5. Slowly consider all that you have learned from above, and determine what you will need to do to complete chapter {chapter}
6. Finally, write chapter {chapter} to disk using the filename you read the notes from.

Final notes:
* Do **NOT** create any new files; only update the appropriate file for chapter {chapter}
* Double check that you've covered each of the programming languages that are supported for chapter {chapter}'s scenario
* Double check that you've kept the "non-streaming" information in the C#, Go, Java, JavaScript, and Python tabs
* Don't forget to use `title=...` for bash code blocks
* For python and java, always remember to separate some parts of the gen/build/run w/ tabs for Windows/macOS/Linux
* When adding tabs, be sure to indent the content contained inside the tab

Now, do your work; don't tell me what you're going to do, just do it.

Write chapter {chapter}/save it into `{chapter_filename}` using the functions provided.
