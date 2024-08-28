import { OpenAI } from "openai";

export class OpenAIAssistantsFunctionsStreamingClass {

  // Constructor
  constructor(openAIAssistantId, functionFactory, openai, simulateTypingDelay = 0) {
    this.simulateTypingDelay = simulateTypingDelay;
    this.openAIAssistantId = openAIAssistantId;
    this.functionFactory = functionFactory;
    this.thread = null;
    this.openai = openai;
  }

  // Create a new the thread
  async createThread() {
    this.thread = await this.openai.beta.threads.create();
    console.log(`Thread ID: ${this.thread.id}`);
    return this.thread;
  }
  
  // Retrieve an existing thread
  async retrieveThread(threadId) {
    this.thread = await this.openai.beta.threads.retrieve(threadId);
    console.log(`Thread ID: ${this.thread.id}`);
    return this.thread;
  }

  // Get the messages in the thread
  async getThreadMessages(callback) {

    const messages = await this.openai.beta.threads.messages.list(this.thread.id);
    messages.data.reverse();

    for (const message of messages.data) {
      let content = message.content.map(item => item.text.value).join('') + '\n\n';
      callback(message.role, content);
    }
  }

  // Get the response from the Assistant
  async getResponse(userInput, callback) {

    if (this.thread == null) {
      await this.createThread();
    }

    await this.openai.beta.threads.messages.create(this.thread.id, { role: "user", content: userInput });
    let stream = await this.openai.beta.threads.runs.stream(this.thread.id, {
      assistant_id: this.openAIAssistantId,
      tools: this.functionFactory.getTools()
    });

    let runCompletedPromise = new Promise((resolve) => {
      this.resolveRunCompletedPromise = resolve;
    });

    await this.handleStreamEvents(stream, callback);
    
    await runCompletedPromise;
    runCompletedPromise = null;
  }

  // Handle the stream events
  async handleStreamEvents(stream, callback) {
    stream.on('textDelta', async (textDelta, snapshot) => await this.onTextDelta(textDelta, callback));
    stream.on('event', async (event) => {
      if (event.event == 'thread.run.completed') {
        this.resolveRunCompletedPromise();
      }
      else if (event.event == 'thread.run.failed') {
        console.log(JSON.stringify(event));
        throw new Error('Run failed');
      }
      else if (event.event == 'thread.run.requires_action') {
        await this.onThreadRunRequiresAction(event, callback);
      }
    });
  }

  async onTextDelta(textDelta, callback) {
    let content = textDelta.value;
    if (content != null) {
      if(callback != null) {
        callback(content);
        if (this.simulateTypingDelay > 0) {
          await new Promise(r => setTimeout(r, this.simulateTypingDelay));
        }
      }
    }
  }

  async onThreadRunRequiresAction(event, callback) {
    let toolCalls = event.data?.required_action?.submit_tool_outputs?.tool_calls;
    if (toolCalls != null) {
      let tool_outputs = this.getToolOutputs(toolCalls);
      let stream = await this.openai.beta.threads.runs.submitToolOutputsStream(this.thread.id, event.data.id, { tool_outputs: tool_outputs})
      await this.handleStreamEvents(stream, callback);
    }
  }

  getToolOutputs(toolCalls) {
    let tool_outputs = [];
    for (let toolCall of toolCalls) {
      if (toolCall.type == 'function') {
        let result = this.functionFactory.tryCallFunction(toolCall.function?.name, toolCall.function?.arguments);
        tool_outputs.push({
          output: result,
          tool_call_id: toolCall.id
        });
      }
    }
    return tool_outputs;
  }
}
