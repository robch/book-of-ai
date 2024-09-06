# `ai config`

The `ai config` command creates, queries, or deletes AI configuration data stored in AI configuration datastore files.
### Usage

``` bash
ai config [HIVE] [COMMAND] [@FILE] [...]
```

### Options

| Option             | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `--set [NAME=]VALUE`       | Sets the value for a configuration option.                                 |
| `--clear NAME`             | Removes the value of a configuration option.                              |

### Hives

The HIVE parameter specifies the configuration data scope of use. `HIVE` can be one of the following values:

| Hive Scope | Description                       |
|------------|-----------------------------------|
| .          | Current directory                |
| local      | User's local configuration       |
| user       | User-wide configuration          |
| global     | Global configuration (requires permissions) |

### Examples

``` bash title="Set a configuration key"
ai config --set key 436172626F6E20697320636F6F6C2121
```

``` bash title="Set a region"
ai config --set region westus2
```

``` bash title="Query a configuration key"
ai config @key
```
