from openai import AzureOpenAI
import os
import sys

openai_api_key = os.getenv('AZURE_OPENAI_API_KEY', '<insert your OpenAI API key here>')
openai_api_version = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
openai_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your OpenAI endpoint here>')
openai_chat_deployment_name = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', '<insert your OpenAI chat deployment name here>')
openai_system_prompt = os.getenv('AZURE_OPENAI_SYSTEM_PROMPT', 'You are a helpful AI assistant.')

client = AzureOpenAI(
  api_key=openai_api_key,
  api_version=openai_api_version,
  azure_endpoint = openai_endpoint
)

messages=[
    {'role': 'system', 'content': openai_system_prompt},
]

def get_chat_completions(user_input) -> str:
    messages.append({'role': 'user', 'content': user_input})

    response = client.chat.completions.create(
        model=openai_chat_deployment_name,
        messages=messages,
    )

    response_content = response.choices[0].message.content
    messages.append({'role': 'assistant', 'content': response_content})

    return response_content

def main():
    while True:
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break

        response_content = get_chat_completions(user_input)
        print(f"\nAssistant: {response_content}\n")

if __name__ == '__main__':
    try:
        main()
    except EOFError:
        pass
    except Exception as e:
        print(f"The sample encountered an error: {e}")
        sys.exit(1)