class FunctionCallContext {
  constructor(function_factory, messages) {
    this.function_factory = function_factory;
    this.messages = messages;
    this.function_name = "";
    this.function_arguments = "";
  }

  checkForUpdate(choice) {
    let updated = false;

    const name = choice.delta?.function_call?.name;
    if (name !== undefined) {
      this.function_name = name;
      updated = true;
    }

    const args = choice.delta?.function_call?.arguments;
    if (args !== undefined) {
      this.function_arguments = `${this.function_arguments}${args}`;
      updated = true;
    }

    return updated;
  }

  tryCallFunction() {
    let result = this.function_factory.tryCallFunction(this.function_name, this.function_arguments);
    if (result === undefined) {
      return undefined;
    }

    this.messages.push({ role: 'assistant', function_call: { name: this.function_name, arguments: this.function_arguments } });
    this.messages.push({ role: 'function', content: result, name: this.function_name });

    return result;
  }

  clear() {
    this.function_name = "";
    this.function_arguments = "";
  }
}

exports.FunctionCallContext = FunctionCallContext;