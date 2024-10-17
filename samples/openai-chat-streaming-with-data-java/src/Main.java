import java.util.Scanner;
import reactor.core.publisher.Flux;
import com.azure.ai.openai.models.ChatCompletions;

public class Main {

    public static void main(String[] args) {
        String openAIAPIKey = (System.getenv("AZURE_OPENAI_API_KEY") != null) ? System.getenv("AZURE_OPENAI_API_KEY") : "<insert your OpenAI API key here>";
        String openAIEndpoint = (System.getenv("AZURE_OPENAI_ENDPOINT") != null) ? System.getenv("AZURE_OPENAI_ENDPOINT") : "<insert your OpenAI endpoint here>";
        String openAIChatDeployment = (System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") != null) ? System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") : "<insert your OpenAI chat deployment name here>";
        String openAISystemPrompt = (System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") != null) ? System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") : "You are a helpful AI assistant.";

        String azureSearchEmbeddingsDeploymentName = System.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT") != null ? System.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT") : "<insert your OpenAI embeddings deployment name here>";
        String azureSearchEndpoint = System.getenv("AZURE_AI_SEARCH_ENDPOINT") != null ? System.getenv("AZURE_AI_SEARCH_ENDPOINT") : "<insert your search endpoint here>";
        String azureSearchAPIKey = System.getenv("AZURE_AI_SEARCH_KEY") != null ? System.getenv("AZURE_AI_SEARCH_KEY") : "<insert your search api key here>";
        String azureSearchIndexName = System.getenv("AZURE_AI_SEARCH_INDEX_NAME") != null ? System.getenv("AZURE_AI_SEARCH_INDEX_NAME") : "<insert your search index name here>";

        OpenAIChatCompletionsWithDataStreamingClass chat = new OpenAIChatCompletionsWithDataStreamingClass(openAIAPIKey, openAIEndpoint, openAIChatDeployment, openAISystemPrompt, azureSearchEndpoint, azureSearchIndexName, azureSearchAPIKey, azureSearchEmbeddingsDeploymentName);

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
    }
}