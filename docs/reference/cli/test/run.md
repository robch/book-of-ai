# `ai test run`

The `ai test run` command runs CLI YAML tests.

### Usage

``` bash
ai test run [...]
```

### Options

| Option | Description |
|--------|-------------|
| `--file FILE`  | Specify a file to run tests from |
| `--files FILE1 [FILE2 [...]]` | Specify multiple files or patterns to run tests from |
| `--tests TEXT1 [TEXT2 [...]]` | Specify tests to run |
| `--contains TEXT1 [TEXT2 [...]]` | Filter tests that contain specified text |
| `--remove TEXT1 [TEXT2 [...]]` | Exclude tests that contain specified text |
| `--output-file FILE` | Specify file to output test results |
| `--output-format trx|junit` | Specify output format (trx or junit) |

### Examples

``` bash title="Runs all available tests"
ai test run
```

``` bash title="Run tests from files under current directory, that contain 'setup' or 'nightly', and 'java', but not 'skip'"
ai test run --tests setup nightly --contains java --remove skip
```

``` bash title="Run tests from files under 'tests' directory, that contain 'test3', but not 'skip'"
ai test run --files ../tests/**/*.yaml --contains test3 --remove skip
```
