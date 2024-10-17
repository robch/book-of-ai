const { OpenAI } = require('openai');

class OpenAIAssistantsClass {

  // Constructor
  constructor(openAIAssistantId, openai, simulateTypingDelay = 0) {
    this.simulateTypingDelay = simulateTypingDelay;
    this.openAIAssistantId = openAIAssistantId;
    this.thread = null;
    this.openai = openai;
  }

  // Create a new the thread
  async createThread() {
    this.thread = await this.openai.beta.threads.create();
    return this.thread;
  }
  
  // Retrieve an existing thread
  async retrieveThread(threadId) {
    this.thread = await this.openai.beta.threads.retrieve(threadId);
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
  async getResponse(userInput) {

    if (this.thread == null) {
      await this.createThread();
    }

    await this.openai.beta.threads.messages.create(this.thread.id, { role: "user", content: userInput });
    const run = await this.openai.beta.threads.runs.createAndPoll(this.thread.id, { assistant_id: this.openAIAssistantId });
    if (run.status === 'completed') {
      const messages = await this.openai.beta.threads.messages.list(run.thread_id)
      return messages.data[0].content.map(item => item.text.value).join('');
    }

    return run.status.toString();
  }
}

exports.OpenAIAssistantsClass = OpenAIAssistantsClass;
