The following is an `ai test` framework YAML file describing tests for various `ai` CLI capabilities

```yaml
- area: ai init
  tags: [before]
  tests:
  - name: ai init openai deployments
    command: ai init openai deployments
    arguments:
      subscription: e72e5254-f265-4e95-9bd2-9ee8e7329051
      name: robch-oai-eastus2
      chat-deployment-name: gpt-4-32k-0613
      embeddings-deployment-name: text-embedding-ada-002-2
      evaluation-deployment-name: gpt-4-32k-0613
      interactive: false

- name: test ai chat
  command: ai chat --question "Why is the sky blue, what's it called" --index-name @none
  expect-regex: Rayleigh

- name: test ai chat built in functions
  command: ai chat --interactive --built-in-functions
  input: |
    Create a file named "test.txt" with the following content: "Hello, World!"
    What text files are in the current directory?
    Show me what's in the file "test.txt"
    exit
  expect-regex: |
    assistant-function: CreateFileAndSaveText
    assistant-function: FindAllFilesMatchingPattern
    test.txt
    Hello, World!

- name: dev new environment
  command: ai dev new .env

- class: dev new helper-functions
  steps:
  - name: generate template
    command: ai dev new helper-functions --instructions "Create a helper function named GetPersonsAge that returns ages of people; John is 55; Jane is 53; everyone else, return unknown"
  - name: build template
    bash: |
      cd helper-functions
      dotnet build
  - name: run template
    command: ai chat --interactive --helper-functions helper-functions/bin/Debug/net8.0/HelperFunctionsProject.dll
    input: |
      What is my name?
      How old is John?
      How old is Jane?
      How old is Bob?
      exit
    expect-regex: |
      assistant-function: GetUsersName\({}\) =
      assistant-function: GetPersonsAge\({
      John
      }\) =
      55
      assistant-function: GetPersonsAge\({
      Jane
      }\) =
      53
      [Uu]nknown

- area: ai dev new openai-chat (key)
  tests:

  - class: dev new openai-chat (c#)
    steps:
    - name: generate template
      command: ai dev new openai-chat --cs
    - name: build template
      bash: |
        cd openai-chat-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "openai-chat-cs/bin/Debug/net8.0/OpenAIChatCompletions"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      expect: |
        The output should contain exactly two jokes.

  - class: dev new openai-chat (go)
    steps:
    - name: generate template
      command: ai dev new openai-chat --go
    - name: build template
      bash: |
        cd openai-chat-go
        go mod tidy
        go build
    - name: run template
      command: ai dev shell --bash "openai-chat-go/openai_chat_completions_hello_world"
      input: |-
        Tell me a joke
        Tell me another joke
        exit

  - class: dev new openai-chat (java)
    steps:
    - name: generate template
      command: ai dev new openai-chat --java
    - name: restore packages
      bash: |
        cd openai-chat-java
        mvn clean package
    - name: build template
      bash: |
        cd openai-chat-java
        javac -cp "target/lib/*" src/OpenAIChatCompletionsClass.java src/Main.java -d out
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-chat-java
          if [ -f /etc/os-release ]; then
            java -cp "out:target/lib/*" Main
          else
            java -cp "out;target/lib/*" Main
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit

  - class: dev new openai-chat (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat --javascript
    - name: install dependencies
      bash: |
        cd openai-chat-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-js;node Main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit

  - class: dev new openai-chat (python)
    steps:
    - name: generate template
      command: ai dev new openai-chat --python
    - name: install requirements
      bash: |
        cd openai-chat-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-chat-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 openai_chat_completions.py
          else
            source env/Scripts/activate
            python openai_chat_completions.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit

- area: ai dev new openai-chat (aad)
  tests:

  - class: dev new openai-chat (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-chat-js-aad
    - name: install dependencies
      bash: |
        cd openai-chat-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-js-aad;node Main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-chat (oai)
  tests:

  - class: dev new openai-chat (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-chat-js-oai
    - name: install dependencies
      bash: |
        cd openai-chat-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-js-oai;node Main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-chat-streaming (key)
  tests:

  - class: dev new openai-chat-streaming (c#)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming --cs
    - name: build template
      bash: |
        cd openai-chat-streaming-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "openai-chat-streaming-cs/bin/Debug/net8.0/OpenAIChatCompletionsStreaming"
      input: |-
        Tell me a joke
        Tell me another joke
        exit

  - class: dev new openai-chat-streaming (go)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming --go
    - name: build template
      bash: |
        cd openai-chat-streaming-go
        go mod tidy
        go build
    - name: run template
      command: ai dev shell --bash "openai-chat-streaming-go/openai_chat_completions_streaming_hello_world"
      input: |-
        Tell me a joke
        Tell me another joke
        exit

  - class: dev new openai-chat-streaming (java)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming --java
    - name: restore packages
      bash: |
        cd openai-chat-streaming-java
        mvn clean package
    - name: build template
      bash: |
        cd openai-chat-streaming-java
        javac -cp "target/lib/*" src/OpenAIChatCompletionsStreamingClass.java src/Main.java -d out
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-chat-streaming-java
          if [ -f /etc/os-release ]; then
            java -cp "out:target/lib/*" Main
          else
            java -cp "out;target/lib/*" Main
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit

    command: ai dev new openai-chat-streaming --java

  - class: dev new openai-chat-streaming (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming --javascript
    - name: install dependencies
      bash: |
        cd openai-chat-streaming-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-js;node Main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit

  - class: dev new openai-chat-streaming (python)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming --python
    - name: install requirements
      bash: |
        cd openai-chat-streaming-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-chat-streaming-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit

- area: ai dev new openai-chat-streaming (aad)
  tests:

  - class: dev new openai-chat-streaming (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-chat-streaming-js-aad
    - name: install dependencies
      bash: |
        cd openai-chat-streaming-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-js-aad;node Main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-chat-streaming (oai)
  tests:

  - class: dev new openai-chat-streaming (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-chat-streaming-js-oai
    - name: install dependencies
      bash: |
        cd openai-chat-streaming-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-js-oai;node Main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-chat-streaming-with-data
  tests:

  - class: dev new openai-chat-streaming-with-data (c#)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-data --cs
    - name: build template
      bash: |
        cd openai-chat-streaming-with-data-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "openai-chat-streaming-with-data-cs/bin/Debug/net8.0/OpenAIChatCompletionsWithDataStreaming"
      input: |-
        What parameter should i use to select my resources?
        exit
      tag: skip

  - class: dev new openai-chat-streaming-with-data (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-data --javascript
    - name: install dependencies
      bash: |
        cd openai-chat-streaming-with-data-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-with-data-js;node Main.js"
      input: |-
        What parameter should i use to select my resources?
        exit
      tag: skip

  - class: dev new openai-chat-streaming-with-data (python)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-data --python
    - name: install requirements
      bash: |
        cd openai-chat-streaming-with-data-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-chat-streaming-with-data-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        What parameter should i use to select my resources?
        exit
      tag: skip

  - class: dev new openai-chat-streaming-with-data (go)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-data --go
    - name: build template
      script: |
        cd openai-chat-streaming-with-data-go
        go mod tidy
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-with-data-go;go run ./main.go ./openai_chat_completions_streaming_with_data_hello_world.go"
      input: |-
        What parameter should i use to select my resources?
        exit
      tag: skip

- area: ai dev new openai-chat-streaming-with-functions (key)
  tests:

  - class: dev new openai-chat-streaming-with-functions (c#)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-functions --cs
    - name: build template
      bash: |
        cd openai-chat-streaming-with-functions-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-with-functions-cs;./bin/Debug/net8.0/OpenAIChatCompletionsFunctionsStreaming"
      input: |-
        What is the date?
        What is the time?
        exit

  - class: dev new openai-chat-streaming-with-functions (go)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-functions --go
    - name: build template
      bash: |
        cd openai-chat-streaming-with-functions-go
        go mod tidy
        go build
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-with-functions-go;./openai_chat_completions_functions_streaming_hello_world"
      input: |-
        What is the date?
        What is the time?
        exit

  - class: dev new openai-chat-streaming-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-functions --javascript
    - name: install dependencies
      bash: |
        cd openai-chat-streaming-with-functions-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-with-functions-js;node Main.js"
      input: |-
        What is the date?
        What is the time?
        exit

  - class: dev new openai-chat-streaming-with-functions (python)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-functions --python
    - name: install requirements
      bash: |
        cd openai-chat-streaming-with-functions-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-chat-streaming-with-functions-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        What is the date?
        What is the time?
        exit

- area: ai dev new openai-chat-streaming-with-functions (aad)
  tests:

  - class: dev new openai-chat-streaming-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-functions --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-chat-streaming-with-functions-js-aad
    - name: install dependencies
      bash: |
        cd openai-chat-streaming-with-functions-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-with-functions-js-aad;node Main.js"
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

- area: ai dev new openai-chat-streaming-with-functions (oai)
  tests:

  - class: dev new openai-chat-streaming-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-streaming-with-functions --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-chat-streaming-with-functions-js-oai
    - name: install dependencies
      bash: |
        cd openai-chat-streaming-with-functions-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-chat-streaming-with-functions-js-oai;node Main.js"
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

- area: ai dev new openai-chat-webpage (key)
  tests:

  - class: dev new openai-chat-webpage (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage --javascript
    - name: install dependencies
      bash: |
        cd openai-chat-webpage-js
        npm install
    - name: pack template
      bash: |
        cd openai-chat-webpage-js
        ai dev new .env
        npm run webpack

  - class: dev new openai-chat-webpage (typescript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage --typescript
    - name: install dependencies
      bash: |
        cd openai-chat-webpage-ts
        npm install
    - name: pack template
      bash: |
        cd openai-chat-webpage-ts
        ai dev new .env
        npm run webpack

- area: ai dev new openai-chat-webpage (aad)
  tests:

  - class: dev new openai-chat-webpage (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-chat-webpage-js-aad
    - name: install dependencies
      bash: |
        cd openai-chat-webpage-js-aad
        npm install
    - name: pack template
      bash: |
        cd openai-chat-webpage-js-aad
        ai dev new .env
        npm run webpack

- area: ai dev new openai-chat-webpage (oai)
  tests:

  - class: dev new openai-chat-webpage (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-chat-webpage-js-oai
    - name: install dependencies
      bash: |
        cd openai-chat-webpage-js-oai
        npm install
    - name: pack template
      bash: |
        cd openai-chat-webpage-js-oai
        ai dev new .env
        npm run webpack

- area: ai dev new openai-chat-webpage-with-functions (key)
  tests:

  - class: dev new openai-chat-webpage-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage-with-functions --javascript  
    - name: install dependencies  
      bash: |
        cd openai-chat-webpage-with-functions-js
        npm install
    - name: pack template 
      bash: |
        cd openai-chat-webpage-with-functions-js
        ai dev new .env
        npm run webpack

  - class: dev new openai-chat-webpage-with-functions (typescript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage-with-functions --typescript
    - name: install dependencies
      bash: |
        cd openai-chat-webpage-with-functions-ts
        npm install
    - name: pack template
      bash: |
        cd openai-chat-webpage-with-functions-ts
        ai dev new .env
        npm run webpack

- area: ai dev new openai-chat-webpage-with-functions (aad)
  tests:

  - class: dev new openai-chat-webpage-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage-with-functions --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-chat-webpage-with-functions-js-aad
    - name: install dependencies  
      bash: |
        cd openai-chat-webpage-with-functions-js-aad
        npm install
    - name: pack template 
      bash: |
        cd openai-chat-webpage-with-functions-js-aad
        ai dev new .env
        npm run webpack

- area: ai dev new openai-chat-webpage-with-functions (oai)
  tests:

  - class: dev new openai-chat-webpage-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage-with-functions --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-chat-webpage-with-functions-js-oai
    - name: install dependencies  
      bash: |
        cd openai-chat-webpage-with-functions-js-oai
        npm install
    - name: pack template 
      bash: |
        cd openai-chat-webpage-with-functions-js-oai
        ai dev new .env
        npm run webpack

- area: ai dev new openai-chat-webpage-with-speech (key)
  tests:

  - class: dev new openai-chat-webpage-with-speech (typescript)
    steps:
    - name: generate template
      command: ai dev new openai-chat-webpage-with-speech --typescript
    - name: install dependencies
      bash: |
        cd openai-chat-webpage-with-speech-ts
        npm install
    - name: pack template
      bash: |
        cd openai-chat-webpage-with-speech-ts
        ai dev new .env
        npm run build

- area: ai dev new openai-asst (key)
  tests:

  - class: dev new openai-asst (c#)
    steps:
    - name: generate template
      command: ai dev new openai-asst --cs
    - name: build template
      bash: |
        cd openai-asst-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd openai-asst-cs;./bin/Debug/net8.0/OpenAIAssistants"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip
        
  - class: dev new openai-asst (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst --javascript
    - name: install dependencies
      bash: |
        cd openai-asst-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-js;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

  - class: dev new openai-asst (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst --python
    - name: install requirements
      bash: |
        cd openai-asst-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst (aad)
  tests:
  - class: dev new openai-asst (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-asst-js-aad
    - name: install dependencies
      bash: |
        cd openai-asst-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-js-aad;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst (oai)
  tests:
  - class: dev new openai-asst (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-asst-js-oai
    - name: install dependencies
      bash: |
        cd openai-asst-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-js-oai;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip
  - class: dev new openai-asst (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst --python --var USE_AZURE_OPENAI=false --output-path openai-asst-py-oai
    - name: install requirements
      bash: |
        cd openai-asst-py-oai
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-py-oai
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst-streaming (key)
  tests:

  - class: dev new openai-asst-streaming (c#)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming --cs
    - name: build template
      bash: |
        cd openai-asst-streaming-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-cs;./bin/Debug/net8.0/OpenAIAssistantsStreaming"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip
      
  - class: dev new openai-asst-streaming (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming --javascript
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-js;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

  - class: dev new openai-asst-streaming (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming --python
    - name: install requirements
      bash: |
        cd openai-asst-streaming-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst-streaming (aad)
  tests:
  - class: dev new openai-asst-streaming (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-asst-streaming-js-aad
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-js-aad;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst-streaming (oai)
  tests:
  - class: dev new openai-asst-streaming (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-asst-streaming-js-oai
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-js-oai;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip
  - class: dev new openai-asst-streaming (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming --python --var USE_AZURE_OPENAI=false --output-path openai-asst-streaming-py-oai
    - name: install requirements
      bash: |
        cd openai-asst-streaming-py-oai
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-py-oai
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-code (key)
  tests:

  - class: dev new openai-asst-streaming-with-code (c#)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-code --cs
    - name: build template
      bash: |
        cd openai-asst-streaming-with-code-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-code-cs;./bin/Debug/net8.0/OpenAIAssistantsCodeInterpreterStreaming"
      input: |-
        How many letter 'e's are there in the pledge of allegiance? don't talk about it, just write the code, and then answer the question.
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-code (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-code --javascript
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-code-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-code-js;node main.js"
      input: |-
        How many letter 'e's are there in the pledge of allegiance? don't talk about it, just write the code, and then answer the question.
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-code (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-code --python
    - name: install requirements
      bash: |
        cd openai-asst-streaming-with-code-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-with-code-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        How many letter 'e's are there in the pledge of allegiance? don't talk about it, just write the code, and then answer the question.
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-code (aad)
  tests:

  - class: dev new openai-asst-streaming-with-code (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-code --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-asst-streaming-with-code-js-aad
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-code-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-code-js-aad;node main.js"
      input: |-
        How many letter 'e's are there in the pledge of allegiance? don't talk about it, just write the code, and then answer the question.
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-code (oai)
  tests:

  - class: dev new openai-asst-streaming-with-code (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-code --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-asst-streaming-with-code-js-oai
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-code-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-code-js-oai;node main.js"
      input: |-
        How many letter 'e's are there in the pledge of allegiance? don't talk about it, just write the code, and then answer the question.
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-code (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-code --python --var USE_AZURE_OPENAI=false --output-path openai-asst-streaming-with-code-py-oai
    - name: install requirements
      bash: |
        cd openai-asst-streaming-with-code-py-oai
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-with-code-py-oai
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        How many letter 'e's are there in the pledge of allegiance? don't talk about it, just write the code, and then answer the question.
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-file-search (key)
  tests:

  - class: dev new openai-asst-streaming-with-file-search (c#)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-file-search --cs
    - name: build template
      bash: |
        cd openai-asst-streaming-with-file-search-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-file-search-cs;./bin/Debug/net8.0/OpenAIAssistantsFileSearchStreaming"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-file-search (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-file-search --javascript
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-file-search-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-file-search-js;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-file-search (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-file-search --python
    - name: install requirements
      bash: |
        cd openai-asst-streaming-with-file-search-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-with-file-search-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-file-search (aad)

  tests:

  - class: dev new openai-asst-streaming-with-file-search (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-file-search --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-asst-streaming-with-file-search-js-aad
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-file-search-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-file-search-js-aad;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-file-search (oai)
  tests:

  - class: dev new openai-asst-streaming-with-file-search (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-file-search --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-asst-streaming-with-file-search-js-oai
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-file-search-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-file-search-js-oai;node main.js"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-file-search (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-file-search --python --var USE_AZURE_OPENAI=false --output-path openai-asst-streaming-with-file-search-py-oai
    - name: install requirements
      bash: |
        cd openai-asst-streaming-with-file-search-py-oai
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-with-file-search-py-oai
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-functions (key)
  tests:

  - class: dev new openai-asst-streaming-with-functions (c#)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-functions --cs
    - name: build template
      bash: |
        cd openai-asst-streaming-with-functions-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-functions-cs;./bin/Debug/net8.0/OpenAIAssistantsFunctionsStreaming"
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-functions --javascript
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-functions-js
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-functions-js;node main.js"
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

  - class: dev new openai-asst-streaming-with-functions (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-functions --python
    - name: install requirements
      bash: |
        cd openai-asst-streaming-with-functions-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-with-functions-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python3 main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-functions (aad)
  tests:
  - class: dev new openai-asst-streaming-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-functions --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-asst-streaming-with-functions-js-aad
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-functions-js-aad
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-functions-js;node main.js"
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

- area: ai dev new openai-asst-streaming-with-functions (oai)
  tests:
  - class: dev new openai-asst-streaming-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-functions --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-asst-streaming-with-functions-js-oai
    - name: install dependencies
      bash: |
        cd openai-asst-streaming-with-functions-js-oai
        npm install
    - name: run template
      command: ai dev shell --bash "cd openai-asst-streaming-with-functions-js-oai;node main.js"
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip
  - class: dev new openai-asst-streaming-with-functions (python)
    steps:
    - name: generate template
      command: ai dev new openai-asst-streaming-with-functions --python --var USE_AZURE_OPENAI=false --output-path openai-asst-streaming-with-functions-py-oai
    - name: install requirements
      bash: |
        cd openai-asst-streaming-with-functions-py-oai
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd openai-asst-streaming-with-functions-py-oai
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

- area: ai dev new openai-asst-webpage (key)
  tests:
  - class: dev new openai-asst-webpage (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-webpage --javascript
    - name: install dependencies
      bash: |
        cd openai-asst-webpage-js
        npm install
    - name: build template
      bash: |
        cd openai-asst-webpage-js
        ai dev new .env
        npm run build

  - class: dev new openai-asst-webpage (typescript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-webpage --typescript
    - name: install dependencies
      bash: |
        cd openai-asst-webpage-ts
        npm install
    - name: pack template
      bash: |
        cd openai-asst-webpage-ts
        npm run build

- area: ai dev new openai-asst-webpage (aad)
  tests:
  - class: dev new openai-asst-webpage (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-webpage --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-asst-webpage-js-aad
    - name: install dependencies
      bash: |
        cd openai-asst-webpage-js-aad
        npm install
    - name: build template
      bash: |
        cd openai-asst-webpage-js-aad
        ai dev new .env
        npm run build

- area: ai dev new openai-asst-webpage (oai)
  tests:
  - class: dev new openai-asst-webpage (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-webpage --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-asst-webpage-js-oai
    - name: install dependencies
      bash: |
        cd openai-asst-webpage-js-oai
        npm install
    - name: build template
      bash: |
        cd openai-asst-webpage-js-oai
        ai dev new .env
        npm run build

- area: ai dev new openai-asst-webpage-with-functions (key)
  tests:
  - class: dev new openai-asst-webpage-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-webpage-with-functions --javascript
    - name: install dependencies
      bash: |
        cd openai-asst-webpage-with-functions-js
        npm install
    - name: build template
      bash: |
        cd openai-asst-webpage-with-functions-js
        ai dev new .env
        npm run build

- area: ai dev new openai-asst-webpage-with-functions (aad)
  tests:
  - class: dev new openai-asst-webpage-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-webpage-with-functions --javascript --var AZURE_OPENAI_AUTH_METHOD=aad --output-path openai-asst-webpage-with-functions-js-aad
    - name: install dependencies
      bash: |
        cd openai-asst-webpage-with-functions-js-aad
        npm install
    - name: build template
      bash: |
        cd openai-asst-webpage-with-functions-js-aad
        ai dev new .env
        npm run build

- area: ai dev new openai-asst-webpage-with-functions (oai)
  tests:

  - class: dev new openai-asst-webpage-with-functions (javascript)
    steps:
    - name: generate template
      command: ai dev new openai-asst-webpage-with-functions --javascript --var OPENAI_CLOUD=OpenAI --output-path openai-asst-webpage-with-functions-js-oai
    - name: install dependencies
      bash: |
        cd openai-asst-webpage-with-functions-js-oai
        npm install
    - name: build template
      bash: |
        cd openai-asst-webpage-with-functions-js-oai
        ai dev new .env
        npm run build

- area: ai dev new sk-chat-streaming (key)
  tests:

  - class: dev new sk-chat-streaming (c#)
    steps:
    - name: generate template
      command: ai dev new sk-chat-streaming --cs
    - name: build template
      bash: |
        cd sk-chat-streaming-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd sk-chat-streaming-cs;./bin/Debug/net8.0/SemanticKernelChatCompletionsStreaming"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new sk-chat-streaming-with-data (key)
  tests:

  - class: dev new sk-chat-streaming-with-data (c#)
    steps:
    - name: generate template
      command: ai dev new sk-chat-streaming-with-data --cs
    - name: build template
      bash: |
        cd sk-chat-streaming-with-data-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd sk-chat-streaming-with-data-cs;./bin/Debug/net8.0/SemanticKernelChatCompletionsDataStreaming"
      input: |-
        What parameter should i use to select my resources?
        exit
      tag: skip

- area: ai dev new sk-chat-streaming-with-functions (key)
  tests:
  
  - class: dev new sk-chat-streaming-with-functions (c#)
    steps:
    - name: generate template
      command: ai dev new sk-chat-streaming-with-functions --cs
    - name: build template
      bash: |
        cd sk-chat-streaming-with-functions-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd sk-chat-streaming-with-functions-cs;./bin/Debug/net8.0/SemanticKernelChatCompletionsFunctionsStreaming"
      input: |-
        What is the date?
        What is the time?
        exit
      tag: skip

- area: ai dev new sk-chat-with-agents (key)
  tests:

  - class: dev new sk-chat-with-agents (c#)
    steps:
    - name: generate template
      command: ai dev new sk-chat-with-agents --cs
    - name: build template
      bash: |
        cd sk-chat-with-agents-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd sk-chat-with-agents-cs;./bin/Debug/net8.0/SemanticKernelChatWithAgents"
      input: |-
        Eggs that are blue
        exit
      tag: skip

- area: ai dev new az-inference-chat-streaming (key)
  tests:

  - class: dev new az-inference-chat-streaming (c#)
    steps:
    - name: generate template
      command: ai dev new az-inference-chat-streaming --cs
    - name: build template
      bash: |
        cd az-inference-chat-streaming-cs
        dotnet build
    - name: run template
      command: ai dev shell --bash "cd az-inference-chat-streaming-cs;./bin/Debug/net8.0/AzureAIInferencingChatCompletionsStreaming"
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

  - class: dev new az-inference-chat-streaming (python)
    steps:
    - name: generate template
      command: ai dev new az-inference-chat-streaming --python
    - name: install requirements
      bash: |
        cd az-inference-chat-streaming-py
        if [ -f /etc/os-release ]; then
          python3 -m venv env
          source env/bin/activate
        else
          python -m venv env
          source env/Scripts/activate
        fi
        pip install -r requirements.txt
    - name: run template
      command: ai dev shell
      arguments:
        bash: |
          cd az-inference-chat-streaming-py
          if [ -f /etc/os-release ]; then
            source env/bin/activate
            python main.py
          else
            source env/Scripts/activate
            python main.py
          fi
      input: |-
        Tell me a joke
        Tell me another joke
        exit
      tag: skip

- area: ai dev new phi3-onnx-chat-streaming (c#)
  tests:

  - class: dev new phi3-onnx-chat-streaming (c#)
    steps:
    - name: generate template
      command: ai dev new phi3-onnx-chat-streaming --cs
    - name: build template
      bash: |
        cd phi3-onnx-chat-streaming-cs
        dotnet build
    - name: get models
      script: |
        cd phi3-onnx-chat-streaming-cs
        ./get-phi3-mini-onnx.cmd
      tag: skip
    - name: run template
      command: ai dev shell --bash "cd phi3-onnx-chat-streaming-cs;./bin/Debug/net8.0/Phi3ChatStreaming"
      input: |-
        Tell me a joke
        exit
      tag: skip
```
