# `ai speech profile list`

The `ai speech profile list` command is used to list all voice profiles for the current key/region. Voice profiles are essential in speaker recognition and transcription scenarios.

### Usage

```
ai speech profile list [...]
```

### Options

| Option               | Description                                                      |
|----------------------|------------------------------------------------------------------|
| `--key KEY`          | Specifies the subscription key to use.             |
| `--region REGION`    | Specifies the region for the speech service.       |
| `--kind KIND`        | Specifies the kind of profile to list.             |
| `--output file PATH` | Specifies the output file path for the results in file format.    |
| `--output json PATH` | Specifies the output file path for the results in JSON format.   |

### Examples

``` bash title="List all voice profiles for the specified key and region"
ai speech profile list --key YOUR_KEY_HERE --region YOUR_REGION_HERE
```

``` bash title="List all voice profiles and save the output to a file"
ai speech profile list --key YOUR_KEY_HERE --region YOUR_REGION_HERE --output file profiles.txt
```

``` bash title="List all voice profiles and save the output in JSON format"
ai speech profile list --key YOUR_KEY_HERE --region YOUR_REGION_HERE --output json profiles.json
```