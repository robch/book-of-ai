class ReadLineWrapper {

  constructor() {
    this.lineGenerator = this.readlines();
  }

  async* readlines() {
    let buffer = '';
    for await (const chunk of process.stdin) {
      buffer += chunk;
      let i;
      while ((i = buffer.indexOf('\n')) >= 0) {
        yield buffer.substring(0, i).trimEnd();
        buffer = buffer.substring(i + 1);
      }
    }
  }

  async question(prompt) {
    process.stdout.write(prompt);
    const result = await this.lineGenerator.next();
    if(result.done) {
      return '';
    }
    return result.value;
  }
}

const readline = new ReadLineWrapper();

module.exports = { readline: readline };
