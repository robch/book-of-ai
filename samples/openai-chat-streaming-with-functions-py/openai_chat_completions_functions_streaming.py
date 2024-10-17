from openai import AzureOpenAI
from function_call_context import FunctionCallContext

class OpenAIChatCompletionsFunctionsStreaming:
    def __init__(self, openai_api_version, openai_endpoint, openai_key, openai_chat_deployment_name, openai_system_prompt, function_factory):
        self.openai_system_prompt = openai_system_prompt
        self.openai_chat_deployment_name = openai_chat_deployment_name
        self.function_factory = function_factory
        self.client = AzureOpenAI(
            api_key=openai_key,
            api_version=openai_api_version,
            azure_endpoint = openai_endpoint
            )
        self.clear_conversation()

    def clear_conversation(self):
        self.messages = [
            {'role': 'system', 'content': self.openai_system_prompt}
        ]
        self.function_call_context = FunctionCallContext(self.function_factory, self.messages)

    def get_chat_completions(self, user_input, callback):
        self.messages.append({'role': 'user', 'content': user_input})

        complete_content = ''
        functions = self.function_factory.get_function_schemas()

        while True:
            response = self.client.chat.completions.create(
                model=self.openai_chat_deployment_name,
                messages=self.messages,
                stream=True,
                functions=functions,
                function_call='auto')

            for chunk in response:

                choice0 = chunk.choices[0] if hasattr(chunk, 'choices') and chunk.choices else None
                self.function_call_context.check_for_update(choice0)

                delta = choice0.delta if choice0 and hasattr(choice0, 'delta') else None
                content = delta.content if delta and hasattr(delta, 'content') else ''

                finish_reason = choice0.finish_reason if choice0 and hasattr(choice0, 'finish_reason') else None
                if finish_reason == 'length':
                    content += f"{content}\nERROR: Exceeded max token length!"

                if content is None: continue

                complete_content += content
                callback(content)

            if self.function_call_context.try_call_function() is not None:
                self.function_call_context.clear()
                continue

            self.messages.append({'role': 'assistant', 'content': complete_content})
            return complete_content