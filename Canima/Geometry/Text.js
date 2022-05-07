class Text {
  constructor(content, color, font, size, alphaIncrement = 0.0001) {
    this.content = content;
    this.color = color;
    this.font = font;
    this.size = size;
    this.alpha = 0;
    this.alphaIncrement = alphaIncrement;
  }
  get isDone() {
    return this.alpha > 0.99;
  }
  draw(frequency, canvas, { x: x, y: y }) {
    for (let cycle = 0; cycle < frequency; cycle++) {
      if (!this.isDone) {
        canvas.drawText(this, x, y);
      }
    }
  }
}
