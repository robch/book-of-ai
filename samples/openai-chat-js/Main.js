const { OpenAI } = require('openai');
const { OpenAIChatCompletionsClass } = require("./OpenAIChatCompletionsClass");
const { readline } = require("./ReadLineWrapper");

async function main() {

  // What's the system prompt?
  const AZURE_OPENAI_SYSTEM_PROMPT = process.env.AZURE_OPENAI_SYSTEM_PROMPT ?? "You are a helpful AI assistant.";

  // NOTE: Never deploy your API Key in client-side environments like browsers or mobile apps
  // SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety

  // Get the required environment variables
  const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
  const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
  const AZURE_OPENAI_CHAT_DEPLOYMENT = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT ?? "<insert your Azure OpenAI chat deployment name here>";
  const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
  const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai/deployments/${AZURE_OPENAI_CHAT_DEPLOYMENT}`;

  // Check if the required environment variables are set
  const azureOk = 
    AZURE_OPENAI_API_KEY != null && !AZURE_OPENAI_API_KEY.startsWith('<insert') &&
    AZURE_OPENAI_API_VERSION != null && !AZURE_OPENAI_API_VERSION.startsWith('<insert') &&
    AZURE_OPENAI_CHAT_DEPLOYMENT != null && !AZURE_OPENAI_CHAT_DEPLOYMENT.startsWith('<insert') &&
    AZURE_OPENAI_ENDPOINT != null && !AZURE_OPENAI_ENDPOINT.startsWith('<insert');

  const ok = azureOk &&
    AZURE_OPENAI_SYSTEM_PROMPT != null && !AZURE_OPENAI_SYSTEM_PROMPT.startsWith('<insert');

  if (!ok) {
    console.error(
      'To use Azure OpenAI, set the following environment variables:\n' +
      '\n  AZURE_OPENAI_SYSTEM_PROMPT' +
      '\n  AZURE_OPENAI_API_KEY' +
      '\n  AZURE_OPENAI_API_VERSION' +
      '\n  AZURE_OPENAI_CHAT_DEPLOYMENT' +
      '\n  AZURE_OPENAI_ENDPOINT'
    );
    console.error(
      '\nYou can easily do that using the Azure AI CLI by doing one of the following:\n' +
      '\n  ai init' +
      '\n  ai dev shell' +
      '\n  node main.js' +
      '\n' +
      '\n  or' +
      '\n' +
      '\n  ai init' +
      '\n  ai dev shell --run "node main.js"'
    );
    process.exit(1);
  }

  // Create the OpenAI client
  console.log('Using Azure OpenAI (w/ API Key)...');
  const openai = new OpenAI({
    apiKey: AZURE_OPENAI_API_KEY,
    baseURL: AZURE_OPENAI_BASE_URL,
    defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
    defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
  });

  // Create the streaming chat completions helper
  const chat = new OpenAIChatCompletionsClass(AZURE_OPENAI_CHAT_DEPLOYMENT, AZURE_OPENAI_SYSTEM_PROMPT, openai);
  
  // Loop until the user types 'exit'
  while (true) {

    // Get user input
    const input = await readline.question('User: ');
    if (input === 'exit' || input === '') break;

    // Get the response
    const response = await chat.getResponse(input);
    process.stdout.write(`\nAssistant: ${response}\n\n`);
  }

  console.log('Bye!');
  process.exit();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});

module.exports = { main };
