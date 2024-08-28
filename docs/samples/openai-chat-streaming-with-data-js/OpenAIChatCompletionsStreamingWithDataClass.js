const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

class OpenAIChatCompletionsStreamingWithDataClass {
  constructor(openAIEndpoint, openAIAPIKey, openAIChatDeploymentName, openAISystemPrompt, searchEndpoint, searchAPIKey, searchIndexName, openAIEmbeddingsEndpoint) {
    this.openAISystemPrompt = openAISystemPrompt;
    this.openAIChatDeploymentName = openAIChatDeploymentName;
    this.client = new OpenAIClient(openAIEndpoint, new AzureKeyCredential(openAIAPIKey));

    this.azureExtensionOptions = {
      azureExtensionOptions: {
        extensions: [
          {
            type: "AzureCognitiveSearch",
            endpoint: searchEndpoint,
            key: searchAPIKey,
            indexName: searchIndexName,
            embeddingEndpoint: openAIEmbeddingsEndpoint,
            embeddingKey: openAIAPIKey,
            queryType: "vectorSimpleHybrid"
          },
        ],
      }
    }

    this.clearConversation();
  }

  clearConversation() {
    this.messages = [
      { role: 'system', content: this.openAISystemPrompt }
    ];
  }

  async getChatCompletions(userInput, callback) {
    this.messages.push({ role: 'user', content: userInput });

    let contentComplete = '';
    const events = await this.client.streamChatCompletions(this.openAIChatDeploymentName, this.messages, this.azureExtensionOptions);

    for await (const event of events) {
      for (const choice of event.choices) {

        let content = choice.delta?.content;
        if (choice.finishReason === 'length') {
          content = `${content}\nERROR: Exceeded token limit!`;
        }

        if (content != null) {
          if(callback != null) {
            callback(content);
          }
          await new Promise(r => setTimeout(r, 50)); // delay to simulate real-time output, word by word
          contentComplete += content;
        }
      }
    }

    this.messages.push({ role: 'assistant', content: contentComplete });
    return contentComplete;
  }
}

exports.OpenAIChatCompletionsStreamingWithDataClass = OpenAIChatCompletionsStreamingWithDataClass;