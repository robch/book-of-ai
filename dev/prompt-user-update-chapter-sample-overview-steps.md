{@dev\prompt--info--background.md}

## CHECK THIS FIRST

If `{sample_overview}` does not indicate a file that already exists, then, stop reading the rest of these instructions. Simply output "File does not exist." and then stop.

## SAMPLES AND OVERVIEWS

There are many samples in the book. Each sample has a 'sample overview' that describes the sample and the steps to run the sample. Each sample overview is in a file named 'sample-overview.md'.

Samples have a "short name" and a "long name". The short name indicates the sample's purpose, and the long name additionally includes the programming language. For example, the short name for the sample that demonstrates how to use the Azure Cognitive Services Speech SDK for continuous speech recognition is 'speech-to-text-continuous-reco', and the long name for the Python version of this sample is 'speech-to-text-continuous-reco-py'.

Here's a list of all "long names" for the samples:

```
az-inference-chat-streaming-cs
az-inference-chat-streaming-py
openai-asst-cs
openai-asst-js
openai-asst-py
openai-asst-streaming-cs
openai-asst-streaming-js
openai-asst-streaming-py
openai-asst-streaming-with-code-cs
openai-asst-streaming-with-code-js
openai-asst-streaming-with-code-py
openai-asst-streaming-with-file-search-cs
openai-asst-streaming-with-file-search-js
openai-asst-streaming-with-file-search-py
openai-asst-streaming-with-functions-cs
openai-asst-streaming-with-functions-js
openai-asst-streaming-with-functions-py
openai-asst-webpage-js
openai-asst-webpage-ts
openai-asst-webpage-with-functions-js
openai-chat-cs
openai-chat-go
openai-chat-java
openai-chat-js
openai-chat-py
openai-chat-streaming-cs
openai-chat-streaming-go
openai-chat-streaming-java
openai-chat-streaming-js
openai-chat-streaming-py
openai-chat-streaming-with-data-cs
openai-chat-streaming-with-data-go
openai-chat-streaming-with-data-java
openai-chat-streaming-with-data-js
openai-chat-streaming-with-data-py
openai-chat-streaming-with-functions-cs
openai-chat-streaming-with-functions-go
openai-chat-streaming-with-functions-js
openai-chat-streaming-with-functions-py
openai-chat-webpage-js
openai-chat-webpage-ts
openai-chat-webpage-with-functions-js
openai-chat-webpage-with-functions-ts
openai-chat-webpage-with-speech-ts
phi3-onnx-chat-streaming-cs
phi3-onnx-chat-streaming-with-functions-cs
sk-chat-streaming-cs
sk-chat-streaming-with-data-cs
sk-chat-streaming-with-functions-cs
sk-chat-with-agents-cs
speech-to-text-continuous-reco-cs
speech-to-text-continuous-reco-py
speech-to-text-cs
speech-to-text-py
speech-to-text-with-file-cs
speech-to-text-with-file-py
speech-to-text-with-keyword-cs
speech-to-text-with-keyword-py
speech-to-text-with-translation-cs
speech-to-text-with-translation-py
text-to-speech-cs
text-to-speech-py
text-to-speech-with-file-cs
text-to-speech-with-file-py
```

The actual source code for the samples is located at: `docs/samples/{long-name}`.

Here's where the sample overviews are located in the book:

