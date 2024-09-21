{@prompt--info--background.md}

samples_src_dir:         `{samples_src_dir}`         (or `docs/samples` if not defined)  

old_sample_name:         `{old_sample_name}`         (or `sk-chat-streaming` if not defined)  
old_sample_docs_dir:     `{old_sample_docs_dir}`     (or `docs/sk-chat` if not defined)
old_sample_doc_fqn:      `{old_sample_doc_fqn}`      (or `docs/sk-chat/basics.md` if not defined)  
old_sample_overview_fqn: `{old_sample_overview_fqn}` (or `docs/sk-chat/{old_sample_name}/sample-overview.md` if not defined)  
old_sample_snippets_dir: `{old_sample_snippets_dir}` (or `snippets/sk-chat-basics` if not defined)

new_sample_lang:         `{new_sample_lang}`         (or `cs` if not defined)  
new_sample_name:         `{new_sample_name}`         (or `sk-chat-with-agents-cs` if not defined)  
new_sample_short_name:   `{new_sample_short_name}`   (or `sk-chat-with-agents` if not defined)
new_sample_overview_fqn: `{new_sample_overview_fqn}` (or `docs/sk-chat/{new_sample_name}/sample-overview.md` if not defined)  
new_sample_doc_fqn:      `{new_sample_doc_fqn}`      (or `docs/sk-chat/agents.md` if not defined)  
new_sample_old_doc_fqn:  `{new_sample_old_doc_fqn}`  (or `docs/chapter-32-semantic-kernel-w-basic-agents.md` if not defined)
new_sample_snippets_dir: `{new_sample_snippets_dir}` (or `snippets/sk-chat-agents` if not defined)  

## The General Task

I want to create a new `{new_sample_doc_fqn}` file (and hook it up where I currently have `{new_sample_old_doc_fqn}`).

That new "help content" will have both a "Tutorial" and a "Generate Code" section (tab).
- The Tutorial section will include content from `snippets/{new_sample_snippets_dir}/tutorial.md`.
- The Generate Code section will look very similar in style and structure to the `{old_sample_snippets_dir}/generate-code.md` file

I want all the tabs for C#, Java, and Python.
- For each, follow the same approach you'll find under `{old_sample_snippets_dir}/`.
- For the C# parts, we'll be using the `ai dev new {new_sample_short_name}` template.
- I've already expanded that at `{samples_src_dir}/{new_sample_name}`
- For the other languages, we don't have a sample yet
  - but ... you can follow the general structure/style for those other languages,
  - and when you get to the Generate, Build, and Run part, just show the under construction type message: `... 🚧 UNDER CONSTRUCTION 🚧 ...`

## The Specific Task

1. Find all the files under `{old_sample_docs_dir}`
2. Find all the files under `{old_sample_snippets_dir}`
3. Read the `{old_sample_doc_fqn}` file and all include files it includes
4. Read the `{old_sample_snippets_dir}/generate-code.md` file and all include files it includes
5. Read the Semantic Kernel C# sample from `{samples_src_dir}/{new_sample_name}`
6. Create a new `{new_sample_doc_fqn}` file with the appropriate content
7. Create a new `{new_sample_snippets_dir}` directory with the appropriate content in the following files:

    generate-code.md  
    tutorial.md  
    cs/generate-code.md  
    cs/list-samples.md  
    cs/tab.md  
    java/generate-code.md  
    java/list-samples.md  
    java/tab.md  
    py/generate-code.md  
    py/list-samples.md  
    py/tab.md  

**KEY NOTES**:  
- Before writing a file, be sure you've already read the corresponding file from the files/directories above.
- Do not skip any content that is included in the files you're reading, unless it's content for an unsupported programming language.
- When you get to the Generate, Build, and Run part for the non-C# languages, just show the under construction type message: `... 🚧 UNDER CONSTRUCTION 🚧 ...`
- But... You must still create the tab and the list-samples.md files for those languages with full fidelity to the structure and style of the C# files.
- In the new documentation, all the `ai dev new` commands that previously used `{old_sample_name}` should now use `{new_sample_short_name}`.
- If you cannot find a file you need, to not proceed until you've found it or asked me for help.

### Do it now

Now, do your work; don't tell me what you're going to do, just do it.
