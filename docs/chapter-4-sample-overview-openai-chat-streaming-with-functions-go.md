---
hide:
- navigation
- toc
---
# OpenAI Chat Streaming with Functions in Go

--8<-- "warnings/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API with streaming and function calling in a Go console application.

[:material-file-code: main.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/main.go)  
[:material-file-code: function_call_context.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/function_call_context.go)  
[:material-file-code: function_factory.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/function_factory.go)  
[:material-file-code: openai_chat_completions_custom_functions.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/openai_chat_completions_custom_functions.go)  
[:material-file-code: openai_chat_completions_functions_streaming_hello_world.go](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-with-functions-go/openai_chat_completions_functions_streaming_hello_world.go)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming-with-functions --go
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-go' (6 files)...

    function_call_context.go
    function_factory.go
    go.mod
    main.go
    openai_chat_completions_custom_functions.go
    openai_chat_completions_functions_streaming_hello_world.go

    Generating 'openai-chat-streaming-with-functions' in 'openai-chat-streaming-with-functions-go' (6 files)... DONE!
    ```


## main.go

**STEP 1**: Read the configuration settings from environment variables:

``` go title="main.go"
openAIAPIKey := os.Getenv("AZURE_OPENAI_API_KEY")
if openAIAPIKey == "" {
    openAIAPIKey = "<insert your OpenAI API key here>"
}
openAIEndpoint := os.Getenv("AZURE_OPENAI_ENDPOINT")
if openAIEndpoint == "" {
    openAIEndpoint = "<insert your OpenAI endpoint here>"
}
openAIChatDeploymentName := os.Getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")
if openAIChatDeploymentName == "" {
    openAIChatDeploymentName = "<insert your OpenAI deployment name here>"
}
openAISystemPrompt := os.Getenv("AZURE_OPENAI_SYSTEM_PROMPT")
if openAISystemPrompt == "" {
    openAISystemPrompt = "You are a helpful AI assistant."
}

if openAIEndpoint == "" || openAIAPIKey == "" || openAIChatDeploymentName == "" || openAISystemPrompt == "" {
    fmt.Println("Please set the environment variables.")
    os.Exit(1)
}

factory := NewFunctionFactoryWithCustomFunctions()
chat, err := NewOpenAIChatCompletionsFunctionsStreamingExample(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, factory)
if err != nil {
    log.Fatalf("ERROR: %s", err)
}

for {
    fmt.Print("User: ")
    input, _ := getUserInput()
    if input == "exit" || input == "" {
        break
    }

    fmt.Printf("\nAssistant: ")
    _, err := chat.GetChatCompletionsStream(input, func(content string) {
        fmt.Printf("%s", content)
    })
    if err != nil {
        log.Fatalf("ERROR: %s", err)
    }
    fmt.Printf("\n\n")
}
```

## function_call_context.go

**STEP 1**: Create the `FunctionCallContext` struct and initialize it with the function factory and chat completion options:

``` go title="function_call_context.go"
type FunctionCallContext struct {
    functionFactory   *FunctionFactory
    options           *azopenai.ChatCompletionsOptions
    functionName      string
    functionArguments string
}

func NewFunctionCallContext(functionFactory *FunctionFactory, options *azopenai.ChatCompletionsOptions) *FunctionCallContext {
    return &FunctionCallContext{
        functionFactory:   functionFactory,
        options:           options,
        functionName:      "",
        functionArguments: "",
    }
}
```

**STEP 2**: Define methods to check for function call updates, attempt to call a function, and clear the context:

``` go title="function_call_context.go"
func (fcc *FunctionCallContext) CheckForUpdate(choice azopenai.ChatChoice) bool {
    updated := false

    if choice.Delta != nil && choice.Delta.FunctionCall != nil {
        name := choice.Delta.FunctionCall.Name
        if name != nil && *name != "" {
            fcc.functionName = *name
            updated = true
        }
    }

    if choice.Delta != nil && choice.Delta.FunctionCall != nil {
        args := choice.Delta.FunctionCall.Arguments
        if args != nil && *args != "" {
            fcc.functionArguments = *args
            updated = true
        }
    }

    return updated
}

