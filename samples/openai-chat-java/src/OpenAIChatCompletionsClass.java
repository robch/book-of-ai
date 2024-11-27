import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatRequestAssistantMessage;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.core.credential.AzureKeyCredential;

import java.util.ArrayList;
import java.util.List;

public class OpenAIChatCompletionsClass {

    private OpenAIClient client;
    private ChatCompletionsOptions options;
    private String openAIChatDeployment;
    private String openAISystemPrompt;

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

    public void ClearConversation(){
        List<ChatRequestMessage> chatMessages = options.getMessages();
        chatMessages.clear();
        chatMessages.add(new ChatRequestSystemMessage(this.openAISystemPrompt));
    }

    public String getChatCompletion(String userPrompt) {
        options.getMessages().add(new ChatRequestUserMessage(userPrompt));

        ChatCompletions chatCompletions = client.getChatCompletions(this.openAIChatDeployment, options);
        String responseContent = chatCompletions.getChoices().get(0).getMessage().getContent();
        options.getMessages().add(new ChatRequestAssistantMessage(responseContent.toString()));

        return responseContent;
    }
}