```
docs\azure-ai-chat\azure-ai-chat-streaming-cs\sample-overview.md
docs\azure-ai-chat\azure-ai-chat-streaming-py\sample-overview.md
docs\github-chat\github-chat-streaming-cs\sample-overview.md
docs\github-chat\github-chat-streaming-py\sample-overview.md
docs\onnx-chat\onnx-chat-streaming-cs\sample-overview.md
docs\onnx-chat\onnx-chat-streaming-with-functions-cs\sample-overview.md
docs\openai-asst\openai-asst-non-streaming-cs\sample-overview.md
docs\openai-asst\openai-asst-non-streaming-js\sample-overview.md
docs\openai-asst\openai-asst-non-streaming-py\sample-overview.md
docs\openai-asst\openai-asst-streaming-cs\sample-overview.md
docs\openai-asst\openai-asst-streaming-js\sample-overview.md
docs\openai-asst\openai-asst-streaming-py\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-code-cs\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-code-js\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-code-py\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-file-search-cs\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-file-search-js\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-file-search-py\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-functions-cs\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-functions-js\sample-overview.md
docs\openai-asst\openai-asst-streaming-with-functions-py\sample-overview.md
docs\openai-chat\openai-chat-functions-cs\sample-overview.md
docs\openai-chat\openai-chat-functions-go\sample-overview.md
docs\openai-chat\openai-chat-functions-js\sample-overview.md
docs\openai-chat\openai-chat-functions-py\sample-overview.md
docs\openai-chat\openai-chat-non-streaming-cs\sample-overview.md
docs\openai-chat\openai-chat-non-streaming-go\sample-overview.md
docs\openai-chat\openai-chat-non-streaming-java\sample-overview.md
docs\openai-chat\openai-chat-non-streaming-js\sample-overview.md
docs\openai-chat\openai-chat-non-streaming-py\sample-overview.md
docs\openai-chat\openai-chat-streaming-cs\sample-overview.md
docs\openai-chat\openai-chat-streaming-go\sample-overview.md
docs\openai-chat\openai-chat-streaming-java\sample-overview.md
docs\openai-chat\openai-chat-streaming-js\sample-overview.md
docs\openai-chat\openai-chat-streaming-py\sample-overview.md
docs\openai-chat\openai-chat-streaming-with-data-cs\sample-overview.md
docs\openai-chat\openai-chat-streaming-with-data-go\sample-overview.md
docs\openai-chat\openai-chat-streaming-with-data-java\sample-overview.md
docs\openai-chat\openai-chat-streaming-with-data-js\sample-overview.md
docs\openai-chat\openai-chat-streaming-with-data-py\sample-overview.md
docs\sk-chat\sk-chat-streaming-cs\sample-overview.md
docs\sk-chat\sk-chat-streaming-with-functions-cs\sample-overview.md
docs\sk-chat\sk-chat-with-agents-cs\sample-overview.md
docs\speech\speech-to-text-continuous-reco-cs\sample-overview.md
docs\speech\speech-to-text-continuous-reco-py\sample-overview.md
docs\speech\speech-to-text-cs\sample-overview.md
docs\speech\speech-to-text-py\sample-overview.md
docs\speech\speech-to-text-with-file-cs\sample-overview.md
docs\speech\speech-to-text-with-file-py\sample-overview.md
docs\speech\speech-to-text-with-keyword-cs\sample-overview.md
docs\speech\speech-to-text-with-keyword-py\sample-overview.md
docs\speech\speech-to-text-with-translation-cs\sample-overview.md
docs\speech\speech-to-text-with-translation-py\sample-overview.md
docs\speech\text-to-speech-cs\sample-overview.md
docs\speech\text-to-speech-py\sample-overview.md
```

## SAMPLE OVERVIEW FILES

For all the samples, the steps in the sample overview files are somewhat similar across programming languages. However, there are also some differences.

**Similarities**:  
- One of the first step in nearly all the samples is to read the configuration settings from environment variables.  
- Most (but not all) samples use a helper class to interact with the API.  
- Most (but not all) samples use a loop to obtain user input, use the helper class to get the assistant's response, and display responses as they are received.  
- Most (but not all) chat samples have to deal with the chat history, by putting user input into the messages list, interacting with the API to get the response, and then updating the messages list with the response.  
- Most (but not all) streaming chat samples have to deal with streaming, by using a callback function to display the response as it is received.  
- Most (but not all) validate the environment variables; if the sample does this, be sure to include it in the steps for the sample as a separate step.  
- Similarities exist across the programming languages for a given sample (e.g. `openai-asst-streaming-cs` is similar to `openai-asst-streaming-js` and `openai-asst-streaming-py`).  
- Similarities exist across areas (such as `openai-*` samples, or across `onnx-*` samples, or across `speech-*` samples).  

**Differences**:  
- `openai-asst-*` samples don't have a chat history, per se, like other chat samples; instead they use "threads" to manage the conversation.  
- `speech-*` samples are quite different from chat samples, as they deal with speech synthesis, recognition, and translation.  

## YOUR TASK

We've recently updated the sample code for the one of the samples in the book. It's path and filename are: `{sample_overview}`.

Your task is to read the source code for the sample in `docs/samples/{long-name}` and compare it to the steps in the `sample-overview.md` file.  
You will then update the `sample-overview.md` file with the correct steps and updated source code from the current sample.  

The steps in the `sample-overview.md` may or may not need to be changed to reflect the updated source code.  
The source code blocks in the `sample-overview.md` may or may not need to be updated to reflect the current source code.  

To better track the changes, you will be outputing 3 files, in addition to a new `sample-overview.md` file.  
* You will be outputing a list of the steps that are **currently** in the `sample-overview.md` file.  
* You will be outputing a list of the steps that **should** be in the `sample-overview.md` file.  
* You will be outputing a list of source code that **should** be updated in the `sample-overview.md` file.  

You will determine what the correct "steps" and "source code" should be for that sample by:
- Inspecting the current steps and the source code in the current `sample-overview.md` file.  
- Inspecting the updated source code for the sample in `docs/samples/{long-name}`.
- Finding the changes to the updated source code that need to be reflected in the `sample-overview.md` file.
- Do not remove steps that are already in the `sample-overview.md` file unless the underlying sample doesn't contain that code anymore.  

You will document the "current" steps in a file named `sample-overview-current-steps.md`.  
You will document the "should be" steps in a file named `sample-overview-should-be-steps.md`.  
You will document the "source code updates" in a file named `sample-overview-source-code-updates.md`.  
You will create a new `sample-overview.md` file with the correct steps and updated source code from the current sample.  

