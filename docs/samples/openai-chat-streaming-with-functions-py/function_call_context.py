import json
import logging

class FunctionCallContext:
    def __init__(self, function_factory, messages):
        self.function_factory = function_factory
        self.messages = messages
        self.function_name = ''
        self.function_arguments = ''

    def check_for_update(self, choice):
        updated = False

        delta = choice.delta if choice and hasattr(choice, 'delta') else {}
        name = delta.function_call.name if delta and hasattr(delta, 'function_call') and delta.function_call and hasattr(delta.function_call, 'name') else None
        if name is not None:
            self.function_name = name
            updated = True

        args = delta.function_call.arguments if delta and hasattr(delta, 'function_call') and delta.function_call and hasattr(delta.function_call, 'arguments') else None
        if args is not None:
            self.function_arguments = f'{self.function_arguments}{args}'
            updated = True

        return updated

    def try_call_function(self):

        dict = json.loads(self.function_arguments) if self.function_arguments != '' else None
        if dict is None: return None

        result = self.function_factory.try_call_function(self.function_name, dict)
        if result is None: return None
        
        self.messages.append({'role': 'assistant', 'content': None, 'function_call': {'name': self.function_name, 'arguments': self.function_arguments}})
        self.messages.append({'role': 'function', 'content': result, 'name': self.function_name})

        return result

    def clear(self):
        self.function_name = ''
        self.function_arguments = ''