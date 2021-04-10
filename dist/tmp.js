export class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.container = "";
    }
    transform(chunk, controller) {
        this.container += chunk;
        const lines = this.container.split("\n");
        this.container = lines.pop();
        const textenc = new TextEncoder();
        lines.forEach((line) => controller.enqueue(textenc.encode(line)));
    }
    flush(controller) {
        controller.enqueue(this.container);
    }
}
//# sourceMappingURL=tmp.js.map