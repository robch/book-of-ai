from typing_extensions import override
from openai import AssistantEventHandler

class EventHandler(AssistantEventHandler):

    def __init__(self, function_factory, openai, callback):
        super().__init__()
        self.function_factory = function_factory
        self.openai = openai
        self.callback = callback

    @override
    def on_text_delta(self, delta, snapshot):
        self.callback(delta.value)


    @override
    def on_event(self, event):
        if event.event == 'thread.run.requires_action':
            run_id = event.data.id
            self.handle_requires_action(event.data, run_id)
        elif event.event == 'thread.run.failed':
            print(event)
            raise Exception('Run failed')
        super().on_event(event)

    def handle_requires_action(self, data, run_id):
        tool_outputs = []

        tool_calls = data.required_action.submit_tool_outputs.tool_calls
        if tool_calls != None:
            tool_outputs = self.get_tool_outputs(tool_calls)

        self.submit_tool_outputs(tool_outputs, run_id)

    def get_tool_outputs(self, tool_calls):
        tool_outputs = []
        for tool_call in tool_calls:
            if tool_call.type == 'function':
                result = self.function_factory.try_call_function(tool_call.function.name, tool_call.function.arguments)
                tool_outputs.append({ 'output': result, 'tool_call_id': tool_call.id })
        return tool_outputs

    def submit_tool_outputs(self, tool_outputs, run_id):
        with self.openai.beta.threads.runs.submit_tool_outputs_stream(
            thread_id=self.current_run.thread_id,
            run_id=self.current_run.id,
            tool_outputs=tool_outputs,
            event_handler=EventHandler(self.function_factory, self.openai, self.callback),
        ) as stream:
            stream.until_done()

class OpenAIAssistantsFunctionsStreamingClass:

    def __init__(self, assistant_id, function_factory, openai):
        self.assistant_id = assistant_id
        self.function_factory = function_factory
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
            tools=self.function_factory.get_tools(),
            event_handler=EventHandler(self.function_factory, self.openai, callback)
        ) as stream:
            stream.until_done()
