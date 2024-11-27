const { OpenAI } = require('openai');

class OpenAIAssistantsFileSearchStreamingClass {

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
    stream.on("messageDone", async (event) => {
      if (event.content[0].type === "text") {
        const { text } = event.content[0];
        const { annotations } = text;
        const citations = [];
  
        let index = 0;
        for (let annotation of annotations) {
          const { file_citation } = annotation;
          if (file_citation) {
            const citedFile = await this.openai.files.retrieve(file_citation.file_id);
            citations.push("[" + index + "] " + citedFile.filename);
          }
          index++;
        }

        if (citations.length > 0) {
          process.stdout.write(`\n\n${citations.join("\n")}\n`);
        }
      }
    });
  }

  async onTextDelta(textDelta, callback) {
    let content = textDelta.value;
    if (content != null) {
      if(callback != null) {
        if (textDelta.annotations) {
          for (let annotation of textDelta.annotations) {
            content = content.replace(annotation.text, `[${annotation.index}]`);
          }
        }
        callback(content);
        if (this.simulateTypingDelay > 0) {
          await new Promise(r => setTimeout(r, this.simulateTypingDelay));
        }
      }
    }
  }
}

exports.OpenAIAssistantsFileSearchStreamingClass = OpenAIAssistantsFileSearchStreamingClass;
