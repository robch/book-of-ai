import java.util.Scanner;
import reactor.core.publisher.Flux;
import com.azure.ai.openai.models.ChatCompletions;

public class Main {

    public static void main(String[] args) {
        String openAIAPIKey = (System.getenv("AZURE_OPENAI_API_KEY") != null) ? System.getenv("AZURE_OPENAI_API_KEY") : "<insert your OpenAI API key here>";
        String openAIEndpoint = (System.getenv("AZURE_OPENAI_ENDPOINT") != null) ? System.getenv("AZURE_OPENAI_ENDPOINT") : "<insert your OpenAI endpoint here>";
        String openAIChatDeployment = (System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") != null) ? System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") : "<insert your OpenAI chat deployment name here>";
        String openAISystemPrompt = (System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") != null) ? System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") : "You are a helpful AI assistant.";

        OpenAIChatCompletionsStreamingClass chat = new OpenAIChatCompletionsStreamingClass(openAIAPIKey, openAIEndpoint, openAIChatDeployment, openAISystemPrompt);

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
    }
}