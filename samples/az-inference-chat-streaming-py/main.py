from azureml_chat_completions_streaming import AzureAIInferenceChatCompletionsStreaming
import os
import sys

def main():
    chat_api_key = os.getenv("AZURE_AI_CHAT_API_KEY", '<insert your Azure AI Inference API key here>')
    chat_endpoint = os.getenv("AZURE_AI_CHAT_ENDPOINT", '<insert your Azure AI Inference endpoint here>')
    chat_model = os.getenv('AZURE_AI_CHAT_MODEL', '')
    chat_system_prompt = os.getenv('SYSTEM_PROMPT', 'You are a helpful AI assistant.')

    ok = all([chat_api_key, chat_endpoint, chat_system_prompt]) and \
         all([not s.startswith('<insert') for s in [chat_api_key, chat_endpoint, chat_system_prompt]])
    if not ok:
        print(
            'To use Azure AI Chat Streaming, set the following environment variables:' +
            '\n- AZURE_AI_CHAT_API_KEY' +
            '\n- AZURE_AI_CHAT_ENDPOINT' +
            '\n- AZURE_AI_CHAT_MODEL (optional)' +
            '\n- SYSTEM_PROMPT (optional)')
        sys.exit(1)

    chat = AzureAIInferenceChatCompletionsStreaming(chat_endpoint, chat_api_key, chat_model, chat_system_prompt)

    while True:
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break

        print('\nAssistant: ', end='')
        response = chat.get_chat_completions(user_input, lambda content: print(content, end=''))
        print('\n')

if __name__ == '__main__':
    try:
        main()
    except EOFError:
        pass
    except Exception as e:
        print(f"The sample encountered an error: {e}")
        sys.exit(1)