const { OpenAI } = require('openai');

class OpenAIAssistantsCodeInterpreterStreamingClass {

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
  async getResponse(userInput, callback) {

    if (this.thread == null) {
      await this.createThread();
    }

    await this.openai.beta.threads.messages.create(this.thread.id, { role: "user", content: userInput });
    let stream = await this.openai.beta.threads.runs.stream(this.thread.id, {
      assistant_id: this.openAIAssistantId,
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
    });
    stream.on('toolCallCreated', (toolCall) => {
      if (toolCall.type === 'code_interpreter') {
        process.stdout.write('\n\nassistant-code:\n');
      }
    });
    stream.on('toolCallDelta', (toolCallDelta, snapshot) => {
      if (toolCallDelta.type === 'code_interpreter') {
        if (toolCallDelta.code_interpreter.input) {
          process.stdout.write(toolCallDelta.code_interpreter.input);
        }
        if (toolCallDelta.code_interpreter.outputs) {
          process.stdout.write('\n\nassistant-output:');
          toolCallDelta.code_interpreter.outputs.forEach(output => {
            if (output.type === "logs") {
              process.stdout.write(`\n${output.logs}\n`);
            }
          });
        }
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
}

exports.OpenAIAssistantsCodeInterpreterStreamingClass = OpenAIAssistantsCodeInterpreterStreamingClass;
