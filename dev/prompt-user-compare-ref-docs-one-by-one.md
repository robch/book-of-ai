{@prompt--info--background.md}

## The General Task

We're currently working to ensure that all our reference documentation is written in a consistent style.  

Your job is to compare two reference documents and identify differences in style/approach.

Consider things like:  
- Inclusion of front matter to do things like hide the toc  
- Titling the page  
  - Uses what type of heading (`#` or `##` or other)  
  - If it's showing a "command" (e.g. `ai init`, `ai chat ...` etc.)  
    * Is it using inline code formatting or not  
    * Is it using lower case for the command or not  
    * Is it using lower/upper/mixed case for the rest of the title  
- Does it show a description after title before usage block?  
  - How long or short is that description?  
  - Does it use inline code formatting for any part of the description?  
- Showing "USAGE:"  
  - uses inline code block or not?  
  - shows placeholder for options or not? (e.g. `--id ID`)  
  - in what way does it show placeholder?  
  - don't consider having sub-commands vs not having sub-commands as a difference
- Options in a table or not?  
  - How is options table column headered?  
  - What are the columns? (should be two, one for the option, one for the description)  
  - are the options inline code blocked?  
  - are the parameters to those options shown? casing of them?  
  - if one file's command doesn't have options (like `ai dev new`) and another does, don't consider the presence/lack of options as a difference.
- If there are sub-commands, how are they shown?  
  - Are they in a table (should be)?
  - Are they inline code formatted? (commands should be shown in full `ai chat assistant create` not `create`)  
  - Are they lower/upper/mixed case?  
  - Are they shown in a table?  
  - Are they shown in a list?  
  - Are they shown in a code block?  
  - Is the sub command linked to the appropriate page in the reference docs?  
- Additional sections  
  - Are there additional sections?  
  - How are they titled?  
  - Are they using `#` or `##` or other?  
  - Are they using inline code formatting?  
  - Are they using lower/upper/mixed case for the rest of the title
- Examples  
  - Are they shown in a code block? single? multiple?  
  - How are they titled properly?  
  - Are there headers above one or more?   
  - Words and style of text in headers above examples?  
- Is there a "SEE ALSO" or ~Additional Info section?  
  - How is it titled?  
  - How are the links shown?  
  - Are they inline code formatted?  
  - Are they lower/upper/mixed case?  
  - Do they have links? to what? style of links? wording of links?  
  - Should it really be there? is it an artifact of some AI generated text or thoughtfully needed?  

## The specifics of the task

File1: docs/reference/cli/{file1}
File2: docs/reference/cli/{file2}
OutputFile: `comparison-{file1}-{file2}.md`

1. Read through both files carefully.
2. Create a markdown file in the current directory, using the OutputFile name. 
3. In the new markdown file, create a table with the following columns:
   - `Element`  
   - `File1 ([{file1}](docs/reference/cli/{file1}))`  
   - `File2 ([{file2}](docs/reference/cli/{file2}))`
   - `Substantive differences`
4. For each of the elements listed above, compare the two files and note any substantive differences in the `Comments` column.
   - Only note differences that are substantive.
   - If there are no differences, do not include the row in the table.
   - If there are differences, include the row in the table.
   - in the File1/File2 columns, don't include exact text from the file, just note descriptive differences.
5. Save the new markdown file into the current directory.

Do you work; don't tell me what you're going to do, just do it.

Don't forget to save you work using the OutputFile named above, in the current directory.
