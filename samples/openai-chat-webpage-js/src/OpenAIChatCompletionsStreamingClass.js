const { OpenAI } = require('openai');

class OpenAIChatCompletionsStreamingClass {

  // Constructor
  constructor(openAIModelOrDeploymentName, systemPrompt, openai, simulateTypingDelay = 0) {
    this.simulateTypingDelay = simulateTypingDelay;
    this.systemPrompt = systemPrompt;
    this.openAIModelOrDeploymentName = openAIModelOrDeploymentName;
    this.openai = openai;

    this.clearConversation();
  }

  // Clear the conversation
  clearConversation() {
    this.messages = [
      { role: 'system', content: this.systemPrompt }
    ];
  }

  // Get the response from Chat Completions
  async getResponse(userInput, callback) {
    this.messages.push({ role: 'user', content: userInput });

    let response = '';
    const events = await this.openai.chat.completions.create({
      model: this.openAIModelOrDeploymentName,
      messages: this.messages,
      stream: true
    });

    for await (const event of events) {
      for (const choice of event.choices) {

        let content = choice.delta?.content;
        if (choice.finish_reason === 'length') {
          content = `${content}\nERROR: Exceeded token limit!`;
        }

        if (content != null) {
          if(callback != null) {
            callback(content);
            if (this.simulateTypingDelay > 0) {
              await new Promise(r => setTimeout(r, this.simulateTypingDelay));
            }
          }
          response += content;
        }
      }
    }

    this.messages.push({ role: 'assistant', content: response });
    return response;
  }
}

exports.OpenAIChatCompletionsStreamingClass = OpenAIChatCompletionsStreamingClass;