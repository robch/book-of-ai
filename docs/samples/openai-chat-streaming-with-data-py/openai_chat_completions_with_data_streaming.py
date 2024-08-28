from openai import AzureOpenAI

class OpenAIChatCompletionsStreamingWithData:
    def __init__(self, openai_api_version, openai_endpoint, openai_key, openai_chat_deployment_name, openai_system_prompt, search_endpoint, search_api_key, search_index_name, openai_embeddings_endpoint):
        self.openai_system_prompt = openai_system_prompt
        self.openai_chat_deployment_name = openai_chat_deployment_name
        self.client = AzureOpenAI(
            api_key=openai_key,
            api_version=openai_api_version,
            base_url = f"{openai_endpoint.rstrip('/')}/openai/deployments/{openai_chat_deployment_name}/extensions"
            )
        self.extra_body={
            "dataSources": [
                {
                    "type": "AzureCognitiveSearch",
                    "parameters": {
                        "endpoint": search_endpoint,
                        "key": search_api_key,
                        "indexName": search_index_name,
                        "embeddingEndpoint": openai_embeddings_endpoint,
                        "embeddingKey": openai_key,
                        "queryType": "vectorSimpleHybrid"
                    }
                }
            ]
        }

        self.clear_conversation()

    def clear_conversation(self):
        self.messages = [
            {'role': 'system', 'content': self.openai_system_prompt}
        ]

    def get_chat_completions(self, user_input, callback):
        self.messages.append({'role': 'user', 'content': user_input})

        complete_content = ''
        response = self.client.chat.completions.create(
            model=self.openai_chat_deployment_name,
            messages=self.messages,
            extra_body=self.extra_body,
            stream=True)

        for chunk in response:

            choice0 = chunk.choices[0] if hasattr(chunk, 'choices') and chunk.choices else None
            delta = choice0.delta if choice0 and hasattr(choice0, 'delta') else None
            content = delta.content if delta and hasattr(delta, 'content') else ''

            finish_reason = choice0.finish_reason if choice0 and hasattr(choice0, 'finish_reason') else None
            if finish_reason == 'length':
                content += f"{content}\nERROR: Exceeded max token length!"

            if content is None: continue

            complete_content += content
            callback(content)

        self.messages.append({'role': 'assistant', 'content': complete_content})
        return complete_content