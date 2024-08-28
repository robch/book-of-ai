import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
    	String openAIAPIKey = (System.getenv("AZURE_OPENAI_API_KEY") != null) ? System.getenv("AZURE_OPENAI_API_KEY") : "<insert your OpenAI API key here>";
        String openAIEndpoint = (System.getenv("AZURE_OPENAI_ENDPOINT") != null) ? System.getenv("AZURE_OPENAI_ENDPOINT") : "<insert your OpenAI endpoint here>";
        String openAIChatDeployment = (System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") != null) ? System.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT") : "<insert your OpenAI chat deployment name here>";
        String openAISystemPrompt = (System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") != null) ? System.getenv("AZURE_OPENAI_SYSTEM_PROMPT") : "You are a helpful AI assistant.";

        OpenAIChatCompletionsClass chat = new OpenAIChatCompletionsClass(openAIAPIKey, openAIEndpoint, openAIChatDeployment, openAISystemPrompt);

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
    }
}