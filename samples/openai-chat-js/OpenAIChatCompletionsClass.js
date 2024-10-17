const { OpenAI } = require('openai');

class OpenAIChatCompletionsClass {
  // Constructor
  constructor(openAIModelOrDeploymentName, systemPrompt, openai) {
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
  async getResponse(userInput) {
    this.messages.push({ role: 'user', content: userInput });

    const completion = await this.openai.chat.completions.create({
      model: this.openAIModelOrDeploymentName,
      messages: this.messages,
    });

    const choice = completion.choices[0];
    const content = choice.message?.content;
    if (choice.finish_reason === 'length') {
      content = `${content}\nERROR: Exceeded token limit!`;
    }

    this.messages.push({ role: 'assistant', content: content });
    return content;
  }
}

exports.OpenAIChatCompletionsClass = OpenAIChatCompletionsClass;