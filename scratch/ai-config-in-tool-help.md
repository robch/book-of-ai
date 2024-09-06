AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

--------------
ai help config
--------------
CONFIG

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

USAGE: ai config [HIVE] [COMMAND] [@FILE] [...]

  --set [NAME=]VALUE            (see: ai help config set)
  --clear NAME                  (see: ai help config clear)

EXAMPLES

  ai config @key
  ai config --set key 436172626F6E20697320636F6F6C2121
  ai config --set region westus2

SEE ALSO

  ai help init
  ai help config advanced
  ai help config examples
  ai help find topics config

------------------
ai help config add
------------------
CONFIG ADD

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  The --add option adds AI configuration data to a new or an
  existing AI configuration datastore file.

USAGE: ai config --add NAME VALUE
   OR: ai config @NAME --add VALUE
   OR: ai config @CONFIG-FILENAME --add NAME VALUE

  WHERE: NAME represents the name of the VALUE
    AND: VALUE represents the value to be added
     OR: CONFIG-FILENAME is the name of the configuration file

   NOTE: If no HIVE is specified, the first configuration file found
         will be used. If no existing configuration file is found,
         the first HIVE found will be used.

EXAMPLES

  ai config @my.files --clear
  ai config @my.files --add hello.wav
  ai config @my.files --add howareyou.wav
  ai complete --files @my.files

SEE ALSO

  ai help config
  ai help config set
  ai help config clear
  ai help config hive

-----------------------
ai help config advanced
-----------------------
CONFIG

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

USAGE: ai config [HIVE] [COMMAND] [@FILE] [...]

  OPTIONs
    --set [NAME=]VALUE            (see: ai help config set)
    --add [NAME=]VALUE            (see: ai help config add)
    --find NAME                   (see: ai help config find)
    --clear [NAME]                (see: ai help config clear)

  ADANCED
    --hive HIVE                   (see: ai help config hive)
    --region REGION               (see: ai help config region)
    --command COMMAND             (see: ai help config command)

EXAMPLES                          (see: ai help config examples)

  ai config --set region westus2
  ai config --set key 436172626F6E20697320636F6F6C2121

  ai config chat --set region westus2
  ai config chat --set key 436172626F6E20697320636F6F6C2121

  ai config complete --set region eastus
  ai config complete --set key 436172626F6E20697320636F6F6C2020

  ai config chat --find key

SEE ALSO

  ai help config scope
  ai help config hive
  ai help find topics config

--------------------
ai help config clear
--------------------
CONFIG CLEAR

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  The --clear option removes AI configuration data from
  an existing AI configuration datastore file.

USAGE: ai config --clear NAME
   OR: ai config @NAME --clear
   OR: ai config @CONFIG-FILENAME --clear

  WHERE: NAME represents the name of the VALUE to clear
     OR: CONFIG-FILENAME is the name of the configuration file to remove

EXAMPLES

  ai config @my.files --clear
  ai config @my.files --add prompt1.txt
  ai config @my.files --add prompt2.txt
  ai complete --files @my.files

SEE ALSO

  ai help config
  ai help config add
  ai help config set
  ai help config hive

----------------------
ai help config command
----------------------
CONFIG COMMAND

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  The --command option specifies the configuration data 
  SCOPE of use based on the COMMAND in use.

USAGE: ai config [@FILE] --command COMMAND [...]
   OR: ai config COMMAND [@FILE] [...]

  WHERE: COMMAND is chat
     OR: COMMAND is complete

SEE ALSO

  ai help config output
  ai help config scope
  ai help config

-----------------------
ai help config examples
-----------------------
CONFIG EXAMPLES

  EXAMPLE 1: Set the default subscription key and region

    ai config --set key 436172626F6E20697320636F6F6C2121
    ai config --set region westus2

  EXAMPLE 2: Recognize multiple files from a file list

    ai config @my.files --clear
    ai config @my.files --add prompt1.txt
    ai config @my.files --add prompt2.txt
    ai complete --files @my.files

  EXAMPLE 3: Set the default subscription keys for specific regions

    ai config --region westus2 --set key 436172626F6E20697320636F6F6C2121
    ai config --region eastus2 --set key 436172626F6E20697320636F6F6C2020

    ai config --set region westus2

  EXAMPLE 4: Set the default subscription keys for a specific command

    ai config chat --set region westus2
    ai config chat --set key 436172626F6E20697320636F6F6C2121
    
  EXAMPLE 5: Update default.output for chat command

    ai config chat @default.output --clear
    ai config chat @default.output --add output.id true
    ai config chat @default.output --add output.text true

  EXAMPLE 6: Disable all defaults for all commands

    ai config --set ai.defaults @@none

