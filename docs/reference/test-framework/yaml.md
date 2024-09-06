# `ai test` YAML Format

The test case YAML file contains a list of test cases. Each test case is a dictionary with the following keys:

- `tests`, `steps` (required): A list of test cases to run.
* `command`, `script`, `bash` (required): The command or script to run.
* `name` (required): The name of the test case.
- `env` (optional): A dictionary of environment variables to set before running the command or script.
- `input` (optional): The input to pass to the command or script.
- `expect` (optional): A string that instructs the LLM (e.g. GPT-4) to decide pass/fail based on stdout/stderr.
- `expect-regex` (optional): A list of regular expressions that must be matched in the stdout/stderr output.
- `not-expect-regex` (optional): A list of regular expressions that must not be matched in the stdout/stderr output.
- `parallelize` (optional): Whether the test case should run in parallel with other test cases.
- `skipOnFailure` (optional): Whether the test case should be skipped when it fails.
- `tag`/`tags` (optional): A list of tags to associate with the test case.
- `timeout` (optional): The maximum time allowed to execute the test case, in milliseconds.
- `workingDirectory` (optional): The working directory where the test will be run.
- `matrix`, `matrix-file` (optional): A matrix used to parameterize and/or create multiple variations of a test case.

Test cases can be organized into areas, sub-areas, and so on.

```yaml
- area: Area 1
  tests:

  - name: Test 1
    command: echo "Hello, world!"

  - name: Test 2
    command: echo "Goodbye, world!"
```

Test cases can also be grouped into classes. 

```yaml
- class: Class 1
  tests:

  - name: Test 1
    command: echo "Hello, world!"

  - name: Test 2
    command: echo "Goodbye, world!"
```

If no class is specified, the default class is "TestCases".

## `tests`, `steps`

Required.

When present, specifies a list of test cases to run.

By default, for `steps`, all tests will be run sequentially. The full set of tests will be run in parallel with other `steps` for other test areas, unless `parallelize: false` is set.

Examples:

```yaml
tests:
- name: Test 1
  command: echo "Hello, world!"
- name: Test 2
  command: echo "Goodbye, world!"
```

```yaml
steps:
- name: Step 1
  bash: echo "Hello, world!"
- name: Step 2
  bash: echo "Goodbye, world!"
```

## `command`, `script`, `bash`

Required.

Represents how the test case will be run.

If the specified command or script returns an error level of non-zero, the test will fail. If it returns zero, it will pass (given that all 'expect' conditions are also met).

Example command:

```yaml
command: ai chat --interactive
```

Example for a bash script:

```yaml
bash: |
  if [ -f /etc/os-release ]; then 
    python3 script.py 
  else 
    py script.py
  fi
```


## `env`

Optional. Inherits from parent.

When present, a dictionary of environment variables to set before running the command or script.

Example:

```yaml
env:
  JAVA_HOME: /path/to/java
```

## `input`

Optional.

When present, will be passed to the command or script as stdin.

Example:

```yaml
input: |
  Tell me a joke
  Tell me another
  exit
```

## `expect`

Optional.

Represents instructions given to LLM (e.g. GPT-4) along with stdout/stderr to decide whether the test passes or fails.

Example: 

```yaml
expect: the output must have exactly two jokes
```

## `expect-regex`

Optional.

Each string (or line in multiline string) is a regular expression that must be matched in the stdout/stderr output.

If any regular expression is not matched, the test will fail. If all expressions are matched, in order, the test will pass.

Example:

```yaml
expect-regex: |
  Regex 1
  Regex 2
```

## `not-expect-regex`

Optional.

When present, each string (or line in multiline string) is a regular expression that must not be matched in the stdout/stderr output.

If any regular expression is matched, the test fails. If none match, the test passes.

Example:

```yaml
not-expect-regex: |
  ERROR
  curseword1
  curseword2
```

## `parallelize`

Optional.

When present, specifies if the test cases should run in parallel or not.

By default, it is set to `false` for all tests, except for the first step in a `steps` test sequence.

Example:

```yaml
parallelize: true
```

## `skipOnFailure`

Optional.

When present, specifies if the test case should be skipped when it fails.

By default, it is set to `false`.

Example: 

```yaml
skipOnFailure: true
```

## `tag`/`tags`

Optional. Inherits from parent.

When present, specifies a list of tags to associate with the test case.

Tags accumulate from parent to child, so if a tag is specified in a parent, it will be inherited by all children.

Examples:

```yaml
tag: skip
```

```yaml
tags:
- slow
- performance
- long-running
```

```yaml
area: Area 1
tags: [echo]
tests:

- name: Test 1
  command: echo "Hello, world!"
  tags: [hello]

- name: Test 2
  command: echo "Goodbye, world!"
  tags: [bye]
```

## `timeout`

Optional.

When present, specifies the maximum time allowed to execute the test case, in milliseconds. Defaults to infinite.

Example:

```yaml
timeout: 3000  # 3 seconds
```

## `workingDirectory`

Optional. Inherits from parent.

When present, specifies an absolute path or relative path where the test will be run.

When specified as a relative path, it will be relative to the working directory of the parent, or if no parent exists, where the test case file is located.

## `matrix`, `matrix-file`

Optional. Inerits from parent.

When present, specifies a matrix (set of values) used to parameterize and/or create multiple variations of a test case with different parameter values. This is achieved using the `matrix` key and `${{ matrix.VALUE }}` syntax within the test cases.

Examples:

```yaml
- name: Example Matrix Test
  matrix:
    VALUE: [1, 2, 3]
  bash: echo "Value is ${{ matrix.VALUE }}"
```

In this example, the test case will run three times with `VALUE` set to 1, 2, and 3 respectively.

```yaml
matrix:
  animals: [ cats, bears, goats ]
  temperature: [ 0.8, 1.0 ]
command: 'ai chat --question "Tell me a joke about ${{ matrix.animals }}"'
expect: 'The joke should be about ${{ matrix.animals }}'
```

In this example the test case will run six times (2x3) with `temperature` set to 0.8 and 1.0, and `animals` set to cats, bears, and goats.

```yaml
matrix:
  assistant-id: asst_TqfFCksyWK83VKe76kiBYWGt
  foreach:
  - question: How do you create an MP3 file with speech synthesis from the text "Hello, World!"?
  - question: How do you recognize speech from an MP3 file?
  - question: How do you recognize speech from a microphone?
steps:
- name: Inference call to `ai chat`
  command: ai chat
  arguments:
    question: ${{ matrix.question }}
    assistant-id: ${{ matrix.assistant-id }}
    output-chat-history: chat-history-${{ matrix.__matrix_id__ }}.jsonl
```

In this example the test case will run three times with `assistant-id` set to `asst_TqfFCksyWK83VKe76kiBYWGt`, and `question` set to the three questions specified in the `foreach` list, and the `output-chat-history` specifies where to save the chat history, using a filename that is unique to the "matrix" combination.

```yaml
matrix-file: questions.yaml
```

`questions.yaml`:
```yaml
foreach:
- question: How do you create an MP3 file with speech synthesis from the text "Hello, World!"?
- question: How do you recognize speech from an MP3 file?
- question: How do you recognize speech from a microphone?
```

In this example, the matrix is loaded from a file.


