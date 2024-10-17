public class Program
{
    public static void Main(string[] args)
    {
        var modelDirectory = Environment.GetEnvironmentVariable("ONNX_GENAI_MODEL_PATH") ?? "<insert your ONNX GenAI model path here>";
        var systemPrompt = Environment.GetEnvironmentVariable("ONNX_GENAI_SYSTEM_PROMPT") ?? "You are a helpful assistant.";

        if (string.IsNullOrEmpty(modelDirectory) || modelDirectory.StartsWith("<insert") ||
            string.IsNullOrEmpty(systemPrompt) || systemPrompt.StartsWith("<insert"))
        {
            Console.WriteLine("To use this ONNX GenAI sample, set the following environment variables:");
            Console.WriteLine("  ONNX_GENAI_MODEL_PATH\n  ONNX_GENAI_SYSTEM_PROMPT");
            Environment.Exit(1);
        }

        var chat = new OnnxGenAIChatStreamingClass(modelDirectory, systemPrompt);

        while (true)
        {
            Console.Write("User: ");
            var input = Console.ReadLine();
            if (string.IsNullOrEmpty(input) || input == "exit") break;

            Console.Write("\nAssistant: ");
            chat.GetChatCompletionStreaming(input, update => {
                Console.Write(update);
            });
            Console.WriteLine("\n");
        }
    }
}