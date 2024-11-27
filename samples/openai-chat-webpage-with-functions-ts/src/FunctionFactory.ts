export class FunctionFactory {
  private functions: { [key: string]: { schema: any, function: any } };

  constructor() {
    this.functions = {};
  }

  addFunction(schema: any, fun: any): void {
    this.functions[schema.name] = { schema: schema, function: fun };
  }

  getFunctionSchemas(): any[] {
    return Object.values(this.functions).map(value => value.schema);
  }

  tryCallFunction(function_name: string, function_arguments: string) {
    const function_info = this.functions[function_name];
    if (function_info === undefined) {
      return undefined;
    }

    return function_info.function(function_arguments);
  }
}