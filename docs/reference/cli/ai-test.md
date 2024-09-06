# `ai test`

The `ai test` command manages CLI YAML tests.

### Usage

``` bash
a test <command> [...]
```

The `ai test` command manages CLI YAML tests.

### Commands

| Sub-command | Description |
| ----------- | ----------- |
| [ai test list](ai-test-list.md) | Lists CLI YAML tests. |
| [ai test run](ai-test-run.md)   | Runs CLI YAML tests. |

### ai test list

The `ai test list` command lists CLI YAML tests.

### Usage

``` bash
a test list [...]
```

### Options

| Option      | Description |
| ----------- | ----------- |
| `--file`    | Specifies the file to use. |
| `--files`   | Specifies one or more files or patterns to use. |
| `--test`    | Specifies the text to use. |
| `--tests`   | Specifies one or more texts to use. |
| `--contains`| Specifies one or more texts to include. |
| `--remove`  | Specifies one or more texts to exclude. |

### Examples

``` bash title="List all available tests"
ai test list
```

``` bash title="List tests containing 'java' but not 'skip'"
ai test list --tests setup nightly --contains java --remove skip
```

``` bash title="List tests from 'tests' directory containing 'test3' but not 'skip'"
ai test list --files ../tests/**/*.yaml --contains test3 --remove skip
```

### ai test run

The `ai test run` command runs CLI YAML tests.

### Usage

``` bash
a test run [...]
```

### Options

| Option         | Description |
| -------------- | ----------- |
| `--file`       | Specifies the file to use. |
| `--files`      | Specifies one or more files or patterns to use. |
| `--test`       | Specifies the text to use. |
| `--tests`      | Specifies one or more texts to use. |
| `--contains`   | Specifies one or more texts to include. |
| `--remove`     | Specifies one or more texts to exclude. |
| `--output-file`| Specifies the output file. |
| `--output-format`| Specifies the output format (`trx` or `junit`). |

### Examples

``` bash title="Run all available tests"
ai test run
```

``` bash title="Run tests containing 'java' but not 'skip'"
ai test run --tests setup nightly --contains java --remove skip
```

``` bash title="Run tests from 'tests' directory containing 'test3' but not 'skip'"
ai test run --files ../tests/**/*.yaml --contains test3 --remove skip
```

### Related content

- [ai test list](ai-test-list.md)
- [ai test run](ai-test-run.md)