AI - Azure AI CLI, Version 1.0.0-DEV-robch-20240904
Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

This PUBLIC PREVIEW version may change at any time.
See: https://aka.ms/azure-ai-cli-public-preview

---------
ai help _
---------
   ___  _____   ___ ___  ___ ___ ____ __ __
  / _ |/_  _/  / __/ _ \/ __/ __/ ___/ // /
 / __ |_/ /_  _\ \/ ___/ _// _// /__/ _  /  
/_/ |_/____/ /___/_/  /___/___/\___/_//_/   

USAGE: ai speech <command> [...]

COMMANDS

  ai speech recognize [...]       (see: ai help speech recognize)
  ai speech synthesize [...]      (see: ai help speech synthesize)

  ai speech intent [...]          (see: ai help speech intent)
  ai speech translate [...]       (see: ai help speech translate)

  ai speech batch [...]           (see: ai help speech batch)
  ai speech csr [...]             (see: ai help speech csr)

  ai speech profile [...]         (see: ai help speech profile)
  ai speech speaker [...]         (see: ai help speech speaker)

ADDITIONAL TOPICS

  ai help speech examples
  ai help find topics speech

-------------
ai help batch
-------------
  ______ ___ _  __
 /  ___// _ \ \/ /
 \___ \/ ___/   <
/____ /_/  /__/\_\

USAGE: ai speech batch transcription <command> [...]

BATCH TRANSCRIPTION

  The ai speech batch transcription command manages Azure Speech Service
  batch transcriptions.

COMMANDS

  ai speech batch transcription create [...]          (see: ai help speech batch transcription create)
  ai speech batch transcription status [...]          (see: ai help speech batch transcription status)

  ai speech batch transcription list [...]            (see: ai help speech batch transcription list)
  ai speech batch transcription download [...]        (see: ai help speech batch transcription download)

  ai speech batch transcription update [...]          (see: ai help speech batch transcription update)
  ai speech batch transcription delete [...]          (see: ai help speech batch transcription delete)

  ai speech batch transcription onprem [...]          (see: ai help speech batch transcription onprem)

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech batch transcription examples
  ai help find topics speech batch transcription

------------------------
ai help batch connection
------------------------
BATCH CONNECTION OVERVIEW

  The Azure Speech Service uses subscription keys to identify, authenticate,
  authorize, meter, and bill Azure resources and accounts. The Azure Speech
  Service is region-specific.

  To specify a particular key, see: ai help speech batch key
  To specify a particular region, see: ai help speech batch region

  NOTE: Default connection uses the @connection.from.region preset template

    service.config.region=@region
    service.config.key=@key

EXAMPLES

  EXAMPLE 1: Use westus2 region and key directly on command line

    ai speech batch transcription list --region westus2 --key 436172626F6E20697320636F6F6C2121

  EXAMPLE 2: Use the westus2 region and key stored in AI configuration

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai speech batch transcription list --region @region --key @key

  EXAMPLE 3: Update the default connection

    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai config speech @region --set westus2
    ai config speech @default.connection --set @@connection.from.region
    ai speech batch transcription list

----------------------
ai help batch download
----------------------
BATCH DOWNLOAD

  The ai speech batch download command downloads files from Azure
  Speech Service batch operations.

