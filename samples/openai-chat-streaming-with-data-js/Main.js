const { OpenAIChatCompletionsStreamingWithDataClass } = require("./OpenAIChatCompletionsStreamingWithDataClass");
const { readline } = require("./ReadLineWrapper");

async function main() {

  const openAIAPIKey = process.env["AZURE_OPENAI_API_KEY"] || "<insert your OpenAI API key here>";
  const openAIAPIVersion = process.env["AZURE_OPENAI_API_VERSION"] || "<insert your OpenAI API version here>" ;
  const openAIEndpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<insert your OpenAI endpoint here>";
  const openAIChatDeploymentName = process.env["AZURE_OPENAI_CHAT_DEPLOYMENT"] || "<insert your OpenAI chat deployment name here>" ;
  const openAIEmbeddingsDeploymentName = process.env["AZURE_OPENAI_EMBEDDING_DEPLOYMENT"] || "<insert your OpenAI embeddings deployment here>" ;
  const openAIEmbeddingsEndpoint = `${openAIEndpoint.replace(/\/+$/, '')}/openai/deployments/${openAIEmbeddingsDeploymentName}/embeddings?api-version=${openAIAPIVersion}`;
  const openAISystemPrompt = process.env["AZURE_OPENAI_SYSTEM_PROMPT"] || "You are a helpful AI assistant." ;
  const searchEndpoint = process.env["AZURE_AI_SEARCH_ENDPOINT"] || "<insert your search endpoint here>" ;
  const searchAPIKey = process.env["AZURE_AI_SEARCH_KEY"] || "<insert your search api key here>" ;
  const searchIndexName = process.env["AZURE_AI_SEARCH_INDEX_NAME"] || "<insert your search index name here>" ;

  const chat = new OpenAIChatCompletionsStreamingWithDataClass(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, searchEndpoint, searchAPIKey, searchIndexName, openAIEmbeddingsEndpoint);

  while (true) {

    const input = await readline.question('User: ');
    if (input === 'exit' || input === '') break;

    let response = await chat.getChatCompletions(input, (content) => {
      console.log(`assistant-streaming: ${content}`);
    });

    console.log(`\nAssistant: ${response}\n`);
  }

  console.log('Bye!');
  process.exit();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };