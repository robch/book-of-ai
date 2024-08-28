class FunctionFactory {
  constructor() {
    this.functions = {};
  }

  addFunction(schema, fun) {
    this.functions[schema.name] = { schema: schema, function: fun };
  }

  getFunctionSchemas() {
    return Object.values(this.functions).map(value => value.schema);
  }

  tryCallFunction(function_name, function_arguments) {
    const function_info = this.functions[function_name];
    if (function_info === undefined) {
      return undefined;
    }

    return function_info.function(function_arguments);
  }
}

exports.FunctionFactory = FunctionFactory;