USAGE: ai speech batch download [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  DOWNLOAD
    --file URL                    (see: ai help speech batch download file)
    --output file FILENAME        (see: ai help speech batch download output file)

SEE ALSO

  ai help speech batch transcription list
  ai help speech batch download advanced
  ai help speech batch output

-------------------------------
ai help batch download advanced
-------------------------------
BATCH TRANSCRIPTION DOWNLOAD ADVANCED

  The ai speech batch download command downloads files from Azure
  Speech Service batch operations.

USAGE: ai speech batch download [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  DOWNLOAD
    --url URL                     (see: ai help speech batch download url)
    --file URL                    (see: ai help speech batch download file)

  OUTPUT
    --output file FILENAME        (see: ai help speech batch download output file)
    --output json FILENAME        (see: ai help speech batch output json)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech batch transcription list
  ai help speech batch output

---------------------------
ai help batch download file
---------------------------
BATCH DOWNLOAD FILE

  The --file option specifies which file to download from the service.

USAGE: ai speech batch download [...] --file FILE-SELF-URL
   OR: ai speech batch download [...] --file @FILENAME
   OR: ai speech batch download [...] @CONFIG-FILENAME

  WHERE: FILE-URL is the file identity reference found in FILE-JSON
     OR: FILENAME is a single line text file containing the FILE-SELF-URL
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.download.file=FILE-URL

  NOTE: The FILE-URL is the "self" link in FILE-JSON:

          { "self": "FILE-URL", ... }

        FILE-JSON returned from the Azure Speech Service looks like:

          { "values": [ FILE-JSON1, FILE-JSON2, ... ] }

EXAMPLE

  ai speech batch transcription list --output last url @@transcription-url.txt
  ai speech batch transcription list --files --transcription @transcription-url.txt --output last url @@file-url.txt

  ai speech batch transcription download --url @file-url.txt --output json file.json
  ai speech batch transcription download --file @file-url.txt --output file file.contents

SEE ALSO

  ai help speech batch transcription list
  ai help speech batch transcription download
  ai help speech batch output
  ai help speech batch

----------------------------------
ai help batch download output file
----------------------------------
BATCH DOWNLOAD OUTPUT FILE

  The --output file option specifies the filename of the downloaded file.

USAGE: ai speech batch download [...] --output file FILE
   OR: ai speech batch download [...] @CONFIG-FILENAME

  WHERE: FILE is the filename of the downloaded file.
     OR: FILE is - representing STDOUT.

EXAMPLE

  ai speech batch download [...] --output file audio1.json

SEE ALSO

  ai help speech batch transcription list
  ai help speech batch transcription download
  ai help speech batch output
  ai help speech batch

--------------------------
ai help batch download url
--------------------------
BATCH DOWNLOAD URL

  The --url option specifies which resource to download from the service.

USAGE: ai speech batch download [...] --url URL
   OR: ai speech batch download [...] --url @FILENAME
   OR: ai speech batch download [...] @CONFIG-FILENAME

  WHERE: URL is the resource to download
     OR: FILENAME is a single line text file containing the URL
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.download.url=URL

EXAMPLE

  ai speech batch transcription list --output last url @@transcription-url.txt
  ai speech batch transcription list --files --transcription @transcription-url.txt --output last url @@file-url.txt

  ai speech batch transcription download --url @file-url.txt --output json file.json
  ai speech batch transcription download --file @file-url.txt --output file file.contents

SEE ALSO

  ai help speech batch transcription list
  ai help speech batch transcription download
  ai help speech batch output
  ai help speech batch

----------------------
ai help batch examples
----------------------
BATCH TRANSCRIPTION EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Create a batch transcription for an audio file

    ai speech batch transcription create --name "Example 1" --content https://crbn.us/hello.wav

  EXAMPLE 2: Create a batch transcription for two remote audio files

    ai config @audio.urls.txt --clear
    ai config @audio.urls.txt --add http://crbn.us/hello.wav
    ai config @audio.urls.txt --add http://crbn.us/whatstheweatherlike.wav
    ai speech batch transcription create --name "Example 2" --content @audio.urls.txt

  EXAMPLE 3: Create a batch of transcriptions, and only return when done

    SAVE JOB

      ai config @audio.urls.txt --clear
      ai config @audio.urls.txt --add http://crbn.us/hello.wav
      ai config @audio.urls.txt --add http://crbn.us/whatstheweatherlike.wav
      ai speech batch transcription create --name "Example 3" --content @audio.urls.txt --save transcription.job

    EXECUTE JOB

      ai speech batch transcription create @transcription.job --wait

  EXAMPLE 4: List transcriptions previously created

    ai speech batch transcription list

  EXAMPLE 5: List transcription files for most recently created/completed transcription

    ai speech batch transcription list --output last url @@transcription.url.txt
    ai speech batch transcription list --files --transcription @transcription.url.txt

  EXAMPLE 6: Download all transcription files

    ai speech batch transcription list --output last url @@transcription.url.txt
    ai speech batch transcription list --files --transcription @transcription.url.txt --output urls @@file.urls.txt
    ai speech batch transcription download --foreach file in @file.urls.txt --output path ./files

SEE ALSO

  ai help speech batch transcription
  ai help speech batch transcription more examples

---------------------
ai help batch foreach
---------------------
BATCH FOREACH

  The --foreach option repeats a specific command multiple times
  effectively multiplying one set of command line options by another.

USAGE: ai speech batch [...] --foreach in @FILE1.tsv
   OR: ai speech batch [...] --foreach OPT1;[OPT2;[...]] in @FILE2.tsv
   OR: ai speech batch [...] --foreach OPT1;[OPT2;[...]] skip header in @FILE3.tsv

  WHERE: OPT represents a command line option (e.g. file, language)
    AND: FILE1.tsv contains tab separated values, with line1: OPT1 [\t OPT2 [\t ...]]
     OR: FILE2.tsv contains tab separated values, with data rows starting on line 1
     OR: FILE3.tsv contains tab separated values, with data rows starting on line 2

EXAMPLE

  ai config @audio.txt --clear
  ai config @audio.txt --add http://crbn.us/hello.wav
  ai config @audio.txt --add http://crbn.us/whatstheweatherlike.wav
  ai speech batch transcription create --name "Example" --content @audio.txt --output url @@transcription.url.txt --wait

  ai speech batch transcription list --files --transcription @transcription.url.txt --output urls @@file.urls.txt
  ai speech batch transcription download --foreach file in @file.urls.txt --threads 10

SEE ALSO

  ai help speech batch transcription create
  ai help speech batch transcription download
  ai help speech batch transcription list
  ai help speech batch output urls
  ai help speech batch

------------------------
ai help batch input path
------------------------
BATCH INPUT PATH

  The --input path option specifies additional paths to search
  for input files. If not provided, the default is the current directory.
  
USAGE: ai speech batch [...] --input path FILEPATH

  WHERE: FILEPATH is the name of input directory

EXAMPLES

  ai speech batch [...] --output path .\ai\input
  ai speech batch [...] --output path ~/ai/input

SEE ALSO

  ai help speech batch output path
  ai help speech batch

-----------------
ai help batch key
-----------------
BATCH KEY

  The ai speech batch command manages remote audio streams.

  The --key option specifies the subscription key to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech batch [...] --key KEY
   OR: ai speech batch [...] --key @FILENAME
   OR: ai speech batch [...] @CONFIG-FILENAME

  WHERE: KEY is the subscription key as text
     OR: FILENAME is a single line text file containing your KEY
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.key=KEY

EXAMPLES

  ai speech batch transcription list --region westus2 --key 436172626F6E20697320636F6F6C2121

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech batch transcription list --region @region --key @key

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai config speech @default.config --set @@connection.from.region
  ai speech batch transcription list

SEE ALSO

  ai help speech setup
  ai help speech key overview
  ai help speech batch connection
  ai help speech batch region
  ai help speech batch

------------------
ai help batch list
------------------
BATCH LIST

  The ai speech batch list command lists resources related to Azure
  Speech Service batch operations.

USAGE: ai speech batch list [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  TRANSCRIPTIONS
    --transcriptions              (see: ai help speech batch transcription list)
    --transcription languages     (see: ai help speech batch transcription list languages)

  TRANSCRIPT FILES
    --transcription URL           (see: ai help speech batch transcription reference)
    --files                       (see: ai help speech batch transcription list files)

SEE ALSO

  ai help speech batch transcription list advanced
  ai help speech batch download
  ai help speech batch output

---------------------------
ai help batch list advanced
---------------------------
BATCH LIST ADVANCED

  The ai speech batch list command lists resources related to Azure
  Speech Service batch operations.

USAGE: ai speech batch list [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  TRANSCRIPTIONS
    --transcriptions              (see: ai help speech batch transcription list)
    --transcription languages     (see: ai help speech batch transcription list languages)

  TRANSCRIPT FILES
    --transcription URL           (see: ai help speech batch transcription reference)
    --files                       (see: ai help speech batch transcription list files)

  OUTPUT
    --output json FILENAME        (see: ai help speech batch output json)
    --output urls @@FILE          (see: ai help speech batch output urls)
    --output url @@FILE           (see: ai help speech batch output url)
    --output ids @@FILE           (see: ai help speech batch output ids)
    --output id @@FILE            (see: ai help speech batch output id)
    --skip NUMBER
    --top NUMBER
    --tail NUMBER

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --project URL                 (see: ai help speech batch transcription project)
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech batch download
  ai help speech batch output

--------------------
ai help batch output
--------------------
BATCH OUTPUT

  The ai speech batch command manages Azure Speech Service batch operations.

  BATCH DOWNLOAD FILE OUTPUT

    When using ai speech batch download or ai speech batch transcription download, the
    --output file option specifies the name of the downloaded file.
    
    Use this option when you want to use a different filename than the default.

    SEE ALSO

      ai help speech batch transcription download
      ai help speech batch download output file
      ai help speech batch download

  BATCH OPERATION REQUEST OUTPUT

    For all ai speech batch commands, the --output request option writes the
    HTTP request into the file specified.
    
    Use this option to inspect how the REST API operates.

    SEE ALSO

      ai help speech batch output request
      ai help speech batch output json

  BATCH OPERATION RESPONSE OUTPUT

    For all ai speech batch commands, the --output json option writes the service
    JSON response into the file specified.
    
    Use this option to save the service JSON response.

    SEE ALSO

      ai help speech batch output json
      ai help speech batch output request

  BATCH RESOURCE REFERENCE OUTPUT - URL or ID

    For the ai speech batch create and status commands, the --output url and
    --output id options write the batch resource reference into the AI
    datastore configuration file specified.
    
    Use this option to chain together multiple batch commands
    in sequence, or to subsequently use the reference
    without parsing the service JSON response. 

    SEE ALSO

      ai help speech batch transcription create
      ai help speech batch transcription status
      ai help speech batch output id
      ai help speech batch output url

  BATCH RESOURCE REFERENCE LIST OUTPUT - URLs or IDs

    The --output urls and --output ids options write the list of batch
    resource references into the AI datastore configuration file specified.
  
    Use this option to chain together multiple batch commands
    in sequence, or to subsequently use the reference
    list without parsing the service JSON response. 

    SEE ALSO
    
      ai help speech batch output ids
      ai help speech batch output urls

SEE ALSO

  ai help config
  ai help speech batch transcription

-----------------------
ai help batch output id
-----------------------
BATCH OUTPUT ID

  The --output id option writes the batch resource reference into the AI
  datastore configuration file specified.
  
  Use this option to chain together multiple batch commands
  in sequence, or to subsequently use the reference
  without parsing the service JSON response. 
  
USAGE: ai speech batch [...] --output id @@FILE

  WHERE: FILE is the name of the AI configuration datastore file

EXAMPLE

  ai speech batch transcription create [...] --output id @@created.id.txt
  ai speech batch transcription status --transcription @created.id.txt --wait

SEE ALSO

  ai help speech batch transcription create
  ai help speech batch transcription status
  ai help speech batch output json
  ai help speech batch output url
  ai help speech batch output
  ai help speech batch

------------------------
ai help batch output ids
------------------------
BATCH OUTPUT IDS

  The --output ids option writes the list of batch resource references
  into the AI datastore configuration file specified.

  Use this option to chain together multiple batch commands
  in sequence, or to subsequently use the reference
  list without parsing the service JSON response. 

USAGE: ai speech batch [...] --output ids @@FILE

  WHERE: FILE is the name of the AI configuration datastore file

EXAMPLE

  ai speech batch transcription list --output ids @@id-list.txt
  ai speech batch transcription status --foreach transcription in @id-list.txt --wait 30000

SEE ALSO

  ai help speech batch transcription list
  ai help speech batch transcription status
  ai help speech batch output json
  ai help speech batch output urls
  ai help speech batch output
  ai help speech batch

-------------------------
ai help batch output json
-------------------------
BATCH OUTPUT JSON

  The --output json option writes the service JSON response into the file specified.

  Use this option to save the service JSON response.

USAGE: ai speech batch [...] --output json FILE.json
   OR: ai speech batch [...] @CONFIG-FILENAME

  WHERE: FILE.json is the file to store the JSON output from the batch operation
     OR: FILENAME is a single line text file containing FILE.json filename
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.output.json.file=FILE.json

EXAMPLES

  ai speech batch transcription list --output json @transcription-list.json

  ai config @transcription.job --set name "My transcription"
  ai config @transcription.job --add content http://crbn.us/hello.wav
  ai config @transcription.job --add batch.output.json.file create-operation-output.json
  ai speech batch transcription create @transcription.details

SEE ALSO

  ai help speech batch output
  ai help speech batch output request
  ai help speech batch transcription
  ai help speech batch

-------------------------
ai help batch output path
-------------------------
BATCH OUTPUT PATH

  The --output path option specifies where all output files
  should be written. If not provided, the default is the current directory.
  
USAGE: ai speech batch [...] --output path FILEPATH

  WHERE: FILEPATH is the name of output directory

EXAMPLES

  ai speech batch [...] --output path .\ai\output
  ai speech batch [...] --output path ~/ai/output

SEE ALSO

  ai help speech batch input path
  ai help speech batch

----------------------------
ai help batch output request
----------------------------
BATCH OUTPUT REQUEST

  The --output request option writes the HTTP request into the file specified.

  Use this option to inspect how the REST API operates.

USAGE: ai speech batch [...] --output request FILE.request
   OR: ai speech batch [...] @CONFIG-FILENAME

  WHERE: FILE.request is the file to store the HTTP request
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.output.request.file=FILE.request

EXAMPLES

  ai speech batch transcription list --output request @transcription-list.request

  ai config @transcription.job --set name "My transcription"
  ai config @transcription.job --add content http://crbn.us/hello.wav
  ai config @transcription.job --add batch.output.request.file create-operation-output.request
  ai speech batch transcription create @transcription.details

SEE ALSO

  ai help speech batch output
  ai help speech batch output json
  ai help speech batch transcription
  ai help speech batch

------------------------
ai help batch output url
------------------------
BATCH OUTPUT URL

  The --output url option writes the batch resource reference into the AI
  datastore configuration file specified.
    
  Use this option to chain together multiple batch commands
  in sequence, or to subsequently use the reference
  without parsing the service JSON response. 
  
USAGE: ai speech batch [...] --output url @@FILE

  WHERE: FILE is the name of the AI configuration datastore file

EXAMPLE

  ai speech batch transcription create [...] --output url @@created.url.txt
  ai speech batch transcription status --transcription @created.url.txt --wait

SEE ALSO

  ai help speech batch transcription create
  ai help speech batch transcription status
  ai help speech batch output json
  ai help speech batch output id
  ai help speech batch output
  ai help speech batch

-------------------------
ai help batch output urls
-------------------------
BATCH OUTPUT URLS

  The --output urls option writes the list of batch resource references
  into the AI datastore configuration file specified.

  Use this option to chain together multiple batch commands
  in sequence, or to subsequently use the reference
  list without parsing the service JSON response. 

USAGE: ai speech batch [...] --output urls @@FILE

  WHERE: FILE is the name of the AI configuration datastore file

EXAMPLE

  ai speech batch transcription list --output urls @@url-list.txt
  ai speech batch transcription status --foreach transcription in @url-list.txt --wait 30000

SEE ALSO

  ai help speech batch transcription list
  ai help speech batch transcription status
  ai help speech batch output json
  ai help speech batch output ids
  ai help speech batch output
  ai help speech batch

-----------------------
ai help batch processes
-----------------------
BATCH PROCESSES

  The --processes option specifies the maximum number of
  sub-processes to use when parallelizing tasks.

  The --ramp processes every option can optionally be used to control
  how quickly each new sub-process will be added to the pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  processes will immediately be available to the pool.

USAGE: ai speech batch [...] --processes NUMBER
   OR: ai speech batch [...] --processes NUMBER --ramp processes every MILLISECONDS

  WHERE: NUMBER represents the maximum number of processes to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new process

EXAMPLES

  ai speech batch transcription list [...] --files --output urls @@file.urls.txt
  ai speech batch transcription download --foreach file in @file.urls.txt --processes 10

SEE ALSO

  ai help speech batch foreach
  ai help speech batch threads
  ai help speech batch

--------------------
ai help batch region
--------------------
BATCH REGION

  The ai speech batch command manages remote audio streams.

  The --region option specifies the REGION for an existing resource.

  For a full list of supported regions, see https://aka.ms/speech/regions.

USAGE: ai speech batch [...] --region REGION
   OR: ai speech batch [...] --region @FILENAME
   OR: ai speech batch [...] @CONFIG-FILENAME

  WHERE: REGION is the region for the speech resource
     OR: FILENAME is a single line text file containing the REGION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.region=REGION

EXAMPLES

  ai speech batch transcription list --region westus2 --key 436172626F6E20697320636F6F6C2121

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech batch transcription list --region @region --key @key

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai config speech @default.config --set @@connection.from.region
  ai speech batch transcription list

SEE ALSO

  ai help speech setup
  ai help speech region overview
  ai help speech batch connection
  ai help speech batch key
  ai help speech batch

------------------
ai help batch save
------------------
BATCH SAVE

  The --save option packages command line and related
  configuration data into one or more AI configuration data files
  for backup or portability to another device.

USAGE: ai speech batch [...] --save FILENAME

EXAMPLES

  ai config @urls.txt --clear
  ai config @urls.txt --add http://crbn.us/hello.wav
  ai config @urls.txt --add http://crbn.us/whatstheweatherlike.wav
  ai speech batch transcription create --name "My transcription" --content @urls.txt --save transcription.job

  ai speech batch transcription create @transcription.job

SEE ALSO

  ai help config
  ai help speech batch
  ai help speech batch zip

---------------------
ai help batch threads
---------------------
BATCH THREADS

  The --threads option specifies a how many threads to use when parallelizing
  tasks.

  The --ramp threads every option can optionally be used to control
  how quickly each new thread will be added to the thread pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  threads will immediately be available to the pool.

USAGE: ai speech batch [...] --threads NUMBER
   OR: ai speech batch [...] --threads NUMBER --ramp threads every MILLISECONDS

  WHERE: NUMBER represents the maximum number of threads to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new thread

EXAMPLES

  ai speech batch transcription list [...] --files --output urls @@file.urls.txt
  ai speech batch transcription download --foreach file in @file.urls.txt --threads 10

SEE ALSO

  ai help speech batch foreach
  ai help speech batch processes
  ai help speech batch

---------------------------
ai help batch transcription
---------------------------
  ______ ___ _  __
 /  ___// _ \ \/ /
 \___ \/ ___/   <
/____ /_/  /__/\_\

USAGE: ai speech batch transcription <command> [...]

BATCH TRANSCRIPTION

  The ai speech batch transcription command manages Azure Speech Service
  batch transcriptions.

COMMANDS

  ai speech batch transcription create [...]          (see: ai help speech batch transcription create)
  ai speech batch transcription status [...]          (see: ai help speech batch transcription status)

  ai speech batch transcription list [...]            (see: ai help speech batch transcription list)
  ai speech batch transcription download [...]        (see: ai help speech batch transcription download)

  ai speech batch transcription update [...]          (see: ai help speech batch transcription update)
  ai speech batch transcription delete [...]          (see: ai help speech batch transcription delete)

  ai speech batch transcription onprem [...]          (see: ai help speech batch transcription onprem)

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech batch transcription examples
  ai help find topics speech batch transcription

----------------------------------
ai help batch transcription create
----------------------------------
BATCH TRANSCRIPTION CREATE

  The ai speech batch transcription create command creates new
  requests to transcribe remote audio streams.

USAGE: ai speech batch transcription create [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  CREATE
    --name NAME                   (see: ai help speech batch transcription name)
    --model URL                   (see: ai help speech batch transcription create model)
    --content URL                 (see: ai help speech batch transcription create content)
    --content @URLs.txt           (see: ai help speech batch transcription create content)
    --language LANGUAGE           (see: ai help speech batch transcription create language)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --project URL                 (see: ai help speech batch transcription project)
    --wait [TIMEOUT]              (see: ai help speech batch transcription wait)

SEE ALSO

  ai help speech setup
  ai help speech batch output
  ai help speech batch transcription examples
  ai help speech batch transcription create advanced

-------------------------------------------
ai help batch transcription create advanced
-------------------------------------------
BATCH TRANSCRIPTION CREATE ADVANCED

  The ai speech batch transcription create command creates new
  transcription requests to transcribe remote audio streams.

USAGE: ai speech batch transcription create [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  CREATE
    --name NAME                   (see: ai help speech batch transcription name)
    --model URL                   (see: ai help speech batch transcription create model)
    --dataset URL                 (see: ai help speech batch transcription create dataset)
    --content URL                 (see: ai help speech batch transcription create content)
    --content @URLs.txt           (see: ai help speech batch transcription create content)
    --language LANGUAGE           (see: ai help speech batch transcription create language)

  PROPERTIES
    --diarization                 Identify two speakers in mono channel audio
    --word level timing           Add word level timestamps to the output
    --punctuation mode MODE       MODE: None, Dictated, Automatic or DictatedAndAutomatic(default)
    --profanity filter FILTER     FILTER: None, Masked(default), Removed, or Tags
    --property NAME=VALUE         (see: ai help speech batch transcription create properties)
    --properties @FILENAME        (see: ai help speech batch transcription create properties)
    --description DESCRIPTION     (see: ai help speech batch transcription description)
    --project URL                 (see: ai help speech batch transcription project)

  OUTPUT
    --output json FILENAME        (see: ai help speech batch output json)
    --output url @@FILE           (see: ai help speech batch output url)
    --output id @@FILE            (see: ai help speech batch output id)
    --wait [TIMEOUT]              (see: ai help speech batch transcription wait)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech setup
  ai help speech batch output
  ai help speech batch transcription examples

------------------------------------------
ai help batch transcription create content
------------------------------------------
BATCH TRANSCRIPTION CREATE CONTENT

  The ai speech batch transcription create command creates new
  transcription requests to transcribe remote audio streams.

  The --content option specifies the content to be transcribed,
  referring to audio data stored remotely and accessible at supplied URLs.

USAGE: ai speech batch transcription create [...] --content URL
   OR: ai speech batch transcription create [...] --content URL1;URL2[;...]
   OR: ai speech batch transcription create [...] --content @URLs.txt

  WHERE: URL points to an audio file, or a .ZIP containing multiple audio files
     OR: URLs.txt is a text file containing one or more URLs

EXAMPLES

  ai speech batch transcription create --name "Example 1" --content http://crbn.us/hello.wav

  ai config @urls.txt --clear
  ai config @urls.txt --add http://crbn.us/hello.wav
  ai config @urls.txt --add http://crbn.us/whatstheweatherlike.wav
  ai speech batch transcription create --name "Example 2" --content @urls.txt

SEE ALSO

  ai help config advanced
  ai help speech batch transcription create

------------------------------------------
ai help batch transcription create dataset
------------------------------------------
BATCH TRANSCRIPTION CREATE DATASET

  The ai speech batch transcription create command creates new
  requests to transcribe remote audio streams.

  The --dataset option specifies the content to be transcribed,
  referring to audio data stored remotely in a custom speech recognition dataset.

USAGE: ai speech batch transcription create [...] --dataset DATASET-ID
   OR: ai speech batch transcription create [...] --dataset DATASET-URL
   OR: ai speech batch transcription create [...] --dataset @FILENAME
   OR: ai speech batch transcription create [...] @CONFIG-FILENAME

  WHERE: DATASET-ID is the dataset ID
     OR: DATASET-URL is the dataset URL
     OR: FILENAME is a single line text file containing the dataset ID or URL
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.dataset.id=ID-or-URL

EXAMPLES

  ai speech batch transcription create [...] --dataset 01234567-89ab-cdef-fedc-ba9876543210

  ai config @my.dataset --set 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription create [...] --dataset @my.dataset

  ai speech csr dataset create [...] --output url @@my.dataset
  ai speech batch transcription create [...] --dataset @my.dataset

  ai speech csr dataset create [...] --output url @@my.dataset
  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add dataset @my.dataset
  ai speech batch transcription create @transcription.details

SEE ALSO

  ai help config advanced
  ai help speech csr dataset create
  ai help speech batch transcription create

-------------------------------------------
ai help batch transcription create language
-------------------------------------------
BATCH TRANSCRIPTION CREATE LANGUAGE

  The ai speech batch transcription create command creates new
  requests to transcribe remote audio streams.

  The --language option specifies a single spoken LANGUAGE in BCP-47 format. 
  
  For a full list of supported languages, see https://aka.ms/speech/languages

  If no language is specified, the default will be en-US.

USAGE: ai speech batch transcription create [...] --language LANGUAGE
   OR: ai speech batch transcription create [...] --language @FILENAME
   OR: ai speech batch transcription create [...] @CONFIG-FILENAME

  WHERE: LANGUAGE is the spoken language in BCP-47 format
     OR: FILENAME is a single line text file containing the LANGUAGE
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.transcription.language=LANGUAGE

EXAMPLES

  ai speech batch transcription create [...] --language de-DE

  ai config @my.language --set de-DE
  ai speech batch transcription create [...] --language @my.language

  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add language de-DE
  ai speech batch transcription create @transcription.details --content http://crbn.us/hello.wav

SEE ALSO

  ai help config advanced
  ai help speech batch transcription create

----------------------------------------
ai help batch transcription create model
----------------------------------------
BATCH TRANSCRIPTION CREATE MODEL

  The ai speech batch transcription create command creates new
  requests to transcribe remote audio streams.

  The --model option specifies the custom speech model to use to
  transcribe the content in this new transcription request.

USAGE: ai speech batch transcription create [...] --model MODEL-ID
   OR: ai speech batch transcription create [...] --model MODEL-URL
   OR: ai speech batch transcription create [...] --model @FILENAME
   OR: ai speech batch transcription create [...] @CONFIG-FILENAME

  WHERE: MODEL-ID is the model ID
     OR: MODEL-URL is the model URL
     OR: FILENAME is a single line text file containing the model ID or URL
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.model.id=ID-or-URL

EXAMPLES

  ai speech batch transcription create [...] --model 01234567-89ab-cdef-fedc-ba9876543210

  ai config @my.model --set 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription create [...] --model @my.model

  ai speech csr model create [...] --output url @@my.model
  ai speech batch transcription create [...] --model @my.model

  ai config @my.model --set 01234567-89ab-cdef-fedc-ba9876543210
  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add model @my.model
  ai speech batch transcription create @transcription.details --content http://crbn.us/hello.wav

SEE ALSO

  ai help config advanced
  ai help speech csr model create
  ai help speech batch transcription create

----------------------------------
ai help batch transcription delete
----------------------------------
BATCH TRANSCRIPTION DELETE

  The ai speech batch transcription delete command deletes an existing
  batch transcription that has already completed.

USAGE: ai speech batch transcription delete [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  DELETE
    --transcription URL           (see: ai help speech batch transcription reference)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription list
  ai help speech batch transcription delete advanced
  ai help speech batch transcription examples

-------------------------------------------
ai help batch transcription delete advanced
-------------------------------------------
BATCH TRANSCRIPTION DELETE ADVANCED

  The ai speech batch transcription delete command deletes an existing
  batch transcription that has already completed.

USAGE: ai speech batch transcription delete [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  DELETE
    --transcription URL           (see: ai help speech batch transcription reference)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --output json FILENAME        (see: ai help speech batch output json)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription list
  ai help speech batch transcription examples

---------------------------------------
ai help batch transcription description
---------------------------------------
BATCH TRANSCRIPTION DESCRIPTION

  The --description option specifies the transcription DESCRIPTION.

USAGE: ai speech batch transcription [...] --description DESCRIPTION
   OR: ai speech batch transcription [...] --description @FILENAME
   OR: ai speech batch transcription [...] @CONFIG-FILENAME

  WHERE: DESCRIPTION is the transcription description
     OR: FILENAME is a single line text file containing the DESCRIPTION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.transcription.description=DESCRIPTION

EXAMPLES

  ai speech batch transcription [...] --description "This is the description"

  ai config @my.description --set "This is the description"
  ai speech batch transcription [...] --description @my.description

  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add description "This is the description"
  ai speech batch transcription [...] @transcription.details

SEE ALSO

  ai help speech batch transcription create
  ai help speech batch transcription update

------------------------------------
ai help batch transcription download
------------------------------------
BATCH TRANSCRIPTION DOWNLOAD

  The ai speech batch transcription download command downloads
  files from batch transcriptions that have already completed.

USAGE: ai speech batch transcription download [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  TRANSCRIPTION FILE
    --file URL                    (see: ai help speech batch download file)
    --output file FILENAME        (see: ai help speech batch download output file)

SEE ALSO

  ai help speech batch foreach
  ai help speech batch transcription list
  ai help speech batch transcription download advanced
  ai help speech batch transcription examples

---------------------------------------------
ai help batch transcription download advanced
---------------------------------------------
BATCH TRANSCRIPTION DOWNLOAD ADVANCED

  The ai speech batch transcription download command downloads
  files from batch transcriptions that have already completed.

USAGE: ai speech batch transcription download [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  TRANSCRIPTION FILE
    --url URL                     (see: ai help speech batch download url)
    --file URL                    (see: ai help speech batch download file)

  OUTPUT
    --output file FILENAME        (see: ai help speech batch download output file)
    --output json FILENAME        (see: ai help speech batch output json)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription list
  ai help speech batch transcription examples

------------------------------------
ai help batch transcription examples
------------------------------------
BATCH TRANSCRIPTION EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Create a batch transcription for an audio file

    ai speech batch transcription create --name "Example 1" --content https://crbn.us/hello.wav

  EXAMPLE 2: Create a batch transcription for two remote audio files

    ai config @audio.urls.txt --clear
    ai config @audio.urls.txt --add http://crbn.us/hello.wav
    ai config @audio.urls.txt --add http://crbn.us/whatstheweatherlike.wav
    ai speech batch transcription create --name "Example 2" --content @audio.urls.txt

  EXAMPLE 3: Create a batch of transcriptions, and only return when done

    SAVE JOB

      ai config @audio.urls.txt --clear
      ai config @audio.urls.txt --add http://crbn.us/hello.wav
      ai config @audio.urls.txt --add http://crbn.us/whatstheweatherlike.wav
      ai speech batch transcription create --name "Example 3" --content @audio.urls.txt --save transcription.job

    EXECUTE JOB

      ai speech batch transcription create @transcription.job --wait

  EXAMPLE 4: List transcriptions previously created

    ai speech batch transcription list

  EXAMPLE 5: List transcription files for most recently created/completed transcription

    ai speech batch transcription list --output last url @@transcription.url.txt
    ai speech batch transcription list --files --transcription @transcription.url.txt

  EXAMPLE 6: Download all transcription files

    ai speech batch transcription list --output last url @@transcription.url.txt
    ai speech batch transcription list --files --transcription @transcription.url.txt --output urls @@file.urls.txt
    ai speech batch transcription download --foreach file in @file.urls.txt --output path ./files

SEE ALSO

  ai help speech batch transcription
  ai help speech batch transcription more examples

--------------------------------
ai help batch transcription list
--------------------------------
BATCH TRANSCRIPTION LIST

  The ai speech batch transcription list command lists details about 
  existing batch transcriptions.

USAGE: ai speech batch transcription list [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  LIST
    --transcriptions              (see: ai help speech batch transcription list transcriptions)
    --languages                   (see: ai help speech batch transcription list languages)

  TRANSCRIPT FILES
    --transcription URL           (see: ai help speech batch transcription reference)
    --files                       (see: ai help speech batch transcription list files)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription list advanced
  ai help speech batch transcription examples

-----------------------------------------
ai help batch transcription list advanced
-----------------------------------------
BATCH TRANSCRIPTION LIST ADVANCED

  The ai speech batch transcription list command lists details about
  existing batch transcriptions.

USAGE: ai speech batch transcription list [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  LIST
    --transcriptions              (see: ai help speech batch transcription list)
    --languages                   (see: ai help speech batch transcription list languages)

  TRANSCRIPT FILES
    --transcription URL           (see: ai help speech batch transcription reference)
    --files                       (see: ai help speech batch transcription list files)

  OUTPUT
    --output json FILENAME        (see: ai help speech batch output json)
    --output urls @@FILE          (see: ai help speech batch output urls)
    --output url @@FILE           (see: ai help speech batch output url)
    --output ids @@FILE           (see: ai help speech batch output ids)
    --output id @@FILE            (see: ai help speech batch output id)
    --skip NUMBER
    --top NUMBER
    --tail NUMBER

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription create
  ai help speech batch transcription examples

--------------------------------------
ai help batch transcription list files
--------------------------------------
BATCH TRANSCRIPTION LIST FILES

  The ai speech batch transcription list command lists existing batch
  transcriptions, providing details for each.

USAGE: ai speech batch transcription list [...] --files

EXAMPLES

  ai speech batch transcription list --skip 0 --top 1 --output url @@transcription-url.txt
  ai speech batch transcription list --files --transcription @transcription-url.txt --output last url @@file-url.txt

SEE ALSO

  ai help config advanced
  ai help speech batch transcription create

------------------------------------------
ai help batch transcription list languages
------------------------------------------
BATCH TRANSCRIPTION LIST LANGUAGES

  The ai speech batch transcription list --languages option
  lists supported BATCH TRANSCRIPTION languages, in BCP-47 tag format.

USAGE: ai speech batch transcription list [...] --languages

SEE ALSO

  ai help speech setup
  ai help speech batch transcription list

-----------------------------------------------
ai help batch transcription list transcriptions
-----------------------------------------------
BATCH TRANSCRIPTION LIST TRANSCRIPTIONS

  The ai speech batch transcription list command lists existing batch
  transcriptions, providing details for each.

USAGE: ai speech batch transcription list [...]

EXAMPLES

  ai speech batch transcription list --skip 0 --top 1 --output url @@transcription-url.txt
  ai speech batch transcription list --files --transcription @transcription-url.txt --output last url @@file-url.txt

SEE ALSO

  ai help config advanced
  ai help speech batch transcription create

-----------------------------------------
ai help batch transcription more examples
-----------------------------------------
BATCH TRANSCRIPTION MORE EXAMPLES

  ai speech batch transcription list --output last url @@transcription-url.txt
  ai speech batch transcription list --files --transcription @transcription-url.txt --output last url @@file-url.txt

  ai speech batch transcription download --url @file-url.txt --output json file.json
  ai speech batch transcription download --file @file-url.txt --output file file.contents

  -

  ai config @audio.txt --clear
  ai config @audio.txt --add http://crbn.us/hello.wav
  ai config @audio.txt --add http://crbn.us/whatstheweatherlike.wav
  ai speech batch transcription create --name "Example" --content @audio.txt --output url @@transcription.url.txt --wait

  ai speech batch transcription list --files --transcription @transcription.url.txt --output urls @@file.urls.txt
  ai speech batch transcription download --foreach file in @file.urls.txt --threads 10

  -

  ai speech batch transcription list --region westus2 --key 436172626F6E20697320636F6F6C2121

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech batch transcription list --region @region --key @key

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai config speech @default.config --set @@connection.from.region
  ai speech batch transcription list

  - 

  ai speech batch transcription list --output ids @@id-list.txt
  ai speech batch transcription status --foreach transcription in @id-list.txt --wait 30000

  -

  ai speech batch transcription list --output json @transcription-list.json

  ai config @transcription.job --set name "My transcription"
  ai config @transcription.job --add content http://crbn.us/hello.wav
  ai config @transcription.job --add batch.output.json.file create-operation-output.json
  ai speech batch transcription create @transcription.details

  -

  ai speech batch transcription list --output request @transcription-list.request

  ai config @transcription.job --set name "My transcription"
  ai config @transcription.job --add content http://crbn.us/hello.wav
  ai config @transcription.job --add batch.output.request.file create-operation-output.request
  ai speech batch transcription create @transcription.details

  -

  ai speech batch transcription create [...] --output url @@created.url.txt
  ai speech batch transcription status --transcription @created.url.txt --wait

  -

  ai speech batch transcription list --output urls @@url-list.txt
  ai speech batch transcription status --foreach transcription in @url-list.txt --wait 30000

  -

  ai speech batch transcription list [...] --files --output urls @@file.urls.txt
  ai speech batch transcription download --foreach file in @file.urls.txt --processes 10

  -

  ai speech batch transcription list --region westus2 --key 436172626F6E20697320636F6F6C2121

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech batch transcription list --region @region --key @key

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai config speech @default.config --set @@connection.from.region
  ai speech batch transcription list

  -

  ai config @urls.txt --clear
  ai config @urls.txt --add http://crbn.us/hello.wav
  ai config @urls.txt --add http://crbn.us/whatstheweatherlike.wav
  ai speech batch transcription create --name "My transcription" --content @urls.txt --save transcription.job

  ai speech batch transcription create @transcription.job

  -

  ai speech batch transcription list [...] --files --output urls @@file.urls.txt
  ai speech batch transcription download --foreach file in @file.urls.txt --threads 10

  -

  ai speech batch transcription create --name "Example 1" --content http://crbn.us/hello.wav

  ai config @urls.txt --clear
  ai config @urls.txt --add http://crbn.us/hello.wav
  ai config @urls.txt --add http://crbn.us/whatstheweatherlike.wav
  ai speech batch transcription create --name "Example 2" --content @urls.txt

  -

  ai speech batch transcription create [...] --dataset 01234567-89ab-cdef-fedc-ba9876543210

  ai config @my.dataset --set 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription create [...] --dataset @my.dataset

  ai speech csr dataset create [...] --output url @@my.dataset
  ai speech batch transcription create [...] --dataset @my.dataset

  ai speech csr dataset create [...] --output url @@my.dataset
  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add dataset @my.dataset
  ai speech batch transcription create @transcription.details

  -

  ai speech batch transcription create [...] --language de-DE

  ai config @my.language --set de-DE
  ai speech batch transcription create [...] --language @my.language

  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add language de-DE
  ai speech batch transcription create @transcription.details --content http://crbn.us/hello.wav

  -

  ai speech batch transcription create [...] --model 01234567-89ab-cdef-fedc-ba9876543210

  ai config @my.model --set 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription create [...] --model @my.model

  ai speech csr model create [...] --output url @@my.model
  ai speech batch transcription create [...] --model @my.model

  ai config @my.model --set 01234567-89ab-cdef-fedc-ba9876543210
  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add model @my.model
  ai speech batch transcription create @transcription.details --content http://crbn.us/hello.wav

  -
  ai speech batch transcription [...] --name "My transcription"

  ai config @my.name --set "My transcription"
  ai speech batch transcription [...] --name @my.name

  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add description "This is the description"
  ai speech batch transcription [...] @transcription.details

  -

  ai speech batch transcription [...] --project 01234567-89ab-cdef-fedc-ba9876543210

  ai config @my.project --set 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription [...] --project @my.project

  ai speech csr project create [...] --output url @@my.project
  ai speech batch transcription [...] --project @my.project

  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add project 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription [...] @transcription.details

  -

  ai speech batch transcription [...] --wait
  ai speech batch transcription [...] --wait 60000

  ai config @my.wait --add batch.wait.timeout 60000
  ai speech batch transcription [...] @my.wait

  ai config speech @default.connection --set @@connection.from.region
  ai config speech @default.connection --add batch.wait.timeout 60000

  -
  ai config @urls.txt --clear
  ai config @urls.txt --add http://crbn.us/hello.wav
  ai config @urls.txt --add http://crbn.us/whatstheweatherlike.wav
  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add batch.wait.timeout 8640000
  ai speech batch transcription create @transcription.details --content @urls.txt --wait --zip transcription.zip

--------------------------------
ai help batch transcription name
--------------------------------
BATCH TRANSCRIPTION NAME

  The --name option specifies the display name of the TRANSCRIPTION.

USAGE: ai speech batch transcription [...] --name NAME
   OR: ai speech batch transcription [...] --name @FILENAME
   OR: ai speech batch transcription [...] @CONFIG-FILENAME

  WHERE: NAME is the transcription display name
     OR: FILENAME is a single line text file containing the NAME
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.transcription.name=NAME

EXAMPLES

  ai speech batch transcription [...] --name "My transcription"

  ai config @my.name --set "My transcription"
  ai speech batch transcription [...] --name @my.name

  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add description "This is the description"
  ai speech batch transcription [...] @transcription.details

SEE ALSO

  ai help speech batch transcription create
  ai help speech batch transcription update

----------------------------------
ai help batch transcription onprem
----------------------------------
  ______ ___ _  __
 /  ___// _ \ \/ /
 \___ \/ ___/   <
/____ /_/  /__/\_\

USAGE: ai speech batch transcription onprem <command> [...]

BATCH TRANSCRIPTION ONPREM

  The ai speech batch transcription onprem command enables running against any number of 
  user-supplied Azure Speech Containers.

  NOTE: This command can only be used when running ai in its Linux container.
        The container's lifetime must span all the sequence of applied commands.
        It is recommended to docker run the AI container first, and then
        docker exec these commands.

COMMANDS

  ai speech batch transcription onprem create [...]          (see: ai help speech batch transcription onprem create)
  ai speech batch transcription onprem status [...]          (see: ai help speech batch transcription onprem status)
  ai speech batch transcription onprem list                  (see: ai help speech batch transcription onprem list)
  ai speech batch transcription onprem delete [...]          (see: ai help speech batch transcription onprem delete)
  ai speech batch transcription onprem endpoints [...]       (see: ai help speech batch transcription onprem endpoints)

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech batch transcription onprem examples

  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

-----------------------------------------
ai help batch transcription onprem create
-----------------------------------------
BATCH TRANSCRIPTION ONPREM CREATE

  The ai speech batch transcription onprem create command submits a new batch
  of audio files to be transcribed using the user-supplied on-premise speech container endpoints.

  Endpoints should already have been configured using ai speech batch transcription onprem endpoints.

USAGE: ai speech batch transcription onprem create [...]

  CREATE
    --files /file/path1;file/path2;...
        OR
    --files @FILES.txt

    --language LANGUAGE           e.g. en-US
    --nbest NBEST                 How many transcript alternatives to return.
    --diarization DIARIZATION     Options: None, Identity, Anonymous.
    --resume RESUME               Permit resume from previous failure? Options: true, false.
    --combine COMBINE             Combine output jsons into single output json. Options: true, false.

SEE ALSO

  ai help speech setup
  ai help speech batch transcription onprem examples
  
  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

-----------------------------------------
ai help batch transcription onprem delete
-----------------------------------------
BATCH TRANSCRIPTION ONPREM DELETE

  The ai speech batch transcription onprem delete command deletes
  a previously submitted batch. This will cancel the batch if it is
  currently running.

USAGE: ai speech batch transcription onprem delete [...]

  CREATE
    --id ID                       Id of previously submitted batch.

SEE ALSO

  ai help speech setup
  ai help speech batch transcription onprem examples
  
  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

--------------------------------------------
ai help batch transcription onprem endpoints
--------------------------------------------
BATCH TRANSCRIPTION ONPREM ENDPOINTS

  The ai speech batch transcription onprem endpoints command is used to set the
  target Azure Speech Container endpoints to use for processing all batches.
  This can be set dynamically even while a batch is in progress. This should
  be set before any batches are submitted, otherwise forward progress is paused.

USAGE: ai speech batch transcription onprem endpoints [...]

  CREATE
    --config CONFIG               Path to on-prem endpoints config file.

SEE ALSO

  ai help speech setup
  ai help speech batch transcription onprem examples

  For syntax of the endpoints config file, please refer to:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-batch-processing?tabs=oneshot#endpoint-configuration

  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

---------------------------------------
ai help batch transcription onprem list
---------------------------------------
BATCH TRANSCRIPTION ONPREM LIST

  The ai speech batch transcription onprem list command lists previously
  submitted batches since the container was started.

USAGE: ai speech batch transcription onprem list [...]

  CREATE
    --outfile OUTFILE             If provided, writes the ids to file.

SEE ALSO

  ai help speech setup
  ai help speech batch transcription onprem examples
  
  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

-----------------------------------------
ai help batch transcription onprem status
-----------------------------------------
BATCH TRANSCRIPTION ONPREM STATUS

  The ai speech batch transcription onprem status command queries for the status
  of a previously submitted batch.

USAGE: ai speech batch transcription onprem status [...]

  CREATE
    --id ID                       Id of previously submitted batch.
    --waitms WAITMS               Milliseconds to wait if batch is not finished or failed.
                                  Omit or provide 0 for no wait.
SEE ALSO

  ai help speech setup
  ai help speech batch transcription onprem examples
  
  Learn more about running On-Premise Speech Containers:
  https://docs.microsoft.com/azure/cognitive-services/speech-service/speech-container-howto

-----------------------------------
ai help batch transcription project
-----------------------------------
BATCH TRANSCRIPTION PROJECT

  The --project specifies the PROJECT with which to associate a transcription.

USAGE: ai speech batch transcription [...] --project PROJECT-ID
   OR: ai speech batch transcription [...] --project PROJECT-URL
   OR: ai speech batch transcription [...] --project @FILENAME
   OR: ai speech batch transcription [...] @CONFIG-FILENAME

  WHERE: PROJECT-ID is the project ID
     OR: PROJECT-URL is the project URL
     OR: FILENAME is a single line text file containing the project ID or URL
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.project.id=ID-or-URL

EXAMPLES

  ai speech batch transcription [...] --project 01234567-89ab-cdef-fedc-ba9876543210

  ai config @my.project --set 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription [...] --project @my.project

  ai speech csr project create [...] --output url @@my.project
  ai speech batch transcription [...] --project @my.project

  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add project 01234567-89ab-cdef-fedc-ba9876543210
  ai speech batch transcription [...] @transcription.details

SEE ALSO

  ai help speech csr project create
  ai help speech batch transcription create
  ai help speech batch transcription update

----------------------------------
ai help batch transcription status
----------------------------------
BATCH TRANSCRIPTION STATUS

  The ai speech batch transcription status command checks the status of
  existing batch transcriptions, providing additional details.
  
USAGE: ai speech batch transcription status [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  STATUS
    --transcription URL           (see: ai help speech batch transcription reference)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription status advanced
  ai help speech batch transcription examples
  ai help speech batch transcription list

-------------------------------------------
ai help batch transcription status advanced
-------------------------------------------
BATCH TRANSCRIPTION STATUS ADVANCED

  The ai speech batch transcription status command checks the status of
  existing batch transcriptions, providing additional details.
  
USAGE: ai speech batch transcription status [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  STATUS
    --transcription URL           (see: ai help speech batch transcription reference)

  OUTPUT
    --output json FILENAME        (see: ai help speech batch output json)
    --output url @@FILE           (see: ai help speech batch output url)
    --output id @@FILE            (see: ai help speech batch output id)
    --wait [TIMEOUT]              (see: ai help speech batch transcription wait)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription examples
  ai help speech batch transcription list

----------------------------------
ai help batch transcription update
----------------------------------
BATCH TRANSCRIPTION UPDATE

  The ai speech batch transcription update command updates an existing
  transcription request with a new name, description, or project association.

USAGE: ai speech batch transcription update [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  UPDATE
    --project URL                 (see: ai help speech batch transcription project)
    --name NAME                   (see: ai help speech batch transcription name)
    --description DESCRIPTION     (see: ai help speech batch transcription description)
    --transcription URL           (see: ai help speech batch transcription reference)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription update advanced
  ai help speech batch transcription examples
  ai help speech batch transcription list

-------------------------------------------
ai help batch transcription update advanced
-------------------------------------------
BATCH TRANSCRIPTION UDPATE ADVANCED

  The ai speech batch transcription update command updates an existing
  transcription request with a new name, description, or project association.

USAGE: ai speech batch transcription update [...]

  CONNECTION                      (see: ai help speech batch connection)
    --key KEY                     (see: ai help speech batch key)
    --region REGION               (see: ai help speech batch region)

  UPDATE
    --project URL                 (see: ai help speech batch transcription project)
    --name NAME                   (see: ai help speech batch transcription name)
    --description DESCRIPTION     (see: ai help speech batch transcription description)
    --transcription URL           (see: ai help speech batch transcription reference)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech batch threads)
    --processes NUMBER            (see: ai help speech batch processes)

  ADVANCED
    --input path PATH             (see: ai help speech batch input path)
    --output path PATH            (see: ai help speech batch output path)
    --output json FILENAME        (see: ai help speech batch output json)
    --foreach in @FILENAME        (see: ai help speech batch foreach)
    --save FILENAME               (see: ai help speech batch save)
    --zip ZIPFILE                 (see: ai help speech batch zip)

SEE ALSO

  ai help speech batch output
  ai help speech batch transcription update advanced
  ai help speech batch transcription examples
  ai help speech batch transcription list

--------------------------------
ai help batch transcription wait
--------------------------------
BATCH TRANSCRIPTION WAIT

  The --wait option waits for the transcription status become
  either Success or Failed.

USAGE: ai speech batch transcription [...] --wait
   OR: ai speech batch transcription [...] --wait TIMEOUT
   OR: ai speech batch transcription [...] --wait @FILENAME
   OR: ai speech batch transcription [...] @CONFIG-FILENAME

  WHERE: TIMEOUT is the amount of time to wait in milliseconds (default 1 day)
     OR: FILENAME is a single line text file containing MILLISECONDS to wait
     OR: CONFIG-FILENAME is a single line text file in the following form:

            batch.wait.timeout=TIMEOUT

EXAMPLES

  ai speech batch transcription [...] --wait
  ai speech batch transcription [...] --wait 60000

  ai config @my.wait --add batch.wait.timeout 60000
  ai speech batch transcription [...] @my.wait

  ai config speech @default.connection --set @@connection.from.region
  ai config speech @default.connection --add batch.wait.timeout 60000

SEE ALSO

  ai help speech csr project create
  ai help speech batch transcription create
  ai help speech batch transcription update

-----------------
ai help batch zip
-----------------
BATCH ZIP

  The --zip option packages command line and related
  configuration data along with AI and its runtime dependencies into
  a self-contained .ZIP file for backup or portability to another device.

USAGE: ai speech batch [...] --zip FILENAME

EXAMPLES

  ai config @urls.txt --clear
  ai config @urls.txt --add http://crbn.us/hello.wav
  ai config @urls.txt --add http://crbn.us/whatstheweatherlike.wav
  ai config @transcription.details --set name "My transcription"
  ai config @transcription.details --add batch.wait.timeout 8640000
  ai speech batch transcription create @transcription.details --content @urls.txt --wait --zip transcription.zip

  ai webjob --upload transcription.zip --run

SEE ALSO

  ai help config
  ai help speech batch
  ai help speech batch save
  ai help speech webjob setup

-----------
ai help csr
-----------
CUSTOM SPEECH RECOGNITION

  The ai speech csr commands manage custom speech recognition models.

USAGE: ai speech csr <command> [...]

COMMANDS

  ai speech csr project [...]           (see: ai help speech csr project)
  ai speech csr dataset [...]           (see: ai help speech csr dataset)

  ai speech csr model [...]             (see: ai help speech csr model)
  ai speech csr endpoint [...]          (see: ai help speech csr endpoint)

  ai speech csr evaluation [...]        (see: ai help speech csr evaluation)

  ai speech csr list [...]              (see: ai help speech csr list)
  ai speech csr download [...]          (see: ai help speech csr download)

ADDITIONAL TOPICS

  ai help speech csr examples
  ai help find topics speech csr

-------------------
ai help csr dataset
-------------------
CUSTOM SPEECH RECOGNITION DATASET

  The ai speech csr dataset commands manage custom speech recognition
  training and testing datasets.

USAGE: ai speech csr dataset <command> [...]

COMMANDS

  ai speech csr dataset create [...]        (see: ai help speech csr dataset create)
  ai speech csr dataset status [...]        (see: ai help speech csr dataset status)
  ai speech csr dataset list [...]          (see: ai help speech csr dataset list)

  ai speech csr dataset update [...]        (see: ai help speech csr dataset update)
  ai speech csr dataset delete [...]        (see: ai help speech csr dataset delete)

  ai speech csr dataset upload [...]        (see: ai help speech csr dataset upload)
  ai speech csr dataset download [...]      (see: ai help speech csr dataset download)

ADDITIONAL TOPICS

  ai help speech csr examples
  ai help speech csr list datasets
  ai help speech documentation

--------------------------
ai help csr dataset create
--------------------------
CUSTOM SPEECH RECOGNITION DATASET CREATE

  The ai speech csr dataset create command creates a new dataset by
  getting the data from a specified URL.

USAGE: ai speech csr dataset create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --project URL                 (see: ai help speech csr dataset project)
  --name NAME                   (see: ai help speech csr dataset name)
  --kind KIND                   (see: ai help speech csr dataset create kind)
  --content URL                 (see: ai help speech csr dataset create content)
  --language LANGUAGE           (see: ai help speech csr dataset create language)
  --description DESCRIPTION     (see: ai help speech csr dataset description)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------------
ai help csr dataset delete
--------------------------
CUSTOM SPEECH RECOGNITION DATASET DELETE

  The ai speech csr dataset delete command deletes an existing custom speech
  recognition dataset.

USAGE: ai speech csr dataset delete [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DELETE
  --dataset URL                 (see: ai help speech csr dataset delete dataset)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

----------------------------
ai help csr dataset download
----------------------------
CUSTOM SPEECH RECOGNITION DATASET DOWNLOAD

  The ai speech csr dataset download command downloads one more more files
  associated with a custom speech recognition dataset.

USAGE: ai speech csr dataset download [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DOWNLOAD
  --file URL                    (see: ai help speech csr dataset download file)

OUTPUT                          (see: ai help speech csr output)
  --output file FILENAME        (see: ai help speech csr output file)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)

ADVANCED
  --url URL
  --file URL                    (see: ai help speech csr dataset download file)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

------------------------
ai help csr dataset list
------------------------
CUSTOM SPEECH RECOGNITION DATASET LIST

  The ai speech csr dataset list command lists details about existing
  custom speech recognition datasets and/or its associated files.

USAGE: ai speech csr dataset list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

LIST
  --datasets                    (see: ai help speech csr dataset list datasets)
  --languages                   (see: ai help speech csr dataset list languages)

DATASET FILES                   (see: ai help speech csr dataset list files)
  --dataset ID/URL
  --files

ADVANCED
  --project URL                 (see: ai help speech csr dataset list project)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------------
ai help csr dataset status
--------------------------
CUSTOM SPEECH RECOGNITION DATASET STATUS

  The ai speech csr dataset status command checks the asynchronous creation status
  of a custom speech recognition dataset.

USAGE: ai speech csr dataset status [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

STATUS
  --dataset URL                 (see: ai help speech csr dataset status dataset)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------------
ai help csr dataset update
--------------------------
CUSTOM SPEECH RECOGNITION DATASET UPDATE

  The ai speech csr dataset update command updates an existing custom speech
  recognition dataset with an updated name, description, and/or
  project reference.

USAGE: ai speech csr dataset update [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPDATE
  --dataset URL                 (see: ai help speech csr dataset update dataset)
  --project URL                 (see: ai help speech csr dataset project)
  --name NAME                   (see: ai help speech csr dataset name)
  --description DESCRIPTION     (see: ai help speech csr dataset description)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------------
ai help csr dataset upload
--------------------------
CUSTOM SPEECH RECOGNITION DATASET UPLOAD

  The ai speech csr dataset upload command uploads a new dataset by
  getting the data from a specified local data file.

USAGE: ai speech csr dataset upload [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPLOAD
  --name NAME                   (see: ai help speech csr dataset name)
  --description DESCRIPTION     (see: ai help speech csr dataset description)
  --language LANGUAGE           (see: ai help speech csr dataset language)
  --data FILENAME               (see: ai help speech csr dataset data)
  --kind KIND                   (see: ai help speech csr dataset kind)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED                        (see: ai help speech csr advanced)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------
ai help csr download
--------------------
USAGE: ai speech csr download [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DOWNLOAD
  --url URL                     (see: ai help speech csr download url)
  --file URL                    (see: ai help speech csr download file)
  
DATASET FILE
  --dataset file URL            (see: ai help speech csr download dataset file)

EVALUATION FILE
  --evaluation file URL         (see: ai help speech csr download dataset file)

ENDPOINT LOG
  --endpoint log URL            (see: ai help speech csr download endpoint log)

OUTPUT                          (see: ai help speech csr output)
  --output file FILENAME        (see: ai help speech csr output file)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)

ADVANCED                        (see: ai help speech csr advanced)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------
ai help csr endpoint
--------------------
CUSTOM SPEECH RECOGNITION ENDPOINT

  The ai speech csr endpoint commands manage custom speech recognition endpoints.

USAGE: ai speech csr endpoint <command> [...]

COMMANDS

  ai speech csr endpoint create [...]       (see: ai help speech csr endpoint create)
  ai speech csr endpoint status [...]       (see: ai help speech csr endpoint status)

  ai speech csr endpoint list [...]         (see: ai help speech csr endpoint list)
  ai speech csr endpoint download [...]     (see: ai help speech csr endpoint download)

  ai speech csr endpoint update [...]       (see: ai help speech csr endpoint update)
  ai speech csr endpoint delete [...]       (see: ai help speech csr endpoint delete)

ADDITIONAL TOPICS

  ai help speech csr examples
  ai help speech csr endpoint examples
  ai help speech csr list endpoints
  ai help speech documentation

---------------------------
ai help csr endpoint create
---------------------------
CUSTOM SPEECH RECOGNITION ENDPOINT CREATE

  The ai speech csr endpoint create command creates a new custom speech recognition
  endpoint using previously created custom speech recognition model or text
  supplied to the create command.

USAGE: ai speech csr endpoint create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --project URL                 (see: ai help speech csr endpoint project)
  --name NAME                   (see: ai help speech csr endpoint name)
  --text TEXT                   (see: ai help speech csr endpoint create text)
  --model URL                   (see: ai help speech csr endpoint create model)
  --language LANGUAGE           (see: ai help speech csr endpoint create language)
  --description DESCRIPTION     (see: ai help speech csr endpoint description)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

---------------------------
ai help csr endpoint delete
---------------------------
CUSTOM SPEECH RECOGNITION ENDPOINT DELETE

  The ai speech csr endpoint delete command deletes an existing custom speech
  recognition endpoint.

USAGE: ai speech csr endpoint delete [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DELETE
  --endpoint URL                (see: ai help speech csr endpoint delete endpoint)
  --endpoint log URL            (see: ai help speech csr endpoint delete endpoint log)

ADVANCED                        (see: ai help speech csr advanced)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

-----------------------------
ai help csr endpoint download
-----------------------------
CUSTOM SPEECH RECOGNITION ENDPOINT DOWNLOAD

  The ai speech csr endpoint download command downloads one more more files
  associated with a custom speech recognition endpoint.

USAGE: ai speech csr endpoint download [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

ENDPOINT LOG
  --endpoint log URL            (see: ai help speech csr endpoint download endpoint log)

OUTPUT                          (see: ai help speech csr output)
  --output file FILENAME        (see: ai help speech csr output file)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)

ADVANCED                        (see: ai help speech csr advanced)
  --url URL                     (see: ai help speech csr download url)
  --file URL                    (see: ai help speech csr download file)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

-------------------------
ai help csr endpoint list
-------------------------
CUSTOM SPEECH RECOGNITION ENDPOINT LIST

  The ai speech csr endpoint list command lists details about existing
  custom speech recognition endpoints.

USAGE: ai speech csr endpoint list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

LIST
  --endpoints                   (see: ai help speech csr endpoint list endpoints)
  --languages                   (see: ai help speech csr endpoint list endpoint languages)

ENDPOINT LOGs                   (see: ai help speech csr endpoint list endpoint logs)
  --endpoint URL
  --logs

ADVANCED                        (see: ai help speech csr advanced)
  --project URL                 (see: ai help speech csr project)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

---------------------------
ai help csr endpoint status
---------------------------
CUSTOM SPEECH RECOGNITION ENDPOINT STATUS

  The ai speech csr endpoint status command checks the asynchronous creation status
  of a custom speech recognition endpoint.

USAGE: ai speech csr endpoint status [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

STATUS
  --endpoint URL                (see: ai help speech csr endpoint status endpoint)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

---------------------------
ai help csr endpoint update
---------------------------
CUSTOM SPEECH RECOGNITION ENDPOINT UPDATE

  The ai speech csr endpoint update command updates an existing custom speech
  recognition endpoint with an updated name, description, and/or
  project reference.

USAGE: ai speech csr endpoint update [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPDATE
  --endpoint URL                (see: ai help speech csr endpoint update endpoint)
  --project URL                 (see: ai help speech csr endpoint project)
  --name NAME                   (see: ai help speech csr endpoint name)
  --description DESCRIPTION     (see: ai help speech csr endpoint description)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

----------------------
ai help csr evaluation
----------------------
CUSTOM SPEECH RECOGNITION EVALUATION

  The ai speech csr evaluation commands manage custom speech recognition
  evaluations.

USAGE: ai speech csr evaluation <command> [...]

COMMANDS

  ai speech csr evaluation create [...]           (see: ai help speech csr evaluation create)
  ai speech csr evaluation status [...]           (see: ai help speech csr evaluation status)
  ai speech csr evaluation list [...]             (see: ai help speech csr evaluation list)

  ai speech csr evaluation update [...]           (see: ai help speech csr evaluation update)
  ai speech csr evaluation delete [...]           (see: ai help speech csr evaluation delete)

ADDITIONAL TOPICS

  ai help speech csr examples
  ai help speech csr evaluation examples
  ai help speech documentation

-----------------------------
ai help csr evaluation create
-----------------------------
CUSTOM SPEECH RECOGNITION EVALUATION CREATE

  The ai speech csr evaluation create command creates a new custom speech
  recognition evaluation using previously created custom speech recognition
  models and dataset.

USAGE: ai speech csr evaluation create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --project URL                 (see: ai help speech csr evaluation project)
  --name NAME                   (see: ai help speech csr evaluation name)
  --model1 URL                  (see: ai help speech csr evaluation create model1)
  --model2 URL                  (see: ai help speech csr evaluation create model2)
  --dataset URL                 (see: ai help speech csr evaluation create dataset)
  --language LANGUAGE           (see: ai help speech csr evaluation create language)
  --description DESCRIPTION     (see: ai help speech csr evaluation description)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

-----------------------------
ai help csr evaluation delete
-----------------------------
CUSTOM SPEECH RECOGNITION EVALUATION DELETE

  The ai speech csr evaluation delete command deletes an existing custom speech
  recognition evaluation.

USAGE: ai speech csr evaluation delete [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DELETE
  --evaluation URL              (see: ai help speech csr evaluation delete evalution)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

---------------------------
ai help csr evaluation list
---------------------------
CUSTOM SPEECH RECOGNITION EVALUATION LIST

  The ai speech csr evaluation list command lists details about existing
  custom speech recognition evaluations and/or its associated files.

USAGE: ai speech csr evaluation list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

LIST
  --evaluations                 (see: ai help speech csr evaluation list evaluations)
  --languages                   (see: ai help speech csr evaluation list evaluations languages)

EVALUATION FILES                (see: ai help speech csr evaluation list files)
  --evaluation ID/URL
  --files

ADVANCED
  --project URL                 (see: ai help speech csr project)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

-----------------------------
ai help csr evaluation status
-----------------------------
CUSTOM SPEECH RECOGNITION EVALUATION STATUS

  The ai speech csr evaluation status command checks the asynchronous creation and
  execution status of a custom speech recognition evaluation.

USAGE: ai speech csr evaluation status [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

STATUS
  --evaluation URL              (see: ai help speech csr evaluation status evaluation)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

-----------------------------
ai help csr evaluation update
-----------------------------
CUSTOM SPEECH RECOGNITION EVALUATION UPDATE

  The ai speech csr evaluation update command updates an existing custom speech
  recognition evaluation with an updated name, description, and/or
  project reference.

USAGE: ai speech csr evaluation update [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPDATE
  --evaluation URL              (see: ai help speech csr evaluation update evaluation)
  --project URL                 (see: ai help speech csr evaluation project)
  --name NAME                   (see: ai help speech csr evaluation name)
  --description DESCRIPTION     (see: ai help speech csr evaluation description)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------
ai help csr examples
--------------------
CUSTOM SPEECH RECOGNITION EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Use new endpoint with custom speech recognition model

    ai speech csr endpoint create --name "LM example" --text @sentences.txt --output id @my.cid.txt
    ai speech csr endpoint status --endpoint @my.cid.txt --wait
    ai speech recognize --files test.wav --endpoint id @my.cid.txt

  EXAMPLE 2: List custom speech recognition projects or endpoints

    ai speech csr project list --projects
    ai speech csr endpoint list --endpoints

  EXAMPLE 3: Use new custom speech recognition model in batch transcription

    ai speech csr model create --name "LM example" --text @sentences.txt --output url @my.model.txt
    ai speech batch transcription create --name "Example 3" --model @my.model.txt --output url @my.trx.txt
    ai speech batch transcription status --transcription @my.trx.txt --wait

  EXAMPLE 4: Create custom speech recognition model using text and audio datasets

    ai speech csr dataset create --name "LM" --kind Language --content https://crbn.us/data.txt --output url @my.datasets.txt
    ai speech csr dataset create --name "AM" --kind Acoustic --content https://crbn.us/audio.zip --output add url @my.datasets.txt
    ai speech csr model create --name "Example 4" --datasets @my.datasets.txt --output url @my.model.txt
    ai speech csr model status --model @my.model.txt --wait

  EXAMPLE 5: Create custom speech recognition model using uploaded text dataset

    ai speech csr dataset upload --name "LM data" --kind Language --data data.txt --output url @my.dataset.txt
    ai speech csr model create --name "Example 5" --dataset @my.dataset.txt --output url @my.model.txt
    ai speech csr model status --model @my.model.txt --wait
   
ADDITIONAL TOPICS

  ai help speech setup
  ai help speech csr

----------------
ai help csr list
----------------
CUSTOM SPEECH RECOGNITION

The ai speech csr list command shows details about speech recognition models.

USAGE: ai speech csr list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

PROJECTS
  --projects                    List projects
  --project languages           List supported locales for projects

DATASETS
  --datasets                    List datasets
  --dataset languages           List supported locales for datasets

DATASET FILES                   (see: ai help speech csr list dataset files)
  --dataset URL

MODELS
  --models                      List models
  --model languages             List supported locales for models
  --base models                 (see: ai help speech csr list base models)

EVALUATIONS
  --evaluations                 List evaluations
  --evaluation languages        List supported locales for evaluations

EVALUATION FILES                (see: ai help speech csr list evaluation files)
  --evaluation URL

ENDPOINTS
  --endpoints                   List endpoints
  --endpoint languages          List supported locales for endpoints

ENDPOINT LOGS                   (see: ai help speech csr list endpoint logs)
  --endpoint URL

ADVANCED                        (see: ai help speech csr advanced)
  --project URL                 (see: ai help speech csr project)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

-----------------
ai help csr model
-----------------
CUSTOM SPEECH RECOGNITION MODEL

  The ai speech csr model commands manage custom speech recognition models.

USAGE: ai speech csr model <command> [...]

COMMANDS

  ai speech csr model create [...]          (see: ai help speech csr model create)
  ai speech csr model status [...]          (see: ai help speech csr model status)
  ai speech csr model list [...]            (see: ai help speech csr model list)

  ai speech csr model update [...]          (see: ai help speech csr model update)
  ai speech csr model delete [...]          (see: ai help speech csr model delete)

  ai speech csr model copy [...]            (see: ai help speech csr model copy)

ADDITIONAL TOPICS

  ai help speech csr examples
  ai help speech csr model examples
  ai help speech csr list models
  ai help speech documentation

----------------------
ai help csr model copy
----------------------
CUSTOM SPEECH RECOGNITION MODEL COPY

  The ai speech csr model copy command copies an existing custom speech recognition
  model from one region to another region.
  
  NOTE: Only adapted models are allowed to copy to another subscription.

USAGE: ai speech csr model copy [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

COPY                            (see: ai help speech csr model copy examples)
  --model URL                   (see: ai help speech csr model copy model)
  --target SUBSCRIPTION         (see: ai help speech csr model copy target)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED                        (see: ai help speech csr advanced)
  --input path PATH             (see: ai help speech csr input path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

------------------------
ai help csr model create
------------------------
CUSTOM SPEECH RECOGNITION MODEL CREATE

  The ai speech csr model create command creates a new custom speech recognition
  model using previously uploaded datasets and/or text supplied to the create
  command.

USAGE: ai speech csr model create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --project URL                 (see: ai help speech csr model project)
  --name NAME                   (see: ai help speech csr model name)
  --text @FILE                  (see: ai help speech csr model create text)
  --base URL                    (see: ai help speech csr model create base)
  --dataset URL                 (see: ai help speech csr model create dataset)
  --datasets URL1;URL2          (see: ai help speech csr model create datasets)
  --language LANGUAGE           (see: ai help speech csr model create language)
  --description DESCRIPTION     (see: ai help speech csr model description)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

------------------------
ai help csr model delete
------------------------
CUSTOM SPEECH RECOGNITION MODEL DELETE

  The ai speech csr model delete command deletes an existing custom speech
  recognition model.

USAGE: ai speech csr model delete [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DELETE
  --model URL                   (see: ai help speech csr model delete model)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

----------------------
ai help csr model list
----------------------
CUSTOM SPEECH RECOGNITION MODEL LIST

  The ai speech csr model list command lists details about existing
  custom speech recognition models.

USAGE: ai speech csr model list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

LIST
  --models                      (see: ai help speech csr model list models)
  --languages                   (see: ai help speech csr model list model languages)
  --base models                 (see: ai help speech csr model list base models)

ADVANCED
  --project URL                 (see: ai help speech csr project)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

------------------------
ai help csr model status
------------------------
CUSTOM SPEECH RECOGNITION MODEL STATUS

  The ai speech csr model status command checks the asynchronous creation status
  of a custom speech recognition model.

USAGE: ai speech csr model status [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

STATUS
  --model URL                   (see: ai help speech csr model status model)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --wait [TIMEOUT]              (see: ai help speech csr wait)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

------------------------
ai help csr model update
------------------------
CUSTOM SPEECH RECOGNITION MODEL UPDATE

  The ai speech csr model update command updates an existing custom speech
  recognition model with an updated name, description, and/or
  project reference.

USAGE: ai speech csr model update [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPDATE
  --model URL                   (see: ai help speech csr model update model)
  --project URL                 (see: ai help speech csr model project)
  --name NAME                   (see: ai help speech csr model name)
  --description DESCRIPTION     (see: ai help speech csr model description)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

------------------------------
ai help csr model update model
------------------------------
csr.model.update.model NOT YET WRITTEN!!

-------------------
ai help csr project
-------------------
CUSTOM SPEECH RECOGNITION PROJECT

  The ai speech csr project commands manage custom speech recognition
  projects, which contain models, training and testing datasets,
  and deployment endpoints.

USAGE: ai speech csr project <command> [...]

COMMANDS

  ai speech csr project create [...]        (see: ai help speech csr project create)
  ai speech csr project status [...]        (see: ai help speech csr project status)
  ai speech csr project list [...]          (see: ai help speech csr project list)

  ai speech csr project update [...]        (see: ai help speech csr project update)
  ai speech csr project delete [...]        (see: ai help speech csr project delete)

ADDITIONAL TOPICS

  ai help speech csr examples
  ai help speech csr project examples
  ai help speech csr list projects
  ai help speech documentation

--------------------------
ai help csr project create
--------------------------
CUSTOM SPEECH RECOGNITION PROJECT CREATE

  The ai speech csr project create command creates a new custom speech
  recognition project.

USAGE: ai speech csr project create [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

CREATE
  --name NAME                   (see: ai help speech csr project name)
  --language LANGUAGE           (see: ai help speech csr project create language)
  --description DESCRIPTION     (see: ai help speech csr project description)

OUTPUT                          (see: ai help speech csr output)
  --output json FILENAME        (see: ai help speech csr output json)
  --output url @@FILE           (see: ai help speech csr output url)
  --output id @@FILE            (see: ai help speech csr output id)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------------
ai help csr project delete
--------------------------
CUSTOM SPEECH RECOGNITION PROJECT DELETE

  The ai speech csr project delete command deletes an existing custom speech
  recognition project.

USAGE: ai speech csr project delete [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

DELETE
  --project URL                 (see: ai help speech csr project delete project)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

------------------------
ai help csr project list
------------------------
CUSTOM SPEECH RECOGNITION PROJECT LIST

  The ai speech csr project list command lists details about existing
  custom speech recognition projects.

USAGE: ai speech csr project list [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

LIST
  --projects                    (see: ai help speech csr project list projects)
  --languages                   (see: ai help speech csr project list project languages)

ADVANCED                        (see: ai help speech csr advanced)
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------------
ai help csr project status
--------------------------
CUSTOM SPEECH RECOGNITION PROJECT STATUS

  The ai speech csr project status command checks the asynchronous creation status
  of a custom speech recognition project.

USAGE: ai speech csr project status [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

STATUS
  --project URL                 (see: ai help speech csr project status project)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

--------------------------
ai help csr project update
--------------------------
CUSTOM SPEECH RECOGNITION PROJECT UPDATE

  The ai speech csr project update command updates an existing custom speech
  recognition project with an updated name and/or description.

USAGE: ai speech csr project update [...]

CONNECTION                      (see: ai help speech csr connection)
  --key KEY                     (see: ai help speech csr key)
  --region REGION               (see: ai help speech csr region)

UPDATE
  --project URL                 (see: ai help speech csr project update project)
  --name NAME                   (see: ai help speech csr project name)
  --description DESCRIPTION     (see: ai help speech csr project description)

ADVANCED
  --input path PATH             (see: ai help speech csr input path)
  --output path PATH            (see: ai help speech csr output path)
  --output json FILENAME        (see: ai help speech csr output json)
  --foreach in @FILENAME        (see: ai help speech csr foreach)
  --save FILENAME               (see: ai help speech csr save)
  --zip ZIPFILE                 (see: ai help speech csr zip)

-------------------------
ai help endpoint examples
-------------------------
ENDPOINT EXAMPLES

  --endpoint "wss://westus.stt.speech.microsoft.com/speech/recognition/interactive/cognitiveservices/v1"
  --endpoint "wss://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1"
  --endpoint "wss://westus.stt.speech.microsoft.com/speech/recognition/dictation/cognitiveservices/v1"

SEE ALSO

  ai help speech key overview
  ai help speech recognize endpoint
  ai help speech translate endpoint

----------------
ai help examples
----------------
USAGE: ai speech <command> [...]

EXAMPLES

  ai config @region --set westus2
  ai config @key --set 436172626F6E20697320636F6F6C2121

  ai speech synthesize --text "Hello"
  ai speech synthesize --files *.txt;*.ssml --audio output {id}.wav

  ai speech recognize --microphone
  ai speech recognize --files *.wav --output results.tsv

  ai speech translate --target de --microphone
  ai speech translate --source en-US --target de;es;fr --file hello.wav

ADDITIONAL EXAMPLES

  ai help find speech "mp3"
  ai help find speech "mp3" --expand

  ai help find topics speech "examples"
  ai help list topics speech

--------------
ai help intent
--------------
INTENT

  The ai speech intent command recognizes streaming audio captured
  from a device microphone or stored in local or remote audio files 
  and returns intent information from that recognition using PATTERNS
  or a previously authored and deployed LUIS model.

USAGE: ai speech intent [...]

  CONNECTION                      (see: ai help speech intent connection)
    --key KEY                     (see: ai help speech intent key)
    --region REGION               (see: ai help speech intent region)

  PATTERNS
    --pattern PATTERN             (see: ai help speech intent pattern)
    --pattern INTENTID=PATTERN
    --patterns PATTERN1;PATTERN2  (see: ai help speech intent patterns)
    --patterns @PATTERNS.txt

  LUIS                            (see: ai help speech intent luis)
    --luis key KEY                (see: ai help speech intent luis key)
    --luis region REGION          (see: ai help speech intent luis region)
    --luis appid APPID            (see: ai help speech intent luis appid)

  INPUT                           (see: ai help speech intent input)
    --microphone                  (see: ai help speech intent microphone)
    --file FILE                   (see: ai help speech intent file)
    --files PATTERN               (see: ai help speech intent files)
    --files @FILELIST.txt         (see: ai help speech intent files)
    --format FORMAT               (see: ai help speech intent format)

  RECOGNITION
    --once[+]                     (see: ai help speech intent once)
    --continuous                  (see: ai help speech intent continuous)
    --keyword FILENAME            (see: ai help speech intent keyword)
    --language LANGUAGE           (see: ai help speech intent language)

  ADVANCED
    --log FILENAME                (see: ai help speech intent log)
    --proxy HOSTNAME              (see: ai help speech intent proxy)
    --foreach in @ITEMS.txt       (see: ai help speech intent foreach)
    --threads NUMBER              (see: ai help speech intent threads)

SEE ALSO

  ai help speech setup
  ai help speech intent advanced
  ai help speech intent examples
  ai help find topics speech intent

-----------------------
ai help intent advanced
-----------------------
INTENT

  The ai speech intent command recognizes streaming audio captured
  from a device microphone or stored in local or remote audio files 
  and returns intent information from that recognition using PATTERNS
  or a previously authored and deployed LUIS model.

USAGE: ai speech intent [...]

  CONNECTION                      (see: ai help speech intent connection)
    --key KEY                     (see: ai help speech intent key)
    --region REGION               (see: ai help speech intent region)
    --endpoint URI                (see: ai help speech intent endpoint)
    --token VALUE                 (see: ai help speech intent token)

  SERVICE
    --traffic type test           (see: ai help speech traffic type)
    --http header name=value      (see: ai help speech http header)
    --query string name=value     (see: ai help speech query string)

  PATTERNS
    --pattern PATTERN             (see: ai help speech intent pattern)
    --pattern INTENTID=PATTERN
    --patterns PATTERN1;PATTERN2  (see: ai help speech intent patterns)
    --patterns @PATTERNS.txt

  LUIS                            (see: ai help speech intent luis)
    --luis key KEY                (see: ai help speech intent luis key)
    --luis region REGION          (see: ai help speech intent luis region)
    --luis appid APPID            (see: ai help speech intent luis appid)
    --luis intent INTENTID        (see: ai help speech intent luis intent)
    --luis allintents true        (see: ai help speech intent luis allintents)

  INPUT                           (see: ai help speech intent input)
    --microphone                  (see: ai help speech intent microphone)
    --file FILE                   (see: ai help speech intent file)
    --files PATTERN               (see: ai help speech intent files)
    --files @FILELIST.txt         (see: ai help speech intent files)
    --url URL                     (see: ai help speech intent url)
    --urls URL                    (see: ai help speech intent urls)
    --urls @URLLIST.txt           (see: ai help speech intent urls)
    --format FORMAT               (see: ai help speech intent format)
    --id url URL                  (see: ai help speech input id)
    --id ID                       (see: ai help speech input id)

  RECOGNITION
    --language LANGUAGE           (see: ai help speech intent language)
    --timeout MILLISECONDS        (see: ai help speech intent continuous)

  ACCURACY                        (see: ai help speech intent improve accuracy)
    --endpoint id ID              (see: ai help speech intent custom speech)
    --phrases @PHRASELIST.txt     (see: ai help speech intent phrases)

  TESTING                         (see: ai help speech intent testing)
    --transcript TEXT             (see: ai help speech intent transcript)
    --check wer NUMOP NUMBER      (see: ai help speech intent check wer)
    --check text TEXTOP TEXT      (see: ai help speech intent check text)

  OUTPUT                          (see: ai help speech intent output)
    --output all [<item>]         (see: ai help speech intent output all)
    --output each [<item>]        (see: ai help speech intent output each)
    --output batch json           (see: ai help speech intent output batch json)
    --output batch file FILENAME  (see: ai help speech intent output batch file)
    --output each file FILENAME   (see: ai help speech intent output each file)
    --output all file FILENAME    (see: ai help speech intent output all file)
    --output vtt file FILENAME    (see: ai help speech intent output vtt file)
    --word level timing           (see: ai help speech intent word level timing)
    --profanity OPTION            (see: ai help speech intent profanity)

  LOGGING                         (see: ai help speech intent log)
    --log FILENAME
    --content logging

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech intent threads)
    --processes NUMBER            (see: ai help speech intent processes)
    --repeat NUMBER
    --max NUMBER

  ADVANCED
    --proxy HOSTNAME              (see: ai help speech intent proxy)
    --property NAME=VALUE         (see: ai help speech intent property)
    --properties @PROPLIST.txt    (see: ai help speech intent properties)
    --foreach in @ITEMS.txt       (see: ai help speech intent foreach)
    --save FILENAME               (see: ai help speech intent save)
    --zip ZIPFILE                 (see: ai help speech intent zip)

SEE ALSO

  ai help speech setup
  ai help speech intent examples
  ai help find topics speech intent

-------------------------
ai help intent connection
-------------------------
CONNECTION OVERVIEW

  AUTHENTICATION - KEY or TOKEN

    The Azure Speech service requires authentication using subscriptions keys
    or authentication tokens.

    To use subscription keys see: ai help speech intent key
    To use authentication tokens see: ai help speech intent token

  CONNECTION - REGION, ENDPOINT, or HOST

    The Azure Speech service runs in REGION specific data centers, sovereign
    clouds, or on-premise containers. For sovereign clouds and on-premise
    containers, you may need to specify the ENDPOINT or HOST directly.

    To specify a particular REGION see: ai help speech intent region
    To specify a particular ENDPOINT see: ai help speech intent endpoint
    To specify a particular HOST see: ai help speech intent host

    NOTE: Default connection uses the @connection.from.region preset template

      service.config.region=@region
      service.config.key=@key

EXAMPLES

  EXAMPLE 1: Use the westus2 region and key stored in the AI configuration

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai speech intent --file hello.wav

  EXAMPLE 2: Use the westus2 region and key directly on command line

    ai speech intent --region westus2 --key 436172626F6E20697320636F6F6C2121 --file hello.wav

  EXAMPLE 3: Use a specific sovereign cloud host on the command line

    ai speech intent --host wss://chinaeast2.stt.speech.azure.cn --file hello.wav

  EXAMPLE 4: Use a specific on-premise container host on the command line

    ai speech intent --key @none --host wss://localhost:5000/ --file hello.wav

  EXAMPLE 5: Use a specific endpoint on the command line

    ai speech intent --nodefaults --endpoint wss://westus2.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1

SEE ALSO

  ai help speech intent default connection example

-------------------------
ai help intent continuous
-------------------------
INTENT CONTINUOUS

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  Streaming audio can be recognized in several modes:
  (1) Continuous - recognize audio continuously, optimized for conversations
  (2) Once+ - recognize audio continuously, optimized for non-interactive use cases
  (3) Once - recognize a single phrase, optimized for interactive use cases

  The --continuous option recognizes streaming audio continuously,
  optimized for interactive conversations and audio files.

  The --timeout option can be used to limit the amount of audio recognized.
  If not specified, there is effectively no timeout.

USAGE: ai speech intent [...] --continuous
   OR: ai speech intent [...] --continuous --timeout [MILLISECONDS]

EXAMPLES

  ai speech intent --microphone --continuous
  ai speech intent --file hello.wav --continuous --timeout 30000

SEE ALSO

  ai help speech intent once
  ai help speech intent

-----------------------
ai help intent endpoint
-----------------------
ENDPOINT OVERVIEW

  For some scenarios, use "wss://" or "ws://" instead of "https://". For a
  full list of supported endpoints, see https://aka.ms/ai/endpoints

USAGE: ai <command> [...] --endpoint "ENDPOINT"
   OR: ai <command> [...] --endpoint @FILENAME
   OR: ai <command> [...] @CONFIG-FILENAME

WHERE: ENDPOINT represents the ENDPOINT uri as text (don't forget to add quotes)
   OR: FILENAME is a single line text file containing the ENDPOINT
   OR: CONFIG-FILENAME is a single line text file in the following form:

       service.config.endpoint=wss://...

EXAMPLES

  ai complete --endpoint @my.complete.endpoint --file prompt.txt
  ai chat --endpoint @my.chat.endpoint --file prompt.txt

SEE ALSO

  ai help init

-----------------------
ai help intent examples
-----------------------
INTENT EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2122

  EXAMPLE 1: Recognize intent patterns from a microphone
  
    ai speech intent --microphone --patterns "Start {app};Close {app}"

  EXAMPLE 2: Recognize intent patterns from local WAV file, or remote MP3 file

    ai speech intent --file hello.wav --patterns "Start {app};Close {app}"
    ai speech intent --file https://crbn.us/hello.mp3 --format mp3 --patterns "Start {app};Close {app}"

  EXAMPLE 3: Recognize intent from multiple files using wildcards

    ai speech intent --files *.wav --patterns "Start {app};Close {app}"

  EXAMPLE 4: Recognize intent in audio file content piped thru STDIN

    ai speech synthesize --text "Start Code" --audio output - --quiet | ai speech intent --pattern "Start {app}" --file -

  EXAMPLE 5: Recognize LUIS intents

    ai speech intent --luis appid 43617262-6F6E-2069-7320-636F6F6C21FF --microphone
    ai speech intent --luis appid 43617262-6F6E-2069-7320-636F6F6C21FF --file hello.wav
    ai speech intent --luis appid 43617262-6F6E-2069-7320-636F6F6C21FF --file hello.mp3 --format mp3
    ai speech intent --luis appid 43617262-6F6E-2069-7320-636F6F6C21FF --files *.wav

  EXAMPLE 6: Recognize intent in multiple files from TSV file with file names and transcriptions

    ai speech intent --foreach file;transcript in @filelist.txt --check wer eq 0

    WHERE: filelist.txt is the filename for a file containing tab delimited content:

      audioFileName1 \t transcript1
      audioFileName2 \t transcript2

  EXAMPLE 7: Recognize intent in multiple files listed in a TSV file with file ids and transcriptions

    ai speech intent --foreach id;transcript in @filelist.txt --check wer eq 0

    WHERE: filelist.txt is the filename for a file containing tab delimited content:

      audioFileNameNoExtension1 \t transcript1
      audioFileNameNoExtension2 \t transcript2

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech intent advanced
  ai help speech intent

-------------------
ai help intent file
-------------------
INTENT FILE

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --file option specifies a single local audio file to be
  streamed to the service for intent recognition.

  The --url option specifies a single remote audio file to be
  streamed to the service for intent recognition after first caching the audio
  locally, removing it when done.

USAGE: ai speech intent [...] --url URL
   OR: ai speech intent [...] --url @FILENAME.txt
   OR: ai speech intent [...] --file @FILEAME.txt
   OR: ai speech intent [...] --file FILE

  WHERE: URL represents a remote audio file accessible to the public
     OR: FILE represents a local audio file accessible to the current user
     OR: FILE is - indicating that audio file content will be read from STDIN
     OR: FILENAME.txt is a single line text file containing the file to stream

  NOTE: --url is an alias for --file ... both accept both files and urls

EXAMPLES

  ai speech intent --file hello.wav
  ai speech intent --url https://crbn.us/hello.wav

  echo hello.wav>file.txt
  ai speech intent --file @file.txt

SEE ALSO

  ai help speech intent files
  ai help speech intent format
  ai help speech intent input
  ai help speech intent

--------------------
ai help intent files
--------------------
INTENT FILES

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --files option specifies multiple local audio files to be
  streamed to the service for recognition.

  The --urls option specifies multiple remote audio files to be
  streamed to the service for recognition after first caching the audio
  locally, removing it when done.

USAGE: ai speech intent [...] --urls URL1;URL2[;...]
   OR: ai speech intent [...] --urls @FILELIST.txt
   OR: ai speech intent [...] --files @FILELIST.txt
   OR: ai speech intent [...] --files FILE1;FILE2[;...]
   OR: ai speech intent [...] --files PATTERN

  WHERE: URL1;URL2 represent remote audio files accessible to the public
     OR: FILE1;FILE2 represent local audio files accessible to the current user
     OR: PATTERN represents a local audio file wildcard search pattern
     OR: FILELIST.txt is a multi-line text file containing files and/or URLs,
         ... or PATTERNs, listed individually, each on separate lines
     
  NOTE: --urls is an alias for --files ... both accept both files and urls

EXAMPLES

  ai speech intent --files *.wav
  ai speech intent --files "hello.wav;goodbye.wav"

  ai speech intent --urls "https://crbn.us/hello.wav;https://crbn.us/goodbye.wav"

  echo hello.wav> filelist.txt
  echo goodbye.wav>> filelist.txt
  echo https://crbn.us/whatstheweatherlike.wav>> filelist.txt

  ai speech intent --files @filelist.txt

SEE ALSO

  ai help speech intent format
  ai help speech intent input
  ai help speech intent

----------------------
ai help intent foreach
----------------------
INTENT FOREACH

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --foreach option repeats a specific command multiple times
  effectively multiplying one set of command line options by another.

USAGE: ai speech intent [...] --foreach in @FILE1.tsv
   OR: ai speech intent [...] --foreach OPT1;[OPT2;[...]] in @FILE2.tsv
   OR: ai speech intent [...] --foreach OPT1;[OPT2;[...]] skip header in @FILE3.tsv

  WHERE: OPT represents a command line option (e.g. file, id, transcript)
    AND: FILE1.tsv contains tab separated values, with line1: OPT1 [\t OPT2 [\t ...]]
     OR: FILE2.tsv contains tab separated values, with data rows starting on line 1
     OR: FILE3.tsv contains tab separated values, with data rows starting on line 2

EXAMPLE

  ai speech intent --foreach file;transcript in @filelist.txt --check wer eq 0

SEE ALSO

  ai help speech intent examples
  ai help speech intent files
  ai help speech intent

---------------------
ai help intent format
---------------------
INTENT FORMAT

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --format option specifies the container format of the audio file.

USAGE: ai speech intent [...] --format FORMAT

  WHERE: FORMAT is any
     OR: FORMAT is mp3
     OR: FORMAT is ogg
     OR: FORMAT is flac
     OR: FORMAT is alaw
     OR: FORMAT is opus

EXAMPLES

  ai speech intent --file audio.mp3 --format mp3
  ai speech intent --files @filelist.txt --format any

SEE ALSO

  ai help speech intent file
  ai help speech intent files
  ai help speech intent

--------------------
ai help intent input
--------------------
INTENT INPUT OVERVIEW

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  FROM MICROPHONE - DEFAULT DEVICE or SPECIFIC DEVICE

    The ai speech intent command can recognize intent using streaming audio captured
    from a device microphone (default microphone or specific microphone).

    To intent audio from a device MICROPHONE see: ai help speech intent microphone 

  FROM FILE - SINGLE or MULTIPLE FILES

    The ai speech intent command can also recognize intent using audio stored in local
    or remote audio files, in various audio container formats (e.g. mp3, ogg).

    To recognize intent from a single audio file see: ai help speech intent file
    To recognize intent from a multiple audio files see: ai help speech intent files
    To recognize intent from file(s) in various formats see: ai help speech intent format
 
EXAMPLES

  EXAMPLE 1: Recognize intent from a microphone
  
    ai speech intent --microphone

  EXAMPLE 2: Recognize intent from local WAV file, or remote MP3 file

    ai speech intent --file hello.wav
    ai speech intent --file http://crbn.us/hello.mp3 --format mp3

  EXAMPLE 3: Recognize intent in multiple files using wildcards

    ai speech intent --files *.wav

  EXAMPLE 4: Recognize intent in audio file content piped thru STDIN

    ai speech synthesize --text "Hello" --audio output - --quiet | ai speech intent --file -

SEE ALSO

  ai help speech intent examples
  ai help speech intent

------------------
ai help intent key
------------------
INTENT KEY

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --key option specifies the subscription key to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech intent [...] --key KEY
   OR: ai speech intent [...] --key @FILENAME
   OR: ai speech intent [...] @CONFIG-FILENAME

  WHERE: KEY is the subscription key as text
     OR: FILENAME is a single line text file containing your KEY
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.key=KEY

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech intent --nodefaults --region @region --key @key --file hello.wav

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech intent --file hello.wav

SEE ALSO

  ai help speech setup
  ai help speech key overview
  ai help speech intent connection
  ai help speech intent region
  ai help speech intent

----------------------
ai help intent keyword
----------------------
INTENT KEYWORD

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --keyword option gates the recognition of speech until
  a keyword from the specified keyword model is recognized.

  Once the keyword is recognized, the next phrase in the speech stream will
  also be recognized, after which the system will once again gate speech
  recognition until the keyword is recognized again.

  The --timeout option can be used to limit the amount of audio recognized.
  If not specified, there is effectively no timeout.

USAGE: ai speech intent [...] --keyword KEYWORD-MODEL
   OR: ai speech intent [...] --keyword KEYWORD-MODEL --timeout [MILLISECONDS]

EXAMPLES

  ai speech intent --microphone --continuous
  ai speech intent --file hello.wav --continuous --timeout 30000

SEE ALSO

  ai help speech intent

-----------------------
ai help intent language
-----------------------
INTENT LANGUAGE

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --language option specifies a single spoken LANGUAGE in
  BCP-47 format. Speech streamed to the service will be forced to match
  words and phrases in the specified LANGUAGE.

  For a full list of supported languages, see https://aka.ms/speech/languages

  If no language is specified, the default will be en-US.

USAGE: ai speech intent [...] --language LANGUAGE
   OR: ai speech intent [...] --language @LANGUAGE.txt

  WHERE: LANGUAGE is a supported BCP-47 language tag (e.g. en-US)
     OR: LANGUAGE.txt is a single line text file containing one LANGUAGE

EXAMPLES

  ai speech intent --language en-US --file english.wav
  ai speech intent --language de-DE --file german.wav

SEE ALSO

  ai help speech intent

------------------------
ai help intent languages
------------------------
@intent.language

------------------
ai help intent log
------------------
INTENT LOG

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --log option specifies the name of the file into which
  to write additional log information and diagnostics. This logging is
  performed by the Speech SDK, upon which AI is built.

  The --content logging enabled option enables service level logging
  of the audio content and intent recognition results.

USAGE: ai speech intent [...] --log FILENAME
   OR: ai speech intent [...] --content logging enabled

  NOTE: Default SDK logging uses the @log.time preset template

    diagnostics.config.log.file=log-{run.time}.log

EXAMPLES

  ai speech intent --file hello.wav --log log.log
  ai speech intent --file hello.wav --log {id}.log
  ai speech intent --file hello.wav --log {config.region}.log

  ai speech intent --file hello.wav --content logging enabled

  ai config speech @default.log --clear
  ai config speech @default.log --set @none
  ai config speech @default.log --set log {config.region}-{id}-{run.time}.log
  ai config speech @default.log --add content.logging.enabled true

SEE ALSO

  ai help speech intent

-------------------
ai help intent luis
-------------------
INTENT LUIS

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --luis option configures settings for the Language Understanding (LUIS) service.

USAGE: ai speech intent [...] --luis key LUIS_KEY
   OR: ai speech intent [...] --luis region LUIS_REGION
   OR: ai speech intent [...] --luis appid LUIS_APP_ID
   OR: ai speech intent [...] --luis intent LUIS_INTENT_ID
   OR: ai speech intent [...] --luis allintents true 

EXAMPLES

  ai speech intent --file hello.wav --luis key LUIS_KEY --luis region LUIS_REGION --luis appid LUIS_APP_ID
  ai speech intent --microphone --luis key LUIS_KEY --luis region LUIS_REGION --luis appid LUIS_APP_ID --luis intent LUIS_INTENT_ID
  ai speech intent --file hello.wav --luis key LUIS_KEY --luis region LUIS_REGION --luis appid LUIS_APP_ID --luis allintents true

SEE ALSO

  ai help speech intent
  ai help speech intent luis key
  ai help speech intent luis region
  ai help speech intent luis intent
  ai help speech intent luis allintents
  ai help speech luis documentation

------------------------------
ai help intent luis allintents
------------------------------
INTENT LUIS ALLINTENTS

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --luis option configures settings for the Language Understanding (LUIS) service.

Recognize against all intents of the LUIS model in use

USAGE: ai speech intent [...] --luis allintents true

SEE ALSO

  ai help speech intent
  ai help speech intent luis

--------------------------
ai help intent luis intent
--------------------------
INTENT LUIS INTENT

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --luis option configures settings for the Language Understanding (LUIS) service.

USAGE: ai speech intent [...] --luis intent [INTENT_NAME] INTENT_ID

  WHERE: INTENT_ID represents the intent ID of the LUIS app that intent recognition is being run against

SEE ALSO

  ai help speech intent
  ai help speech intent luis 
  ai help speech luis documentation

-----------------------
ai help intent luis key
-----------------------
INTENT LUIS KEY

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --luis option configures settings for the Language Understanding (LUIS) service.

USAGE: ai speech intent [...] --luis key LUIS_KEY

  WHERE: LUIS_KEY represents the key for the LUIS app that intent recognition is being run against

SEE ALSO

  ai help speech intent
  ai help speech intent luis

--------------------------
ai help intent luis region
--------------------------
INTENT LUIS REGION

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --luis option configures settings for the Language Understanding (LUIS) service.

USAGE: ai speech intent [...] --luis region LUIS_REGION

  WHERE: LUIS_REGION represents the region for the LUIS app that intent recognition is being run against

SEE ALSO

  ai help speech intent
  ai help speech intent luis

-------------------------
ai help intent microphone
-------------------------
INTENT MICROPHONE

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --microphone option specifies use of a microphone.

USAGE: ai speech intent [...] --microphone
   OR: ai speech intent [...] --microphone DEVICE-ID

  WHERE: DEVICE-ID represents a specific microphone device

  For full list of DEVICE-IDs, see https://aka.ms/speech/sdk/device-ids

SEE ALSO

  ai help speech intent
  ai help speech intent input

-------------------
ai help intent once
-------------------
INTENT ONCE

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  Streaming audio can be recognized in several modes:
  (1) Continuous - recognize audio continuously, optimized for conversations
  (2) Once+ - recognize audio continuously, optimized for non-interactive use cases
  (3) Once - recognize a single phrase, optimized for interactive use cases

  The --once option recognizes the first phrase in an audio stream,
  optimized for interactive use cases.

  The --once+ option repeatedly recognizes phrases in an audio
  stream, optimized for non-interactive use cases.

USAGE: ai speech intent [...] --once

EXAMPLES

  ai speech intent --microphone --once
  ai speech intent --file hello.wav --once+

SEE ALSO

  ai help speech intent
  ai help speech intent continuous

---------------------
ai help intent output
---------------------
INTENT OUTPUT

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  Recognition output approaches:
  (1) Per event output - Specified items are accumulated and output per event
  (2) Combined output - Specified items are accumulated and output per audio stream
  (3) Batch output - Recognition output is similar to ai speech batch transcriptions
  
  For (1) and (2), one or more items from a large set of items may be chosen
  to output, in either JSON or TSV format.

  For (3), a fixed set of ITEMs are output, both combined and segmented by
  service determined utterance boundaries, as well as some stream summary
  information.

  (1) To use per event output, see: ai help speech intent output each
  (2) To use combined output, see: ai help speech intent output all
  (3) To use batch output, see ai help speech intent output batch

EXAMPLES

  ai speech intent --file hello.wav --output all id --output all sessionid --output all text
  ai speech intent --once --output each event --output all sessionid --output each text
  ai speech intent --once --output batch json --output batch file my.output.json

  ai config speech @default.output --clear
  ai config speech @default.output --add output.all.id true
  ai config speech @default.output --add output.all.sessionid true
  ai config speech @default.output --add output.all.text true

SEE ALSO

  ai help config
  ai help speech batch transcription
  ai help speech intent

-------------------------
ai help intent output all
-------------------------
INTENT OUTPUT ALL

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --output all option specifies an ITEM to accumulate and
  aggregate into a TSV or JSON output file, combined across all events.

  The --output all file option specifies the output filename. 

  The --output all file type option specifies the output file type,
  either JSON or TSV (tab separated values). If no file type is provided,
  the output file will be TSV by default.

USAGE: ai speech intent [...] --output all ITEM
   OR: ai speech intent [...] --output all file FILENAME
   OR: ai speech intent [...] --output all file type TYPE

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

  NOTE: Default output uses the @output.all.standard preset template

    output.all.audio.input.id=true
    output.all.intentr.session.started.sessionid=true
    output.all.intentr.intentd.result.text=true

EXAMPLES

  ai speech intent --once --output all text
  ai speech intent --once --output all text --output all file output.tsv
  ai speech intent --once --output all text --output all file type json

  ai config speech @default.output --set @@output.all.standard
  ai config speech @default.output --set @@output.all.detailed
  ai config speech @default.output --set @@output.all.latency
  ai config speech @default.output --set @@output.all.transcript.display
  ai config speech @default.output --set @@output.all.transcript.lexical

  ai config speech @default.output --clear
  ai config speech @default.output --add output.all.id true
  ai config speech @default.output --add output.all.sessionid true
  ai config speech @default.output --add output.all.text true

SEE ALSO

  ai help speech intent output overview
  ai help speech intent output examples
  ai help speech intent

---------------------------------
ai help intent output all example
---------------------------------
INTENT - UPDATING DEFAULT CONNECTION

EXAMPLES

    ai config speech @default.connection --set host wss://localhost:5000/
    ai config speech @key --set @@none

    ai config speech @default.connection --set host wss://chinaeast2.stt.speech.azure.cn
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

    ai config speech @default.connection --set @@connection.from.endpoint
    ai config speech @endpoint --set wss://westus2.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

    ai config speech @default.connection --set @@connection.from.region
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai config speech @region --set westus2

    ai config speech @default.connection --set @@connection.from.host
    ai config speech @host --set wss://localhost:5000/

--------------------------------
ai help intent output all timing
--------------------------------
INTENT WORD LEVEL TIMING

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --word level timing option requests word level timing
  details in intent recognition results.

USAGE: ai speech intent [...] --word level timing
   OR: ai speech intent [...] @CONFIG-FILENAME

  WHERE: CONFIG-FILENAME is a single line text file in the following form:

      service.output.config.word.level.timing=true

EXAMPLE

  ai speech intent --file hello.wav --word level timing --output json

SEE ALSO

  see help intent output json
  ai help speech intent

---------------------------
ai help intent output batch
---------------------------
INTENT OUTPUT BATCH

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --output batch json option indicates that intent recognition results should
  be output in the same format as ai speech batch transcriptions.

  The --output batch file option specifies the name of the file to use. If 
  this option is not specified, a default filename will be provided.

USAGE: ai speech intent [...] --output batch json
   OR: ai speech intent [...] --output batch file FILENAME

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

EXAMPLES

  ai speech intent --file hello.wav --output batch json
  ai speech intent --file hello.wav --output batch file hello.json

  ai config speech @default.output --clear
  ai config speech @default.output --add output.batch.json true
  ai config speech @default.output --add output.batch.file output.{id}.{run.time}.json

SEE ALSO

  ai help speech intent output
  ai help speech batch transcription
  ai help speech intent

--------------------------
ai help intent output each
--------------------------
INTENT OUTPUT EACH

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --output each option specifies an ITEM to accumulate and
  aggregate into a TSV or JSON output file, one ITEM per event.

  The --output each file option specifies the output filename. 

  The --output each file type option specifies the output file type,
  either JSON or TSV (tab separated values). If no file type is provided,
  the output file will be TSV by default.

USAGE: ai speech intent [...] --output each ITEM
   OR: ai speech intent [...] --output each file FILENAME
   OR: ai speech intent [...] --output each file type TYPE

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

  NOTE: By default, nothing is output per event

EXAMPLES

  ai speech intent --once --output each text
  ai speech intent --once --output each event --output each text
  ai speech intent --once --output each text --output each file output.tsv

  ai config speech @default.output --set @@output.each.event
  ai config speech @default.output --set @@output.each.detailed
  ai config speech @default.output --set @@output.each.latency

  ai config speech @default.output --clear
  ai config speech @default.output --add output.each.sessionid true
  ai config speech @default.output --add output.each.event true
  ai config speech @default.output --add output.each.text true
  ai config speech @default.output --add output.each.latency true
  ai config speech @default.output --add @output.all.standard

SEE ALSO

  ai help speech intent output overview
  ai help speech intent output examples
  ai help speech intent

------------------------------
ai help intent output examples
------------------------------
INTENT OUTPUT EXAMPLES

  ai speech intent [...] --output all audio id
  ai speech intent [...] --output all sessionid
  ai speech intent [...] --output all resultid
  ai speech intent [...] --output all reason
  ai speech intent [...] --output all text
  ai speech intent [...] --output all itn text
  ai speech intent [...] --output all lexical text
  ai speech intent [...] --output all offset
  ai speech intent [...] --output all duration
  ai speech intent [...] --output all latency
  ai speech intent [...] --output all json

  ai speech intent [...] --output each audio id
  ai speech intent [...] --output each sessionid
  ai speech intent [...] --output each resultid
  ai speech intent [...] --output each reason
  ai speech intent [...] --output each text
  ai speech intent [...] --output each itn text
  ai speech intent [...] --output each lexical text
  ai speech intent [...] --output each offset
  ai speech intent [...] --output each duration
  ai speech intent [...] --output each latency
  ai speech intent [...] --output each json

  ai speech intent [...] --output all result resultid
  ai speech intent [...] --output all result reason
  ai speech intent [...] --output all result text
  ai speech intent [...] --output all result offset
  ai speech intent [...] --output all result duration
  ai speech intent [...] --output all result latency
  ai speech intent [...] --output all result json

  ai speech intent [...] --output each result resultid
  ai speech intent [...] --output each result reason
  ai speech intent [...] --output each result text
  ai speech intent [...] --output each result offset
  ai speech intent [...] --output each result duration
  ai speech intent [...] --output each result latency
  ai speech intent [...] --output each result json

  ai speech intent [...] --output all events
  ai speech intent [...] --output all event sessionid

  ai speech intent [...] --output each event
  ai speech intent [...] --output each event sessionid

  ai speech intent [...] --output all recognizer events
  ai speech intent [...] --output all recognizer event sessionid

  ai speech intent [...] --output each recognizer event
  ai speech intent [...] --output each recognizer event sessionid

  ai speech intent [...] --output all recognizer session events
  ai speech intent [...] --output all recognizer session event sessionid
  ai speech intent [...] --output all recognizer session started events
  ai speech intent [...] --output all recognizer session started sessionid
  ai speech intent [...] --output all recognizer session stopped events
  ai speech intent [...] --output all recognizer session stopped sessionid

  ai speech intent [...] --output each recognizer session event
  ai speech intent [...] --output each recognizer session event sessionid
  ai speech intent [...] --output each recognizer session started event
  ai speech intent [...] --output each recognizer session started sessionid
  ai speech intent [...] --output each recognizer session stopped event
  ai speech intent [...] --output each recognizer session stopped sessionid

  ai speech intent [...] --output all recognizer canceled events
  ai speech intent [...] --output all recognizer canceled error
  ai speech intent [...] --output all recognizer canceled error code
  ai speech intent [...] --output all recognizer canceled error details
  ai speech intent [...] --output all recognizer canceled reason

  ai speech intent [...] --output each recognizer canceled event
  ai speech intent [...] --output each recognizer canceled error
  ai speech intent [...] --output each recognizer canceled error code
  ai speech intent [...] --output each recognizer canceled error details
  ai speech intent [...] --output each recognizer canceled reason

  ai speech intent [...] --output all recognizer recognized events
  ai speech intent [...] --output all recognizer recognized sessionid
  ai speech intent [...] --output all recognizer recognized result resultid
  ai speech intent [...] --output all recognizer recognized result reason
  ai speech intent [...] --output all recognizer recognized result text
  ai speech intent [...] --output all recognizer recognized result itn text
  ai speech intent [...] --output all recognizer recognized result lexical text
  ai speech intent [...] --output all recognizer recognized result offset
  ai speech intent [...] --output all recognizer recognized result duration
  ai speech intent [...] --output all recognizer recognized result latency
  ai speech intent [...] --output all recognizer recognized result json

  ai speech intent [...] --output each recognizer recognized event
  ai speech intent [...] --output each recognizer recognized sessionid
  ai speech intent [...] --output each recognizer recognized result resultid
  ai speech intent [...] --output each recognizer recognized result reason
  ai speech intent [...] --output each recognizer recognized result text
  ai speech intent [...] --output each recognizer recognized result itn text
  ai speech intent [...] --output each recognizer recognized result lexical text
  ai speech intent [...] --output each recognizer recognized result offset
  ai speech intent [...] --output each recognizer recognized result duration
  ai speech intent [...] --output each recognizer recognized result latency
  ai speech intent [...] --output each recognizer recognized result json

  ai speech intent [...] --output all recognizer recognizing events
  ai speech intent [...] --output all recognizer recognizing sessionid
  ai speech intent [...] --output all recognizer recognizing result resultid
  ai speech intent [...] --output all recognizer recognizing result reason
  ai speech intent [...] --output all recognizer recognizing result text
  ai speech intent [...] --output all recognizer recognizing result offset
  ai speech intent [...] --output all recognizer recognizing result duration
  ai speech intent [...] --output all recognizer recognizing result latency
  ai speech intent [...] --output all recognizer recognizing result json

  ai speech intent [...] --output each recognizer recognizing event
  ai speech intent [...] --output each recognizer recognizing sessionid
  ai speech intent [...] --output each recognizer recognizing result resultid
  ai speech intent [...] --output each recognizer recognizing result reason
  ai speech intent [...] --output each recognizer recognizing result text
  ai speech intent [...] --output each recognizer recognizing result offset
  ai speech intent [...] --output each recognizer recognizing result duration
  ai speech intent [...] --output each recognizer recognizing result latency
  ai speech intent [...] --output each recognizer recognizing result json

  ai speech intent [...] --output all file type json
  ai speech intent [...] --output all file output.json

  ai speech intent [...] --output each file type json
  ai speech intent [...] --output each file output.json

  ai speech intent [...] --output all file type tsv 
  ai speech intent [...] --output all file output.tsv
  ai speech intent [...] --output all tsv file has header false

  ai speech intent [...] --output each file type tsv
  ai speech intent [...] --output each file output.tsv
  ai speech intent [...] --output each tsv file has header false

-------------------------
ai help intent output vtt
-------------------------
INTENT OUTPUT VTT 

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --output vtt option requests intent recognition results in WEBVTT format.
  WEBVTT format provides captioning information for audio/video files.
  Learn more: https://www.w3.org/TR/webvtt1/


  The --output vtt file option specifies the name of the file to use. If 
  this option is not specified, a default filename will be provided.

USAGE: ai speech intent [...] --output vtt
   OR: ai speech intent [...] --output vtt file FILENAME

EXAMPLES

  ai speech intent --file hello.wav --output vtt
  ai speech intent --file hello.wav --output vtt file hello.vtt

SEE ALSO

  ai help speech intent output
  ai help speech intent

----------------------
ai help intent pattern
----------------------
INTENT PATTERN

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --pattern option specifies a single intent PATTERN to recognize,
  optionally containing one or more ENTITIES.

USAGE: ai speech intent [...] --pattern PATTERN
   OR: ai speech intent [...] --pattern INTENTID=PATTERN

  WHERE: PATTERN represents a phrase to be recognized
     OR: INTENTID represents the identifier that will symbolize the pattern

  NOTE: ENTITIES are indicated by enclosing the ENTITY name inside { and }

EXAMPLES

  ai speech intent --pattern "Start {app}" --output app entity
  ai speech intent --pattern "START=Start {app}" --output intentid --output app entity

SEE ALSO

  ai help speech intent patterns
  ai help speech intent output
  ai help speech intent

-----------------------
ai help intent patterns
-----------------------
INTENT PATTERNS

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --patterns option specifies multiple intent PATTERNS to recognize, each
  with an optional ID, and each PATTERN optionally containing one or more ENTITIES.

USAGE: ai speech intent [...] --patterns PATTERN1;PATTERN2[;...]
   OR: ai speech intent [...] --patterns ID1=PATTERN1;ID2=PATTERN2[;...]
   OR: ai speech intent [...] --patterns @PATTERNS-FILE.txt

  WHERE: PATTERN represents a phrase to be recognized
     OR: INTENTID represents the identifier that will symbolize the pattern
     OR: PATTERNS-FILE.txt is a multi-line text file
         ... w/ each [ID=]PATTERN listed individually on separate lines

  NOTE: ENTITIES are indicated by enclosing the ENTITY name inside { and }

EXAMPLES

  ai speech intent --patterns "Start {app};Open {app}" --output app entity
  ai speech intent --patterns "START=Start {app};START=Open {app}" --output intentid --output app entity

  ai config @EXAMPLEs --clear
  ai config @EXAMPLEs --add "START=Start {app}"
  ai config @EXAMPLEs --add "START=Open {app}"
  ai config @EXAMPLEs --add "START=Launch {app}"
  ai config @EXAMPLEs --add "CLOSE=Close {app}"
  ai speech intent --patterns @EXAMPLEs --output intentid --output app entity

SEE ALSO

  ai help speech intent format
  ai help speech intent input
  ai help speech intent

----------------------
ai help intent phrases
----------------------
INTENT PHRASEs

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --phrases option increases intent recognition accuracy
  by supplying one or more words or phrases that are likely to appear
  in the streaming audio. 

USAGE: ai speech intent [...] --phrases "PHRASE1;"
   OR: ai speech intent [...] --phrases "PHRASE1;PHRASE2[;...]
   OR: ai speech intent [...] --phrases @PHRASELIST.txt

  WHERE: PHRASE represents one or more words that might appear in the audio
     OR: PHRASELIST.txt is a multi-line text file containing one or more
         ... PHRASEs, listed individually, each on separate lines
     
EXAMPLES

  ai speech intent --file hello.wav --phrases "Hello;Hi;Howya doin"

  echo Hello> phrases.txt
  echo Hi>> phrases.txt
  echo Howya doin>> phrases.txt

  ai speech intent --file hello.wav --phrases @phrases.txt

SEE ALSO

  ai help speech intent custom speech
  ai help speech intent

------------------------
ai help intent processes
------------------------
INTENT PROCESSES

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --processes option specifies the maximum number of
  sub-processes to use when parallelizing intent recognition tasks.

  The --ramp processes every option can optionally be used to control
  how quickly each new sub-process will be added to the pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  processes will immediately be available to the pool.

USAGE: ai speech intent [...] --processes NUMBER
   OR: ai speech intent [...] --processes NUMBER --ramp processes every MILLISECONDS

  WHERE: NUMBER represents the maximum number of processes to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new process

EXAMPLES

  ai speech intent --files @filelist.txt --processes 10
  ai speech intent --files *.wav --processes 20 --ramp processes every 30000

SEE ALSO

  ai help speech intent
  ai help speech intent threads

------------------------
ai help intent profanity
------------------------
INTENT PROFANITY

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --profanity controls how the service deals with spoken profanity.

USAGE: ai speech intent [...] --profanity OPTION

  WHERE: OPTION is raw
     OR: OPTION is masked
     OR: OPTION is removed

EXAMPLES

  ai speech intent --file hello.wav --profanity raw
  ai speech intent --file hello.wav --profanity masked
  ai speech intent --file hello.wav --profanity removed

SEE ALSO

  ai help speech intent

--------------------
ai help intent proxy
--------------------
INTENT PROXY

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --proxy option specifies a HTTP proxy host name. 
  The --proxy port option specifies the HTTP proxy port.

USAGE: ai speech intent [...] --proxy PROXY
   OR: ai speech intent [...] --proxy PROXY --proxy port PORT
   OR: ai speech intent [...] @CONFIG-FILENAME

  WHERE: PROXY represents the PROXY host (e.g. localhost)
     OR: PORT represents the PROXY port (e.g. 80, which is the default)
     OR: CONFIG-FILENAME is a multi-line text file as follows:

            service.config.proxy.host=HOST
            service.config.proxy.port=PORT

EXAMPLES

  ai speech intent --file hello.wav --proxy localhost --proxy port 8888

  ai config speech @fiddler --set proxy.host localhost
  ai config speech @fiddler --add proxy.port 8888

  ai speech intent --file hello.wav @fiddler

SEE ALSO

  ai help config
  ai help speech intent

---------------------
ai help intent region
---------------------
INTENT REGION

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --region option specifies the REGION for an existing resource.

  For a full list of supported regions, see https://aka.ms/speech/regions.

USAGE: ai speech intent [...] --region REGION
   OR: ai speech intent [...] --region @FILENAME
   OR: ai speech intent [...] @CONFIG-FILENAME

  WHERE: REGION is the region for the speech resource
     OR: FILENAME is a single line text file containing the REGION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.region=REGION

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 12345678123456781234567812345678
  ai speech intent --nodefaults --region @region --key @key --file hello.wav

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech intent --file hello.wav

  ai config speech @key --set 12345678123456781234567812345678 --region westus2
  ai config speech @key --set 12345678123456781234567812345678 --region eastus
  ai speech intent --foreach region in eastus;westus2 --key @@key --file hello.wav

SEE ALSO

  ai help speech setup
  ai help speech region overview
  ai help speech intent connection
  ai help speech intent key
  ai help speech intent

-------------------
ai help intent save
-------------------
INTENT SAVE

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --save option packages command line and related
  configuration data into one or more AI configuration data files
  for backup or portability to another device.

USAGE: ai speech intent [...] --save FILENAME

EXAMPLES

  ai speech intent --files *.wav --save test1.job
  ai speech intent --files *.wav --log {id}.log --save test2.job
  ai speech intent --files @URLs.txt --output zip output.zip --save test3.job

  ai speech intent --foreach file;transcript in @items.txt --save test4.job
  ai speech intent @test4.job

SEE ALSO

  ai help speech intent
  ai help speech intent files
  ai help speech intent foreach
  ai help speech webjob setup

----------------------
ai help intent threads
----------------------
INTENT THREADS

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --threads option specifies a how many threads to use when 
  parallelizing recognition tasks.

  The --ramp threads every option can optionally be used to control
  how quickly each new thread will be added to the thread pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  threads will immediately be available to the pool.

USAGE: ai speech intent [...] --threads NUMBER
   OR: ai speech intent [...] --threads NUMBER --ramp threads every MILLISECONDS

  WHERE: NUMBER represents the maximum number of threads to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new thread

EXAMPLES

  ai speech intent --files @filelist.txt --threads 10
  ai speech intent --files *.wav --threads 20 --ramp threads every 30000

SEE ALSO

  ai help speech intent
  ai help speech intent processes

--------------------
ai help intent token
--------------------
INTENT TOKEN

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --token option specifies an authentication token to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech intent [...] --token TOKEN
   OR: ai speech intent [...] --token @FILENAME
   OR: ai speech intent [...] @CONFIG-FILENAME

  WHERE: TOKEN is the AUTH TOKEN obtained from the issueToken endpoint
     OR: FILENAME is a single line text file containing your AUTH TOKEN
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.token=TOKEN

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @token --set bdca******789
  ai speech intent --nodefaults --region @region --token @token --file hello.wav

  ai config speech @default.config --clear
  ai config speech @default.config --add token @token
  ai config speech @default.config --add region @region
  ai speech intent --file hello.wav

SEE ALSO

  ai help speech setup
  ai help speech intent connection
  ai help speech intent region
  ai help speech intent

------------------
ai help intent url
------------------
@intent.file

-------------------
ai help intent urls
-------------------
@intent.files

------------------
ai help intent wer
------------------
INTENT WER

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --wer option allows an external remote method (such as an Azure Function)
  to calculate the word error rate via HTTP GET.

USAGE: ai speech intent [...] --wer url URL

  The remote method will be provided the following query parameters:
  * transcription - the expected text
  * recognition - the recognized text
  * locale - the spoken LANGUAGE in BCP-47 format

  For example:
  
    https://crbn.us/wer?transcription=TRANSCRIPT&recognition=RECOGNIZEDTEXT&locale=LOCALE

  The remote method should return a JSON object, with wordCount and errors integer values. For example:

    { "wordCount": 4, "errors": 0 }  

EXAMPLES

  ai speech intent --foreach file;transcript in @filelist.txt --wer url https://crbn.us/wer --check wer eq 0

SEE ALSO

  ai help speech intent examples
  ai help speech intent files
  ai help speech intent

------------------
ai help intent zip
------------------
INTENT ZIP

  The ai speech intent command transcribes streaming audio into text,
  and recognizes intents and entities.

  The --zip option packages command line and related
  configuration data along with AI and its runtime dependencies into
  a self-contained .ZIP file for backup or portability to another device.

  NOTE: --zip does not package local input files (e.g. audio, models, etc.)

USAGE: ai speech intent [...] --zip FILENAME

EXAMPLES

  ai speech intent --files *.wav --zip test1.zip
  ai speech intent --files *.wav --log {id}.log --zip test2.zip
  ai speech intent --foreach file;transcript in @items.txt --zip test3.zip

  ai speech intent --files @URLs.txt --output zip output.zip --zip test4.zip

SEE ALSO

  ai help speech intent
  ai help speech intent files
  ai help speech intent foreach

--------------------------
ai help luis documentation
--------------------------
See: https://docs.microsoft.com/azure/cognitive-services/speech-service/how-to-recognize-intents-from-speech-csharp#luis-and-speech

--------------
ai help output
--------------
  ai help speech batch output
  ai help speech dialog bot output
  ai help speech dialog customcommands output
  ai help speech intent output
  ai help speech profile output
  ai help speech recognize output
  ai help speech synthesize audio output
  ai help speech synthesize output
  ai help speech transcribe output
  ai help speech translate output

---------------
ai help profile
---------------
PROFILE

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

USAGE: ai speech profile <command> [...]

COMMANDS

  ai speech profile create [...]        (see: ai help speech profile create)
  ai speech profile enroll [...]        (see: ai help speech profile enroll)

  ai speech profile status [...]        (see: ai help speech profile status)
  ai speech profile list [...]          (see: ai help speech profile list)

  ai speech profile delete [...]        (see: ai help speech profile delete)

SEE ALSO

  ai help speech profile examples
  ai help speech profile documentation
  ai help find topics speech profile

--------------------------
ai help profile connection
--------------------------
CONNECTION OVERVIEW

  AUTHENTICATION - KEY or TOKEN

    The Azure Speech Service requires authentication using subscriptions keys
    or authentication tokens.

    To use subscription keys see: ai help speech profile key
    To use authentication tokens see: ai help speech profile token

  CONNECTION - REGION or ENDPOINT

    The Azure Speech Service runs in REGION specific data centers, sovereign
    clouds, or on-premise containers. For sovereign clouds and on-premise
    containers, you may need to specify the ENDPOINT directly.

    To specify a particular REGION see: ai help speech profile region
    To specify a particular ENDPOINT see: ai help speech profile endpoint

    NOTE: Default connection uses the @connection.from.region preset template

      service.config.region=@region
      service.config.key=@key

EXAMPLES

  EXAMPLE 1: Use the westus2 region and key stored in the AI configuration

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai speech profile create --output id my.id

  EXAMPLE 2: Use the westus2 region and key directly on command line

    ai speech profile list --region westus2 --key 436172626F6E20697320636F6F6C2121

  EXAMPLE 3: Use a specific endpoint on the command line

    ai speech profile list --nodefaults --endpoint https://westus.api.cognitive.microsoft.com/spid/v1
    ai speech profile status --id @my.id --nodefaults --endpoint https://westus.api.cognitive.microsoft.com/spid/v1

SEE ALSO

  ai help speech profile 
  ai help speech profile examples

----------------------
ai help profile create
----------------------
PROFILE CREATE

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

  The profile create function creates a new voice profile.

USAGE: ai speech profile create [...]
   OR: ai speech profile create [...] --output id my.id

CONNECTION                      (see: ai help speech profile connection)
  --key KEY                     (see: ai help speech profile key)
  --region REGION               (see: ai help speech profile region)

KIND
  --kind KIND                   (see: ai help speech profile kind)

ADVANCED                        
  --output id PATH              (see: ai help speech profile output id)

SEE ALSO

  ai help speech profile
  ai help speech profile examples

----------------------
ai help profile delete
----------------------
PROFILE DELETE

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

  The profile delete function deletes a given voice profile.

USAGE: ai speech profile delete --id ID
  OR:  ai speech profile delete --file @FILE /* [THIS DELETES ALL PROFILES LISTED IN GIVEN FILE] */

SEE ALSO

  ai help speech profile
  ai help speech profile examples

-----------------------------
ai help profile documentation
-----------------------------
See: https://docs.microsoft.com/azure/cognitive-services/speech-service/speaker-recognition-overview

----------------------
ai help profile enroll
----------------------
PROFILE ENROLL

IMPORTANT: For TextIndependentIdentification, the enrollment audio sample must contain 30 seconds or more of speech to be successful. 
  For TextIndependentVerification, three or more samples with a combined 15 seconds or more of speech are required.

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

  The profile enroll function enrolls a given voice profile using an audio sample.

USAGE: ai speech profile enroll --id ID --file AUDIO_SAMPLE_FILE --kind KIND

CONNECTION                      (see: ai help speech profile connection)
  --key KEY                     (see: ai help speech profile key)
  --region REGION               (see: ai help speech profile region)

ID
  --id ID                       (see: ai help speech profile id)

FILE
  --file FILE                   (see: ai help speech profile file)

KIND
  --kind KIND                   (see: ai help speech profile kind)

ADVANCED                        
  --output file PATH            (see: ai help speech profile output file)
  --output json PATH            (see: ai help speech profile output json)

SEE ALSO

  ai help speech profile
  ai help speech profile kind

------------------------
ai help profile examples
------------------------
PROFILE EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Create a voice profile 
  
    ai speech profile create --output id my.id --kind TextIndependentIdentification
    ai speech profile create --output id my.id --kind TextDependentVerification

  EXAMPLE 2: List all profile identification/verification profiles

    ai speech profile list
    ai speech profile list --output file my.profiles --kind TextIndependentVerification

  EXAMPLE 3: Get the status of a profile identification/verification profile

    ai speech profile status --id 12345678-1234-1234-1234-12345678 --kind TextDependentVerification
    ai speech profile status --id @my.id --output json my.status.json

  EXAMPLE 4: Enroll a profile identification/verification profile using an audio file

    ai speech profile enroll --id @my.id --file my_audio_file.wav

  EXAMPLE 5: Delete a profile identification/verification profile

    ai speech profile delete --id @my.id --kind TextIndependentVerification
    ai speech profile delete --file @my.profiles.to.delete --kind TextIndependentVerification

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech profile 
  ai help speech speaker identify
  ai help speech speaker verify

--------------------
ai help profile file
--------------------
PROFILE FILE

  The ai speech profile command manages voice profile operations.

  The --file option specifies a single local audio file to be
  uploaded to the service for identification/verification enrollment.

USAGE: ai speech profile enroll [...] --file @FILENAME.txt
   OR: ai speech profile enroll [...] --file FILE

  WHERE: FILE represents a local audio file accessible to the current user
     OR: FILENAME.txt is a single line text file containing the file to stream

EXAMPLES

  ai speech profile enroll --id @my.id --file hello.wav --kind TextIndependentVerification

  echo hello.wav>file.txt
  ai speech profile enroll --id @my.id --file @file.txt --kind TextIndependentVerification

SEE ALSO

  ai help speech profile

------------------
ai help profile id
------------------
PROFILE ID

  The ai speech profile command manages voice profile operations.

  The --id option specifies a voice profile id or a file containing such an id 
  to be sent to the service for recognition operations.

USAGE: ai speech profile [...] --id 12341234-1234-1234-1234-01234567 [...] 
   OR: ai speech profile [...] --id @FILENAME [...]

  WHERE: FILENAME is a single line text file containing a identification/verification profile id

EXAMPLES

  ai speech profile status --id @my.id --kind TextIndependentVerification
  ai speech profile delete --id @my.id

SEE ALSO

  ai help speech profile
  ai help speech profile examples

-------------------
ai help profile key
-------------------
PROFILE KEY

  The ai speech profile command manages voice profile operations.

  The --key option specifies the subscription key to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech profile [...] --key KEY
   OR: ai speech profile [...] --key @FILENAME
   OR: ai speech profile [...] @CONFIG-FILENAME

  WHERE: KEY is the subscription key as text
     OR: FILENAME is a single line text file containing your KEY
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.key=KEY

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech profile list --nodefaults --region @region --key @key --output file FILE

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech profile status --id @my.id --output file FILE

SEE ALSO

  ai help speech setup
  ai help speech key overview
  ai help speech profile region
  ai help speech profile

--------------------
ai help profile kind
--------------------
PROFILE KIND

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

  The --kind parameter sets profile operations to TextIndependentIdentification/TextIndependentVerification/TextDependentVerification
  mode (default is TextIndependentIdentification).

USAGE: ai speech profile [enroll/create/status/list/delete] --kind [TextIndependentIdentification/TextIndependentVerification/TextDependentVerification] [...]

SEE ALSO

  ai help speech profile
  ai help speech profile examples

--------------------
ai help profile list
--------------------
PROFILE LIST

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

  The ai speech profile list function lists all voice profiles for the current key/region.

USAGE: ai speech profile list [...]

CONNECTION                      (see: ai help speech profile connection)
  --key KEY                     (see: ai help speech profile key)
  --region REGION               (see: ai help speech profile region)

KIND
  --kind KIND                   (see: ai help speech profile kind)

ADVANCED                        
  --output file PATH            (see: ai help speech profile output file)
  --output json PATH            (see: ai help speech profile output json)

SEE ALSO

  ai help speech profile 
  ai help speech profile examples

---------------------------
ai help profile output file
---------------------------
@profile.output

-------------------------
ai help profile output id
-------------------------
@profile.output

---------------------------
ai help profile output json
---------------------------
@profile.output

----------------------
ai help profile region
----------------------
PROFILE REGION

  The ai speech profile command manages voice profile operations.

  The --region option specifies the REGION for an existing resource.

  For a full list of supported regions, see https://aka.ms/speech/regions.

USAGE: ai speech profile [...] --region REGION
   OR: ai speech profile [...] --region @FILENAME
   OR: ai speech profile [...] @CONFIG-FILENAME

  WHERE: REGION is the region for the speech resource
     OR: FILENAME is a single line text file containing the REGION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.region=REGION

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech profile list --nodefaults --region @region --key @key --output file FILE

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech profile status --id @my.id --output json FILE

  ai config speech @key --set 436172626F6E20697320636F6F6C2121 --region westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2020 --region eastus
  ai speech profile create --output id @my.id --key @key

SEE ALSO

  ai help speech setup
  ai help speech region overview
  ai help speech profile key
  ai help speech profile

----------------------
ai help profile status
----------------------
PROFILE STATUS

  The ai speech profile command manages voice profiles, which are used in speaker recognition and transcription scenarios.

  The ai speech profile status function outputs information (such as enrollment status, created date, and locale) concerning the selected voice profile.

USAGE: ai speech profile status --id ID [...]
   OR: ai speech profile status --id @FILE [...]

CONNECTION                      (see: ai help speech profile connection)
  --key KEY                     (see: ai help speech profile key)
  --region REGION               (see: ai help speech profile region)

KIND
  --kind KIND                   (see: ai help speech profile kind)

ADVANCED                        
  --output file PATH            (see: ai help speech profile output file)
  --output json PATH            (see: ai help speech profile output json)

SEE ALSO

  ai help speech profile 
  ai help speech profile examples

-----------------
ai help recognize
-----------------
RECOGNIZE

  The ai speech recognize command recognizes streaming audio captured
  from a device microphone or stored in local or remote audio files.

USAGE: ai speech recognize [...]

  CONNECTION                      (see: ai help speech recognize connection)
    --key KEY                     (see: ai help speech recognize key)
    --region REGION               (see: ai help speech recognize region)

  LANGUAGE                        (see: ai help speech recognize language)
    --language LANGUAGE
    --languages LANG1;LANG2[;...]

  INPUT                           (see: ai help speech recognize input)
    --microphone                  (see: ai help speech recognize microphone)
    --file FILE                   (see: ai help speech recognize file)
    --files PATTERN               (see: ai help speech recognize files)
    --files @FILELIST.txt         (see: ai help speech recognize files)
    --format FORMAT               (see: ai help speech recognize format)

  RECOGNITION
    --once[+]                     (see: ai help speech recognize once)
    --continuous                  (see: ai help speech recognize continuous)
    --keyword FILENAME            (see: ai help speech recognize keyword)

  ADVANCED
    --log FILENAME                (see: ai help speech recognize log)
    --proxy HOSTNAME              (see: ai help speech recognize proxy)
    --phrases @PHRASELIST.txt     (see: ai help speech recognize phrases)
    --foreach in @ITEMS.txt       (see: ai help speech recognize foreach)
    --threads NUMBER              (see: ai help speech recognize threads)

SEE ALSO

  ai help speech setup
  ai help speech recognize advanced
  ai help speech recognize examples
  ai help find topics speech recognize

--------------------------
ai help recognize advanced
--------------------------
RECOGNIZE

  The ai speech recognize command recognizes streaming audio captured
  from a device microphone or stored in local or remote audio files.

USAGE: ai speech recognize [...]

  CONNECTION                      (see: ai help speech recognize connection)
    --key KEY                     (see: ai help speech recognize key)
    --region REGION               (see: ai help speech recognize region)
    --endpoint URI                (see: ai help speech recognize endpoint)
    --token VALUE                 (see: ai help speech recognize token)

  SERVICE
    --traffic type test           (see: ai help speech traffic type)
    --http header name=value      (see: ai help speech http header)
    --query string name=value     (see: ai help speech query string)
    --speech config @file.json    (see: ai help speech websocket messages)
    --speech context @file.json   (see: ai help speech websocket messages)

  LANGUAGE
    --language LANGUAGE           (see: ai help speech recognize language)
    --languages LANG1;LANG2       (see: ai help speech recognize languages)

  INPUT                           (see: ai help speech recognize input)
    --microphone                  (see: ai help speech recognize microphone)
    --file FILE                   (see: ai help speech recognize file)
    --files PATTERN               (see: ai help speech recognize files)
    --files @FILELIST.txt         (see: ai help speech recognize files)
    --url URL                     (see: ai help speech recognize url)
    --urls URL                    (see: ai help speech recognize urls)
    --urls @URLLIST.txt           (see: ai help speech recognize urls)
    --format FORMAT               (see: ai help speech recognize format)
    --id url URL                  (see: ai help speech input id)
    --id ID                       (see: ai help speech input id)

  RECOGNITION
    --once[+]                     (see: ai help speech recognize once)
    --continuous                  (see: ai help speech recognize continuous)
    --timeout MILLISECONDS        (see: ai help speech recognize continuous)
    --keyword FILENAME            (see: ai help speech recognize keyword)

  ACCURACY                        (see: ai help speech recognize improve accuracy)
    --endpoint id ID              (see: ai help speech recognize custom speech)
    --phrases @PHRASELIST.txt     (see: ai help speech recognize phrases)

  TESTING                         (see: ai help speech recognize testing)
    --transcript TEXT             (see: ai help speech recognize transcript)
    --check wer NUMOP NUMBER      (see: ai help speech recognize check wer)
    --check text TEXTOP TEXT      (see: ai help speech recognize check text)
    --check result JMES_STRING    (see: ai help speech recognize check result)

  OUTPUT                          (see: ai help speech recognize output)
    --output all [<item>]         (see: ai help speech recognize output all)
    --output each [<item>]        (see: ai help speech recognize output each)
    --output batch json           (see: ai help speech recognize output batch json)
    --output batch file FILENAME  (see: ai help speech recognize output batch file)
    --output each file FILENAME   (see: ai help speech recognize output each file)
    --output all file FILENAME    (see: ai help speech recognize output all file)
    --output vtt file FILENAME    (see: ai help speech recognize output vtt file)
    --word level timing           (see: ai help speech recognize word level timing)
    --profanity OPTION            (see: ai help speech recognize profanity)

  LOGGING                         (see: ai help speech recognize log)
    --log FILENAME
    --content logging

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech recognize threads)
    --processes NUMBER            (see: ai help speech recognize processes)
    --repeat NUMBER
    --max NUMBER

  ADVANCED
    --connect                     (see: ai help speech recognize connect)
    --disconnect                  (see: ai help speech recognize disconnect)
    --proxy HOSTNAME              (see: ai help speech recognize proxy)
    --property NAME=VALUE         (see: ai help speech recognize property)
    --properties @PROPLIST.txt    (see: ai help speech recognize properties)
    --foreach in @ITEMS.txt       (see: ai help speech recognize foreach)
    --save FILENAME               (see: ai help speech recognize save)
    --zip ZIPFILE                 (see: ai help speech recognize zip)

SEE ALSO

  ai help speech setup
  ai help speech recognize examples
  ai help find topics speech recognize

---------------------------
ai help recognize check wer
---------------------------
@recognize.wer

-------------------------
ai help recognize connect
-------------------------
RECOGNIZE CONNECT

  The ai speech recognize command recognizes streaming audio.

  The --connect option forces connection to the service
  earlier in the process to decrease overall latency.

USAGE: ai speech recognize [...] --connect

EXAMPLE

  ai speech recognize --file hello.wav --connect

SEE ALSO

  ai help speech recognize

----------------------------
ai help recognize connection
----------------------------
CONNECTION OVERVIEW

  AUTHENTICATION - KEY or TOKEN

    The Azure Speech Service requires authentication using subscriptions keys
    or authentication tokens.

    To use subscription keys see: ai help speech recognize key
    To use authentication tokens see: ai help speech recognize token

  CONNECTION - REGION, ENDPOINT, or HOST

    The Azure Speech Service runs in REGION specific data centers, sovereign
    clouds, or on-premise containers. For sovereign clouds and on-premise
    containers, you may need to specify the ENDPOINT or HOST directly.

    To specify a particular REGION see: ai help speech recognize region
    To specify a particular ENDPOINT see: ai help speech recognize endpoint
    To specify a particular HOST see: ai help speech recognize host

    NOTE: Default connection uses the @connection.from.region preset template

      service.config.region=@region
      service.config.key=@key

EXAMPLES

  EXAMPLE 1: Use the westus2 region and key stored in the AI configuration

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai speech recognize --file hello.wav

  EXAMPLE 2: Use the westus2 region and key directly on command line

    ai speech recognize --region westus2 --key 436172626F6E20697320636F6F6C2121 --file hello.wav

  EXAMPLE 3: Use a specific sovereign cloud host on the command line

    ai speech recognize --host wss://chinaeast2.stt.speech.azure.cn --file hello.wav

  EXAMPLE 4: Use a specific on-premise container host on the command line

    ai speech recognize --key @none --host wss://localhost:5000/ --file hello.wav

  EXAMPLE 5: Use a specific endpoint on the command line

    ai speech recognize --nodefaults --endpoint wss://westus2.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1

SEE ALSO

  ai help speech recognize default connection example

----------------------------
ai help recognize continuous
----------------------------
RECOGNIZE CONTINUOUS

  The ai speech recognize command recognizes streaming audio.

  Streaming audio can be recognized in several modes:
  (1) Continuous - recognize audio continuously, optimized for conversations
  (2) Once+ - recognize audio continuously, optimized for non-interactive use cases
  (3) Once - recognize a single phrase, optimized for interactive use cases

  The --continuous option recognizes streaming audio continuously,
  optimized for interactive conversations and audio files.

  The --timeout option can be used to limit the amount of audio recognized.
  If not specified, there is effectively no timeout.

USAGE: ai speech recognize [...] --continuous
   OR: ai speech recognize [...] --continuous --timeout [MILLISECONDS]

EXAMPLES

  ai speech recognize --microphone --continuous
  ai speech recognize --file hello.wav --continuous --timeout 30000

SEE ALSO

  ai help speech recognize once
  ai help speech recognize

--------------------------------------------
ai help recognize default connection example
--------------------------------------------
RECOGNIZE - UPDATING DEFAULT CONNECTION

EXAMPLES

    ai config speech @default.connection --set host wss://localhost:5000/
    ai config speech @key --set @@none

    ai config speech @default.connection --set host wss://chinaeast2.stt.speech.azure.cn
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

    ai config speech @default.connection --set @@connection.from.endpoint
    ai config speech @endpoint --set wss://westus2.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

    ai config speech @default.connection --set @@connection.from.region
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai config speech @region --set westus2

    ai config speech @default.connection --set @@connection.from.host
    ai config speech @host --set wss://localhost:5000/

--------------------------
ai help recognize endpoint
--------------------------
ENDPOINT OVERVIEW

  For some scenarios, use "wss://" or "ws://" instead of "https://". For a
  full list of supported endpoints, see https://aka.ms/ai/endpoints

USAGE: ai <command> [...] --endpoint "ENDPOINT"
   OR: ai <command> [...] --endpoint @FILENAME
   OR: ai <command> [...] @CONFIG-FILENAME

WHERE: ENDPOINT represents the ENDPOINT uri as text (don't forget to add quotes)
   OR: FILENAME is a single line text file containing the ENDPOINT
   OR: CONFIG-FILENAME is a single line text file in the following form:

       service.config.endpoint=wss://...

EXAMPLES

  ai complete --endpoint @my.complete.endpoint --file prompt.txt
  ai chat --endpoint @my.chat.endpoint --file prompt.txt

SEE ALSO

  ai help init

--------------------------
ai help recognize examples
--------------------------
RECOGNIZE EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Recognize speech from a microphone
  
    ai speech recognize --microphone

  EXAMPLE 2: Recognize speech from local WAV file, or remote MP3 file

    ai speech recognize --file hello.wav
    ai speech recognize --file https://crbn.us/hello.mp3 --format mp3

  EXAMPLE 3: Recognize speech from multiple files using wildcards

    ai speech recognize --files *.wav

  EXAMPLE 4: Recognize speech in audio file content piped thru STDIN

    ai speech synthesize --text "Hello" --audio output - --quiet | ai speech recognize --file -

  EXAMPLE 5: Improve speech recognition accuracy with phrase lists

    ai speech recognize --files *.wav --phrases "Hello;Hi;Howya doin"

  EXAMPLE 6: Recognize multiple files from TSV file with file names and transcriptions

    ai speech recognize --foreach file;transcript in @filelist.txt --check wer eq 0

    WHERE: filelist.txt is the filename for a file containing tab delimited content:

      audioFileName1 \t transcript1
      audioFileName2 \t transcript2

  EXAMPLE 7: Recognize multiple files listed in a TSV file with file ids and transcriptions

    ai speech recognize --foreach id;transcript in @filelist.txt --check wer eq 0

    WHERE: filelist.txt is the filename for a file containing tab delimited content:

      audioFileNameNoExtension1 \t transcript1
      audioFileNameNoExtension2 \t transcript2

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech recognize advanced
  ai help speech recognize

----------------------
ai help recognize file
----------------------
RECOGNIZE FILE

  The ai speech recognize command recognizes streaming audio.

  The --file option specifies a single local audio file to be
  streamed to the service for recognition.

  The --url option specifies a single remote audio file to be
  streamed to the service for recognition after first caching the audio
  locally, removing it when done.

USAGE: ai speech recognize [...] --url URL
   OR: ai speech recognize [...] --url @FILENAME.txt
   OR: ai speech recognize [...] --file @FILEAME.txt
   OR: ai speech recognize [...] --file FILE

  WHERE: URL represents a remote audio file accessible to the public
     OR: FILE represents a local audio file accessible to the current user
     OR: FILE is - indicating that audio file content will be read from STDIN
     OR: FILENAME.txt is a single line text file containing the file to stream

  NOTE: --url is an alias for --file ... both accept both files and urls

EXAMPLES

  ai speech recognize --file hello.wav
  ai speech recognize --url https://crbn.us/hello.wav

  echo hello.wav>file.txt
  ai speech recognize --file @file.txt

SEE ALSO

  ai help speech recognize files
  ai help speech recognize format
  ai help speech recognize input
  ai help speech recognize

-----------------------
ai help recognize files
-----------------------
RECOGNIZE FILES

  The ai speech recognize command recognizes streaming audio.

  The --files option specifies multiple local audio files to be
  streamed to the service for recognition.

  The --urls option specifies multiple remote audio files to be
  streamed to the service for recognition after first caching the audio
  locally, removing it when done.

USAGE: ai speech recognize [...] --urls URL1;URL2[;...]
   OR: ai speech recognize [...] --urls @FILELIST.txt
   OR: ai speech recognize [...] --files @FILELIST.txt
   OR: ai speech recognize [...] --files FILE1;FILE2[;...]
   OR: ai speech recognize [...] --files PATTERN

  WHERE: URL1;URL2 represent remote audio files accessible to the public
     OR: FILE1;FILE2 represent local audio files accessible to the current user
     OR: PATTERN represents a local audio file wildcard search pattern
     OR: FILELIST.txt is a multi-line text file containing files and/or URLs,
         ... or PATTERNs, listed individually, each on separate lines
     
  NOTE: --urls is an alias for --files ... both accept both files and urls

EXAMPLES

  ai speech recognize --files *.wav
  ai speech recognize --files "hello.wav;goodbye.wav"

  ai speech recognize --urls "https://crbn.us/hello.wav;https://crbn.us/goodbye.wav"

  echo hello.wav> filelist.txt
  echo goodbye.wav>> filelist.txt
  echo https://crbn.us/whatstheweatherlike.wav>> filelist.txt

  ai speech recognize --files @filelist.txt

SEE ALSO

  ai help speech recognize format
  ai help speech recognize input
  ai help speech recognize

-------------------------
ai help recognize foreach
-------------------------
RECOGNIZE FOREACH

  The ai speech recognize command recognizes streaming audio.

  The --foreach option repeats a specific command multiple times
  effectively multiplying one set of command line options by another.

USAGE: ai speech recognize [...] --foreach in @FILE1.tsv
   OR: ai speech recognize [...] --foreach OPT1;[OPT2;[...]] in @FILE2.tsv
   OR: ai speech recognize [...] --foreach OPT1;[OPT2;[...]] skip header in @FILE3.tsv

  WHERE: OPT represents a command line option (e.g. file, id, transcript)
    AND: FILE1.tsv contains tab separated values, with line1: OPT1 [\t OPT2 [\t ...]]
     OR: FILE2.tsv contains tab separated values, with data rows starting on line 1
     OR: FILE3.tsv contains tab separated values, with data rows starting on line 2

EXAMPLE

  ai speech recognize --foreach file;transcript in @filelist.txt --check wer eq 0

SEE ALSO

  ai help speech recognize examples
  ai help speech recognize files
  ai help speech recognize

------------------------
ai help recognize format
------------------------
RECOGNIZE FORMAT

  The ai speech recognize command recognizes streaming audio.

  The --format option specifies the container format for the
  audio file being recognized.

USAGE: ai speech recognize [...] --format FORMAT

  WHERE: FORMAT is any
     OR: FORMAT is mp3
     OR: FORMAT is ogg
     OR: FORMAT is opus
     OR: FORMAT is flac
     OR: FORMAT is alaw
     OR: FORMAT is mulaw

EXAMPLES

  ai speech recognize --file audio.mp3 --format mp3
  ai speech recognize --files @filelist.txt --format any

SEE ALSO

  ai help speech recognize file
  ai help speech recognize files
  ai help speech recognize

-----------------------
ai help recognize input
-----------------------
RECOGNIZE INPUT OVERVIEW

  The ai speech recognize command recognizes streaming audio.

  FROM MICROPHONE - DEFAULT DEVICE or SPECIFIC DEVICE

    The ai speech recognize command can recognize streaming audio captured
    from a device microphone (default microphone or specific microphone).

    To recognize audio from a device MICROPHONE see: ai help speech recognize microphone 

  FROM FILE - SINGLE or MULTIPLE FILES

    The ai speech recognize command can also recognize audio stored in local
    or remote audio files, in various audio container formats (e.g. mp3, ogg).

    To recognize from a single audio file see: ai help speech recognize file
    To recognize from a multiple audio files see: ai help speech recognize files
    To recognize from file(s) in various formats see: ai help speech recognize format
 
EXAMPLES

  EXAMPLE 1: Recognize speech from a microphone
  
    ai speech recognize --microphone

  EXAMPLE 2: Recognize speech from local WAV file, or remote MP3 file

    ai speech recognize --file hello.wav
    ai speech recognize --file http://crbn.us/hello.mp3 --format mp3

  EXAMPLE 3: Recognize speech in multiple files using wildcards

    ai speech recognize --files *.wav

  EXAMPLE 4: Recognize speech in audio file content piped thru STDIN

    ai speech synthesize --text "Hello" --audio output - --quiet | ai speech recognize --file -

SEE ALSO

  ai help speech recognize examples
  ai help speech recognize

---------------------
ai help recognize key
---------------------
RECOGNIZE KEY

  The ai speech recognize command recognizes streaming audio.

  The --key option specifies the subscription key to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech recognize [...] --key KEY
   OR: ai speech recognize [...] --key @FILENAME
   OR: ai speech recognize [...] @CONFIG-FILENAME

  WHERE: KEY is the subscription key as text
     OR: FILENAME is a single line text file containing your KEY
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.key=KEY

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech recognize --nodefaults --region @region --key @key --file hello.wav

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech recognize --file hello.wav

SEE ALSO

  ai help speech setup
  ai help speech key overview
  ai help speech recognize connection
  ai help speech recognize region
  ai help speech recognize

-------------------------
ai help recognize keyword
-------------------------
RECOGNIZE KEYWORD

  The ai speech recognize command recognizes streaming audio.

  The --keyword option gates the recognition of speech until
  a keyword from the specified keyword model is recognized.

  Once the keyword is recognized, the next phrase in the speech stream will
  also be recognized, after which the system will once again gate speech
  recognition until the keyword is recognized again.

  The --timeout option can be used to limit the amount of audio recognized.
  If not specified, there is effectively no timeout.

USAGE: ai speech recognize [...] --keyword KEYWORD-MODEL
   OR: ai speech recognize [...] --keyword KEYWORD-MODEL --timeout [MILLISECONDS]

EXAMPLES

  ai speech recognize --microphone --continuous
  ai speech recognize --file hello.wav --continuous --timeout 30000

SEE ALSO

  ai help speech recognize

--------------------------
ai help recognize language
--------------------------
RECOGNIZE LANGUAGE

  The ai speech recognize command recognizes streaming audio.

  The --language option specifies a single spoken LANGUAGE in
  BCP-47 format. Speech streamed to the service will be forced to match
  words and phrases in the specified LANGUAGE.

  The --languages option auto detects the spoken language from
  a set of languages, each specified in BCP-47 format. The service will
  evaluate a portion of the streamed audio and attempt to determine the best
  matching spoken language from those specified.

  For a full list of supported languages, see https://aka.ms/speech/languages

  If no language is specified, the default will be en-US.

USAGE: ai speech recognize [...] --language LANGUAGE
   OR: ai speech recognize [...] --languages LANGUAGE1;LANGUAGE2[;...]
   OR: ai speech recognize [...] --languages @LANGUAGES.txt
   OR: ai speech recognize [...] --language @LANGUAGE.txt

  WHERE: LANGUAGE is a supported BCP-47 language tag (e.g. en-US)
     OR: LANGUAGES.txt is a multi-line text file, with one LANGUAGE per line
     OR: LANGUAGE.txt is a single line text file containing one LANGUAGE

EXAMPLES

  ai speech recognize --language en-US --file english.wav
  ai speech recognize --language de-DE --file german.wav
  ai speech recognize --languages en-US;de-DE --files *.wav

SEE ALSO

  ai help speech recognize

---------------------------
ai help recognize languages
---------------------------
@recognize.language

---------------------
ai help recognize log
---------------------
RECOGNIZE LOG

  The ai speech recognize command recognizes streaming audio.

  The --log option specifies the name of the file into which
  to write additional log information and diagnostics. This logging is
  performed by the Speech SDK, upon which AI is built.

  The --content logging enabled option enables service level logging
  of the audio content and recognition results.

USAGE: ai speech recognize [...] --log FILENAME
   OR: ai speech recognize [...] --content logging enabled

  NOTE: Default SDK logging uses the @log.time preset template

    diagnostics.config.log.file=log-{run.time}.log

EXAMPLES

  ai speech recognize --file hello.wav --log log.log
  ai speech recognize --file hello.wav --log {id}.log
  ai speech recognize --file hello.wav --log {config.region}.log

  ai speech recognize --file hello.wav --content logging enabled

  ai config speech @default.log --clear
  ai config speech @default.log --set @@none
  ai config speech @default.log --set log {config.region}-{id}-{run.time}.log
  ai config speech @default.log --add content.logging.enabled true

SEE ALSO

  ai help speech recognize

----------------------------
ai help recognize microphone
----------------------------
RECOGNIZE MICROPHONE

  The ai speech recognize command recognizes streaming audio.

  The --microphone option specifies use of a microphone.

USAGE: ai speech recognize [...] --microphone
   OR: ai speech recognize [...] --microphone DEVICE-ID

  WHERE: DEVICE-ID represents a specific microphone device

  For full list of DEVICE-IDs, see https://aka.ms/speech/sdk/device-ids

SEE ALSO

  ai help speech recognize
  ai help speech recognize input

----------------------
ai help recognize once
----------------------
RECOGNIZE ONCE

  The ai speech recognize command recognizes streaming audio.

  Streaming audio can be recognized in several modes:
  (1) Continuous - recognize audio continuously, optimized for conversations
  (2) Once+ - recognize audio continuously, optimized for non-interactive use cases
  (3) Once - recognize a single phrase, optimized for interactive use cases

  The --once option recognizes the first phrase in an audio stream,
  optimized for interactive use cases.

  The --once+ option repeatedly recognizes phrases in an audio
  stream, optimized for non-interactive use cases.

USAGE: ai speech recognize [...] --once

EXAMPLES

  ai speech recognize --microphone --once
  ai speech recognize --file hello.wav --once+

SEE ALSO

  ai help speech recognize
  ai help speech recognize continuous

------------------------
ai help recognize output
------------------------
RECOGNIZE OUTPUT

  The ai speech recognize command recognizes streaming audio.

  Recognition output approaches:
  (1) Per event output - Specified ITEMs are accumulated and output per event
  (2) Combined output - Specified ITEMs are accumulated and output per audio stream
  (3) Batch output - Recognition output is similar to ai speech batch transcriptions
  
  For (1) and (2), one or more ITEMs from a large set of items may be chosen
  to output, in either JSON or TSV format.

  For (3), a fixed set of ITEMs are output, both combined and segmented by
  service determined utterance boundaries, as well as some stream summary
  information.

  (1) To use per event output, see: ai help speech recognize output each
  (2) To use combined output, see: ai help speech recognize output all
  (3) To use batch output, see ai help speech recognize output batch

EXAMPLES

  ai speech recognize --file hello.wav --output all id --output all sessionid --output all text
  ai speech recognize --once --output each event --output all sessionid --output each text
  ai speech recognize --once --output batch json --output batch file my.output.json

  ai config speech @default.output --clear
  ai config speech @default.output --add output.all.id true
  ai config speech @default.output --add output.all.sessionid true
  ai config speech @default.output --add output.all.text true

SEE ALSO

  ai help config
  ai help speech batch transcription
  ai help speech recognize

----------------------------
ai help recognize output all
----------------------------
RECOGNIZE OUTPUT ALL

  The ai speech recognize command recognizes streaming audio.

  The --output all option specifies an ITEM to accumulate and
  aggregate into a TSV or JSON output file, combined across all events.

  The --output all file option specifies the output filename. 

  The --output all file type option specifies the output file type,
  either JSON or TSV (tab separated values). If no file type is provided,
  the output file will be TSV by default.

USAGE: ai speech recognize [...] --output all ITEM
   OR: ai speech recognize [...] --output all file FILENAME
   OR: ai speech recognize [...] --output all file type TYPE

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

  NOTE: Default output uses the @output.all.standard preset template

    output.all.audio.input.id=true
    output.all.recognizer.session.started.sessionid=true
    output.all.recognizer.recognized.result.text=true

EXAMPLES

  ai speech recognize --once --output all text
  ai speech recognize --once --output all text --output all file output.tsv
  ai speech recognize --once --output all text --output all file type json

  ai config speech @default.output --set @@output.all.standard
  ai config speech @default.output --set @@output.all.detailed
  ai config speech @default.output --set @@output.all.latency
  ai config speech @default.output --set @@output.all.transcript.display
  ai config speech @default.output --set @@output.all.transcript.lexical

  ai config speech @default.output --clear
  ai config speech @default.output --add output.all.id true
  ai config speech @default.output --add output.all.sessionid true
  ai config speech @default.output --add output.all.text true

SEE ALSO

  ai help speech recognize output overview
  ai help speech recognize output examples
  ai help speech recognize

------------------------------
ai help recognize output batch
------------------------------
RECOGNIZE OUTPUT BATCH

  The ai speech recognize command recognizes streaming audio.

  The --output batch json option indicates that recognition results should
  be output in the same format as ai speech batch transcriptions.

  The --output batch file option specifies the name of the file to use. If 
  this option is not specified, a default filename will be provided.

USAGE: ai speech recognize [...] --output batch json
   OR: ai speech recognize [...] --output batch file FILENAME

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

EXAMPLES

  ai speech recognize --file hello.wav --output batch json
  ai speech recognize --file hello.wav --output batch file hello.json

  ai config speech @default.output --clear
  ai config speech @default.output --add output.batch.json true
  ai config speech @default.output --add output.batch.file output.{id}.{run.time}.json

SEE ALSO

  ai help speech recognize output
  ai help speech batch transcription
  ai help speech recognize

-----------------------------
ai help recognize output each
-----------------------------
RECOGNIZE OUTPUT EACH

  The ai speech recognize command recognizes streaming audio.

  The --output each option specifies an ITEM to accumulate and
  aggregate into a TSV or JSON output file, one ITEM per event.

  The --output each file option specifies the output filename. 

  The --output each file type option specifies the output file type,
  either JSON or TSV (tab separated values). If no file type is provided,
  the output file will be TSV by default.

USAGE: ai speech recognize [...] --output each ITEM
   OR: ai speech recognize [...] --output each file FILENAME
   OR: ai speech recognize [...] --output each file type TYPE

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

  NOTE: By default, nothing is output per event

EXAMPLES

  ai speech recognize --once --output each text
  ai speech recognize --once --output each event --output each text
  ai speech recognize --once --output each text --output each file output.tsv

  ai config speech @default.output --set @@output.each.event
  ai config speech @default.output --set @@output.each.detailed
  ai config speech @default.output --set @@output.each.latency

  ai config speech @default.output --clear
  ai config speech @default.output --add output.each.sessionid true
  ai config speech @default.output --add output.each.event true
  ai config speech @default.output --add output.each.text true
  ai config speech @default.output --add output.each.latency true
  ai config speech @default.output --add @output.all.standard

SEE ALSO

  ai help speech recognize output overview
  ai help speech recognize output examples
  ai help speech recognize

---------------------------------
ai help recognize output examples
---------------------------------
RECOGNIZE OUTPUT EXAMPLES

  ai speech recognize [...] --output all audio id
  ai speech recognize [...] --output all sessionid
  ai speech recognize [...] --output all resultid
  ai speech recognize [...] --output all reason
  ai speech recognize [...] --output all text
  ai speech recognize [...] --output all itn text
  ai speech recognize [...] --output all lexical text
  ai speech recognize [...] --output all offset
  ai speech recognize [...] --output all duration
  ai speech recognize [...] --output all latency
  ai speech recognize [...] --output all json

  ai speech recognize [...] --output each audio id
  ai speech recognize [...] --output each sessionid
  ai speech recognize [...] --output each resultid
  ai speech recognize [...] --output each reason
  ai speech recognize [...] --output each text
  ai speech recognize [...] --output each itn text
  ai speech recognize [...] --output each lexical text
  ai speech recognize [...] --output each offset
  ai speech recognize [...] --output each duration
  ai speech recognize [...] --output each latency
  ai speech recognize [...] --output each json

  ai speech recognize [...] --output all result resultid
  ai speech recognize [...] --output all result reason
  ai speech recognize [...] --output all result text
  ai speech recognize [...] --output all result offset
  ai speech recognize [...] --output all result duration
  ai speech recognize [...] --output all result latency
  ai speech recognize [...] --output all result json

  ai speech recognize [...] --output each result resultid
  ai speech recognize [...] --output each result reason
  ai speech recognize [...] --output each result text
  ai speech recognize [...] --output each result offset
  ai speech recognize [...] --output each result duration
  ai speech recognize [...] --output each result latency
  ai speech recognize [...] --output each result json

  ai speech recognize [...] --output all events
  ai speech recognize [...] --output all event sessionid

  ai speech recognize [...] --output each event
  ai speech recognize [...] --output each event sessionid

  ai speech recognize [...] --output all connection events
  ai speech recognize [...] --output all connection event sessionid
  ai speech recognize [...] --output all connection connected events
  ai speech recognize [...] --output all connection connected sessionid
  ai speech recognize [...] --output all connection disconnected events
  ai speech recognize [...] --output all connection disconnected sessionid

  ai speech recognize [...] --output each connection event
  ai speech recognize [...] --output each connection event sessionid
  ai speech recognize [...] --output each connection connected event
  ai speech recognize [...] --output each connection connected sessionid
  ai speech recognize [...] --output each connection disconnected event
  ai speech recognize [...] --output each connection disconnected sessionid

  ai speech recognize [...] --output all recognizer events
  ai speech recognize [...] --output all recognizer event sessionid

  ai speech recognize [...] --output each recognizer event
  ai speech recognize [...] --output each recognizer event sessionid

  ai speech recognize [...] --output all recognizer session events
  ai speech recognize [...] --output all recognizer session event sessionid
  ai speech recognize [...] --output all recognizer session started events
  ai speech recognize [...] --output all recognizer session started sessionid
  ai speech recognize [...] --output all recognizer session stopped events
  ai speech recognize [...] --output all recognizer session stopped sessionid

  ai speech recognize [...] --output each recognizer session event
  ai speech recognize [...] --output each recognizer session event sessionid
  ai speech recognize [...] --output each recognizer session started event
  ai speech recognize [...] --output each recognizer session started sessionid
  ai speech recognize [...] --output each recognizer session stopped event
  ai speech recognize [...] --output each recognizer session stopped sessionid

  ai speech recognize [...] --output all connection message received events
  ai speech recognize [...] --output all connection message received binary message
  ai speech recognize [...] --output all connection message received binary message size
  ai speech recognize [...] --output all connection message received content type
  ai speech recognize [...] --output all connection message received is binary message
  ai speech recognize [...] --output all connection message received is text message
  ai speech recognize [...] --output all connection message received path
  ai speech recognize [...] --output all connection message received request id
  ai speech recognize [...] --output all connection message received text message

  ai speech recognize [...] --output each connection message received event
  ai speech recognize [...] --output each connection message received binary message
  ai speech recognize [...] --output each connection message received binary message size
  ai speech recognize [...] --output each connection message received content type
  ai speech recognize [...] --output each connection message received is binary message
  ai speech recognize [...] --output each connection message received is text message
  ai speech recognize [...] --output each connection message received path
  ai speech recognize [...] --output each connection message received request id
  ai speech recognize [...] --output each connection message received text message

  ai speech recognize [...] --output all recognizer canceled events
  ai speech recognize [...] --output all recognizer canceled error
  ai speech recognize [...] --output all recognizer canceled error code
  ai speech recognize [...] --output all recognizer canceled error details
  ai speech recognize [...] --output all recognizer canceled reason

  ai speech recognize [...] --output each recognizer canceled event
  ai speech recognize [...] --output each recognizer canceled error
  ai speech recognize [...] --output each recognizer canceled error code
  ai speech recognize [...] --output each recognizer canceled error details
  ai speech recognize [...] --output each recognizer canceled reason

  ai speech recognize [...] --output all recognizer recognized events
  ai speech recognize [...] --output all recognizer recognized sessionid
  ai speech recognize [...] --output all recognizer recognized result resultid
  ai speech recognize [...] --output all recognizer recognized result reason
  ai speech recognize [...] --output all recognizer recognized result text
  ai speech recognize [...] --output all recognizer recognized result itn text
  ai speech recognize [...] --output all recognizer recognized result lexical text
  ai speech recognize [...] --output all recognizer recognized result offset
  ai speech recognize [...] --output all recognizer recognized result duration
  ai speech recognize [...] --output all recognizer recognized result latency
  ai speech recognize [...] --output all recognizer recognized result json

  ai speech recognize [...] --output each recognizer recognized event
  ai speech recognize [...] --output each recognizer recognized sessionid
  ai speech recognize [...] --output each recognizer recognized result resultid
  ai speech recognize [...] --output each recognizer recognized result reason
  ai speech recognize [...] --output each recognizer recognized result text
  ai speech recognize [...] --output each recognizer recognized result itn text
  ai speech recognize [...] --output each recognizer recognized result lexical text
  ai speech recognize [...] --output each recognizer recognized result offset
  ai speech recognize [...] --output each recognizer recognized result duration
  ai speech recognize [...] --output each recognizer recognized result latency
  ai speech recognize [...] --output each recognizer recognized result json

  ai speech recognize [...] --output all recognizer recognizing events
  ai speech recognize [...] --output all recognizer recognizing sessionid
  ai speech recognize [...] --output all recognizer recognizing result resultid
  ai speech recognize [...] --output all recognizer recognizing result reason
  ai speech recognize [...] --output all recognizer recognizing result text
  ai speech recognize [...] --output all recognizer recognizing result offset
  ai speech recognize [...] --output all recognizer recognizing result duration
  ai speech recognize [...] --output all recognizer recognizing result latency
  ai speech recognize [...] --output all recognizer recognizing result json

  ai speech recognize [...] --output each recognizer recognizing event
  ai speech recognize [...] --output each recognizer recognizing sessionid
  ai speech recognize [...] --output each recognizer recognizing result resultid
  ai speech recognize [...] --output each recognizer recognizing result reason
  ai speech recognize [...] --output each recognizer recognizing result text
  ai speech recognize [...] --output each recognizer recognizing result offset
  ai speech recognize [...] --output each recognizer recognizing result duration
  ai speech recognize [...] --output each recognizer recognizing result latency
  ai speech recognize [...] --output each recognizer recognizing result json

  ai speech recognize [...] --output all file type json
  ai speech recognize [...] --output all file output.json

  ai speech recognize [...] --output each file type json
  ai speech recognize [...] --output each file output.json

  ai speech recognize [...] --output all file type tsv 
  ai speech recognize [...] --output all file output.tsv
  ai speech recognize [...] --output all tsv file has header false

  ai speech recognize [...] --output each file type tsv
  ai speech recognize [...] --output each file output.tsv
  ai speech recognize [...] --output each tsv file has header false

----------------------------
ai help recognize output vtt
----------------------------
RECOGNIZE OUTPUT VTT 

  The ai speech recognize command recognizes streaming audio.

  The --output vtt option indicates that recognition results should
  be output in the WEBVTT format, which provides captioning information for audio/video files.
  More information on the format can be found at https://www.w3.org/TR/webvtt1/.

  The --output vtt file option specifies the name of the file to use. If 
  this option is not specified, a default filename will be provided.

USAGE: ai speech recognize [...] --output vtt
   OR: ai speech recognize [...] --output vtt file FILENAME

EXAMPLES

  ai speech recognize --file hello.wav --output vtt
  ai speech recognize --file hello.wav --output vtt file hello.vtt

SEE ALSO

  ai help speech recognize output
  ai help speech recognize

-------------------------
ai help recognize phrases
-------------------------
RECOGNIZE PHRASEs

  The ai speech recognize command recognizes streaming audio.

  The --phrases option increases speech recognition accuracy
  by supplying one or more words or phrases that are likely to appear
  in the streaming audio. 

USAGE: ai speech recognize [...] --phrases "PHRASE1;"
   OR: ai speech recognize [...] --phrases "PHRASE1;PHRASE2[;...]
   OR: ai speech recognize [...] --phrases @PHRASELIST.txt

  WHERE: PHRASE represents one or more words that might appear in the audio
     OR: PHRASELIST.txt is a multi-line text file containing one or more
         ... PHRASEs, listed individually, each on separate lines
     
EXAMPLES

  ai speech recognize --file hello.wav --phrases "Hello;Hi;Howya doin"

  echo Hello> phrases.txt
  echo Hi>> phrases.txt
  echo Howya doin>> phrases.txt

  ai speech recognize --file hello.wav --phrases @phrases.txt

SEE ALSO

  ai help speech recognize custom speech
  ai help speech recognize

---------------------------
ai help recognize processes
---------------------------
RECOGNIZE PROCESSES

  The ai speech recognize command recognizes streaming audio.

  The --processes option specifies the maximum number of
  sub-processes to use when parallelizing recognition tasks.

  The --ramp processes every option can optionally be used to control
  how quickly each new sub-process will be added to the pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  processes will immediately be available to the pool.

USAGE: ai speech recognize [...] --processes NUMBER
   OR: ai speech recognize [...] --processes NUMBER --ramp processes every MILLISECONDS

  WHERE: NUMBER represents the maximum number of processes to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new process

EXAMPLES

  ai speech recognize --files @filelist.txt --processes 10
  ai speech recognize --files *.wav --processes 20 --ramp processes every 30000

SEE ALSO

  ai help speech recognize
  ai help speech recognize threads

---------------------------
ai help recognize profanity
---------------------------
RECOGNIZE PROFANITY

  The ai speech recognize command recognizes streaming audio.

  The --profanity controls how the service deals with spoken profanity.

USAGE: ai speech recognize [...] --profanity OPTION

  WHERE: OPTION is raw
     OR: OPTION is masked
     OR: OPTION is removed

EXAMPLES

  ai speech recognize --file hello.wav --profanity raw
  ai speech recognize --file hello.wav --profanity masked
  ai speech recognize --file hello.wav --profanity removed

SEE ALSO

  ai help speech recognize

-----------------------
ai help recognize proxy
-----------------------
RECOGNIZE PROXY

  The ai speech recognize command recognizes streaming audio.

  The --proxy option specifies a HTTP proxy host name. 
  The --proxy port option specifies the HTTP proxy port.

USAGE: ai speech recognize [...] --proxy PROXY
   OR: ai speech recognize [...] --proxy PROXY --proxy port PORT
   OR: ai speech recognize [...] @CONFIG-FILENAME

  WHERE: PROXY represents the PROXY host (e.g. localhost)
     OR: PORT represents the PROXY port (e.g. 80, which is the default)
     OR: CONFIG-FILENAME is a multi-line text file as follows:

            service.config.proxy.host=HOST
            service.config.proxy.port=PORT

EXAMPLES

  ai speech recognize --file hello.wav --proxy localhost --proxy port 8888

  ai config speech @fiddler --set proxy.host localhost
  ai config speech @fiddler --add proxy.port 8888

  ai speech recognize --file hello.wav @fiddler

SEE ALSO

  ai help config
  ai help speech recognize

------------------------
ai help recognize region
------------------------
RECOGNIZE REGION

  The ai speech recognize command recognizes streaming audio.

  The --region option specifies the REGION for an existing resource.

  For a full list of supported regions, see https://aka.ms/speech/regions.

USAGE: ai speech recognize [...] --region REGION
   OR: ai speech recognize [...] --region @FILENAME
   OR: ai speech recognize [...] @CONFIG-FILENAME

  WHERE: REGION is the region for the speech resource
     OR: FILENAME is a single line text file containing the REGION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.region=REGION

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech recognize --nodefaults --region @region --key @key --file hello.wav

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech recognize --file hello.wav

  ai config speech @key --set 436172626F6E20697320636F6F6C2121 --region westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2020 --region eastus
  ai speech recognize --foreach region in eastus;westus2 --key @@key --file hello.wav

SEE ALSO

  ai help speech setup
  ai help speech region overview
  ai help speech recognize connection
  ai help speech recognize key
  ai help speech recognize

----------------------
ai help recognize save
----------------------
RECOGNIZE SAVE

  The ai speech recognize command recognizes streaming audio.

  The --save option packages command line and related
  configuration data into one or more AI configuration data files
  for backup or portability to another device.

USAGE: ai speech recognize [...] --save FILENAME

EXAMPLES

  ai speech recognize --files *.wav --save test1.job
  ai speech recognize --files *.wav --log {id}.log --save test2.job
  ai speech recognize --files @URLs.txt --output zip output.zip --save test3.job

  ai speech recognize --foreach file;transcript in @items.txt --save test4.job
  ai speech recognize @test4.job

SEE ALSO

  ai help speech recognize
  ai help speech recognize files
  ai help speech recognize foreach
  ai help speech webjob setup

-------------------------
ai help recognize threads
-------------------------
RECOGNIZE THREADS

  The ai speech recognize command recognizes streaming audio.

  The --threads option specifies a how many threads to use when 
  parallelizing recognition tasks.

  The --ramp threads every option can optionally be used to control
  how quickly each new thread will be added to the thread pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  threads will immediately be available to the pool.

USAGE: ai speech recognize [...] --threads NUMBER
   OR: ai speech recognize [...] --threads NUMBER --ramp threads every MILLISECONDS

  WHERE: NUMBER represents the maximum number of threads to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new thread

EXAMPLES

  ai speech recognize --files @filelist.txt --threads 10
  ai speech recognize --files *.wav --threads 20 --ramp threads every 30000

SEE ALSO

  ai help speech recognize
  ai help speech recognize processes

-----------------------
ai help recognize token
-----------------------
RECOGNIZE TOKEN

  The ai speech recognize command recognizes streaming audio.

  The --token option specifies an authentication token to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech recognize [...] --token TOKEN
   OR: ai speech recognize [...] --token @FILENAME
   OR: ai speech recognize [...] @CONFIG-FILENAME

  WHERE: TOKEN is the AUTH TOKEN obtained from the issueToken endpoint
     OR: FILENAME is a single line text file containing your AUTH TOKEN
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.token=TOKEN

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @token --set bdca******789
  ai speech recognize --nodefaults --region @region --token @token --file hello.wav

  ai config speech @default.config --clear
  ai config speech @default.config --add token @token
  ai config speech @default.config --add region @region
  ai speech recognize --file hello.wav

SEE ALSO

  ai help speech setup
  ai help speech recognize connection
  ai help speech recognize region
  ai help speech recognize

---------------------
ai help recognize url
---------------------
@recognize.file

----------------------
ai help recognize urls
----------------------
@recognize.files

---------------------
ai help recognize wer
---------------------
RECOGNIZE WER

  The ai speech recognize command recognizes streaming audio.

  The --wer option allows an external remote method (such as an Azure Function)
  to calculate the word error rate via HTTP GET.

USAGE: ai speech recognize [...] --wer url URL

  The remote method will be provided the following query parameters:
  * transcription - the expected text
  * recognition - the recognized text
  * locale - the spoken LANGUAGE in BCP-47 format

  For example:
  
    https://crbn.us/wer?transcription=TRANSCRIPT&recognition=RECOGNIZEDTEXT&locale=LOCALE

  The remote method should return a JSON object, with wordCount and errors integer values. For example:

    { "wordCount": 4, "errors": 0 }  

EXAMPLES

  ai speech recognize --foreach file;transcript in @filelist.txt --wer url https://crbn.us/wer --check wer eq 0

SEE ALSO

  ai help speech recognize examples
  ai help speech recognize files
  ai help speech recognize

-----------------------------------
ai help recognize word level timing
-----------------------------------
RECOGNIZE WORD LEVEL TIMING

  The ai speech recognize command recognizes streaming audio.

  The --word level timing option requests word level timing
  details in recognition results.

USAGE: ai speech recognize [...] --word level timing
   OR: ai speech recognize [...] @CONFIG-FILENAME

  WHERE: CONFIG-FILENAME is a single line text file in the following form:

      service.output.config.word.level.timing=true

EXAMPLE

  ai speech recognize --file hello.wav --word level timing --output json

SEE ALSO

  see help recognize output json
  ai help speech recognize

---------------------
ai help recognize zip
---------------------
RECOGNIZE ZIP

  The ai speech recognize command recognizes streaming audio.

  The --zip option packages command line and related
  configuration data along with AI and its runtime dependencies into
  a self-contained .ZIP file for backup or portability to another device.

  NOTE: --zip does not package local input files (e.g. audio, models, etc.)

USAGE: ai speech recognize [...] --zip FILENAME

EXAMPLES

  ai speech recognize --files *.wav --zip test1.zip
  ai speech recognize --files *.wav --log {id}.log --zip test2.zip
  ai speech recognize --foreach file;transcript in @items.txt --zip test3.zip

  ai speech recognize --files @URLs.txt --output zip output.zip --zip test4.zip
  ai webjob --upload test4.zip --run

SEE ALSO

  ai help speech recognize
  ai help speech recognize files
  ai help speech recognize foreach
  ai help speech webjob setup

---------------
ai help speaker
---------------
SPEAKER

  The ai speech speaker command manages identification/verification profiles, which are used in speaker recognition scenarios.

USAGE: ai speech speaker <command> [...]

COMMANDS

  ai speech speaker identify            (see: ai help speech speaker identify)
  ai speech speaker verify              (see: ai help speech speaker verify)

SEE ALSO

  ai help speech speaker examples
  ai help speech speaker documentation
  ai help find topics speech speaker

--------------------------
ai help speaker connection
--------------------------
CONNECTION OVERVIEW

  AUTHENTICATION - KEY or TOKEN

    The Azure Speech Service requires authentication using subscriptions keys
    or authentication tokens.

    To use subscription keys see: ai help speech speaker key
    To use authentication tokens see: ai help speech speaker token

  CONNECTION - REGION or ENDPOINT

    The Azure Speech Service runs in REGION specific data centers, sovereign
    clouds, or on-premise containers. For sovereign clouds and on-premise
    containers, you may need to specify the ENDPOINT directly.

    To specify a particular REGION see: ai help speech speaker region
    To specify a particular ENDPOINT see: ai help speech speaker endpoint

    NOTE: Default connection uses the @connection.from.region preset template

      service.config.region=@region
      service.config.key=@key

EXAMPLES

  EXAMPLE 1: Use the westus2 region and key stored in the AI configuration

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai speech speaker verify create --output id @my.id

  EXAMPLE 2: Use the westus2 region and key directly on command line

    ai speech speaker identify list --region westus2 --key 436172626F6E20697320636F6F6C2121

  EXAMPLE 3: Use a specific endpoint on the command line

    ai speech speaker identify list --nodefaults --endpoint https://westus.api.cognitive.microsoft.com/spid/v1
    ai speech speaker verify list --nodefaults --endpoint https://westus.api.cognitive.microsoft.com/spid/v1

SEE ALSO

  ai help speech speaker

-----------------------------
ai help speaker documentation
-----------------------------
@profile.documentation

------------------------
ai help speaker examples
------------------------
SPEAKER EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Identify a file against a speaker identification profile id

    ai speech speaker identify --id @my.id --file FILENAME

  EXAMPLE 2: Verify a file against a independent verification profile id

    ai speech speaker verify --id @my.id --file FILENAME

  EXAMPLE 3: Verify a file against a dependent verification profile id

    ai speech speaker verify --id @my.id --file FILENAME --kind textdependentverification

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech speaker 
  ai help speech speaker identify
  ai help speech speaker verify

--------------------
ai help speaker file
--------------------
SPEAKER FILE

  The ai speech speaker command manages speaker recognition operations.

  The --file option specifies a single local audio file to be
  uploaded to the service for identification or verification.

USAGE: ai speech speaker identify [...] --file @FILENAME.txt
   OR: ai speech speaker verify [...] --file FILE

  WHERE: FILE represents a local audio file accessible to the current user
     OR: FILENAME.txt is a single line text file containing the file to stream

SEE ALSO

  ai help speech speaker identify
  ai help speech speaker verify

------------------
ai help speaker id
------------------
SPEAKER ID

  The ai speech speaker command manages speaker recognition operations.

  The --id option specifies a verification/identification profile id or a file containing such an id 
  to be sent to the service for speaker recognition operations.

USAGE: ai speech speaker [identify/verify] --id 12341234-1234-1234-1234-5678-0123-4567-01234567 [...] 
   OR: ai speech speaker [identify/verify] --id @FILENAME [...]

  WHERE: FILENAME is a single line text file containing a identification/verification profile id

EXAMPLES

  ai speech speaker identify --id @my.id --file hello.wav
  ai speech speaker verify --id @my.id --file FILE

SEE ALSO

  ai help speech speaker
  ai help speech speaker identify
  ai help speech speaker verify

------------------------
ai help speaker identify
------------------------
SPEAKER IDENTIFY

IMPORTANT: The identification audio sample must contain 30 seconds or more of speech to be successful.

  The speaker identify command identifies speakers in a given audio sample against one or more voice profiles.

USAGE: ai speech speaker identify --id ID --file AUDIO_SAMPLE_FILE
   OR: ai speech speaker identify --ids [ID1, ID2, ..., ID10] --file AUDIO_SAMPLE_FILE

  CONNECTION                      (see: ai help speech speaker connection)
    --key KEY                     (see: ai help speech speaker key)
    --region REGION               (see: ai help speech speaker region)

  INPUT
    --id ID                       (see: ai help speech speaker id)
    --file FILE                   (see: ai help speech speaker file)

  ADVANCED
    --log FILENAME                (see: ai help speech speaker log)
    --foreach in @ITEMS.txt       (see: ai help speech speaker foreach)
    --threads NUMBER              (see: ai help speech speaker threads)

SEE ALSO

  ai help speech speaker verify
  ai help speech speaker examples
  ai help find topics speech speaker

-------------------
ai help speaker key
-------------------
SPEAKER KEY

  The ai speech speaker command manages speaker recognition operations.

  The --key option specifies the subscription key to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech speaker [...] --key KEY
   OR: ai speech speaker [...] --key @FILENAME
   OR: ai speech speaker [...] @CONFIG-FILENAME

  WHERE: KEY is the subscription key as text
     OR: FILENAME is a single line text file containing your KEY
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.key=KEY

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech speaker [identify/verify] --nodefaults --region @region --key @key --file FILE

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech speaker [identify/verify] --id @my.id --file FILE

SEE ALSO

  ai help speech setup
  ai help speech key overview
  ai help speech speaker region
  ai help speech speaker

--------------------
ai help speaker kind
--------------------
@profile.kind

------------------------
ai help speaker language
------------------------
SPEAKER LANGUAGE

  The ai speech speaker command manages speaker recognition operations.

  The --language option specifies a single spoken LANGUAGE in
  BCP-47 format. Speech streamed to the service will be forced to match
  words and phrases in the specified LANGUAGE.

  For a full list of supported languages, see https://aka.ms/speech/languages

  If no language is specified, the default will be en-US.

USAGE: ai speech speaker identify [...] --language LANGUAGE
   OR: ai speech speaker verify [...] --language @LANGUAGE.txt

  WHERE: LANGUAGE is a supported BCP-47 language tag (e.g. en-US)
     OR: LANGUAGE.txt is a single line text file containing one LANGUAGE

EXAMPLES

  ai speech speaker identify --id @my.en.profile.id --language en-US --file FILE
  ai speech speaker verify --id @my.fr.profile.id --language fr-FR --file FILE

SEE ALSO

  ai help speech speaker
  ai help speech speaker identify
  ai help speech speaker verify

----------------------
ai help speaker region
----------------------
SPEAKER REGION

  The ai speech speaker command manages speaker recognition operations.

  The --region option specifies the REGION for an existing resource.

  For a full list of supported regions, see https://aka.ms/speech/regions.

USAGE: ai speech speaker [...] --region REGION
   OR: ai speech speaker [...] --region @FILENAME
   OR: ai speech speaker [...] @CONFIG-FILENAME

  WHERE: REGION is the region for the speech resource
     OR: FILENAME is a single line text file containing the REGION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.region=REGION

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech speaker [identify/verify] --nodefaults --region @region --key @key --file FILE

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech speaker [identify/verify] --output id @my.id --file FILE

  ai config speech @key --set 436172626F6E20697320636F6F6C2121 --region westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2020 --region eastus
  ai speech speaker [identify/verify] --id @my.id --key @key --file FILE


SEE ALSO

  ai help speech setup
  ai help speech region overview
  ai help speech speaker key
  ai help speech speaker
  ai help speech speaker identify
  ai help speech speaker verify

----------------------
ai help speaker verify
----------------------
SPEAKER VERIFY

IMPORTANT: The verification audio sample must contain between 1 to 15 seconds of speech to be successful.

  The speaker verify command verifies a speaker in a given audio sample against a voice profile. The returned JSON will have a "result" field with an "Accept" or "Reject" value.

USAGE: ai speech speaker verify --id ID --file AUDIO_SAMPLE_FILE

  CONNECTION                      (see: ai help speech speaker connection)
    --key KEY                     (see: ai help speech speaker key)
    --region REGION               (see: ai help speech speaker region)

  INPUT
    --id ID                       (see: ai help speech speaker id)
    --file FILE                   (see: ai help speech speaker file)
    --kind KIND                   (see: ai help speech speaker kind)

  ADVANCED
    --log FILENAME                (see: ai help speech speaker log)
    --foreach in @ITEMS.txt       (see: ai help speech speaker foreach)
    --threads NUMBER              (see: ai help speech speaker threads)

SEE ALSO

  ai help speech speaker identify
  ai help speech speaker examples
  ai help find topics speech speaker

------------------
ai help synthesize
------------------
SYNTHESIZE

  The ai speech synthesize command synthesizes audio from text or SSML
  and render to the local device's speakers or write into local audio files.

USAGE: ai speech synthesize [...]

  CONNECTION                      (see: ai help speech synthesize connection)
    --key KEY                     (see: ai help speech synthesize key)
    --region REGION               (see: ai help speech synthesize region)

  VOICEs
    --voice NAME                  (see: ai help speech synthesize voice)
    --voices                      (see: ai help speech synthesize list voices)

  INPUT                           (see: ai help speech synthesize input)
    --interactive                 (see: ai help speech synthesize interactive)
    --text TEXT                   (see: ai help speech synthesize text)
    --ssml SSML                   (see: ai help speech synthesize ssml)
    --file FILE                   (see: ai help speech synthesize file)
    --files PATTERN               (see: ai help speech synthesize files)
    --files @FILELIST.txt         (see: ai help speech synthesize files)
    --format FORMAT               (see: ai help speech synthesize format)

  AUDIO OUTPUT                    (see: ai help speech synthesize output)
    --speakers                    (see: ai help speech synthesize speakers)
    --audio output FILENAME       (see: ai help speech synthesize output)

  ADVANCED
    --log FILENAME                (see: ai help speech synthesize log)
    --proxy HOSTNAME              (see: ai help speech synthesize proxy)
    --foreach in @ITEMS.txt       (see: ai help speech synthesize foreach)
    --threads NUMBER              (see: ai help speech synthesize threads)

SEE ALSO

  ai help speech setup
  ai help speech synthesize advanced
  ai help speech synthesize examples
  ai help find topics speech synthesize

---------------------------
ai help synthesize advanced
---------------------------
SYNTHESIZE

  The ai speech synthesize command synthesizes audio from text or SSML
  and render to the local device's speakers or write into local audio files.

USAGE: ai speech synthesize [...]

  CONNECTION                      (see: ai help speech synthesize connection)
    --key KEY                     (see: ai help speech synthesize key)
    --region REGION               (see: ai help speech synthesize region)
    --endpoint URI                (see: ai help speech synthesize endpoint)
    --token VALUE                 (see: ai help speech synthesize token)

  SERVICE
    --traffic type test           (see: ai help speech traffic type)
    --query string name=value     (see: ai help speech query string)

  VOICEs
    --voice NAME                  (see: ai help speech synthesize voice)
    --voices                      (see: ai help speech synthesize list voices)

  INPUT                           (see: ai help speech synthesize input)
    --interactive                 (see: ai help speech synthesize interactive)
    --text TEXT                   (see: ai help speech synthesize text)
    --ssml SSML                   (see: ai help speech synthesize ssml)
    --file FILE                   (see: ai help speech synthesize file)
    --files PATTERN               (see: ai help speech synthesize files)
    --files @FILELIST.txt         (see: ai help speech synthesize files)
    --format FORMAT               (see: ai help speech synthesize format)
    --url URL                     (see: ai help speech synthesize url)
    --urls URL                    (see: ai help speech synthesize urls)
    --urls @URLLIST.txt           (see: ai help speech synthesize urls)
    --id url URL                  (see: ai help speech input id)
    --id ID                       (see: ai help speech input id)

  OUTPUT                          (see: ai help speech synthesize output)
    --speakers                    (see: ai help speech synthesize speakers)
    --audio output FILENAME       (see: ai help speech synthesize audio output)
    --output all [<item>]         (see: ai help speech synthesize output all)
    --output each [<item>]        (see: ai help speech synthesize output each)
    --output all file FILENAME    (see: ai help speech synthesize output all file)
    --output each file FILENAME   (see: ai help speech synthesize output each file)

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech synthesize threads)
    --processes NUMBER            (see: ai help speech synthesize processes)
    --repeat NUMBER
    --max NUMBER

  ADVANCED
    --log FILENAME                (see: ai help speech synthesize log)
    --proxy HOSTNAME              (see: ai help speech synthesize proxy)
    --property NAME=VALUE         (see: ai help speech synthesize property)
    --properties @PROPLIST.txt    (see: ai help speech synthesize properties)
    --foreach in @ITEMS.txt       (see: ai help speech synthesize foreach)
    --save FILENAME               (see: ai help speech synthesize save)
    --zip ZIPFILE                 (see: ai help speech synthesize zip)

SEE ALSO

  ai help speech setup
  ai help speech synthesize examples
  ai help find topics speech synthesize

------------------------
ai help synthesize audio
------------------------
SYNTHESIZE AUDIO OUTPUT

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --speakers option specifies audio output should be sent to 
  the default output device.

  The --audio output option specifies a local audio file to which
  the synthesized audio content will be streamed.

USAGE: ai speech synthesize [...] --speakers
   OR: ai speech synthesize [...] --audio output FILE
   OR: ai speech synthesize [...] --audio output @FILENAME.txt

  WHERE: FILE represents a local audio file writable by the current user
     OR: FILE is - represents STDOUT, where raw audio data will be streamed
     OR: FILENAME.txt is a single line text file containing the FILE

EXAMPLES

  EXAMPLE 1: Synthesize text into speech on default speakers
  
    ai speech synthesize --text Hello --speakers

  EXAMPLE 2: Synthesize text into speech in a WAV file

    ai speech synthesize --text "Hello" --audio output hello.wav

  EXAMPLE 3: Synthesize text into speech piping raw audio into file

    ai speech synthesize --text "Hello" --audio output - --quiet >hello.raw

  EXAMPLE 4: Recognize speech from raw audio content piped thru STDIN from synthesize command

    ai speech synthesize --text "Hello" --audio output - --quiet | ai speech recognize --file -

SEE ALSO

  ai help speech synthesize examples
  ai help speech synthesize format
  ai help speech synthesize

-------------------------------
ai help synthesize audio output
-------------------------------
@synthesize.audio

-----------------------------
ai help synthesize connection
-----------------------------
CONNECTION OVERVIEW

  AUTHENTICATION - KEY or TOKEN

    The Azure Speech Service requires authentication using subscriptions keys
    or authentication tokens.

    To use subscription keys see: ai help speech key
    To use authentication tokens see: ai help speech token

  CONNECTION - REGION, ENDPOINT, or HOST

    The Azure Speech Service runs in REGION specific data centers, sovereign
    clouds, or on-premise containers. For sovereign clouds and on-premise
    containers, you may need to specify the ENDPOINT or HOST directly.

    To specify a particular REGION see: ai help speech synthesize region
    To specify a particular ENDPOINT see: ai help speech synthesize endpoint
    To specify a particular HOST see: ai help speech synthesize host

EXAMPLES

  EXAMPLE 1: Store and use the region and key in the AI configuration

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai speech synthesize --file file.txt

  EXAMPLE 2: Use region and key provided on the command line

    ai speech synthesize --nodefaults --region westus2 --key 436172626F6E20697320636F6F6C2121 --file file.txt

  EXAMPLE 3: Use a specific sovereign cloud host on the command line

    ai speech synthesize --nodefaults --host wss://chinaeast2.tts.speech.azure.cn --file file.txt

  EXAMPLE 4: Use a specific on-premise container host on the command line

    ai speech synthesize --nodefaults --host wss://localhost:5000/ --file file.txt

  EXAMPLE 5: Use a specific endpoint on the command line

    ai speech synthesize --nodefaults --endpoint wss://westus2.tts.speech.microsoft.com/cognitiveservices/websocket/v1

---------------------------
ai help synthesize endpoint
---------------------------
ENDPOINT OVERVIEW

  For some scenarios, use "wss://" or "ws://" instead of "https://". For a
  full list of supported endpoints, see https://aka.ms/ai/endpoints

USAGE: ai <command> [...] --endpoint "ENDPOINT"
   OR: ai <command> [...] --endpoint @FILENAME
   OR: ai <command> [...] @CONFIG-FILENAME

WHERE: ENDPOINT represents the ENDPOINT uri as text (don't forget to add quotes)
   OR: FILENAME is a single line text file containing the ENDPOINT
   OR: CONFIG-FILENAME is a single line text file in the following form:

       service.config.endpoint=wss://...

EXAMPLES

  ai complete --endpoint @my.complete.endpoint --file prompt.txt
  ai chat --endpoint @my.chat.endpoint --file prompt.txt

SEE ALSO

  ai help init

---------------------------
ai help synthesize examples
---------------------------
SYNTHESIZE EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Synthesize text into speech on default speakers
  
    ai speech synthesize --text "Hello"

  EXAMPLE 2: Synthesize text into speech in a WAV file

    ai speech synthesize --text "Hello" --audio output hello.wav

  EXAMPLE 3: Synthesize text or SSML from a file and save output to WAV file

    ai speech synthesize --file file.txt --audio output text.wav
    ai speech synthesize --file file.ssml --audio output ssml.wav

  EXAMPLE 4: Synthesize speech from multiple files using wildcards

    ai speech synthesize --files *.txt;*.ssml --audio output {id}.wav

  EXAMPLE 5: Synthesize from TSV file with input and output file names

    ai speech synthesize --foreach input.file;audio.output in @filelist.txt

    WHERE: filelist.txt is the filename for a file containing tab delimited content:

      textFileName1 \t wavOutputFileName1
      ssmlFileName2 \t wavOutputFileName2

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech synthesize
  ai help speech synthesize advanced

-----------------------
ai help synthesize file
-----------------------
SYNTHESIZE FILE

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --file option specifies a single local data file containing
  text or SSML to be synthesized into audio.

  The --url option specifies a single local data file containing
  text or SSML to be synthesized into audio after first caching the data
  locally, removing it when done.

USAGE: ai speech synthesize [...] --file URL
   OR: ai speech synthesize [...] --file FILE
   OR: ai speech synthesize [...] --file @FILENAME.txt

  WHERE: URL represents a remote text or SSML file accessible to the public
    OR: FILE represents a local text or SSML file accessible to the current user
    OR: FILE is - indicating that text or SSML file content will be read from STDIN
    OR: FILENAME.txt is a single line text file containing the file to synthesize

EXAMPLES

  ai speech synthesize --file story.txt
  ai speech synthesize --url https://crbn.us/cheerful.ssml

  echo file.txt>filetosynth.txt
  ai speech synthesize --file @filetosynth.txt

SEE ALSO

  ai help speech synthesize

------------------------
ai help synthesize files
------------------------
SYNTHESIZE FILES

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --files option specifies multiple local data files containing
  text or SSML to be synthesized into audio.

  The --urls option specifies multiple local data files containing
  text or SSML to be synthesized into audio after first caching the data
  locally, removing it when done.

USAGE: ai speech synthesize [...] --urls URL1;URL2[;...]
   OR: ai speech synthesize [...] --urls @FILELIST.txt
   OR: ai speech synthesize [...] --files @FILELIST.txt
   OR: ai speech synthesize [...] --files FILE1;FILE2[;...]
   OR: ai speech synthesize [...] --files PATTERN

  WHERE: URL1;URL2 represent remote data files accessible to the public
     OR: FILE1;FILE2 represent local data files accessible to the current user
     OR: PATTERN represents a local data file wildcard search pattern
     OR: FILELIST.txt is a multi-line text file containing files and/or URLs,
         ... or PATTERNs, listed individually, each on separate lines
     
  NOTE: --urls is an alias for --files ... both accept both files and urls

EXAMPLES

  ai speech synthesize --files *.txt;*.ssml --audio output {id}.wav
  ai speech synthesize --files "story.txt;cheerful.ssml"

  ai speech synthesize --urls "https://crbn.us/story.txt;https://crbn.us/cheerful.ssml"

  echo story.txt> filelist.txt
  echo cheerful.ssml>> filelist.txt
  echo https://crbn.us/sentences.txt>> filelist.txt

  ai speech synthesize --files @filelist.txt

SEE ALSO

  ai help speech synthesize input
  ai help speech synthesize

--------------------------
ai help synthesize foreach
--------------------------
SYNTHESIZE FOREACH

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --foreach option repeats a specific command multiple times
  effectively multiplying one set of command line options by another.

USAGE: ai speech synthesize [...] --foreach in @FILE1.tsv
   OR: ai speech synthesize [...] --foreach OPT1;[OPT2;[...]] in @FILE2.tsv
   OR: ai speech synthesize [...] --foreach OPT1;[OPT2;[...]] skip header in @FILE3.tsv

  WHERE: OPT represents a command line option (e.g. file, audio.output.file)
    AND: FILE1.tsv contains tab separated values, with line1: OPT1 [\t OPT2 [\t ...]]
     OR: FILE2.tsv contains tab separated values, with data rows starting on line 1
     OR: FILE3.tsv contains tab separated values, with data rows starting on line 2

EXAMPLE

  ai speech synthesize --foreach region in eastus;westus2 --key @@key --text Hello

SEE ALSO

  ai help speech synthesize examples
  ai help speech synthesize files
  ai help speech synthesize

-------------------------
ai help synthesize format
-------------------------
SYNTHESIZE FORMAT

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is wav          (see: ai help speech synthesize wav)
     OR: FORMAT is mp3          (see: ai help speech synthesize mp3)
     OR: FORMAT is ogg          (see: ai help speech synthesize ogg)
     OR: FORMAT is opus         (see: ai help speech synthesize opus)
     OR: FORMAT is webm         (see: ai help speech synthesize webm)
     OR: FORMAT is alaw         (see: ai help speech synthesize wav)
     OR: FORMAT is mulaw        (see: ai help speech synthesize wav)
     OR: FORMAT is siren        (see: ai help speech synthesize siren)
     OR: FORMAT is raw          (see: ai help speech synthesize raw)

  NOTE: The default wav format is riff-16khz-16bit-mono-pcm

EXAMPLES

  ai speech synthesize --text "Hello" --audio output audio.mp3 --format mp3
  ai speech synthesize --text "Hello" --audio output audio.ogg --format ogg

SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize

-----------------------------
ai help synthesize format mp3
-----------------------------
SYNTHESIZE MP3

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is mp3
     OR: FORMAT is audio-16khz-128kbitrate-mono-mp3
     OR: FORMAT is audio-16khz-32kbitrate-mono-mp3
     OR: FORMAT is audio-16khz-64kbitrate-mono-mp3
     OR: FORMAT is audio-24khz-160kbitrate-mono-mp3
     OR: FORMAT is audio-24khz-48kbitrate-mono-mp3
     OR: FORMAT is audio-24khz-96kbitrate-mono-mp3
     OR: FORMAT is audio-48khz-192kbitrate-mono-mp3
     OR: FORMAT is audio-48khz-96kbitrate-mono-mp3

  NOTE: The default mp3 format is audio-16khz-128kbitrate-mono-mp3
  
SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize format
  ai help speech synthesize

-----------------------------
ai help synthesize format ogg
-----------------------------
SYNTHESIZE OGG

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is ogg
     OR: FORMAT is ogg-16khz-16bit-mono-opus
     OR: FORMAT is ogg-24khz-16bit-mono-opus
     OR: FORMAT is ogg-48khz-16bit-mono-opus

  NOTE: The default ogg format is ogg-16khz-16bit-mono-opus
  
SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize format
  ai help speech synthesize opus
  ai help speech synthesize

------------------------------
ai help synthesize format opus
------------------------------
SYNTHESIZE OPUS

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is opus
     OR: FORMAT is audio-16khz-16bit-32kbps-mono-opus
     OR: FORMAT is audio-24khz-16bit-24kbps-mono-opus
     OR: FORMAT is audio-24khz-16bit-48kbps-mono-opus

  NOTE: The default opus format is audio-16khz-16bit-32kbps-mono-opus
  
SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize format
  ai help speech synthesize ogg
  ai help speech synthesize webm
  ai help speech synthesize

-----------------------------
ai help synthesize format raw
-----------------------------
SYNTHESIZE RAW

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is raw
     OR: FORMAT is raw-16khz-16bit-mono-pcm
     OR: FORMAT is raw-16khz-16bit-mono-truesilk
     OR: FORMAT is raw-24khz-16bit-mono-pcm
     OR: FORMAT is raw-24khz-16bit-mono-truesilk
     OR: FORMAT is raw-48khz-16bit-mono-pcm
     OR: FORMAT is raw-8khz-16bit-mono-pcm
     OR: FORMAT is raw-8khz-8bit-mono-alaw
     OR: FORMAT is raw-8khz-8bit-mono-mulaw

  NOTE: The default raw format is raw-16khz-16bit-mono-pcm
  
SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize format
  ai help speech synthesize

-------------------------------
ai help synthesize format siren
-------------------------------
SYNTHESIZE SIREN

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is siren
     OR: FORMAT is audio-16khz-16kbps-mono-siren
     OR: FORMAT is riff-16khz-16kbps-mono-siren

  NOTE: The default siren format is audio-16khz-16kbps-mono-siren
  
SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize format
  ai help speech synthesize

-----------------------------
ai help synthesize format wav
-----------------------------
SYNTHESIZE WAV

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is wav
     OR: FORMAT is riff-16khz-16bit-mono-pcm
     OR: FORMAT is riff-24khz-16bit-mono-pcm
     OR: FORMAT is riff-48khz-16bit-mono-pcm
     OR: FORMAT is riff-8khz-16bit-mono-pcm
     OR: FORMAT is riff-8khz-8bit-mono-alaw
     OR: FORMAT is riff-8khz-8bit-mono-mulaw
     OR: FORMAT is riff-16khz-16kbps-mono-siren

  NOTE: The default wav format is riff-16khz-16bit-mono-pcm
  
SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize format
  ai help speech synthesize

------------------------------
ai help synthesize format webm
------------------------------
SYNTHESIZE WEBM

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --format option specifies the container format for the
  audio file being generated.

USAGE: ai speech synthesize [...] --format FORMAT

  WHERE: FORMAT is webm
     OR: FORMAT is webm-16khz-16bit-mono-opus
     OR: FORMAT is webm-24khz-16bit-24kbps-mono-opus
     OR: FORMAT is webm-24khz-16bit-mono-opus

  NOTE: The default webm format is webm-16khz-16bit-mono-opus
  
SEE ALSO

  ai help speech synthesize audio output
  ai help speech synthesize format
  ai help speech synthesize opus
  ai help speech synthesize

------------------------
ai help synthesize input
------------------------
SYNTHESIZE INPUT OVERVIEW

  The ai speech synthesize command synthesizes audio from text or SSML.

  INTERACTIVE - You type the text

    The ai speech synthesize command can create human sounding output from simple
    text that you type in, INTERACTIVELY.

    To synthesize text INTERACTIVELY see: ai help speech synthesize interactive

  COMMAND LINE - TEXT or SSML

    The ai speech synthesize command can also create human sounding output supplied
    directly on the command line. 

    To synthesize TEXT from the command line, see: ai help speech synthesize text
    To synthesize SSML from the command line, see: ai help speech synthesize ssml

  DATA FILES - TEXT or SSML FILES

    In addition, the ai speech synthesize command can also create human sounding 
    output stored in local or remote data files (TEXT or SSML standard).

    To synthesize TEXT or SSML from a single file, see: ai help speech synthesize file
    To synthesize TEXT or SSML from multiple files, see: ai help speech synthesize files
 
EXAMPLES

  EXAMPLE 1: Synthesize text entered on the command line
  
    ai speech synthesize --text "This is a test of the emergency broadcast system."

  EXAMPLE 2: Synthesize text stored in a local file

    ai speech synthesize --file story.txt

  EXAMPLE 3: Synthesize speech defined in a local SSML file

    ai speech synthesize --file cheerful.ssml

  EXAMPLE 4: Synthesize speech stored in a remote file, either TEXT or SSML

    ai speech synthesize --url http://crbn.us/text

  EXAMPLE 5: From a set of local files, synthesize from all text and SSML files

    ai speech synthesize --files *.txt;*.ssml

SEE ALSO

  ai help speech synthesize examples
  ai help speech synthesize

----------------------
ai help synthesize key
----------------------
SYNTHESIZE KEY

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --key option specifies the subscription key to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech synthesize [...] --key KEY
   OR: ai speech synthesize [...] --key @FILENAME
   OR: ai speech synthesize [...] @CONFIG-FILENAME

  WHERE: KEY is the subscription key as text
     OR: FILENAME is a single line text file containing your KEY
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.key=KEY

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech synthesize --nodefaults --region @region --key @key --text Hello

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech synthesize --text Hello

SEE ALSO

  ai help speech setup
  ai help speech key overview
  ai help speech synthesize connection
  ai help speech synthesize region
  ai help speech synthesize

------------------------------
ai help synthesize list voices
------------------------------
SYNTHESIZE LIST VOICEs

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --voices option lists supported VOICE NAMEs, and their
  corresponding languages (locales), in BCP-47 tag format.

USAGE: ai speech synthesize [...] --voices

SEE ALSO

  ai help speech setup

----------------------
ai help synthesize log
----------------------
SYNTHESIZE LOG

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --log option specifies the name of the file into which
  to write additional log information and diagnostics. This logging is
  performed by the Speech SDK, upon which AI is built.

USAGE: ai speech synthesize [...] --log FILENAME

  NOTE: Default SDK logging uses the @log.time preset template

    diagnostics.config.log.file=log-{run.time}.log

EXAMPLES

  ai speech synthesize --text Hello --log log.log
  ai speech synthesize --file hello.ssml --log {id}.log
  ai speech synthesize --file hello.ssml --log {config.region}.log

  ai config speech @default.log --clear
  ai config speech @default.log --set @@none
  ai config speech @default.log --set log {config.region}-{id}-{run.time}.log

SEE ALSO

  ai help speech synthesize

----------------------
ai help synthesize mp3
----------------------
@synthesize.format.mp3

----------------------
ai help synthesize ogg
----------------------
@synthesize.format.ogg

-----------------------
ai help synthesize opus
-----------------------
@synthesize.format.opus

-------------------------
ai help synthesize output
-------------------------
@synthesize.audio.output

----------------------------------
ai help synthesize output examples
----------------------------------
SYNTHESIZE OUTPUT EXAMPLES

  ai speech synthesize [...] --output all input id
  ai speech synthesize [...] --output all resultid
  ai speech synthesize [...] --output all reason
  ai speech synthesize [...] --output all audio data
  ai speech synthesize [...] --output all audio length

  ai speech synthesize [...] --output each input id
  ai speech synthesize [...] --output each resultid
  ai speech synthesize [...] --output each reason
  ai speech synthesize [...] --output each audio data
  ai speech synthesize [...] --output each audio length

  ai speech synthesize [...] --output all result resultid
  ai speech synthesize [...] --output all result reason
  ai speech synthesize [...] --output all result audio data
  ai speech synthesize [...] --output all result audio length

  ai speech synthesize [...] --output each result resultid
  ai speech synthesize [...] --output each result reason
  ai speech synthesize [...] --output each result audio data
  ai speech synthesize [...] --output each result audio length

  ai speech synthesize [...] --output all events
  ai speech synthesize [...] --output each event

  ai speech synthesize [...] --output all synthesizer events
  ai speech synthesize [...] --output each synthesizer event

  ai speech synthesize [...] --output all synthesizer synthesis canceled events
  ai speech synthesize [...] --output all synthesizer synthesis canceled error
  ai speech synthesize [...] --output all synthesizer synthesis canceled error code
  ai speech synthesize [...] --output all synthesizer synthesis canceled error details
  ai speech synthesize [...] --output all synthesizer synthesis canceled reason

  ai speech synthesize [...] --output each synthesizer canceled event
  ai speech synthesize [...] --output each synthesizer canceled error
  ai speech synthesize [...] --output each synthesizer canceled error code
  ai speech synthesize [...] --output each synthesizer canceled error details
  ai speech synthesize [...] --output each synthesizer canceled reason

  ai speech synthesize [...] --output all synthesizer synthesis started events
  ai speech synthesize [...] --output all synthesizer synthesis started result resultid
  ai speech synthesize [...] --output all synthesizer synthesis started result reason
  ai speech synthesize [...] --output all synthesizer synthesis started result audio data
  ai speech synthesize [...] --output all synthesizer synthesis started result audio length

  ai speech synthesize [...] --output each synthesizer synthesis started event
  ai speech synthesize [...] --output each synthesizer synthesis started result resultid
  ai speech synthesize [...] --output each synthesizer synthesis started result reason
  ai speech synthesize [...] --output each synthesizer synthesis started result audio data
  ai speech synthesize [...] --output each synthesizer synthesis started result audio length

  ai speech synthesize [...] --output all synthesizer synthesizing events
  ai speech synthesize [...] --output all synthesizer synthesizing result resultid
  ai speech synthesize [...] --output all synthesizer synthesizing result reason
  ai speech synthesize [...] --output all synthesizer synthesizing result audio data
  ai speech synthesize [...] --output all synthesizer synthesizing result audio length

  ai speech synthesize [...] --output each synthesizer synthesizing event
  ai speech synthesize [...] --output each synthesizer synthesizing result resultid
  ai speech synthesize [...] --output each synthesizer synthesizing result reason
  ai speech synthesize [...] --output each synthesizer synthesizing result audio data
  ai speech synthesize [...] --output each synthesizer synthesizing result audio length

  ai speech synthesize [...] --output all synthesizer synthesis completed events
  ai speech synthesize [...] --output all synthesizer synthesis completed result resultid
  ai speech synthesize [...] --output all synthesizer synthesis completed result reason
  ai speech synthesize [...] --output all synthesizer synthesis completed result audio data
  ai speech synthesize [...] --output all synthesizer synthesis completed result audio length

  ai speech synthesize [...] --output each synthesizer synthesis completed event
  ai speech synthesize [...] --output each synthesizer synthesis completed result resultid
  ai speech synthesize [...] --output each synthesizer synthesis completed result reason
  ai speech synthesize [...] --output each synthesizer synthesis completed result audio data
  ai speech synthesize [...] --output each synthesizer synthesis completed result audio length

  ai speech synthesize [...] --output all file type tsv 
  ai speech synthesize [...] --output all file output.tsv
  ai speech synthesize [...] --output all tsv file has header false

  ai speech synthesize [...] --output each file type tsv
  ai speech synthesize [...] --output each file output.tsv
  ai speech synthesize [...] --output each tsv file has header false

----------------------------
ai help synthesize processes
----------------------------
SYNTHESIZE PROCESSES

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --processes option specifies the maximum number of
  sub-processes to use when parallelizing synthesis tasks.

  The --ramp processes every option can optionally be used to control
  how quickly each new sub-process will be added to the pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  processes will immediately be available to the pool.

USAGE: ai speech synthesize [...] --processes NUMBER
   OR: ai speech synthesize [...] --processes NUMBER --ramp processes every MILLISECONDS

  WHERE: NUMBER represents the maximum number of processes to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new process

EXAMPLES

  ai speech synthesize --files @filelist.txt --audio output {id}.wav --processes 5

SEE ALSO

  ai help speech synthesize
  ai help speech synthesize threads

------------------------
ai help synthesize proxy
------------------------
SYNTHESIZE PROXY

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --proxy option specifies a HTTP proxy host name. 
  The --proxy port option specifies the HTTP proxy port.

USAGE: ai speech synthesize [...] --proxy PROXY
   OR: ai speech synthesize [...] --proxy PROXY --proxy port PORT
   OR: ai speech synthesize [...] @CONFIG-FILENAME

  WHERE: PROXY represents the PROXY host (e.g. localhost)
     OR: PORT represents the PROXY port (e.g. 80, which is the default)
     OR: CONFIG-FILENAME is a multi-line text file as follows:

            connection.proxy.host=HOST
            connection.proxy.port=PORT

EXAMPLES

  ai speech synthesize --text Hello --proxy localhost --proxy port 8888

  ai config speech @fiddler --set proxy.host localhost
  ai config speech @fiddler --add proxy.port 8888

  ai speech synthesize --file hello.wav @fiddler

SEE ALSO

  ai help config
  ai help speech synthesize

----------------------
ai help synthesize raw
----------------------
@synthesize.format.raw

-------------------------
ai help synthesize region
-------------------------
SYNTHESIZE REGION

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --region option specifies the REGION for an existing resource.

  For a full list of supported regions, see https://aka.ms/speech/regions.

USAGE: ai speech synthesize [...] --region REGION
   OR: ai speech synthesize [...] --region @FILENAME
   OR: ai speech synthesize [...] @CONFIG-FILENAME

  WHERE: REGION is the region for the speech resource
     OR: FILENAME is a single line text file containing the REGION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.region=REGION

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech synthesize --nodefaults --region @region --key @key --text Hello

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech synthesize --text Hello

  ai config speech @key --set 436172626F6E20697320636F6F6C2121 --region westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2020 --region eastus
  ai speech synthesize --foreach region in eastus;westus2 --key @@key --text Hello

SEE ALSO

  ai help speech setup
  ai help speech region overview
  ai help speech synthesize connection
  ai help speech synthesize key
  ai help speech synthesize

-----------------------
ai help synthesize save
-----------------------
SYNTHESIZE SAVE

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --save option packages command line and related
  configuration data into one or more AI configuration data files
  for backup or portability to another device.

USAGE: ai speech synthesize [...] --save FILENAME

EXAMPLES

  ai speech synthesize --files *.txt --save test1.job
  ai speech synthesize --files *.txt;*.ssml --audio output {id}.wav --save test2.job
  ai speech synthesize --files @URLs.txt --output zip output.zip --save test3.job

  ai speech synthesize @test3.job

  ai speech synthesize --foreach file;audio.output in @filelist.txt --save test4.job
  ai speech synthesize @test4.job

SEE ALSO

  ai help speech synthesize
  ai help speech synthesize files
  ai help speech synthesize foreach

------------------------
ai help synthesize siren
------------------------
@synthesize.format.siren

--------------------------
ai help synthesize threads
--------------------------
SYNTHESIZE THREADS

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --threads option specifies a how many threads to use when parallelizing
  synthesis tasks.

  The --ramp threads every option can optionally be used to control
  how quickly each new thread will be added to the thread pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  threads will immediately be available to the pool.

USAGE: ai speech synthesize [...] --threads NUMBER
   OR: ai speech synthesize [...] --threads NUMBER --ramp threads every MILLISECONDS

  WHERE: NUMBER represents the maximum number of threads to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new thread

EXAMPLES

  ai speech synthesize --files *.txt;*.ssml --audio output {id}.wav --threads 5

  ai speech synthesize --foreach text in "How you doin?;Hello!;Hi." --threads 3 --ramp threads every 250

SEE ALSO

  ai help speech synthesize
  ai help speech synthesize processes

------------------------
ai help synthesize token
------------------------
SYNTHESIZE TOKEN

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --token option specifies an authentication token to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech synthesize [...] --token TOKEN
   OR: ai speech synthesize [...] --token @FILENAME
   OR: ai speech synthesize [...] @CONFIG-FILENAME

  WHERE: TOKEN is the AUTH TOKEN obtained from the issueToken endpoint
     OR: FILENAME is a single line text file containing your AUTH TOKEN
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.token=TOKEN

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @token --set bdca******789
  ai speech synthesize --nodefaults --region @region --token @token --text Hello

  ai config speech @default.config --clear
  ai config speech @default.config --add token @token
  ai config speech @default.config --add region @region
  ai speech synthesize --text Hello

SEE ALSO

  ai help speech setup
  ai help speech synthesize connection
  ai help speech synthesize region
  ai help speech synthesize

----------------------
ai help synthesize url
----------------------
@synthesize.file

-----------------------
ai help synthesize urls
-----------------------
@synthesize.files

----------------------
ai help synthesize wav
----------------------
@synthesize.format.wav

-----------------------
ai help synthesize webm
-----------------------
@synthesize.format.webm

----------------------
ai help synthesize zip
----------------------
SYNTHESIZE ZIP

  The ai speech synthesize command synthesizes audio from text or SSML.

  The --zip option packages command line and related
  configuration data along with AI and its runtime dependencies into
  a self-contained .ZIP file for backup or portability to another device.

  NOTE: --zip does not package local input files (e.g. text, SSML, etc.)

USAGE: ai speech synthesize [...] --zip FILENAME

EXAMPLES

  ai speech synthesize --files *.txt --zip test1.zip
  ai speech synthesize --files *.txt;*.ssml --audio output {id}.wav --zip test2.zip
  ai speech synthesize --files @URLs.txt --output zip output.zip --zip test3.zip

  ai speech synthesize --foreach file;audio.output in @filelist.txt --zip test4.job --zip output output.zip
  ai webjob --upload test4.zip --run

SEE ALSO

  ai help speech synthesize
  ai help speech synthesize files
  ai help speech synthesize foreach
  ai help speech webjob setup

------------------
ai help transcribe
------------------
USAGE: ai speech transcribe [...]

PREVIEW NOTE

  The Azure Conversational Transcription Service is currently in
  PREVIEW. As a result, CTS does not support all regions or languages.

    Supported regions: centralus, eastasia
    Supported languages: en-US, zh-CN

OPTIONs

  CONNECTION                      (see: ai help speech transcribe connection)
    --key KEY                     (see: ai help speech transcribe key)
    --region REGION               (see: ai help speech transcribe region)
    --endpoint URI                (see: ai help speech transcribe endpoint)
    --token VALUE                 (see: ai help speech transcribe token)

  CONVERSATION
    --conversation id ID          (see: ai help speech transcribe conversation id)

  LANGUAGE                        (see: ai help speech transcribe language)
    --source LANGUAGE             (see: ai help speech transcribe source)

  INPUT                           (see: ai help speech transcribe input)
    --file FILENAME               (see: ai help speech transcribe file)
    --files @FILELIST.txt         (see: ai help speech transcribe files)

  OUTPUT                          (see: ai help speech transcribe output)
    --output all [<item>]         (see: ai help speech transcribe output all)
    --output each [<item>]        (see: ai help speech transcribe output each)

  ADVANCED                        (see: ai help speech transcribe advanced)
    --connect                     (see: ai help speech transcribe connect)
    --log FILENAME                (see: ai help speech transcribe log)
    --proxy HOSTNAME              (see: ai help speech transcribe proxy)
    --phrases @PHRASES.txt        (see: ai help speech transcribe phrases)
    --foreach in @ITEMS.txt       (see: ai help speech transcribe foreach)
    --save FILENAME               (see: ai help speech transcribe save)
    --zip ZIPFILE                 (see: ai help speech transcribe zip)

EXAMPLE                           (see: ai help speech transcribe examples)

  ai speech transcribe --file 8-channel-audio.wav.wav

SEE ALSO

  ai help speech setup

----------------------------------
ai help transcribe conversation id
----------------------------------
TRANSCRIBE CONVERSATION ID

  Conversational Transcription runs in the context of a CONVERSATION, managed
  in Azure. You can attach to an existing conversation by supplying the
  conversation id on the command line as indicated below.

  You can also create a new conversation by simply not supplying the
  conversation id on the command line.

USAGE: ai speech transcribe [...] --conversation id CONVERSATION-ID
   OR: ai speech transcribe [...] --conversation id @FILENAME
   OR: ai speech transcribe [...] @CONFIG-FILENAME

WHERE: CONVERSATION-ID is an GUID
   OR: FILENAME is a single line text file containing the CONVERSATION-ID
   OR: CONFIG-FILENAME is a single line text file in the following form:

       conversation.id=CONVERSATION-ID

SEE ALSO

  ai help speech transcribe examples

---------------------------
ai help transcribe examples
---------------------------
TRANSCRIBE EXAMPLES

  ai config speech @region --command transcribe --set centralus
  ai config speech @key --command transcribe --region centralus --key PUT-YOUR-KEY-HERE

  ai speech transcribe --conversation id GUID --file 8-channel-audio.wav

PREVIEW NOTE

  The Azure Conversational Transcription Service is currently in
  PREVIEW. As a result, CTS does not support all regions or languages.

    Supported regions: centralus, eastasia
    Supported languages: en-US, zh-CN

ADDITIONAL TOPICS

  ai help speech transcribe

-----------------
ai help translate
-----------------
TRANSLATE

  The ai speech translate command translates streaming audio captured
  from a device microphone or stored in local or remote audio files into one
  or more languages.

USAGE: ai speech translate [...]

  CONNECTION                      (see: ai help speech translate connection)
    --key KEY                     (see: ai help speech translate key)
    --region REGION               (see: ai help speech translate region)

  LANGUAGE                        (see: ai help speech translate language)
    --source LANGUAGE
    --target LANGUAGE

  INPUT                           (see: ai help speech translate input)
    --microphone                  (see: ai help speech translate microphone)
    --file FILE                   (see: ai help speech translate file)
    --files PATTERN               (see: ai help speech translate files)
    --files @FILELIST.txt         (see: ai help speech translate files)
    --format FORMAT               (see: ai help speech translate format)

  TRANSLATION
    --once[+]                     (see: ai help speech translate once)
    --continuous                  (see: ai help speech translate continuous)
    --keyword FILENAME            (see: ai help speech translate keyword)

  ADVANCED
    --log FILENAME                (see: ai help speech translate log)
    --proxy HOSTNAME              (see: ai help speech translate proxy)
    --phrases @PHRASES.txt        (see: ai help speech translate phrases)
    --foreach in @ITEMS.txt       (see: ai help speech translate foreach)
    --threads NUMBER              (see: ai help speech translate threads)

SEE ALSO

  ai help speech setup
  ai help speech translate advanced
  ai help speech translate examples
  ai help find topics speech translate

--------------------------
ai help translate advanced
--------------------------
TRANSLATE

  The ai speech translate command translates streaming audio captured
  from a device microphone or stored in local or remote audio files into one
  or more languages.

USAGE: ai speech translate [...]

  CONNECTION                      (see: ai help speech translate connection)
    --key KEY                     (see: ai help speech translate key)
    --region REGION               (see: ai help speech translate region)
    --endpoint URI                (see: ai help speech translate endpoint)
    --token VALUE                 (see: ai help speech translate token)

  SERVICE
    --traffic type test           (see: ai help speech traffic type)
    --http header name=value      (see: ai help speech http header)
    --query string name=value     (see: ai help speech query string)
    --speech config @file.json    (see: ai help speech websocket messages)
    --speech context @file.json   (see: ai help speech websocket messages)

  LANGUAGE                        (see: ai help speech translate language)
    --source LANGUAGE             (see: ai help speech translate source)
    --target LANGUAGE             (see: ai help speech translate target)

  INPUT                           (see: ai help speech translate input)
    --microphone                  (see: ai help speech translate microphone)
    --file FILE                   (see: ai help speech translate file)
    --files PATTERN               (see: ai help speech translate files)
    --files @FILELIST.txt         (see: ai help speech translate files)
    --url URL                     (see: ai help speech translate url)
    --urls URL                    (see: ai help speech translate urls)
    --urls @URLLIST.txt           (see: ai help speech translate urls)
    --format FORMAT               (see: ai help speech translate format)
    --id url URL                  (see: ai help speech input id)
    --id ID                       (see: ai help speech input id)

  TRANSLATION
    --once[+]                     (see: ai help speech translate once)
    --continuous                  (see: ai help speech translate continuous)
    --timeout MILLISECONDS        (see: ai help speech translate continuous)
    --keyword FILENAME            (see: ai help speech translate keyword)

  ACCURACY                        (see: ai help speech translate improve accuracy)
    --endpoint id ID              (see: ai help speech translate custom speech)
    --category id CUSTOM-MT-ID    (see: ai help speech translate custom translation)
    --phrases @PHRASELIST.txt     (see: ai help speech translate phrases)

  TESTING                         (see: ai help speech translate testing)
    --transcript TEXT             (see: ai help speech translate transcript)
    --check wer NUMOP NUMBER      (see: ai help speech translate check wer)
    --check text TEXTOP TEXT      (see: ai help speech translate check text)

  OUTPUT                          (see: ai help speech translate output)
    --output all [<item>]         (see: ai help speech translate output all)
    --output each [<item>]        (see: ai help speech translate output each)
    --output batch json           (see: ai help speech translate output batch json)
    --output batch file FILENAME  (see: ai help speech translate output batch file)
    --output each file FILENAME   (see: ai help speech translate output each file)
    --output all file FILENAME    (see: ai help speech translate output all file)
    --word level timing           (see: ai help speech translate word level timing)
    --profanity OPTION            (see: ai help speech translate profanity)

  LOGGING                         (see: ai help speech translate log)
    --log FILENAME
    --content logging

  PARALLEL PROCESSING
    --threads NUMBER              (see: ai help speech translate threads)
    --processes NUMBER            (see: ai help speech translate processes)
    --repeat NUMBER
    --max NUMBER

  ADVANCED
    --connect                     (see: ai help speech translate connect)
    --disconnect                  (see: ai help speech translate disconnect)
    --proxy HOSTNAME              (see: ai help speech translate proxy)
    --property NAME=VALUE         (see: ai help speech translate property)
    --properties @PROPLIST.txt    (see: ai help speech translate properties)
    --foreach in @ITEMS.txt       (see: ai help speech translate foreach)
    --save FILENAME               (see: ai help speech translate save)
    --zip ZIPFILE                 (see: ai help speech translate zip)

SEE ALSO

  ai help speech setup
  ai help speech translate examples
  ai help find topics speech translate

-------------------------
ai help translate connect
-------------------------
TRANSLATE CONNECT

  The ai speech translate command translates streaming audio.

  The --connect option forces connection to the service
  earlier in the process to decrease overall latency.

USAGE: ai speech translate [...] --connect

EXAMPLE

  ai speech translate --file hello.wav --source en-US --target de --connect

SEE ALSO

  ai help speech translate

----------------------------
ai help translate connection
----------------------------
CONNECTION OVERVIEW

  AUTHENTICATION - KEY or TOKEN

    The Azure Speech Service requires authentication using subscriptions keys
    or authentication tokens.

    To use subscription keys see: ai help speech translate key
    To use authentication tokens see: ai help speech translate token

  CONNECTION - REGION, ENDPOINT, or HOST

    The Azure Speech Service runs in REGION specific data centers, sovereign
    clouds, or on-premise containers. For sovereign clouds and on-premise
    containers, you may need to specify the ENDPOINT or HOST directly.

    To specify a particular REGION see: ai help speech translate region
    To specify a particular ENDPOINT see: ai help speech translate endpoint
    To specify a particular HOST see: ai help speech translate host

    NOTE: Default connection uses the @connection.from.region preset template

      service.config.region=@region
      service.config.key=@key

EXAMPLES

  EXAMPLE 1: Use the westus2 region and key stored in the AI configuration

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121
    ai speech translate --file hello.wav --target de

  EXAMPLE 2: Use the westus2 region and key directly on command line

    ai speech translate --region westus2 --key 436172626F6E20697320636F6F6C2121 --file hello.wav --target de

  EXAMPLE 3: Use a specific sovereign cloud HOST on the command line

    ai speech translate --host wss://chinaeast2.s2s.speech.azure.cn --file hello.wav --target de

  EXAMPLE 4: Using a specific on-premise container HOST on the command line

    ai speech translate --key @none --host wss://localhost:5000/ --file hello.wav --target de

  EXAMPLE 5: Using a specific ENDPOINT on the command line

    ai speech translate --nodefaults --endpoint wss://westus2.s2s.speech.microsoft.com/speech/translation/cognitiveservices/v1 --target de

----------------------------
ai help translate continuous
----------------------------
TRANSLATE CONTINUOUS

  The ai speech translate command translates streaming audio.

  The --continuous option translates streaming audio continuously,
  optimized for interactive conversations and audio files.

  The --timeout option can be used to limit the amount of audio translated.
  If not specified, there is effectively no timeout.

USAGE: ai speech translate [...] --continuous
   OR: ai speech translate [...] --continuous --timeout [MILLISECONDS]

EXAMPLES

  ai speech translate --microphone --continuous --source en-US --target de
  ai speech translate --file hello.wav --continuous --timeout 30000 --source en-US --target de

SEE ALSO

  ai help speech translate once
  ai help speech translate

--------------------------
ai help translate endpoint
--------------------------
ENDPOINT OVERVIEW

  For some scenarios, use "wss://" or "ws://" instead of "https://". For a
  full list of supported endpoints, see https://aka.ms/ai/endpoints

USAGE: ai <command> [...] --endpoint "ENDPOINT"
   OR: ai <command> [...] --endpoint @FILENAME
   OR: ai <command> [...] @CONFIG-FILENAME

WHERE: ENDPOINT represents the ENDPOINT uri as text (don't forget to add quotes)
   OR: FILENAME is a single line text file containing the ENDPOINT
   OR: CONFIG-FILENAME is a single line text file in the following form:

       service.config.endpoint=wss://...

EXAMPLES

  ai complete --endpoint @my.complete.endpoint --file prompt.txt
  ai chat --endpoint @my.chat.endpoint --file prompt.txt

SEE ALSO

  ai help init

--------------------------
ai help translate examples
--------------------------
TRANSLATE EXAMPLES

  INIT: Automatically setup ai with REGION and KEY default values

    ai init

  SETUP: Manually setup ai with REGION and KEY default values

    ai config speech @region --set westus2
    ai config speech @key --set 436172626F6E20697320636F6F6C2121

  EXAMPLE 1: Translate from microphone into German
  
    ai speech translate --microphone --source en-US --target de

  EXAMPLE 2: Translate from local WAV file, or remote MP3 file

    ai speech translate --source en-US --target de --file hello.wav
    ai speech translate --source en-US --target de --file https://crbn.us/hello.mp3 --format mp3

  EXAMPLE 3: Translate multiple files using wildcards

    ai speech translate --source en-US --target de --files *.wav

  EXAMPLE 4: Improve speech recognition accuracy with phrase lists

    ai speech translate --source en-US --target de --files *.wav --phrases "Hello;Hi;Howya doin"

  EXAMPLE 5: Recognize multiple files from TSV file with file names and transcriptions

    ai speech translate --source en-US --target de --foreach file;transcript in @filelist.txt --check wer eq 0

    WHERE: filelist.txt is the filename for a file containing tab delimited content:

      audioFileName1 \t transcript1
      audioFileName2 \t transcript2

  EXAMPLE 6: Recognize multiple files from TSV file with file ids and transcriptions

    ai speech translate --source en-US --target de --foreach id;transcript in @filelist.txt --check wer eq 0

    WHERE: filelist.txt is the filename for a file containing tab delimited content:

      audioFileNameNoExtension1 \t transcript1
      audioFileNameNoExtension2 \t transcript2

ADDITIONAL TOPICS

  ai help speech setup
  ai help speech translate advanced
  ai help speech translate

----------------------
ai help translate file
----------------------
TRANSLATE FILE

  The ai speech translate command translates streaming audio.

  The --file option specifies a single local audio file to be
  streamed to the service for translation.

  The --url option specifies a single remote audio file to be
  streamed to the service for translation after first caching the audio
  locally, removing it when done.

USAGE: ai speech translate [...] --url URL
   OR: ai speech translate [...] --url @FILENAME.txt
   OR: ai speech translate [...] --file @FILEAME.txt
   OR: ai speech translate [...] --file FILE

  WHERE: URL represents a remote audio file accessible to the public
     OR: FILE represents a local audio file accessible to the current user
     OR: FILE is - indicating that audio file content will be read from STDIN
     OR: FILENAME.txt is a single line text file containing the file to stream

  NOTE: --url is an alias for --file ... both accept both files and urls

EXAMPLES

  ai speech translate --file hello.wav --source en-US --target de
  ai speech translate --url https://crbn.us/hello.wav --source en-US --target de

  echo hello.wav>file.txt
  ai speech translate --file @file.txt --source en-US --target de

SEE ALSO

  ai help speech translate files
  ai help speech translate format
  ai help speech translate input
  ai help speech translate

-----------------------
ai help translate files
-----------------------
TRANSLATE FILES

  The ai speech translate command translates streaming audio.

  The --files option specifies multiple local audio files to be
  streamed to the service for translation.

  The --urls option specifies multiple remote audio files to be
  streamed to the service for translation after first caching the audio
  locally, removing it when done.

USAGE: ai speech translate [...] --urls URL1;URL2[;...]
   OR: ai speech translate [...] --urls @FILELIST.txt
   OR: ai speech translate [...] --files @FILELIST.txt
   OR: ai speech translate [...] --files FILE1;FILE2[;...]
   OR: ai speech translate [...] --files PATTERN

  WHERE: URL1;URL2 represent remote audio files accessible to the public
     OR: FILE1;FILE2 represent local audio files accessible to the current user
     OR: PATTERN represents a local audio file wildcard search pattern
     OR: FILELIST.txt is a multi-line text file containing files and/or URLs,
         ... or PATTERNs, listed individually, each on separate lines
     
  NOTE: --urls is an alias for --files ... both accept both files and urls

EXAMPLES

  ai speech translate --files *.wav --source en-US --target de
  ai speech translate --files "hello.wav;goodbye.wav" --source en-US --target de

  ai speech translate --urls "https://crbn.us/hello.wav;https://crbn.us/goodbye.wav" --source en-US --target de

  echo hello.wav> filelist.txt
  echo goodbye.wav>> filelist.txt
  echo https://crbn.us/whatstheweatherlike.wav>> filelist.txt

  ai speech translate --files @filelist.txt --source en-US --target de

SEE ALSO

  ai help speech translate format
  ai help speech translate input
  ai help speech translate

-------------------------
ai help translate foreach
-------------------------
TRANSLATE FOREACH

  The ai speech translate command translates streaming audio.

  The --foreach option repeats a specific command multiple times
  effectively multiplying one set of command line options by another.

USAGE: ai speech translate [...] --foreach in @FILE1.tsv
   OR: ai speech translate [...] --foreach OPT1;[OPT2;[...]] in @FILE2.tsv
   OR: ai speech translate [...] --foreach OPT1;[OPT2;[...]] skip header in @FILE3.tsv

  WHERE: OPT represents a command line option (e.g. file, id, transcript)
    AND: FILE1.tsv contains tab separated values, with line1: OPT1 [\t OPT2 [\t ...]]
     OR: FILE2.tsv contains tab separated values, with data rows starting on line 1
     OR: FILE3.tsv contains tab separated values, with data rows starting on line 2

EXAMPLES

  ai speech translate --foreach file;transcript in @filelist.txt --check wer eq 0
  ai speech translate --foreach file;transcript in @filelist.txt --check translated text wer eq 0

SEE ALSO

  ai help speech translate examples
  ai help speech translate files
  ai help speech translate

------------------------
ai help translate format
------------------------
TRANSLATE FORMAT

  The ai speech translate command translates streaming audio.

  The --format option specifies the container format for the
  audio file being translated.

USAGE: ai speech translate [...] --format FORMAT

  WHERE: FORMAT is any
     OR: FORMAT is mp3
     OR: FORMAT is ogg
     OR: FORMAT is flac
     OR: FORMAT is alaw
     OR: FORMAT is opus

EXAMPLES

  ai speech translate --file audio.mp3 --format mp3
  ai speech translate --files @filelist.txt --format any

SEE ALSO

  ai help speech translate file
  ai help speech translate files
  ai help speech translate

-----------------------
ai help translate input
-----------------------
TRANSLATE INPUT OVERVIEW

  The ai speech translate command translates streaming audio.

  FROM MICROPHONE - DEFAULT DEVICE or SPECIFIC DEVICE

    The ai speech translate command can translate streaming audio captured
    from a device microphone (default microphone or specific microphone).

    To translate audio from a device MICROPHONE see: ai help speech translate microphone 

  FROM FILE - SINGLE or MULTIPLE FILES

    The ai speech translate command can also translate audio stored in local
    or remote audio files, in various audio container formats (e.g. mp3, ogg).

    To translate from a single audio FILE see: ai help speech translate file
    To translate from a multiple audio FILES see: ai help speech translate files
    To translate from file(s) in various FORMATs see: ai help speech translate format
 
EXAMPLES

  EXAMPLE 1: Translate speech from microphone
  
    ai speech translate --microphone --source en-US --target de

  EXAMPLE 2: Translate from local WAV file, or remote MP3 file

    ai speech translate --file hello.wav --source en-US --target de
    ai speech translate --file http://crbn.us/hello.mp3 --format mp3 --source en-US --target de

  EXAMPLE 3: Translate multiple files using wildcards

    ai speech translate --files *.wav --source en-US --target de

SEE ALSO

  ai help speech translate examples
  ai help speech translate

---------------------
ai help translate key
---------------------
TRANSLATION KEY

  The ai speech translate command translates streaming audio.

  The --key option specifies the subscription key to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech translate [...] --key KEY
   OR: ai speech translate [...] --key @FILENAME
   OR: ai speech translate [...] @CONFIG-FILENAME

  WHERE: KEY is the subscription key as text
     OR: FILENAME is a single line text file containing your KEY
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.key=KEY

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech translate --nodefaults --region @region --key @key --file hello.wav --target de

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech translate --file hello.wav --target de

SEE ALSO

  ai help speech setup
  ai help speech key overview
  ai help speech translate connection
  ai help speech translate region
  ai help speech translate

-------------------------
ai help translate keyword
-------------------------
TRANSLATE KEYWORD

  The ai speech translate command translates streaming audio.

  The --keyword option gates the translation of speech until
  a keyword from the specified keyword model is translated.

  Once the keyword is recognized, the next phrase in the speech stream will
  also be translated, after which the system will once again gate speech
  translation until the keyword is recognized again.

  The --timeout option can be used to limit the amount of audio translated.
  If not specified, there is effectively no timeout.

USAGE: ai speech translate [...] --keyword KEYWORD-MODEL
   OR: ai speech translate [...] --keyword KEYWORD-MODEL --timeout [MILLISECONDS]

EXAMPLES

  ai speech translate --microphone --continuous
  ai speech translate --file hello.wav --continuous --timeout 30000

SEE ALSO

  ai help speech translate

--------------------------
ai help translate language
--------------------------
TRANSLATE LANGUAGE

  The ai speech translate command translates streaming audio.

  The --source and --target language options are used to specify the
  spoken source language and translation target languages in BCP-47 format.
  Speech streamed to the service will be forced to match words and phrases
  in the specified SOURCE language, then translated to the TARGET languages.

  For a full list of supported languages, see https://aka.ms/speech/languages

  If no language is specified, the default will be en-US.

USAGE: ai speech translate [...] --source LANGUAGE
  AND: ai speech translate [...] --target LANGUAGE1[;LANGUAGE2[;...]]
   OR: ai speech translate [...] --source @LANGUAGE.txt
   OR: ai speech translate [...] --target @LANGUAGES.txt

  WHERE: LANGUAGE is a supported BCP-47 language tag (e.g. en-US)
     OR: LANGUAGE.txt is a single line text file containing one language
     OR: LANGUAGES.txt is a multi-line text file, with one language per line

EXAMPLES

  ai speech translate --source en-US --file english.wav --target de
  ai speech translate --source de-DE --file german.wav --target en
  ai speech translate --source en-US --files *.wav --target en;de;fr

SEE ALSO

  ai help speech translate

---------------------
ai help translate log
---------------------
TRANSLATE LOG

  The ai speech translate command translates streaming audio.

  The --log option specifies the name of the file into which
  to write additional log information and diagnostics. This logging is
  performed by the Speech SDK, upon which AI is built.

  The --content logging enabled option enables service level logging
  of the audio content and translation results.

USAGE: ai speech translate [...] --log FILENAME
   OR: ai speech translate [...] --content logging enabled

  NOTE: Default SDK logging uses the @log.time preset template

    diagnostics.config.log.file=log-{run.time}.log

EXAMPLES

  ai speech translate --file hello.wav --log log.log --source en-US --target de
  ai speech translate --file hello.wav --log {id}.log --source en-US --target de
  ai speech translate --file hello.wav --log {config.region}.log --source en-US --target de

  ai speech translate --file hello.wav --content logging enabled --source en-US --target de

  ai config speech @default.log --clear
  ai config speech @default.log --set @@none
  ai config speech @default.log --set log {config.region}-{id}-{run.time}.log
  ai config speech @default.log --add content.logging.enabled true

SEE ALSO

  ai help speech translate

----------------------------
ai help translate microphone
----------------------------
TRANSLATE MICROPHONE

  The ai speech translate command translates streaming audio.

  The --microphone option specifies use of a microphone.

USAGE: ai speech translate [...] --microphone
   OR: ai speech translate [...] --microphone DEVICE-ID

  WHERE: DEVICE-ID represents a specific microphone device

  For full list of DEVICE-IDs, see https://aka.ms/speech/sdk/device-ids

SEE ALSO

  ai help speech translate
  ai help speech translate input

----------------------
ai help translate once
----------------------
TRANSLATE ONCE

  The ai speech translate command translates streaming audio.

  The --once option translates the first phrase in an audio stream,
  optimized for interactive use cases.

  The --once+ option repeatedly translates phrases in an audio
  stream, optimized for non-interactive use cases.

USAGE: ai speech translate [...] --once

EXAMPLES

  ai speech translate --microphone --once --source en-US --target de
  ai speech translate --file hello.wav --once+ --source en-US --target de

SEE ALSO

  ai help speech translate
  ai help speech translate continuous

------------------------
ai help translate output
------------------------
TRANSLATE OUTPUT

  The ai speech translate command translates streaming audio.

  Translation output approaches:
  (1) Per event output - Specified ITEMs are accumulated and output per event
  (2) Combined output - Specified ITEMs are accumulated and output per audio stream
  (3) Batch output - Translation output is similar to ai speech batch transcriptions
  
  For (1) and (2), one or more ITEMs from a large set of items may be chosen
  to output, in either JSON or TSV format.

  For (3), a fixed set of ITEMs are output, both combined and segmented by
  service determined utterance boundaries, as well as some stream summary
  information.

  (1) To use per event output, see: ai help speech translate output each
  (2) To use combined output, see: ai help speech translate output all
  (3) To use batch output, see ai help speech translate output batch

EXAMPLES

  ai speech translate --file hello.wav --source en-US --target de --output all id --output all sessionid --output all text
  ai speech translate --once --source en-US --target de --output each event --output all sessionid --output each text
  ai speech translate --once --source en-US --target de --output batch json --output batch file my.output.json

  ai config speech @default.output --clear
  ai config speech @default.output --add output.all.id true
  ai config speech @default.output --add output.all.sessionid true
  ai config speech @default.output --add output.all.text true

SEE ALSO

  ai help config
  ai help speech batch transcription
  ai help speech translate

----------------------------
ai help translate output all
----------------------------
TRANSLATE OUTPUT ALL

  The ai speech translate command translates streaming audio.

  The --output all option specifies an ITEM to accumulate and
  aggregate into a TSV or JSON output file, combined across all events.

  The --output all file option specifies the output filename. 

  The --output all file type option specifies the output file type,
  either JSON or TSV (tab separated values). If no file type is provided,
  the output file will be TSV by default.

USAGE: ai speech translate [...] --output all ITEM
   OR: ai speech translate [...] --output all file FILENAME
   OR: ai speech translate [...] --output all file type TYPE

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

  NOTE: Default output uses the @output.all.standard preset template

    output.all.audio.input.id=true
    output.all.translator.session.started.sessionid=true
    output.all.translator.translated.result.text=true

EXAMPLES

  ai speech translate --once --output all text
  ai speech translate --once --output all text --output all file output.tsv
  ai speech translate --once --output all text --output all file type json

  ai config speech @default.output --set @@output.all.standard
  ai config speech @default.output --set @@output.all.detailed
  ai config speech @default.output --set @@output.all.latency
  ai config speech @default.output --set @@output.all.transcript.display
  ai config speech @default.output --set @@output.all.transcript.lexical

  ai config speech @default.output --add @@translate.output.all.translated.text

  ai config speech @default.output --clear
  ai config speech @default.output --add output.all.id true
  ai config speech @default.output --add output.all.sessionid true
  ai config speech @default.output --add output.all.text true
  ai config speech @default.output --add output.all.result.translated.text true

SEE ALSO

  ai help speech translate output overview
  ai help speech translate output examples
  ai help speech translate

-----------------------------
ai help translate output each
-----------------------------
TRANSLATE OUTPUT EACH

  The ai speech translate command translates streaming audio.

  The --output each option specifies an ITEM to accumulate and
  aggregate into a TSV or JSON output file, one ITEM per event.

  The --output each file option specifies the output filename. 

  The --output each file type option specifies the output file type,
  either JSON or TSV (tab separated values). If no file type is provided,
  the output file will be TSV by default.

USAGE: ai speech translate [...] --output each ITEM
   OR: ai speech translate [...] --output each file FILENAME
   OR: ai speech translate [...] --output each file type TYPE

   WHERE: FILENAME represents a local text file writable by the current user
     OR: FILE is - represents STDOUT, where TSV or JSON data will be saved

  NOTE: By default, nothing is output per event

EXAMPLES

  ai speech translate --once --output each text
  ai speech translate --once --output each event --output each text
  ai speech translate --once --output each text --output each file output.tsv

  ai config speech @default.output --set @@output.each.event
  ai config speech @default.output --set @@output.each.detailed
  ai config speech @default.output --set @@output.each.latency

  ai config speech @default.output --add @@translate.output.each.translated.text

  ai config speech @default.output --clear
  ai config speech @default.output --add output.each.sessionid true
  ai config speech @default.output --add output.each.event true
  ai config speech @default.output --add output.each.text true
  ai config speech @default.output --add output.each.result.translated.text true
  ai config speech @default.output --add output.each.latency true
  ai config speech @default.output --add @output.all.standard

SEE ALSO

  ai help speech translate output overview
  ai help speech translate output examples
  ai help speech translate

---------------------------------
ai help translate output examples
---------------------------------
TRANSLATE OUTPUT EXAMPLES

  ai speech translate [...] --output all audio id
  ai speech translate [...] --output all sessionid
  ai speech translate [...] --output all resultid
  ai speech translate [...] --output all reason
  ai speech translate [...] --output all text
  ai speech translate [...] --output all itn text
  ai speech translate [...] --output all lexical text
  ai speech translate [...] --output all offset
  ai speech translate [...] --output all duration
  ai speech translate [...] --output all latency
  ai speech translate [...] --output all json

  ai speech translate [...] --output each audio id
  ai speech translate [...] --output each sessionid
  ai speech translate [...] --output each resultid
  ai speech translate [...] --output each reason
  ai speech translate [...] --output each text
  ai speech translate [...] --output each itn text
  ai speech translate [...] --output each lexical text
  ai speech translate [...] --output each offset
  ai speech translate [...] --output each duration
  ai speech translate [...] --output each latency
  ai speech translate [...] --output each json

  ai speech translate [...] --output all result resultid
  ai speech translate [...] --output all result reason
  ai speech translate [...] --output all result text
  ai speech translate [...] --output all result translated text
  ai speech translate [...] --output all result translated TARGET-LANGUAGE text
  ai speech translate [...] --output all result offset
  ai speech translate [...] --output all result duration
  ai speech translate [...] --output all result latency
  ai speech translate [...] --output all result json

  ai speech translate [...] --output each result resultid
  ai speech translate [...] --output each result reason
  ai speech translate [...] --output each result text
  ai speech translate [...] --output each result translated text
  ai speech translate [...] --output each result translated TARGET-LANGUAGE text
  ai speech translate [...] --output each result offset
  ai speech translate [...] --output each result duration
  ai speech translate [...] --output each result latency
  ai speech translate [...] --output each result json

  ai speech translate [...] --output all events
  ai speech translate [...] --output all event sessionid

  ai speech translate [...] --output each event
  ai speech translate [...] --output each event sessionid

  ai speech translate [...] --output all connection events
  ai speech translate [...] --output all connection event sessionid
  ai speech translate [...] --output all connection connected events
  ai speech translate [...] --output all connection connected sessionid
  ai speech translate [...] --output all connection disconnected events
  ai speech translate [...] --output all connection disconnected sessionid

  ai speech translate [...] --output each connection event
  ai speech translate [...] --output each connection event sessionid
  ai speech translate [...] --output each connection connected event
  ai speech translate [...] --output each connection connected sessionid
  ai speech translate [...] --output each connection disconnected event
  ai speech translate [...] --output each connection disconnected sessionid

  ai speech translate [...] --output all translator events
  ai speech translate [...] --output all translator event sessionid

  ai speech translate [...] --output each translator event
  ai speech translate [...] --output each translator event sessionid

  ai speech translate [...] --output all translator session events
  ai speech translate [...] --output all translator session event sessionid
  ai speech translate [...] --output all translator session started events
  ai speech translate [...] --output all translator session started sessionid
  ai speech translate [...] --output all translator session stopped events
  ai speech translate [...] --output all translator session stopped sessionid

  ai speech translate [...] --output each translator session event
  ai speech translate [...] --output each translator session event sessionid
  ai speech translate [...] --output each translator session started event
  ai speech translate [...] --output each translator session started sessionid
  ai speech translate [...] --output each translator session stopped event
  ai speech translate [...] --output each translator session stopped sessionid

  ai speech translate [...] --output all connection message received events
  ai speech translate [...] --output all connection message received binary message
  ai speech translate [...] --output all connection message received binary message size
  ai speech translate [...] --output all connection message received content type
  ai speech translate [...] --output all connection message received is binary message
  ai speech translate [...] --output all connection message received is text message
  ai speech translate [...] --output all connection message received path
  ai speech translate [...] --output all connection message received request id
  ai speech translate [...] --output all connection message received text message

  ai speech translate [...] --output each connection message received event
  ai speech translate [...] --output each connection message received binary message
  ai speech translate [...] --output each connection message received binary message size
  ai speech translate [...] --output each connection message received content type
  ai speech translate [...] --output each connection message received is binary message
  ai speech translate [...] --output each connection message received is text message
  ai speech translate [...] --output each connection message received path
  ai speech translate [...] --output each connection message received request id
  ai speech translate [...] --output each connection message received text message

  ai speech translate [...] --output all translator canceled events
  ai speech translate [...] --output all translator canceled error
  ai speech translate [...] --output all translator canceled error code
  ai speech translate [...] --output all translator canceled error details
  ai speech translate [...] --output all translator canceled reason

  ai speech translate [...] --output each translator canceled event
  ai speech translate [...] --output each translator canceled error
  ai speech translate [...] --output each translator canceled error code
  ai speech translate [...] --output each translator canceled error details
  ai speech translate [...] --output each translator canceled reason

  ai speech translate [...] --output all translator translated events
  ai speech translate [...] --output all translator translated sessionid
  ai speech translate [...] --output all translator translated result resultid
  ai speech translate [...] --output all translator translated result reason
  ai speech translate [...] --output all translator translated result text
  ai speech translate [...] --output all translator translated result translated text
  ai speech translate [...] --output all translator translated result translated TARGET-LANGUAGE text
  ai speech translate [...] --output all translator translated result itn text
  ai speech translate [...] --output all translator translated result lexical text
  ai speech translate [...] --output all translator translated result offset
  ai speech translate [...] --output all translator translated result duration
  ai speech translate [...] --output all translator translated result latency
  ai speech translate [...] --output all translator translated result json

  ai speech translate [...] --output each translator translated event
  ai speech translate [...] --output each translator translated sessionid
  ai speech translate [...] --output each translator translated result resultid
  ai speech translate [...] --output each translator translated result reason
  ai speech translate [...] --output each translator translated result text
  ai speech translate [...] --output each translator translated result itn text
  ai speech translate [...] --output each translator translated result lexical text
  ai speech translate [...] --output each translator translated result offset
  ai speech translate [...] --output each translator translated result duration
  ai speech translate [...] --output each translator translated result latency
  ai speech translate [...] --output each translator translated result json

  ai speech translate [...] --output all translator recognizing events
  ai speech translate [...] --output all translator recognizing sessionid
  ai speech translate [...] --output all translator recognizing result resultid
  ai speech translate [...] --output all translator recognizing result reason
  ai speech translate [...] --output all translator recognizing result text
  ai speech translate [...] --output all translator recognizing result translated text
  ai speech translate [...] --output all translator recognizing result translated TARGET-LANGUAGE text
  ai speech translate [...] --output all translator recognizing result offset
  ai speech translate [...] --output all translator recognizing result duration
  ai speech translate [...] --output all translator recognizing result latency
  ai speech translate [...] --output all translator recognizing result json

  ai speech translate [...] --output each translator recognizing event
  ai speech translate [...] --output each translator recognizing sessionid
  ai speech translate [...] --output each translator recognizing result resultid
  ai speech translate [...] --output each translator recognizing result reason
  ai speech translate [...] --output each translator recognizing result text
  ai speech translate [...] --output each translator recognizing result translated text
  ai speech translate [...] --output each translator recognizing result translated TARGET-LANGUAGE text
  ai speech translate [...] --output each translator recognizing result offset
  ai speech translate [...] --output each translator recognizing result duration
  ai speech translate [...] --output each translator recognizing result latency
  ai speech translate [...] --output each translator recognizing result json

  ai speech translate [...] --output all file type json
  ai speech translate [...] --output all file output.json

  ai speech translate [...] --output each file type json
  ai speech translate [...] --output each file output.json

  ai speech translate [...] --output all file type tsv 
  ai speech translate [...] --output all file output.tsv
  ai speech translate [...] --output all tsv file has header false

  ai speech translate [...] --output each file type tsv
  ai speech translate [...] --output each file output.tsv
  ai speech translate [...] --output each tsv file has header false

-------------------------
ai help translate phrases
-------------------------
TRANSLATE PHRASEs

  The ai speech translate command translates streaming audio.

  The --phrases option increases speech recognition accuracy
  by supplying one or more words or phrases that are likely to appear
  in the streaming audio. 

USAGE: ai speech translate [...] --phrases "PHRASE1;"
   OR: ai speech translate [...] --phrases "PHRASE1;PHRASE2[;...]
   OR: ai speech translate [...] --phrases @PHRASELIST.txt

  WHERE: PHRASE represents one or more words that might appear in the audio
     OR: PHRASELIST.txt is a multi-line text file containing one or more
         ... PHRASEs, listed individually, each on separate lines
     
EXAMPLES

  ai speech translate --file hello.wav --phrases "Hello;Hi;Howya doin" --source en-US --target de

  echo Hello> phrases.txt
  echo Hi>> phrases.txt
  echo Howya doin>> phrases.txt

  ai speech translate --file hello.wav --phrases @phrases.txt --source en-US --target de

SEE ALSO

  ai help speech translate custom speech
  ai help speech translate

---------------------------
ai help translate processes
---------------------------
TRANSLATE PROCESSES

  The ai speech translate command translates streaming audio.

  The --processes option specifies the maximum number of
  sub-processes to use when parallelizing translation tasks.

  The --ramp processes every option can optionally be used to control
  how quickly each new sub-process will be added to the pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  processes will immediately be available to the pool.

USAGE: ai speech translate [...] --processes NUMBER
   OR: ai speech translate [...] --processes NUMBER --ramp processes every MILLISECONDS

  WHERE: NUMBER represents the maximum number of processes to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new process

EXAMPLES

  ai speech translate --files @filelist.txt --processes 10
  ai speech translate --files *.wav --processes 20 --ramp processes every 30000

SEE ALSO

  ai help speech translate
  ai help speech translate threads

-----------------------
ai help translate proxy
-----------------------
TRANSLATE PROXY

  The ai speech translate command translates streaming audio.

  The --proxy option specifies a HTTP proxy host name. 
  The --proxy port option specifies the HTTP proxy port.

USAGE: ai speech translate [...] --proxy PROXY
   OR: ai speech translate [...] --proxy PROXY --proxy port PORT
   OR: ai speech translate [...] @CONFIG-FILENAME

  WHERE: PROXY represents the PROXY host (e.g. localhost)
     OR: PORT represents the PROXY port (e.g. 80, which is the default)
     OR: CONFIG-FILENAME is a multi-line text file as follows:

            connection.proxy.host=HOST
            connection.proxy.port=PORT

EXAMPLES

  ai speech translate --file hello.wav --proxy localhost --proxy port 8888 --source en-US --target de

  ai config speech @fiddler --set proxy.host localhost
  ai config speech @fiddler --add proxy.port 8888

  ai speech translate --file hello.wav @fiddler --source en-US --target de

SEE ALSO

  ai help config
  ai help speech translate

------------------------
ai help translate region
------------------------
TRANSLATE REGION

  The ai speech translate command translates streaming audio.

  The --region option specifies the REGION for an existing resource.

  For a full list of supported regions, see https://aka.ms/speech/regions.

USAGE: ai speech translate [...] --region REGION
   OR: ai speech translate [...] --region @FILENAME
   OR: ai speech translate [...] @CONFIG-FILENAME

  WHERE: REGION is the region for the speech resource
     OR: FILENAME is a single line text file containing the REGION
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.region=REGION

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2121
  ai speech translate --nodefaults --region @region --key @key --file hello.wav --target de

  ai config speech @default.config --clear
  ai config speech @default.config --add key @key
  ai config speech @default.config --add region @region
  ai speech translate --file hello.wav --target de

  ai config speech @key --set 436172626F6E20697320636F6F6C2121 --region westus2
  ai config speech @key --set 436172626F6E20697320636F6F6C2020 --region eastus
  ai speech translate --foreach region in eastus;westus2 --key @@key --file hello.wav --target de

SEE ALSO

  ai help speech setup
  ai help speech region overview
  ai help speech translate connection
  ai help speech translate key
  ai help speech translate

----------------------
ai help translate save
----------------------
TRANSLATE SAVE

  The ai speech translate command translates streaming audio.

  The --save option packages command line and related
  configuration data into one or more AI configuration data files
  for backup or portability to another device.

USAGE: ai speech translate [...] --save FILENAME

EXAMPLES

  ai speech translate --files *.wav --source en-US --target de --save test1.job
  ai speech translate --files *.wav --log {id}.log --source en-US --target de --save test2.job
  ai speech translate --files @URLs.txt --output zip output.zip --source en-US --target de --save test3.job

  ai speech translate --foreach file;transcript in @items.txt --source en-US --target de --save test4.job
  ai speech translate @test4.job

SEE ALSO

  ai help speech translate
  ai help speech translate files
  ai help speech translate foreach
  ai help speech webjob setup

-------------------------
ai help translate threads
-------------------------
TRANSLATE THREADS

  The ai speech translate command translates streaming audio.

  The --threads option specifies a how many threads to use when parallelizing 
  translation tasks.

  The --ramp threads every option can optionally be used to control
  how quickly each new thread will be added to the thread pool. If this option
  is not specified, the default will be 0 ms, and thus the maximum number of
  threads will immediately be available to the pool.

USAGE: ai speech translate [...] --threads NUMBER
   OR: ai speech translate [...] --threads NUMBER --ramp threads every MILLISECONDS

  WHERE: NUMBER represents the maximum number of threads to use/pool
    AND: MILLISECONDS represents the number of milliseconds to wait before
         ... adding each new thread

EXAMPLES

  ai speech translate --files @filelist.txt --source en-US --target de --threads 10
  ai speech translate --files *.wav --source en-US --target de --threads 20 --ramp threads every 30000

SEE ALSO

  ai help speech translate
  ai help speech translate processes

-----------------------
ai help translate token
-----------------------
TRANSLATE TOKEN

  The ai speech translate command translates streaming audio.

  The --token option specifies an authentication token to use
  to authenticate, authorize, meter, and bill Azure resources and accounts.

USAGE: ai speech translate [...] --token TOKEN
   OR: ai speech translate [...] --token @FILENAME
   OR: ai speech translate [...] @CONFIG-FILENAME

  WHERE: TOKEN is the AUTH TOKEN obtained from the issueToken endpoint
     OR: FILENAME is a single line text file containing your AUTH TOKEN
     OR: CONFIG-FILENAME is a single line text file in the following form:

            service.config.token=TOKEN

EXAMPLES

  ai config speech @region --set westus2
  ai config speech @token --set bdca******789
  ai speech translate --nodefaults --region @region --token @token --file hello.wav --source en-US --target de

  ai config speech @default.config --clear
  ai config speech @default.config --add token @token
  ai config speech @default.config --add region @region
  ai speech translate --file hello.wav --source en-US --target de

SEE ALSO

  ai help speech setup
  ai help speech translate connection
  ai help speech translate region
  ai help speech translate

---------------------
ai help translate url
---------------------
@translate.file

----------------------
ai help translate urls
----------------------
@translate.files

-----------------------------------
ai help translate word level timing
-----------------------------------
TRANSLATE WORD LEVEL TIMING

  The ai speech translate command translates streaming audio.

  The --word level timing option requests word level timing
  details in translation results.

USAGE: ai speech translate [...] --word level timing
   OR: ai speech translate [...] @CONFIG-FILENAME

  WHERE: CONFIG-FILENAME is a single line text file in the following form:

      service.output.config.word.level.timing=true

EXAMPLE

  ai speech translate --file hello.wav --word level timing --output json

SEE ALSO

  see help translate output json
  ai help speech translate

---------------------
ai help translate zip
---------------------
TRANSLATE ZIP

  The ai speech translate command translates streaming audio.

  The --zip option packages command line and related
  configuration data along with AI and its runtime dependencies into
  a self-contained .ZIP file for backup or portability to another device.

  NOTE: --zip does not package local input files (e.g. audio, models, etc.)

USAGE: ai speech translate [...] --zip FILENAME

EXAMPLES

  ai speech translate --files *.wav --source en-US --target de --zip test1.zip
  ai speech translate --files *.wav --log {id}.log --source en-US --target de --zip test2.zip
  ai speech translate --foreach file;transcript in @items.txt --source en-US --target de --zip test3.zip

  ai speech translate --files @URLs.txt --output zip output.zip --source en-US --target de --zip test4.zip
  ai webjob --upload test4.zip --run

SEE ALSO

  ai help speech translate
  ai help speech translate files
  ai help speech translate foreach
  ai help speech webjob setup


