{@prompt--info--background.md}

## The General Task

I want to create a new `docs/sk-chat/basics.md` file (and hook it up where I currently have `docs/chapter-30-semantic-kernel-basics.md`).

That new "help content" will have both a "Tutorial" and a "Generate Code" section (tab).
- The Tutorial section will simply be a "warning construction" type thing like other things in the repo
- The Generate Code section look very similar in style and structure to the `snippets/openai-chat-basics/generate-code.md` file.

I want all the tabs for C#, Java, and Python.
- For each, follow the same approach you'll find under `snippets/openai-chat-basics/`.
- For the C# parts, we'll be using the `ai dev new `sk-chat-streaming` template.
- I've already expanded that at `docs/samples/sk-chat-streaming-cs`
- For the other languages, we don't have a sample yet
  - but ... you can follow the general structure/style for those other languages,
  - and when get to the Generate, Build, and Run part, just show the under construction type message: `... 🚧 UNDER CONSTRUCTION 🚧 ...`

## The Specific Task

1. Find all the files under `docs/openai-chat`
2. Find all the files under `snippets/openai-chat-basics`
3. Read the `docs/openai-chat/basics.md` file and all include files it includes
4. Read the `snippets/openai-chat-basics/generate-code.md` file and all include files it includes
5. Read the Semantic Kernel C# sample from `samples/sk-chat-streaming-cs`
6. Create a new `docs/sk-chat/basics.md` file with the appropriate content
7. Create a new `snippets/sk-chat-basics` directory with the appropriate content in the following files:

    generate-code.md  
    tutorial.md  
    cs/generate-code-streaming.md  
    cs/list-samples.md  
    cs/tab.md  
    java/generate-code-streaming.md  
    java/list-samples.md  
    java/tab.md  
    py/generate-code-streaming.md  
    py/list-samples.md  
    py/tab.md  

**KEY NOTES**:  
- Before writing a file, be sure you've already read the corresponding file from the `openai-chat*` directories.
- Do not skip any content that is included in the files you're reading, unless it's content for an unsupported programming language.
- When you get to the Generate, Build, and Run part for the non-C# languages, just show the under construction type message: `... 🚧 UNDER CONSTRUCTION 🚧 ...`
- But... You must still create the tab and the list-samples.md files for those languages with full fidelity to the structure and style of the C# files.
