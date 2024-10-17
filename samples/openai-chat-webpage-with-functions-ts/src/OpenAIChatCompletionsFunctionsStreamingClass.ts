import { OpenAIClient, AzureKeyCredential, ChatRequestMessage } from "@azure/openai";
import { FunctionCallContext } from "./FunctionCallContext"
import { FunctionFactory } from "./FunctionFactory"

export class OpenAIChatCompletionsFunctionsStreamingClass {
  private openAISystemPrompt: string;
  private openAIChatDeploymentName: string;
  private client: OpenAIClient;
  private messages: ChatRequestMessage[] = [];
  private functionCallContext: FunctionCallContext | undefined;
  private functionFactory: FunctionFactory;

  constructor(openAIEndpoint: string, openAIAPIKey: string, openAIChatDeploymentName: string, openAISystemPrompt: string, functionFactory: FunctionFactory) {
    this.openAISystemPrompt = openAISystemPrompt;
    this.openAIChatDeploymentName = openAIChatDeploymentName;
    this.client = new OpenAIClient(openAIEndpoint, new AzureKeyCredential(openAIAPIKey));
    this.functionFactory = functionFactory;
    this.clearConversation();
  }

  clearConversation(): void {
    this.messages = [
      { role: 'system', content: this.openAISystemPrompt }
    ];
    this.functionCallContext = new FunctionCallContext(this.functionFactory, this.messages);
  }

  async getChatCompletions(userInput: string, callback: (content: string) => void): Promise<string> {
    this.messages.push({ role: 'user', content: userInput });

    let contentComplete = '';
    while (true) {
      const events = await this.client.streamChatCompletions(this.openAIChatDeploymentName, this.messages, {
        functions: this.functionFactory.getFunctionSchemas(),
      });

      for await (const event of events) {
        for (const choice of event.choices) {

          this.functionCallContext!.checkForUpdate(choice);

          let content = choice.delta?.content;
          if (choice.finishReason === 'length') {
            content = `${content}\nERROR: Exceeded token limit!`;
          }

          if (content != null) {
            callback(content);
            await new Promise(r => setTimeout(r, 50)); // delay to simulate real-time output, word by word
            contentComplete += content;
          }
        }
      }

      if (this.functionCallContext!.tryCallFunction() !== undefined) {
        this.functionCallContext!.clear();
        continue;
      }

      this.messages.push({ role: 'assistant', content: contentComplete });
      return contentComplete;
    }
  }
}