These files will be located in a new `docs2/{area}/{long-name}` directory (so we can do a tree comparison between `docs/{area}` and `docs2/{area}`).
This is a parallel directory to `docs/{area}/{long-name}` ...
... where `area`==`speech`, `openai-chat`, `openai-asst`, `onnx-chat`, `azure-ai-chat`, etc.  

## FORMATS

`sample-overview-current-steps.md` and `sample-overview-should-be-steps.md` share the same format (tabbed here for readability... but not in the actual file):

    # {short-name}

    ## {sample_overview}
  
    `FILE1`:
    STEP 1: ...
    STEP 2: ...
    STEP 3: ...
    ...

    `FILE2`:
    STEP 1: ...
    STEP 2: ...
    ...

    `...`:
    ...

Additionally, in the `sample-overview-should-be-steps.md` file, you should include a section at the end of the file that explains the changes you made and why you made them.
- Specifically, call out which other samples/steps you used as a reference, and why you made the changes you did.

`sample-overview.md` typically follows this format (tabbed here for readability... but not in the actual file):

    ---
    hide:
    - navigation
    - toc
    ---
    # {TITLE}

    This sample demonstrates ... in a {LANGUAGE} console application.

    [:material-file-code: {FILE1}](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/{long-name}/{FILE1})  
    [:material-file-code: {HELPER-CLASS}.{EXT}](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/{long-name}/{HELPER-CLASS}.{EXT})
    [:material-file-code: {FILE3}.{EXT}](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/{long-name}/{FILE3})
    ...

    ??? tip "How to generate this sample"

        ``` bash title="Command"
        ai dev new {short-name} --{LANGUAGE}
        ```

        ``` text title="Output"
        AI - Azure AI CLI, Version 1.0.0
        Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

        This PUBLIC PREVIEW version may change at any time.
        See: https://aka.ms/azure-ai-cli-public-preview

        Generating '{short-name}' in '{long-name}' ({COUNT} files)...

        {FILE1}
        {FILE2}
        ...

        Generating '{short-name}' in '{long-name}' ({COUNT} files)... DONE!
        ```

    ## FILE1

    **STEP 1**: ...

    ``` csharp title="{FILE1}"
    ...
    ```

    **STEP 2**: ...

    ``` csharp title="{FILE1}"
    ...
    ```

    ...

NOTE:  
- Steps (`STEP {N}: ...`) in `sample-overview.md` should always end with `.` and not with `:` .
* Do **NOT** remove any sections that are already in the sample overview page unless the underlying sample doesn't contain that code anymore.  
* Do **NOT** discuss the `ReadLineWrapper` capabilities in the sample overview page for js samples.  
* Do **NOT** document or discuss imports or using statements in the sample overview page.   
* Do **NOT** arbitrarily the indentation of existing code blocks (unless it's to fix a formatting issue that you're confident you'll be fixing by changing).  
* Do **NOT** discuss wrapping `main()` with exception handling in python sample overviews.  
* Do **NOT** discuss `requirements.txt` in the sample overview page for python samples.  
* Readers of the `sample-overview.md` file will use it to boot strap their understanding of the sample. It's important that the steps are clear, concise, and accurate.
* For some samples, the `{long-name}` might contain `-non-streaming` in the name. Sometimes that's not actually the `{long-name}` of the sample. If you can't find the sample in the `docs/samples` directory, then you should use the `{long-name}` without `-non-streaming` in the name.

## YOUR APPROACH

1. Read the contents of the `sample-overview.md` file. Write down your initial understanding and any questions that arise.  
2. Read the updated source code for the sample in `docs/samples/{long-name}`. Pause periodically to jot down any notes or insights about the source code that may be pertinent to the overview.  
3. After gathering all the information, form a cohesive understanding and decide what the correct "steps" and "source code" should be for that sample. You should do this by connecting the dots of all previously gathered information.
4. Now, document your initial understanding (from step 1) as the "current" steps in a new file named `sample-overview-current-steps.md`, located in the `docs2/{area}/{long-name}` directory.
5. Then, use your cohesive understanding (from step 3) to outline the new, corrected steps. Document these steps as the "should be" steps in a file named `sample-overview-should-be-steps.md`, also located in the `docs2/{area}/{long-name}` directory.
6. Next, document the source code that should be updated in the `sample-overview.md` file. Document this in a file named `sample-overview-source-code-updates.md`, located in the `docs2/{area}/{long-name}` directory.  
7. Finally, if changes are deemed necessary for steps or new source code, re-write the `sample-overview.md` file with the correct steps, and the correct source code, and save it in the `docs2/{area}/{long-name}` directory. The new `sample-overview.md` file should demonstrate a clear and logical progression from the current state to the desired state.  

## DO IT NOW

OK. Let's get started. It's important that you do a great job on this task. 

Don't tell me about what you've learned. Don't tell me about what you're doing, or what you've done. Simply create the files requested.  