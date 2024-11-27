export class FunctionFactory {
  constructor() {
    this.functions = {};
  }

  addFunction(schema, fun) {
    this.functions[schema.name] = { schema: schema, function: fun };
  }

  getFunctionSchemas() {
    return Object.values(this.functions).map(value => value.schema);
  }

  getTools() {
    return Object.values(this.functions).map(value => {
      return {
        type: "function",
        function: value.schema
      };
    });
  }

  tryCallFunction(function_name, function_arguments) {
    const function_info = this.functions[function_name];
    if (function_info === undefined) {
      return undefined;
    }

    var result = function_info.function(function_arguments);
    console.log(`assistant-function: ${function_name}(${function_arguments}) => ${result}`);

    return result;
  }
}
