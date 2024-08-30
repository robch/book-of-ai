---
hide:
- navigation
- toc
---
# OpenAI Chat in Java

--8<-- "docs/warning-ai-generated.md"

This sample demonstrates how to use the OpenAI Chat API in a Java console application.

[:material-file-code: Main.java](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-java/src/Main.java)  
[:material-file-code: OpenAIChatCompletionsClass.java](https://github.dev/robch/book-of-ai/blob/main/docs/samples/openai-chat-java/src/OpenAIChatCompletionsClass.java)  

??? tip "How to generate this sample"

    ``` bash title="Command"
    ai dev new openai-chat --java
    ```

    ``` text title="Output"
    AI - Azure AI CLI, Version 1.0.0
    Copyright (c) 2024 Microsoft Corporation. All Rights Reserved.

    This PUBLIC PREVIEW version may change at any time.
    See: https://aka.ms/azure-ai-cli-public-preview

    Generating 'openai-chat' in 'openai-chat-java' (3 files)...

    pom.xml
    src/Main.java
    src/OpenAIChatCompletionsClass.java

    Generating 'openai-chat' in 'openai-chat-java' (3 files)... DONE!
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
OpenAIChatCompletionsClass chat = new OpenAIChatCompletionsClass(openAIAPIKey, openAIEndpoint, openAIChatDeployment, openAISystemPrompt);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` java title="Main.java"
Scanner scanner = new Scanner(System.in);
while (true) {
    System.out.print("User: ");
    if (!scanner.hasNextLine()) break;

    String userPrompt = scanner.nextLine();
    if (userPrompt.isEmpty() || "exit".equals(userPrompt)) break;

    String response = chat.getChatCompletion(userPrompt);
    System.out.println("\nAssistant: " + response + "\n");
}
scanner.close();
```

## OpenAIChatCompletionsClass.java

**STEP 1**: Create the client and initialize chat message history with a system message:

``` java title="OpenAIChatCompletionsClass.java"
public OpenAIChatCompletionsClass (String openAIAPIKey, String openAIEndpoint, String openAIChatDeployment, String openAISystemPrompt) {
    this.openAIChatDeployment = openAIChatDeployment;
    this.openAISystemPrompt = openAISystemPrompt;
    client = new OpenAIClientBuilder()
        .endpoint(openAIEndpoint)
        .credential(new AzureKeyCredential(openAIAPIKey))
        .buildClient();

    List<ChatRequestMessage> chatMessages = new ArrayList<>();
    options = new ChatCompletionsOptions(chatMessages);
    ClearConversation();
}
```

**STEP 2**: Clear previous conversation and set the initial system message:

``` java title="OpenAIChatCompletionsClass.java"
public void ClearConversation(){
    List<ChatRequestMessage> chatMessages = options.getMessages();
    chatMessages.clear();
    chatMessages.add(new ChatRequestSystemMessage(this.openAISystemPrompt));
}
```

**STEP 3**: When the user provides input, add the user message to the chat message history:

``` java title="OpenAIChatCompletionsClass.java"
public String getChatCompletion(String userPrompt) {
    options.getMessages().add(new ChatRequestUserMessage(userPrompt));
```

**STEP 4**: Send the chat message history to the OpenAI Chat API and process the response:

``` java title="OpenAIChatCompletionsClass.java"
    ChatCompletions chatCompletions = client.getChatCompletions(this.openAIChatDeployment, options);
    String responseContent = chatCompletions.getChoices().get(0).getMessage().getContent();
    options.getMessages().add(new ChatRequestAssistantMessage(responseContent.toString()));

    return responseContent;
}
```