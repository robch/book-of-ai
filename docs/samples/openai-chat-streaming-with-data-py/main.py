from openai_chat_completions_with_data_streaming import OpenAIChatCompletionsStreamingWithData
import os
import sys

def main():
    openai_api_key = os.getenv('AZURE_OPENAI_API_KEY', '<insert your OpenAI API key here>')
    openai_api_version = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your OpenAI API version here>')
    openai_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your OpenAI endpoint here>')
    openai_chat_deployment_name = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', '<insert your OpenAI chat deployment name here>')
    openai_embeddings_deployment_name = os.getenv('AZURE_OPENAI_EMBEDDING_DEPLOYMENT', '<insert your OpenAI embeddings deployment here>')
    openai_embeddings_endpoint = f"{openai_endpoint.rstrip('/')}/openai/deployments/{openai_embeddings_deployment_name}/embeddings?api-version={openai_api_version}"
    openai_system_prompt = os.getenv('AZURE_OPENAI_SYSTEM_PROMPT', 'You are a helpful AI assistant.')
    search_api_key = os.getenv('AZURE_AI_SEARCH_KEY', '<insert your search api key here>')
    search_endpoint =os.getenv('AZURE_AI_SEARCH_ENDPOINT', '<insert your search endpoint here>')
    search_index_name = os.getenv('AZURE_AI_SEARCH_INDEX_NAME', '<insert your search index name here>')

    chat = OpenAIChatCompletionsStreamingWithData(openai_api_version, openai_endpoint, openai_api_key, openai_chat_deployment_name, openai_system_prompt, search_endpoint, search_api_key, search_index_name, openai_embeddings_endpoint)

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