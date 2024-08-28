Here's a set of instructions I'm giving someone to do a job: "create a markdown file for a particular topic/chapter, and be sure to update a specific language for either streaming or non streaming":

```markdown
{@prompt-user-create-sample-overview.md}
```

I've used it to create many chapters. Now I want to update the prompt to instead, it'll be given a sample name (e.g. `openai-chat` or `openai-chat-streaming`); from that a sample directory name can be created (e.g. `{sample_name}-{language}`; which is a directory where a specific sample lives, such as `openai-chat-py` (a non streaming sample)).

The goal of this new prompt is to ensure that the sample for that language is represented in the chapter. If it is not present it'll be added. If it's already present, the prompt will instruct the reader to simply output the text: "The {sample_name} for {language} is already present."

Additionally, the sample's overview should be created and populated, as per previous template was used to create the chapter and sample overview. 

Please update that prompt now, and save it in a new file, named `prompt-user-add-sample-language-to-chapter.md`. 