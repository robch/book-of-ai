from openai_chat_completions_custom_functions import factory
from openai_chat_completions_functions_streaming import OpenAIChatCompletionsFunctionsStreaming
import os
import sys

def main():
    openai_api_key = os.getenv('AZURE_OPENAI_API_KEY', '<insert your OpenAI API key here>')
    openai_api_version = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
    openai_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your OpenAI endpoint here>')
    openai_chat_deployment_name = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', '<insert your OpenAI chat deployment name here>')
    openai_system_prompt = os.getenv('AZURE_OPENAI_SYSTEM_PROMPT', 'You are a helpful AI assistant.')

    chat = OpenAIChatCompletionsFunctionsStreaming(openai_api_version, openai_endpoint, openai_api_key, openai_chat_deployment_name, openai_system_prompt, factory)

    while True:
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break

        print("\nAssistant: ", end="")
        response = chat.get_chat_completions(user_input, lambda content: print(content, end=""))
        print("\n")

if __name__ == '__main__':
    try:
        main()
    except EOFError:
        pass
    except Exception as e:
        print(f"The sample encountered an error: {e}")
        sys.exit(1)