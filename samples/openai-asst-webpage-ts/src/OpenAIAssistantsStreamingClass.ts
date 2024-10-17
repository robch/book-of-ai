import { OpenAI } from "openai";
import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs";
import { ChatCompletionAssistantMessageParam } from "openai/src/resources/index.js";

type azureOpenAIType = {
  azureOpenAIAPIVersion: string;
  azureOpenAIAPIKey: string;
  azureOpenAIEndpoint: string;
  azureOpenAIDeploymentName: string;
  openAIAssistantId: string;
};

type openAIType = {
  openAIAPIKey: string;
  openAIOrganization: string;
  openAIModelName?: string;
  openAIAssistantId: string;
};

export class OpenAIAssistantsStreamingClass {
  thread: OpenAI.Beta.Threads.Thread | null;

  // Create the class using the Azure OpenAI API, which requires a different setup, baseURL, api-key headers, and query parameters
  static createUsingAzure({
    azureOpenAIAPIKey,
    azureOpenAIAPIVersion,
    azureOpenAIEndpoint,
    azureOpenAIDeploymentName,
    openAIAssistantId,
  }: azureOpenAIType) {
    console.log("Using Azure OpenAI API...");

    return new OpenAIAssistantsStreamingClass(
      openAIAssistantId,
      azureOpenAIDeploymentName,
      new OpenAI({
        apiKey: azureOpenAIAPIKey,
        baseURL: `${azureOpenAIEndpoint.replace(/\/+$/, "")}/openai`,
        defaultQuery: { "api-version": azureOpenAIAPIVersion },
        defaultHeaders: { "api-key": azureOpenAIAPIKey },
        //  SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
        dangerouslyAllowBrowser: true,
      }),
      30
    );
  }

  // Create the class using the OpenAI API and an optional organization
  static createUsingOpenAI({
    openAIAPIKey,
    openAIOrganization,
    openAIModelName,
    openAIAssistantId,
  }: openAIType) {
    console.log("Using OpenAI API...");
    return new OpenAIAssistantsStreamingClass(
      openAIAssistantId,
      openAIModelName,
      new OpenAI({
        apiKey: openAIAPIKey,
        organization: openAIOrganization,
        dangerouslyAllowBrowser: true,
      })
    );
  }

  // Constructor
  constructor(
    private readonly openAIAssistantId: string,
    private readonly modelOrDeploymentName: string | undefined,
    private readonly openai: OpenAI,
    private readonly simulateTypingDelay = 0
  ) {
    this.modelOrDeploymentName = modelOrDeploymentName;
    this.simulateTypingDelay = simulateTypingDelay;
    this.openAIAssistantId = openAIAssistantId;
    this.thread = null;
    this.openai = openai;
  }

  getOpenAI() {
    return this.openai;
  }

  // Retrieve an existing thread
  async retrieveThread(threadId: string) {
    this.thread = await this.openai.beta.threads.retrieve(threadId);
    console.log(`Thread ID: ${this.thread.id}`);
    return this.thread;
  }

  // Get or create the thread
  async getOrCreateThread(threadId = null) {
    this.thread =
      threadId == null
        ? await this.openai.beta.threads.create()
        : await this.openai.beta.threads.retrieve(threadId);
    return this.thread;
  }

  // Get the messages in the thread
  async getThreadMessages(callback: (role: string, content: string) => void) {
    if (this.thread === null) {
      console.error("Current Thread is null");
      return;
    }

    const messages = await this.openai.beta.threads.messages.list(
      this.thread.id
    );
    messages.data.reverse();

    for (const message of messages.data) {
      let content =
        message.content
          .map(
            (item) =>
              (item as OpenAI.Beta.Threads.Messages.TextContentBlock).text.value
          )
          .join("") + "\n\n";
      callback(message.role, content);
    }
  }

  // Get the response from the Assistant
  async getResponse(userInput: string, callback: (content: string) => void) {
    if (this.thread == null) {
      this.thread = await this.getOrCreateThread();
    }

    await this.openai.beta.threads.messages.create(this.thread.id, {
      role: "user",
      content: userInput,
    });

    let response = "";
    let stream = this.openai.beta.threads.runs.stream(this.thread.id, {
      assistant_id: this.openAIAssistantId,
      stream: true,
    });

    for await (const chunk of stream) {
      const { delta } = chunk.data as any;
      if (delta) {
        const content = delta.content[0]?.text?.value || "";
        response += content;
        setTimeout(() => callback(content), this.simulateTypingDelay);
      }
    }

    await stream.finalMessages();
    return response;
  }

  async suggestTitle({ userInput, computerResponse }) {
    let messages: Array<
      | ChatCompletionAssistantMessageParam
      | ChatCompletionUserMessageParam
      | ChatCompletionSystemMessageParam
    > = [
      {
        role: "system",
        content:
          "You are a helpful assistant that answers questions, and on 2nd turn, will suggest a title for the interaction.",
      },
      { role: "user", content: userInput },
      { role: "assistant", content: computerResponse },
      {
        role: "system",
        content:
          "Please suggest a title for this interaction. Don't be cute or humorous in your answer. Answer only with a factual descriptive title. Do not use quotes. Do not prefix with 'Title:' or anything else. Just emit the title.",
      },
    ];

    const completion = await this.openai.chat.completions.create(
      {
        messages,
        model: this.modelOrDeploymentName || 'gpt-3.5-turbo',
      },
      {
        path: `/deployments/${this.modelOrDeploymentName}/chat/completions?api-version=2024-04-01-preview`,
      }
    );

    return completion.choices[0].message.content;
  }
}