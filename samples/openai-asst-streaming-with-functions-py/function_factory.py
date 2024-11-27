class FunctionFactory:
    def __init__(self):
        self.functions = {}

    def add_function(self, schema, func):
        self.functions[schema['name']] = {'schema': schema, 'function': func}

    def get_function_schemas(self):
        return [value['schema'] for value in self.functions.values()]

    def get_tools(self):
        return [
            {"type": "function", "function": value["schema"]}
            for value in self.functions.values()
        ]

    def try_call_function(self, function_name, function_arguments):
        function_info = self.functions.get(function_name)
        if function_info is None:
            return None

        result = function_info['function'](function_arguments)
        print(f"\rassistant-function: {function_name}({function_arguments}) => {result}")
        print("\nAssistant: ", end='')

        return result
