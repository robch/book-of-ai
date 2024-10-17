const { OpenAI } = require('openai');
const { FunctionCallContext } = require("./FunctionCallContext");

class OpenAIChatCompletionsFunctionsStreamingClass {

  // Constructor
  constructor(openAIModelOrDeploymentName, systemPrompt, functionFactory, openai, simulateTypingDelay = 0) {
    this.simulateTypingDelay = simulateTypingDelay;
    this.systemPrompt = systemPrompt;
    this.openAIModelOrDeploymentName = openAIModelOrDeploymentName;
    this.openai = openai;
    this.functionFactory = functionFactory;

    this.clearConversation();
  }

  // Clear the conversation
  clearConversation() {
    this.messages = [
      { role: 'system', content: this.systemPrompt }
    ];
    this.functionCallContext = new FunctionCallContext(this.functionFactory, this.messages);
  }

  // Get the response from Chat Completions
  async getResponse(userInput, callback) {
    this.messages.push({ role: 'user', content: userInput });

    let response = '';
    while (true) {

      const events = await this.openai.chat.completions.create({
        model: this.openAIModelOrDeploymentName,
        messages: this.messages,
        functions: this.functionFactory.getFunctionSchemas(),
        stream: true
      });

      for await (const event of events) {
        for (const choice of event.choices) {

          this.functionCallContext.checkForUpdate(choice);

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

      if (this.functionCallContext.tryCallFunction() !== undefined) {
        this.functionCallContext.clear();
        continue;
      }

      this.messages.push({ role: 'assistant', content: response });
      return response;
    }
  }
}

exports.OpenAIChatCompletionsFunctionsStreamingClass = OpenAIChatCompletionsFunctionsStreamingClass;