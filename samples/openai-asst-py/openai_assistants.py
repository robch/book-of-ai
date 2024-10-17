class OpenAIAssistantsClass:

    def __init__(self, assistant_id, openai):
        self.assistant_id = assistant_id
        self.thread = None
        self.openai = openai

    def create_thread(self):
        self.thread = self.openai.beta.threads.create()
        return self.thread
    
    def retrieve_thread(self, thread_id):
        self.thread = self.openai.beta.threads.retrieve(thread_id)
        return self.thread
    
    def get_thread_messages(self, callback):
        messages = self.openai.beta.threads.messages.list(self.thread.id)
        messages.data.reverse()

        for message in messages.data:
            content = ''.join([item.text.value for item in message.content]) + '\n\n'
            callback(message.role, content)

    def get_response(self, user_input) -> str:
        if self.thread == None:
            self.create_thread()

        message = self.openai.beta.threads.messages.create(
            thread_id=self.thread.id,
            role="user",
            content=user_input,
        )

        run = self.openai.beta.threads.runs.create_and_poll(
            thread_id=self.thread.id,
            assistant_id=self.assistant_id
        )

        if run.status == 'completed': 
            messages = self.openai.beta.threads.messages.list(thread_id=self.thread.id)
            return ''.join([item.text.value for item in messages.data[0].content])

        return str(run.status)
