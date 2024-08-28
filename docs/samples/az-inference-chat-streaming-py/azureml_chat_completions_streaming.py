from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage, AssistantMessage
from azure.core.credentials import AzureKeyCredential

class AzureAIInferenceChatCompletionsStreaming:
    def __init__(self, chat_endpoint, chat_api_key, chat_model, chat_system_prompt):
        self.chat_system_prompt = chat_system_prompt
        self.chat_model = chat_model
        self.client = ChatCompletionsClient(endpoint=chat_endpoint, credential=AzureKeyCredential(chat_api_key))
        self.clear_conversation()

    def clear_conversation(self):
        self.messages = [
            SystemMessage(content=self.chat_system_prompt)
        ];

    def get_chat_completions(self, user_input, callback):
        self.messages.append(UserMessage(content=user_input))

        complete_content = ''
        response = self.client.complete(
            messages=self.messages,
            model=self.chat_model,
            stream=True,
        )

        for update in response:

            if update.choices is None or len(update.choices) == 0: 
                continue

            content = update.choices[0].delta.content or ""
            if content is None: continue

            complete_content += content
            callback(content)

        self.messages.append(AssistantMessage(content=complete_content))
        return complete_content