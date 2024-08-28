import com.azure.ai.openai.OpenAIAsyncClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.*;
import com.azure.core.credential.AzureKeyCredential;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.function.Consumer;
import java.util.List;

public class OpenAIChatCompletionsStreamingClass {

    private OpenAIAsyncClient client;
    private ChatCompletionsOptions options;
    private String openAIChatDeployment;
    private String openAISystemPrompt;

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

    public Flux<ChatCompletions> getChatCompletionsStreamingAsync(String userPrompt,
            Consumer<ChatResponseMessage> callback) {
        options.getMessages().add(new ChatRequestUserMessage(userPrompt));

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
}