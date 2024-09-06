# `ai chat assistant vector store update`

The `ai chat assistant vector store update` command updates the vector store used by the chat assistant.

### Usage

``` bash
ai chat assistant vector store update [OPTIONS]
```

### Options

| Option | Description |
| --- | --- |
| `--store NAME` | Specifies the name of the vector store to update. |
| `--file PATH` | Specifies the file containing vectors to update the store with. |

### Examples

``` bash title="Update the vector store with a file"
ai chat assistant vector store update --store myVectorStore --file /path/to/vectors.json
```

``` bash title="Update the vector store with another file"
ai chat assistant vector store update --store anotherVectorStore --file /path/to/another_vectors.json
```

### Remarks

This command is used to keep the vector store up to date with new vectors for the chat assistant to use.