export class LineBreakTransformer {
  private container: string;

  constructor() {
    // A container for holding stream data until a new line.
    this.container = "";
  }

  transform(chunk: string, controller: any) {
    this.container += chunk;
    const lines = this.container.split("\n");
    this.container = lines.pop();
    const textenc = new TextEncoder();
    lines.forEach((line) => controller.enqueue(textenc.encode(line)));
  }

  flush(controller: any) {
    controller.enqueue(this.container);
  }
}
