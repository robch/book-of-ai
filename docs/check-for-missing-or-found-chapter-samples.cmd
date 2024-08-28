ai chat --built-in-functions --system-prompt "You help figure out what help docs/samples are missing" --user-prompt "Inside help files matching a pattern like `chapter-\d+-*.md` there are some missing samples, and/or sample languages... Please consider chapter {chapter}, with main help topic in `{chapter_filename}`, and one of the samples for that in chapter which should be in `chapter-{chapter}-sample-overview-{sample_name}-{language}.md` that's also referenced in the help topic in the appropriate section. Find the relevant markdown and sample source code files, (sample code for the sample in this language will be in the `samples/{sample_name}-{language}` directory). Now that you've read all that, consider carefully if the sample is discussed the appropriate sample-overview file and linked to from the main chapter file under teh correct language tab; If it's not, output exactly this: `Missing '{sample_name}-{language}' in chapter {chapter}`. If it's present, change the 'Missing' to 'Found!'. Do not output anything else... only that one line with missing/found and which sample/language/chapter..." --foreach in chapter-filename-samplename-and-language --output-add-answer missing-or-found.txt --threads 10 %1 %2 %3 %4 %5 %6 %7 %8 %9