func (fcc *FunctionCallContext) TryCallFunction() string {
    result := fcc.functionFactory.TryCallFunction(fcc.functionName, fcc.functionArguments)
    if result == "" {
        return ""
    }

    fmt.Printf("\rassistant-function: %s(%s) => %s\n", fcc.functionName, fcc.functionArguments, result)
    fmt.Printf("\nAssistant: ")

    fcc.options.Messages = append(fcc.options.Messages, azopenai.ChatMessage{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr(""), FunctionCall: &azopenai.ChatMessageFunctionCall{Name: to.Ptr(fcc.functionName), Arguments: to.Ptr(fcc.functionArguments)}})
    fcc.options.Messages = append(fcc.options.Messages, azopenai.ChatMessage{Role: to.Ptr(azopenai.ChatRoleFunction), Content: to.Ptr(result), Name: to.Ptr(fcc.functionName)})

    return result
}

func (fcc *FunctionCallContext) Clear() {
    fcc.functionName = ""
    fcc.functionArguments = ""
}
```

## function_factory.go

**STEP 1**: Create the `FunctionFactory` struct and methods to add functions, get function schemas, and try calling functions:

``` go title="function_factory.go"
type FunctionInfo struct {
    Schema   azopenai.FunctionDefinition
    Function func(string) string
}

type FunctionFactory struct {
    functions map[string]FunctionInfo
}

func NewFunctionFactory() *FunctionFactory {
    return &FunctionFactory{
        functions: make(map[string]FunctionInfo),
    }
}

func (ff *FunctionFactory) AddFunction(schema azopenai.FunctionDefinition, fun func(string) string) {
    ff.functions[*schema.Name] = FunctionInfo{Schema: schema, Function: fun}
}

func (ff *FunctionFactory) GetFunctionSchemas() []azopenai.FunctionDefinition {
    schemas := []azopenai.FunctionDefinition{}
    for _, functionInfo := range ff.functions {
        schemas = append(schemas, functionInfo.Schema)
    }
    return schemas
}

func (ff *FunctionFactory) TryCallFunction(functionName string, functionArguments string) string {
    functionInfo, exists := ff.functions[functionName]
    if !exists {
        return ""
    }

    return functionInfo.Function(functionArguments)
}
```

## openai_chat_completions_custom_functions.go

**STEP 1**: Define custom functions and their schemas:

``` go title="openai_chat_completions_custom_functions.go"
func GetCurrentWeather(functionArguments string) string {
    var args map[string]string
    json.Unmarshal([]byte(functionArguments), &args)
    location, _ := args["location"]
    return fmt.Sprintf("The weather in %s is 72 degrees and sunny.", location)
}

var GetCurrentWeatherSchema = azopenai.FunctionDefinition{
    Name:        to.Ptr("get_current_weather"),
    Description: to.Ptr("Get the current weather in a given location"),
    Parameters: map[string]any{
        "type": "object",
        "properties": map[string]any{
            "location": map[string]any{
                "type":        "string",
                "description": "The city and state, e.g. San Francisco, CA",
            },
        },
        "required": []string{"location"},
    },
}

func GetCurrentDate(_ string) string {
    return time.Now().Format("2006-01-02")
}

var GetCurrentDateSchema = azopenai.FunctionDefinition{
    Name:        to.Ptr("get_current_date"),
    Description: to.Ptr("Get the current date"),
    Parameters: map[string]any{
        "type":       "object",
        "properties": map[string]any{},
    },
}

func GetCurrentTime(_ string) string {
    return time.Now().Format("15:04:05")
}

var GetCurrentTimeSchema = azopenai.FunctionDefinition{
    Name:        to.Ptr("get_current_time"),
    Description: to.Ptr("Get the current time"),
    Parameters: map[string]any{
        "type":       "object",
        "properties": map[string]any{},
    },
}

