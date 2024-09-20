### Extending the Phi-3's world knowledge with functions

!!! warning "THE CLI does NOT currently work with ONNX/Phi-3"

!!! info "The C# sample w/ functions DOES work with ONNX/Phi-3"

``` bash title="Without functions"
ai chat --model-path @mp --user "What time is it?"
```

``` bash title="With built-in functions"
ai chat --model-path @mp --user "What time is it?" --built-in-functions
```

``` bash title="File interaction without functions"
ai chat --model-path @mp --user "What is in the README.md file?"
```

``` bash title="File interaction with built-in functions"
ai chat --model-path @mp --user "What is in the README.md file?" --built-in-functions
```

### Allowing the LLM to interact with your code

``` bash title="Without functions"
ai chat --model-path @mp --user "Save the pledge of allegiance to 'pledge.txt'"
```

``` bash title="With built-in functions"
ai chat --model-path @mp --user "Save the pledge of allegiance to 'pledge.txt'" --built-in-functions
```

--8<-- "generate-code-for-scenarios-button-section.md"
