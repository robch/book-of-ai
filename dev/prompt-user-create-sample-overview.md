{@dev/prompt--info--background.md}

samples_src_dir:         `{samples_src_dir}`         (or `docs/samples` if not defined)  

old_sample_docs_dir:     `{old_sample_docs_dir}`     (or `docs/sk-chat` if not defined)
old_sample_doc_fqn:      `{old_sample_doc_fqn}`      (or `docs/sk-chat/basics.md` if not defined)  
old_sample_overview_fqn: `{old_sample_overview_fqn}` (or `docs/sk-chat/sk-chat-streaming-cs/sample-overview.md` if not defined)  
old_sample_snippets_dir: `{old_sample_snippets_dir}` (or `snippets/sk-chat-basics` if not defined)

new_sample_lang:         `{new_sample_lang}`         (or `cs` if not defined)  
new_sample_name:         `{new_sample_name}`         (or `sk-chat-streaming-with-functions-cs` if not defined)  
new_sample_short_name:   `{new_sample_short_name}`   (or `sk-chat-streaming-with-functions` if not defined)
new_sample_overview_fqn: `{new_sample_overview_fqn}` (or `docs/sk-chat/{new_sample_name}/sample-overview.md` if not defined)  
new_sample_doc_fqn:      `{new_sample_doc_fqn}`      (or `docs/sk-chat/functions.md` if not defined)  
new_sample_old_doc_fqn:  `{new_sample_old_doc_fqn}`  (or `docs/chapter-31-semantic-kernel-w-function-calling.md` if not defined)
new_sample_snippets_dir: `{new_sample_snippets_dir}` (or `snippets/sk-chat-functions` if not defined)  

## your task

Your task is to update documentation for {new_sample_name} by creating/updating a page discussing the C# sample (which lives in `{samples_src_dir}/{new_sample_name}`).

Tasks to perform:
1. Carefully read the chapter `{old_sample_overview_fqn}`.
2. Analyze how we've documented the steps in the sample from the source files.
3. Now, carefully read `{old_sample_doc_fqn}` and its associated include files.
4. Find the section discussing the C# sample that has not yet been documented.
5. Read all the files in that sample directory to understand the code.
6. Create an new markdown page called `{new_sample_overview_fqn}`.
7. In the new markdown page, follow the same format as `{old_sample_overview_fqn}`.
8. Save the new markdown page into as `{new_sample_overview_fqn}`.
9. Carefully read `{new_sample_snippets_dir}/{new_sample_lang}/generate-code.md` and ensure the links to the sample overview and the key source files are correct.
10. Those links to to the `sample-overview.md` and the key source files should look something like this (but with the correct paths/filenames for this sample):

    ```markdown
        ??? example "See the code; learn how it works..."

            [:material-file-code: Program.cs](./samples/{new_sample_name}/Program.cs)  
            [:material-file-code: FILE2.cs](./samples/{new_sample_name}/FILE2.cs)  
            [:material-file-code: FILE3.cs](./samples/{new_sample_name}/FILE3.cs)  

            [:material-file-document-outline: Deep dive on how it works](./{new_sample_name}/sample-overview.md)
    ```

11. Save the updated files to the correct directories using the functions provided.

Final notes:
* Do **NOT** create any new files, other than the one new sample overview file.
* Double check that you've covered the key points in the sample(s) in the new page like were covered in `{old_sample_overview_fqn}`.
* Don't forget to use `title=...` for bash code blocks

Now, do your work; don't tell me what you're going to do, just do it.
