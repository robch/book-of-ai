AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

------------
ai help chat
------------
CHAT

  The ai chat command initiates interactive or non-interactive conversations
  with an AI language model (e.g. OpenAI's GPT4).

USAGE: ai chat [...]
   OR: ai chat <sub-command> [...]

  CONNECTION                            (see: ai help connection)
    --deployment DEPLOYMENT             (see: ai help chat deployment)
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  INPUT                                 (see: ai help chat input)
    --interactive                       (see: ai help chat interactive)
    --system PROMPT                     (see: ai help chat system prompt)
    --user MESSAGE                      (see: ai help chat user message)
    --chat-history FILE                 (see: ai help chat history)

  CHAT WITH ASSISTANT
    --assistant-id ID                   (see: ai help chat assistant id)
    --thread-id ID                      (see: ai help chat thread id)

  CHAT WITH DATA                        (see: ai help chat with data)
    --index-name INDEX                  (see: ai help index name)
    --search-endpoint ENDPOINT          (see: ai help search endpoint)
    --search-api-key KEY                (see: ai help search key)

  HELPER FUNCTIONS                      (see: ai help chat helper functions)
    --built-in-functions TRUE           (see: ai help chat built-in helper functions)
    --custom-functions PATTERN          (see: ai help chat custom helper functions)

  OPTIONS                               (see: ai help chat options)
    --temperature TEMPERATURE           (see: ai help chat options temperature)
    --max-tokens MAX_TOKENS             (see: ai help chat options max-tokens)
    --top-p TOP_P                       (see: ai help chat options top-p)
    --n N                               (see: ai help chat options n)

  SUB-COMMANDS
    ai chat assistant [...]             (see: ai help chat assistant)

EXAMPLEs

  ai init openai
  ai chat --interactive
  ai chat --user "What can you do?"

SEE ALSO

  ai help chat examples
  ai help find topics chat

----------------------
ai help chat assistant
----------------------
CHAT ASSISTANT

  The ai chat assistant commands manage OpenAI Assistants and
  related resources.

COMMANDS

  ai chat assistant create [...]          (see: ai help chat assistant create)
  ai chat assistant update [...]          (see: ai help chat assistant update)
  ai chat assistant delete [...]          (see: ai help chat assistant delete)

  ai chat assistant list [...]            (see: ai help chat assistant list)
  ai chat assistant get [...]             (see: ai help chat assistant get)

SUB-COMMANDS

  ai chat assistant file [...]            (see: ai help chat assistant file)
  ai chat assistant vector-store [...]    (see: ai help chat assistant vector-store)

ADDITIONAL TOPICS

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

-----------------------------
ai help chat assistant create
-----------------------------
CHAT ASSISTANT CREATE

  The ai chat assistant create command creates a new OpenAI Assistant.

USAGE: ai chat assistant create [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  ASSISTANT
    --name NAME
    --deployment DEPLOYMENT
    --instructions INSTRUCTIONS

  FILE SEARCH
    --file FILE
    --files FILE1 [...]
    --file-id ID
    --file-ids ID1 [...]
    --file-search TRUE/FALSE

  TOOLS
    --code-interpreter TRUE/FALSE

  OUTPUT
    --output-id @@FILE
    --output-name @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLEs

  ai chat assistant create --name "My Assistant" --instructions "You are a helpful Assistant."
  ai chat assistant create --name "My Assistant 2" --instructions "You are a helpful Assistant." --files "**/*.md"

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

-----------------------------
ai help chat assistant delete
-----------------------------
CHAT ASSISTANT DELETE

  The ai chat assistant delete command deletes an existing OpenAI Assistant.

USAGE: ai chat assistant delete [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  DELETE ASSISTANT
    --id ID

EXAMPLE

  ai chat assistant delete --id asst_UM1L8Z0yZzGCJoD5mgQYByeZ

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

-------------------------------
ai help chat assistant examples
-------------------------------
CHAT ASSISTANT EXAMPLES

  EXAMPLE 1: Create or select OpenAI resource and model deployments

    ai init

  EXAMPLE 2: Create an OpenAI assistant

    ai chat assistant create --name "My Assistant" --instructions "You are a helpful Assistant."

  EXAMPLE 3: Create an OpenAI assistant w/ File Search

    ai chat assistant create --name "My Assistant" --instructions "You are a helpful Assistant." --files "**/*.md"

  EXAMPLE 4: Chat with a previously created assistant

    ai chat assistant list
    ai chat --assistant-id ID --interactive

  EXAMPLE 5: Create sample Node.js source code

    ai dev new openai-asst-streaming --javascript

  EXAMPLE 6: Create interactive browser javascript source code 

    ai dev new openai-asst-webpage-with-functions --javascript

SEE ALSO

  ai help chat
  ai help chat assistant
  ai help find topics chat assistant

---------------------------
ai help chat assistant file
---------------------------
CHAT ASSISTANT FILE

  The ai chat assistant file commands manage OpenAI Assistant files.

COMMANDS

  ai chat assistant file upload [...]   (see: ai help chat assistant file upload)
  ai chat assistant file delete [...]   (see: ai help chat assistant file delete)

  ai chat assistant file list [...]     (see: ai help chat assistant file list)

ADDITIONAL TOPICS

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

----------------------------------
ai help chat assistant file delete
----------------------------------
CHAT ASSISTANT FILE DELETE

  The ai chat assistant file delete command deletes an OpenAI Assistant file.

USAGE: ai chat assistant file delete [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  DELETE FILE
    --id ID

EXAMPLE

  ai chat assistant file delete --id assistant-rWdFtg0oCGtlZFZzZGC3rGhQ

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

--------------------------------
ai help chat assistant file list
--------------------------------
CHAT ASSISTANT FILE LIST

  The ai chat assistant file list command lists OpenAI Assistant files.

USAGE: ai chat assistant file list [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  OUTPUT
    --output-ids @@FILE
    --output-names @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLE

  ai chat assistant file list

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

----------------------------------
ai help chat assistant file upload
----------------------------------
CHAT ASSISTANT FILE UPLOAD

  The ai chat assistant file upload command uploads a new OpenAI Assistant file.

USAGE: ai chat assistant file upload [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  UPLOAD
    --file FILE
    --files FILE1 [...]

  OUTPUT
    --output-id @@FILE
    --output-name @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLE

  ai chat assistant file upload --file README.md
  ai chat assistant file upload --files **\*.md

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

--------------------------
ai help chat assistant get
--------------------------
CHAT ASSISTANT GET

  The ai chat assistant get command deletes an existing OpenAI Assistant.

USAGE: ai chat assistant get [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  GET
    --id ID                             (see: ai help chat assistant id)

EXAMPLE

  ai chat assistant get --id asst_UM1L8Z0yZzGCJoD5mgQYByeZ

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

-------------------------
ai help chat assistant id
-------------------------
CHAT ASSISTANT ID

  The --assistant-id option allows you to specify an assistant ID
  acquired via ai chat assistant create or ai chat assistant list.

USAGE: ai chat --assistant-id ASSISTANT_ID
   OR: ai chat --assistant-id @FILE

WHERE: ASSISTANT_ID is the ID of the assistant you wish to use.
   OR: @FILE is a file containing the assistant ID.

SEE ALSO

  ai help chat assistant create
  ai help chat assistant list

---------------------------
ai help chat assistant list
---------------------------
CHAT ASSISTANT LIST

  The ai chat assistant list command lists OpenAI Assistants.

USAGE: ai chat assistant list [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  OUTPUT
    --output-ids @@FILE
    --output-names @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLE

  ai chat assistant list

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

-----------------------------
ai help chat assistant update
-----------------------------
CHAT ASSISTANT UPDATE

  The ai chat assistant update command updates an existing OpenAI Assistant.

USAGE: ai chat assistant update [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  ASSISTANT
    --name NAME
    --deployment DEPLOYMENT
    --instructions INSTRUCTIONS

  FILE SEARCH
    --file FILE
    --files FILE1 [...]
    --file-id ID
    --file-ids ID1 [...]
    --file-search TRUE/FALSE

  TOOLS
    --code-interpreter TRUE/FALSE

EXAMPLEs

  ai chat assistant update --instructions "You answer questions about C# code"
  ai chat assistant update --files "**/*.cs"

SEE ALSO

  ai help chat examples
  ai help chat assistant examples
  ai help find topics chat assistant

-----------------------------------
ai help chat assistant vector-store
-----------------------------------
CHAT ASSISTANT

  The ai chat assistant vector-store commands manage OpenAI Assistant
  Vector Stores.

COMMANDS

  ai chat assistant vector-store create [...]      (see: ai help chat assistant vector-store create)
  ai chat assistant vector-store update [...]      (see: ai help chat assistant vector-store update)
  ai chat assistant vector-store delete [...]      (see: ai help chat assistant vector-store delete)

  ai chat assistant vector-store list [...]        (see: ai help chat assistant vector-store list)
  ai chat assistant vector-store get [...]         (see: ai help chat assistant vector-store get)

ADDITIONAL TOPICS

  ai help chat assistant examples
  ai help chat assistant vector-store examples
  ai help find topics chat assistant vector-store

------------------------------------------
ai help chat assistant vector-store create
------------------------------------------
CHAT ASSISTANT VECTOR-STORE CREATE

  The ai chat assistant vector-store create command creates a new OpenAI Assistant Vector Store.

USAGE: ai chat assistant vector-store create [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  FILES
    --file FILE
    --files FILE1 [...]
    --file-id ID
    --file-ids ID1 [...]

  VECTOR-STORE
    --name NAME

  OUTPUT
    --output-id @@FILE
    --output-name @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLE

  ai chat assistant vector-store create --name "My Vector Store" --files "**/*.md"

SEE ALSO

  ai help chat assistant examples
  ai help chat assistant vector-store examples
  ai help find topics chat assistant vector-store

------------------------------------------
ai help chat assistant vector-store delete
------------------------------------------
CHAT ASSISTANT VECTOR-STORE DELETE

  The ai chat assistant vector-store delete command deletes an existing OpenAI Assistant Vector Store.

USAGE: ai chat assistant vector-store delete [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  VECTOR-STORE
    --id ID

EXAMPLE

  ai chat assistant vector-store delete --id vs_xdAyb8HQsXRKnqCFPCTvwCYa

SEE ALSO

  ai help chat assistant examples
  ai help chat assistant vector-store examples
  ai help find topics chat assistant vector-store

--------------------------------------------
ai help chat assistant vector-store examples
--------------------------------------------
CHAT ASSISTANT VECTOR-STORE EXAMPLES

  EXAMPLE 1: Create or select OpenAI resource and model deployments

    ai init

  EXAMPLE 2: Create an OpenAI Assistant Vector Store

    ai chat assistant vector-store create --name "My Vector Store" --files "**/*.md"

  EXAMPLE 3: Update an OpenAI Assistant Vector Store
   
    ai chat assistant vector-store update --files "../more/**/*.md"

SEE ALSO

  ai help chat assistant vector-store
  ai help find topics chat assistant vector-store

---------------------------------------
ai help chat assistant vector-store get
---------------------------------------
CHAT ASSISTANT VECTOR-STORE GET

  The ai chat assistant vector-store get command deletes an existing OpenAI Assistant Vector Store.

USAGE: ai chat assistant vector-store get [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  VECTOR-STORE
    --id ID

EXAMPLE

  ai chat assistant vector-store get --id vs_xdAyb8HQsXRKnqCFPCTvwCYa

SEE ALSO

  ai help chat assistant examples
  ai help chat assistant vector-store examples
  ai help find topics chat assistant vector-store

----------------------------------------
ai help chat assistant vector-store list
----------------------------------------
CHAT ASSISTANT VECTOR-STORE LIST

  The ai chat assistant vector-store list command lists OpenAI Assistants Vector Store.

USAGE: ai chat assistant vector-store list [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  OUTPUT
    --output-ids @@FILE
    --output-names @@FILE
    --output-add-id @@FILE
    --output-add-name @@FILE

EXAMPLE

  ai chat assistant vector-store list

SEE ALSO

  ai help chat assistant examples
  ai help chat assistant vector-store examples
  ai help find topics chat assistant vector-store

------------------------------------------
ai help chat assistant vector-store update
------------------------------------------
CHAT ASSISTANT VECTOR-STORE UPDATE

  The ai chat assistant vector-store update command updates an OpenAI Assistant Vector Store.

USAGE: ai chat assistant vector-store udpate [...]

  CONNECTION
    --endpoint ENDPOINT                 (see: ai help chat endpoint)
    --key KEY                           (see: ai help chat key)

  FILES
    --file FILE
    --files FILE1 [...]

  VECTOR-STORE
    --id ID
    --name NAME

EXAMPLE

  ai chat assistant vector-store update --name "My Vector Store" --files "**/*.md"

SEE ALSO

  ai help chat assistant examples
  ai help chat assistant vector-store examples
  ai help find topics chat assistant vector-store

--------------------------------------
ai help chat built-in helper functions
--------------------------------------
CHAT

  The ai chat command initiates interactive or non-interactive conversations
  with an AI language model (e.g. OpenAI's GPT4).

  The --built-in-functions option allows the LLM to use pre-defined functions included
  in the ai CLI. These functions can be used to:

    (1) Perform basic math operations with integers and floats.
    (2) Perform file system operations, such as read, write, append, and find.
    (3) Access the current date and time.

USAGE: ai chat [...] --built-in-functions
   OR: ai chat [...] --built-in-functions TRUE/FALSE

EXAMPLE

  ai chat --built-in-functions --question "Show me the names of all the markdown files"
  ai chat --built-in-functions --question "List what helper functions you have"

SEE ALSO

  ai help chat custom helper functions
  ai help find topics chat

--------------------------------------------
ai help chat custom helper function examples
--------------------------------------------
CUSTOM HELPER FUNCTION EXAMPLES

  EXAMPLE 1: Create a custom helper function project

    ai dev new helper-functions

    ... which will create a project, with a class, that has a method like this:

      [HelperFunctionDescription("Gets the user's name")]
      public static string GetUsersName()
      {
          return Environment.UserName;
      }

  EXAMPLE 2: Create a custom helper function project with LLM instructions

    ai dev new helper-functions --instructions "Return the current date and time as a string"

    ... which will create a project, with a class, that has a method like this:

      [HelperFunctionDescription("Returns the current date and time as a string")]
      public static string GetCurrentDateTime()
      {
          return DateTime.UtcNow.ToString("o");
      }

  EXAMPLE 3: Create a custom helper function project with LLM instructions from a file

    Create a file called instructions.txt with the following contents:

      Create a new class with helper functions that C# process functions that
      can execute the git executable to do anything I want to with git. The new helper
      function should accept a string, and return a string, which is the applications
      combined output from stdout and stderr.
      
      If the caller passes in 'git ' as part of the command, ignore that part.

    ai dev new helper-functions --instructions @instructions.txt

  EXAMPLE 4: Build the helper function project into an assembly

    cd helper-functions
    dotnet build HelperFunctionsProject.csproj

  EXAMPLE 5: Use custom helper functions from an assembly

    ai chat --custom-functions **/HelperFunctionsProject.dll --interactive

SEE ALSO

  ai help chat examples
  ai help chat custom helper functions
  ai help find topics chat

------------------------------------
ai help chat custom helper functions
------------------------------------
CHAT CUSTOM HELPER FUNCTIONS

  The ai chat command initiates interactive or non-interactive conversations
  with an AI language model (e.g. OpenAI's GPT4).

  The --custom-functions option allows you to specify a pattern for custom
  helper functions that can be used by the LLM.

  Helper functions are C# static methods that allow the LLM to perform
  custom operations, such as retrieving data from a database or web service.

USAGE: ai chat [...] --custom-functions FILE1
   OR: ai chat [...] --custom-functions FILE1;FILE2[;...]
   OR: ai chat [...] --custom-functions PATTERN
   OR: ai chat [...] --custom-functions @FILELIST.txt

  WHERE: FILE1;FILE2 represent file names for assemblies containing helper functions
     OR: PATTERN represents dotnet assembly filename wildcard search pattern
     OR: FILELIST.txt is a multi-line text file containing files,
         ... or PATTERNs, listed individually, each on separate lines

EXAMPLE

  ai chat --custom-functions **/HelperFunctionsProject.dll --interactive

SEE ALSO

  ai help chat built-in helper functions
  ai help chat custom helper function examples
  ai help find topics chat

---------------------
ai help chat examples
---------------------
CHAT EXAMPLES

  EXAMPLE 1: Create or select OpenAI resource and model deployments

    ai init

  EXAMPLE 2: Chat interactively using a specific system prompt

    ai chat --interactive --system @prompt.txt

  EXAMPLE 3: Chat (non-interactively) using a specific system prompt and user input

    ai chat --system @prompt.txt --user "What can you do?"

  EXAMPLE 4: Chat using chat message history stored in a file

    ai chat --chat-history chat-history.txt --user "Tell me a joke"

  EXAMPLE 5: Chat w/ data using Azure Search vector index

    ai search index update --name contoso_product_index --files "*.md"
    ai chat --index-name contoso_product_index --interactive
    ai config --clear search.index.name

SEE ALSO

  ai help chat
  ai help chat built-in helper functions
  ai help chat custom helper functions
  ai help find topics chat


