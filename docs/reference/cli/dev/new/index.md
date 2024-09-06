# `ai dev new`

The `ai dev new` command creates or lists available templates.

### Usage

``` bash
ai dev new TEMPLATE_NAME
ai dev new list [...]
```

### Options

| Option        | Description                       |
|-------------- |-----------------------------------|
| `--instructions INSTRUCTIONS` | `ai dev new` instructions for the template. |

### Sub-commands

| Sub-command           | Description                                                                     |
|---------------------- |---------------------------------------------------------------------------------|
| [list](./list.md)     | Lists available templates.                                                      |

### Examples

``` bash title="Create an .env file containing Azure AI service settings"
ai dev new .env
```

``` bash title="Create a new openai-chat-streaming template in JavaScript"
ai dev new openai-chat-streaming --javascript
```

``` bash title="Create a new helper-functions template with instructions"
ai dev new helper-functions --instructions "Add helper functions that can retrieve text from a HTTP GET request with a supplied URL."
```
