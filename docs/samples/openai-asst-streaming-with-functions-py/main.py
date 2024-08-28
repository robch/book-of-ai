import os
import sys
from openai import OpenAI
from openai_assistants_custom_functions import factory
from openai_assistants_functions_streaming import OpenAIAssistantsFunctionsStreamingClass

def main():

    # Which assistant, which thread?
    ASSISTANT_ID = os.getenv('ASSISTANT_ID') or "<insert your OpenAI assistant ID here>"
    threadId = sys.argv[1] if len(sys.argv) > 1 else None

    # NOTE: Never deploy your API Key in client-side environments like browsers or mobile apps
    # SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety

    # Get the required environment variables, and form the base URL for Azure OpenAI Assistants API
    AZURE_OPENAI_API_KEY = os.getenv('AZURE_OPENAI_API_KEY', '<insert your Azure OpenAI API key here>')
    AZURE_OPENAI_API_VERSION = os.getenv('AZURE_OPENAI_API_VERSION', '<insert your Azure OpenAI API version here>')
    AZURE_OPENAI_ENDPOINT = os.getenv('AZURE_OPENAI_ENDPOINT', '<insert your Azure OpenAI endpoint here>')
    AZURE_OPENAI_BASE_URL = f'{AZURE_OPENAI_ENDPOINT.rstrip("/")}/openai'

    # Check if the required environment variables are set
    ok = \
        ASSISTANT_ID != None and not ASSISTANT_ID.startswith('<insert') and \
        AZURE_OPENAI_API_KEY != None and not AZURE_OPENAI_API_KEY.startswith('<insert') and \
        AZURE_OPENAI_API_VERSION != None and not AZURE_OPENAI_API_VERSION.startswith('<insert') and \
        AZURE_OPENAI_ENDPOINT != None and not AZURE_OPENAI_ENDPOINT.startswith('<insert')

    if not ok:
        print('To use Azure OpenAI, set the following environment variables:\n' +
            '\n  ASSISTANT_ID' +
            '\n  AZURE_OPENAI_API_KEY' +
            '\n  AZURE_OPENAI_API_VERSION' +
            '\n  AZURE_OPENAI_ENDPOINT')
        print('\nYou can easily do that using the Azure AI CLI by doing one of the following:\n' +
          '\n  ai init' +
          '\n  ai dev shell' +
          '\n  python main.py' +
          '\n' +
          '\n  or' +
          '\n' +
          '\n  ai init' +
          '\n  ai dev shell --run "python main.py"')
        os._exit(1)

    # Create the OpenAI client
    print('Using Azure OpenAI (w/ API Key)...')
    openai = OpenAI(
        api_key = AZURE_OPENAI_API_KEY,
        base_url = AZURE_OPENAI_BASE_URL,
        default_query= { 'api-version': AZURE_OPENAI_API_VERSION },
        default_headers = { 'api-key': AZURE_OPENAI_API_KEY }
    )

    # Create the assistants streaming helper class instance
    assistant = OpenAIAssistantsFunctionsStreamingClass(ASSISTANT_ID, factory, openai)

    # Get or create the thread, and display the messages if any
    if threadId is None:
        assistant.create_thread()
    else:
        assistant.retrieve_thread(threadId)
        assistant.get_thread_messages(lambda role, content: print(f'{role.capitalize()}: {content}', end=''))

    # Loop until the user types 'exit'
    while True:
        # Get user input
        user_input = input('User: ')
        if user_input == 'exit' or user_input == '':
            break

        # Get the Assistant's response
        print('\nAssistant: ', end='')
        assistant.get_response(user_input, lambda content: print(content, end=''))

        print('\n')

    print(f"Bye! (threadId: {assistant.thread.id})")

if __name__ == '__main__':
    try:
        main()
    except EOFError:
        pass
    except Exception as e:
        print(f"The sample encountered an error: {e}")
        sys.exit(1)
