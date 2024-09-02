---
hide:
- navigation
- toc
---
# OpenAI Chat Streaming in Java

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API with streaming in a Java console application.

[:material-file-code: Main.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-java/src/Main.java)  
[:material-file-code: OpenAIChatCompletionsStreamingClass.java](https://raw.githubusercontent.com/robch/book-of-ai/main/docs/samples/openai-chat-streaming-java/src/OpenAIChatCompletionsStreamingClass.java)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat-streaming --java
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-java' (3 files)...

    pom.xml
    src/Main.java
    src/OpenAIChatCompletionsStreamingClass.java

    Generating 'openai-chat-streaming' in 'openai-chat-streaming-java' (3 files)... DONE!
    ```


## Main.java

**STEP 1**: Read the configuration settings from environment variables:

``` java title="Main.java"
String openAIAPIKey = (System.getenv("AZURE_OPENAI_API_KEY") != null) ? System.getenv("AZURE_OPENAI_API_KEY") : "<insert your OpenAI API key here>";
String openAIEndpoint = (System.getenv("AZURE_OPENAI_ENDPOINT") != null) ? System.getenv("AZURE_OPENAI_ENDPOINT") : "<insert your OpenAI endpoint here>";
String openAIChatDeployment = (System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") != null) ? System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") : "<insert your OpenAI chat deployment name here>";
String openAISystemPrompt = (System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") != null) ? System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") : "You are a helpful AI assistant.";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` java title="Main.java"
OpenAIChatCompletionsStreamingClass chat = new OpenAIChatCompletionsStreamingClass(openAIAPIKey, openAIEndpoint, openAIChatDeployment, openAISystemPrompt);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` java title="Main.java"
Scanner scanner = new Scanner(System.in);
while (true) {
    System.out.print("User: ");
    if (!scanner.hasNextLine()) break;

    String userPrompt = scanner.nextLine();
    if (userPrompt.isEmpty() || "exit".equals(userPrompt))
        break;

    System.out.print("\nAssistant: ");
    Flux<ChatCompletions> responseFlux = chat.getChatCompletionsStreamingAsync(userPrompt, update -> {
        System.out.print(update.getContent());
    });
    responseFlux.blockLast();
    System.out.println("\n");
}
scanner.close();
```

## OpenAIChatCompletionsStreamingClass.java

**STEP 1**: Create the client and initialize chat message history with a system message:

``` java title="OpenAIChatCompletionsStreamingClass.java"
public OpenAIChatCompletionsStreamingClass (String openAIAPIKey, String openAIEndpoint, String openAIChatDeployment, String openAISystemPrompt) {

    this.openAIChatDeployment = openAIChatDeployment;
    this.openAISystemPrompt = openAISystemPrompt;
    client = new OpenAIClientBuilder()
        .endpoint(openAIEndpoint)
        .credential(new AzureKeyCredential(openAIAPIKey))
        .buildAsyncClient();

    List<ChatRequestMessage> chatMessages = new ArrayList<>();
    options = new ChatCompletionsOptions(chatMessages);
    ClearConversation();
    options.setStream(true);
}

public void ClearConversation(){
    List<ChatRequestMessage> chatMessages = options.getMessages();
    chatMessages.clear();
    chatMessages.add(new ChatRequestSystemMessage(this.openAISystemPrompt));
}
```

**STEP 2**: When the user provides input, add the user message to the chat message history:

``` java title="OpenAIChatCompletionsStreamingClass.java"
public Flux<ChatCompletions> getChatCompletionsStreamingAsync(String userPrompt,
        Consumer<ChatResponseMessage> callback) {
    options.getMessages().add(new ChatRequestUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the streaming OpenAI Chat API and process each update:

``` java title="OpenAIChatCompletionsStreamingClass.java"
    StringBuilder responseContent = new StringBuilder();
    Flux<ChatCompletions> response = client.getChatCompletionsStream(this.openAIChatDeployment, options);

    response.subscribe(chatResponse -> {
        if (chatResponse.getChoices() != null) {
            for (ChatChoice update : chatResponse.getChoices()) {
                if (update.getDelta() == null || update.getDelta().getContent() == null)
                    continue;
                String content = update.getDelta().getContent();

                if (update.getFinishReason() == CompletionsFinishReason.CONTENT_FILTERED) {
                    content = content + "\nWARNING: Content filtered!";
                } else if (update.getFinishReason() == CompletionsFinishReason.TOKEN_LIMIT_REACHED) {
                    content = content + "\nERROR: Exceeded token limit!";
                }

                if (content.isEmpty())
                    continue;

                if(callback != null) {
                	callback.accept(update.getDelta());
                }
                responseContent.append(content);
            }

            options.getMessages().add(new ChatRequestAssistantMessage(responseContent.toString()));
        }
    });

    return response;
}
```