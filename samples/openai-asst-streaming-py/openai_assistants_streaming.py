from typing_extensions import override
from openai import AssistantEventHandler

class EventHandler(AssistantEventHandler):

    def __init__(self, openai, callback):
        super().__init__()
        self.openai = openai
        self.callback = callback

    @override
    def on_text_delta(self, delta, snapshot):
        self.callback(delta.value)


    @override
    def on_event(self, event):
        if event.event == 'thread.run.failed':
            print(event)
            raise Exception('Run failed')
        super().on_event(event)

class OpenAIAssistantsStreamingClass:

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

    def get_response(self, user_input, callback) -> None:
        if self.thread == None:
            self.create_thread()

        message = self.openai.beta.threads.messages.create(
            thread_id=self.thread.id,
            role="user",
            content=user_input,
        )

        with self.openai.beta.threads.runs.stream(
            thread_id=self.thread.id,
            assistant_id=self.assistant_id,
            event_handler=EventHandler(self.openai, callback)
        ) as stream:
            stream.until_done()
