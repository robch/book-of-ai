import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.js";

export class OpenAIChatCompletionStreamingClass {
  systemPrompt: string;
  openAIModelOrDeploymentName: string;
  openai: OpenAI;
  messages: Array<ChatCompletionMessageParam>;

  // Constructor
  constructor(openAIModelOrDeploymentName: string, systemPrompt: string, openai: OpenAI) {
    this.systemPrompt = systemPrompt;
    this.openAIModelOrDeploymentName = openAIModelOrDeploymentName;
    this.openai = openai;
    this.messages = [
      { role: 'system', content: this.systemPrompt }
    ];
  }

  // Clear the conversation
  clearConversation() {
    this.messages = [
      { role: 'system', content: this.systemPrompt }
    ];
  }

  // Get the response from Chat Completions
  async getResponse(userInput: string, callback: ((arg0: string) => void) | null) {
    this.messages.push({ role: 'user', content: userInput });

    let response = '';
    while (true) {

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
            }
            response += content;
          }
        }
      }

      this.messages.push({ role: 'assistant', content: response });
      return response;
    }
  }
}