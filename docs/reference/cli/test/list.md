# `ai test list`

The `ai test list` command lists CLI YAML tests.

### Usage

``` bash
ai test list [...]
```

### Options

| Option      | Description                                                                   |
|-------------|-------------------------------------------------------------------------------|
| `--file FILE` | File to use                                                                   |
| `--files FILE1 [FILE2 [...]]` | A list of files to use                                         |
| `--files PATTERN1 [PATTERN2 [...]]` | A list of file patterns to use                             |
| `--test TEXT` | Test text to use                                                              |
| `--tests TEXT1 [TEXT2 [...]]` | A list of test texts                                             |
| `--contains TEXT1 [TEXT2 [...]]` | Filter tests that contain these texts                         |
| `--remove TEXT1 [TEXT2 [...]]`  | Filter tests further by removing those that contain these texts |

### Examples

``` bash title="Lists all available tests"
ai test list
```

``` bash title="Lists tests from files under current directory, that contain 'setup' or 'nightly', and 'java', but not 'skip'"
ai test list --tests setup nightly --contains java --remove skip
```

``` bash title="Lists tests from files under 'tests' directory, that contain 'test3', but not 'skip'"
ai test list --files ../tests/**/*.yaml --contains test3 --remove skip
```