func NewFunctionFactoryWithCustomFunctions() *FunctionFactory {
    factory := NewFunctionFactory()
    factory.AddFunction(GetCurrentWeatherSchema, GetCurrentWeather)
    factory.AddFunction(GetCurrentDateSchema, GetCurrentDate)
    factory.AddFunction(GetCurrentTimeSchema, GetCurrentTime)
    return factory
}
```

## openai_chat_completions_functions_streaming_hello_world.go

**STEP 1**: Create a struct to manage the chat completions with function calling:

``` go title="openai_chat_completions_functions_streaming_hello_world.go"
type OpenAIChatCompletionsFunctionsStreamingExample struct {
    client              *azopenai.Client
    options             *azopenai.ChatCompletionsOptions
    functionFactory     *FunctionFactory
    functionCallContext *FunctionCallContext
}

func NewOpenAIChatCompletionsFunctionsStreamingExample(openAIEndpoint string, openAIAPIKey string, openAIChatDeploymentName string, openAISystemPrompt string, functionFactory *FunctionFactory) (*OpenAIChatCompletionsFunctionsStreamingExample, error) {
    keyCredential, err := azopenai.NewKeyCredential(openAIAPIKey)
    if err != nil {
        return nil, err
    }
    client, err := azopenai.NewClientWithKeyCredential(openAIEndpoint, keyCredential, nil)
    if err != nil {
        return nil, err
    }

    messages := []azopenai.ChatMessage{
        {Role: to.Ptr(azopenai.ChatRoleSystem), Content: to.Ptr(openAISystemPrompt)},
    }

    options := &azopenai.ChatCompletionsOptions{
        Deployment: openAIChatDeploymentName,
        Messages: messages,
        FunctionCall: &azopenai.ChatCompletionsOptionsFunctionCall{
            Value: to.Ptr("auto"),
        },
        Functions: functionFactory.GetFunctionSchemas(),
    }

    return &OpenAIChatCompletionsFunctionsStreamingExample{
        client: client,
        options: options,
        functionCallContext: NewFunctionCallContext(functionFactory, options),
    }, nil
}
```

**STEP 2**: Define methods to clear the conversation and get chat completions with function calling:

``` go title="openai_chat_completions_functions_streaming_hello_world.go"
func (chat *OpenAIChatCompletionsFunctionsStreamingExample) ClearConversation() {
    chat.options.Messages = chat.options.Messages[:1]
}

func (chat *OpenAIChatCompletionsFunctionsStreamingExample) GetChatCompletionsStream(userPrompt string, callback func(content string)) (string, error) {
    chat.options.Messages = append(chat.options.Messages, azopenai.ChatMessage{Role: to.Ptr(azopenai.ChatRoleUser), Content: to.Ptr(userPrompt)})

    responseContent := ""
    for {
        resp, err := chat.client.GetChatCompletionsStream(context.TODO(), *chat.options, nil)
        if err != nil {
            return "", err
        }
        defer resp.ChatCompletionsStream.Close()

        for {
            chatCompletions, err := resp.ChatCompletionsStream.Read()
            if errors.Is(err, io.EOF) {
                break
            }
            if err != nil {
                return "", err
            }

            for _, choice := range chatCompletions.Choices {

                chat.functionCallContext.CheckForUpdate(choice)

                content := ""
                if choice.Delta.Content != nil {
                    content = *choice.Delta.Content
                }

                if choice.FinishReason != nil {
                    finishReason := *choice.FinishReason
                    if finishReason == azopenai.CompletionsFinishReasonLength {
                        content = content + "\nWARNING: Exceeded token limit!"
                    }
                }

                if content == "" {
                    continue
                }

                callback(content)
                responseContent += content
            }
        }

        if chat.functionCallContext.TryCallFunction() != "" {
            chat.functionCallContext.Clear()
            continue
        }

        chat.options.Messages = append(chat.options.Messages, azopenai.ChatMessage{Role: to.Ptr(azopenai.ChatRoleAssistant), Content: to.Ptr(responseContent)})
        return responseContent, nil
    }
}
```