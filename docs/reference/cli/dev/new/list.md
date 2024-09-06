# `ai dev new list`

The `ai dev new list` command lists available templates that can be used with the `ai dev new` command. These templates include quickstart sample code and helper functions.

### Usage

``` bash
ai dev new list
```

### Examples

``` bash title="List available templates"
ai dev new list
```

??? console-output "Output"

    ``` plaintext
    Name                                                      Short Name                                       Language                        
    ------------------------------------------------------    ---------------------------------------------    --------------------------------
    Environment Variables                                     .env                                                                             
    Azure AI Inference Chat Completions (Streaming)           az-inference-chat-streaming                      C#, Python                      
    Helper Function Class Library                             helper-functions                                 C#                              
    OpenAI Assistants                                         openai-asst                                      C#, JavaScript, Python          
    OpenAI Assistants (Streaming)                             openai-asst-streaming                            C#, JavaScript, Python          
    OpenAI Assistants (w/ Code Interpreter)                   openai-asst-streaming-with-code                  C#, JavaScript, Python          
    OpenAI Assistants (w/ File Search)                        openai-asst-streaming-with-file-search           C#, JavaScript, Python          
    OpenAI Assistants (w/ Functions)                          openai-asst-streaming-with-functions             C#, JavaScript, Python          
    OpenAI Assistants Webpage                                 openai-asst-webpage                              JavaScript, TypeScript          
    OpenAI Assistants Webpage (w/ Functions)                  openai-asst-webpage-with-functions               JavaScript                      
    OpenAI Chat Completions                                   openai-chat                                      C#, Go, Java, JavaScript, Python
    OpenAI Chat Completions (Streaming)                       openai-chat-streaming                            C#, Go, Java, JavaScript, Python
    OpenAI Chat Completions (w/ Data + AI Search)             openai-chat-streaming-with-data                  C#, Go, Java, JavaScript, Python
    OpenAI Chat Completions (w/ Functions)                    openai-chat-streaming-with-functions             C#, Go, JavaScript, Python      
    OpenAI Chat Webpage                                       openai-chat-webpage                              JavaScript, TypeScript          
    OpenAI Chat Webpage (w/ Functions)                        openai-chat-webpage-with-functions               JavaScript, TypeScript          
    OpenAI Chat Webpage (w/ Speech input/output)              openai-chat-webpage-with-speech                  TypeScript                      
    OpenAI Chat Webpage (w/ Functions + Speech)               openai-chat-webpage-with-speech-and-functions    TypeScript                      
    Phi-3 Chat Completions (w/ ONNX)                          phi3-onnx-chat-streaming                         C#                              
    Phi-3 Chat Completions (w/ ONNX + Functions)              phi3-onnx-chat-streaming-with-functions          C#                              
    Semantic Kernel Chat Completions (Streaming)              sk-chat-streaming                                C#                              
    Semantic Kernel Chat Completions (w/ Data + AI Search)    sk-chat-streaming-with-data                      C#                              
    Semantic Kernel Chat Completions (w/ Functions)           sk-chat-streaming-with-functions                 C#                              
    Semantic Kernel Chat Completions (w/ Agents)              sk-chat-with-agents                              C#                              
    Speech-to-text                                            speech-to-text                                   C#, Python                      
    Speech-to-text (w/ Continuous recognition)                speech-to-text-continuous-reco                   C#, Python                      
    Speech-to-text (w/ File input)                            speech-to-text-with-file                         C#, Python                      
    Speech-to-text (w/ Keyword detection)                     speech-to-text-with-keyword                      C#, Python                      
    Speech-to-text (w/ Translation)                           speech-to-text-with-translation                  C#, Python                      
    Text-to-speech                                            text-to-speech                                   C#, Python                      
    Text-to-speech (w/ File output)                           text-to-speech-with-file                         C#, Python                      
    ```

``` bash title="List only C# templates"
ai dev new list --csharp
```

``` bash title="Filter templates by name"
ai dev new list openai
```

``` bash title="Filter templates by name and language"
ai dev new list openai --language javascript
```