ADDITIONAL TOPICS

  ai help config

-------------------
ai help config find
-------------------
CONFIG FIND

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  The --find option locates AI configuration data stored
  inside existing AI configuration datastore files.

USAGE: ai config --find CONFIG-NAME
   OR: ai config --find CONFIG-FILENAME
   OR: ai config --find CONFIG-FILENAME-PATTERN

EXAMPLES

  ai config --find key
  ai config --find key --region westus2
  ai config --find key --region *

SEE ALSO

  ai help config

-------------------
ai help config hive
-------------------
CONFIG HIVE

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  The --hive option specifies which configuration data HIVE to use.

USAGE: ai config [@FILE] --hive HIVE [...]
   OR: ai config HIVE [@FILE] [...]

  WHERE: HIVE is .        (working directory, e.g. './')
     OR: HIVE is local    (working directory config, e.g. './.ai/')
     OR: HIVE is user     (local user directory config, e.g. 'C:\Users\USERNAME/.ai/')
     OR: HIVE is global   (roaming user directory config, e.g. 'C:\Users\USERNAME\AppData\Roaming\.ai/')
     OR: HIVE is system   (ai process file location config, e.g. 'where ai.exe')

   NOTE: HIVES are searched or used in the order specified above.

SEE ALSO

  ai help config command
  ai help config region
  ai help config

---------------------
ai help config region
---------------------
CONFIG REGION

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  The --region option specifies the configuration data 
  SCOPE of use based on the REGION in use.

USAGE: ai config [...] --region REGION

  WHERE: REGION is the name of the region (e.g. westus, eastus, etc.)

    For a full list of supported regions, see:  https://aka.ms/ai/regions

EXAMPLES

  ai config --set key 436172626F6E20697320636F6F6C2121 --region westus2
  ai config --set key 436172626F6E20697320636F6F6C2020 --region eastus
  ai config --find key --region *

  ai config --set region westus2
  ai complete --file prompt.txt

  ai config --set region eastus
  ai complete --file prompt.txt

  ai complete --nodefaults --foreach region in eastus;westus2 --key @@key --file prompt.txt

SEE ALSO

  ai help config scope
  ai help config

--------------------
ai help config scope
--------------------
CONFIG SCOPE

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  @files can exist at multiple SCOPEs of use, across two kinds of SCOPEs:
  (1) REGION specific SCOPEs
  (2) COMMAND specific

  REGION specific SCOPEs enables AI configuration data to vary based on
  what REGION is specified for each ai command. For example, you likely use
  different subscription keys dependent upon what REGION in which your Azure
  AI Service is running.

  COMMAND specific SCOPEs enable AI configuration data to vary based on
  what COMMAND is being used. For example, for ai chat commands you may
  want to use one specific ENDPOINT, whereas, for ai complete commands you may
  want to use a different ENDPOINT with a PROXY.

SEE ALSO

  ai help config command
  ai help config region
  ai help config

------------------
ai help config set
------------------
CONFIG SET

  The ai config command can create, query, or delete AI
  configuration data stored in AI configuration datastore files.

  The --set option sets AI configuration data in a new
  ai configuration datastore file, or overwrite configuration data in an
  existing AI configuration datastore file.

USAGE: ai config --set NAME VALUE
   OR: ai config @NAME --set VALUE
   OR: ai config @CONFIG-FILENAME --set NAME VALUE

  WHERE: NAME represents the name of the VALUE
    AND: VALUE represents the value to be set
     OR: CONFIG-FILENAME is the name of the configuration file

   NOTE: If no HIVE is specified, the first HIVE found will be used.

EXAMPLES

  ai config --set region westus2
  ai config --set key 436172626F6E20697320636F6F6C2121

SEE ALSO

  ai help config
  ai help config add
  ai help config clear
  ai help config hive


