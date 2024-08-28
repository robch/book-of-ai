---
# OpenAI Chat Completions Streaming with Data in Java

This sample demonstrates how to use the OpenAI Chat Completions API with streaming and data integration in a Java console application.

## Main.java

**STEP 1**: Read the configuration settings from environment variables:

``` java title="Main.java"
String openAIAPIKey = (System.getenv("AZURE_OPENAI_API_KEY") != null) ? System.getenv("AZURE_OPENAI_API_KEY") : "<insert your OpenAI API key here>";
String openAIEndpoint = (System.getenv("AZURE_OPENAI_ENDPOINT") != null) ? System.getenv("AZURE_OPENAI_ENDPOINT") : "<insert your OpenAI endpoint here>";
String openAIChatDeployment = (System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") != null) ? System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") : "<insert your OpenAI chat deployment name here>";
String openAISystemPrompt = (System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") != null) ? System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") : "You are a helpful AI assistant.";

String azureSearchEmbeddingsDeploymentName = System.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT") != null ? System.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT") : "<insert your OpenAI embeddings deployment name here>";
String azureSearchEndpoint = System.getenv("AZURE_AI_SEARCH_ENDPOINT") != null ? System.getenv("AZURE_AI_SEARCH_ENDPOINT") : "<insert your search endpoint here>";
String azureSearchAPIKey = System.getenv("AZURE_AI_SEARCH_KEY") != null ? System.getenv("AZURE_AI_SEARCH_KEY") : "<insert your search api key here>";
String azureSearchIndexName = System.getenv("AZURE_AI_SEARCH_INDEX_NAME") != null ? System.getenv("AZURE_AI_SEARCH_INDEX_NAME") : "<insert your search index name here>";
```

**STEP 2**: Initialize the helper class with the configuration settings:

``` java title="Main.java"
OpenAIChatCompletionsWithDataStreamingClass chat = new OpenAIChatCompletionsWithDataStreamingClass(openAIAPIKey, openAIEndpoint, openAIChatDeployment, openAISystemPrompt, azureSearchEndpoint, azureSearchIndexName, azureSearchAPIKey, azureSearchEmbeddingsDeploymentName);
```

**STEP 3**: Obtain user input, use the helper class to get the assistant's response, and display responses as they are received:

``` java title="Main.java"
Scanner scanner = new Scanner(System.in);
while (true) {
    System.out.print("User: ");
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

## OpenAIChatCompletionsWithDataStreamingClass.java

**STEP 1**: Create the client and initialize chat message history with a system message:

``` java title="OpenAIChatCompletionsWithDataStreamingClass.java"
public OpenAIChatCompletionsWithDataStreamingClass (
    String openAIAPIKey,
    String openAIEndpoint,
    String openAIChatDeployment,
    String openAISystemPrompt,
    String azureSearchEndpoint,
    String azureSearchIndexName,
    String azureSearchAPIKey,
    String azureSearchEmbeddingsDeploymentName) {

    this.openAIChatDeployment = openAIChatDeployment;
    this.openAISystemPrompt = openAISystemPrompt;
    client = new OpenAIClientBuilder()
        .endpoint(openAIEndpoint)
        .credential(new AzureKeyCredential(openAIAPIKey))
        .buildAsyncClient();

    AzureCognitiveSearchChatExtensionConfiguration searchConfiguration =
            new AzureCognitiveSearchChatExtensionConfiguration(
                    new AzureCognitiveSearchChatExtensionParameters(azureSearchEndpoint, azureSearchIndexName)
                            .setAuthentication(new OnYourDataApiKeyAuthenticationOptions(azureSearchAPIKey))
                            .setQueryType(AzureCognitiveSearchQueryType.VECTOR_SIMPLE_HYBRID)
                            .setEmbeddingDependency(new OnYourDataDeploymentNameVectorizationSource(azureSearchEmbeddingsDeploymentName))
            );

    List<ChatRequestMessage> chatMessages = new ArrayList<>();
    options = new ChatCompletionsOptions(chatMessages)
    .setDataSources(Arrays.asList(searchConfiguration));
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

``` java title="OpenAIChatCompletionsWithDataStreamingClass.java"
public Flux<ChatCompletions> getChatCompletionsStreamingAsync(String userPrompt,
        Consumer<ChatResponseMessage> callback) {
    options.getMessages().add(new ChatRequestUserMessage(userPrompt));
```

**STEP 3**: Send the chat message history to the streaming OpenAI Chat Completions API and process each update:

``` java title="OpenAIChatCompletionsWithDataStreamingClass.java"
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