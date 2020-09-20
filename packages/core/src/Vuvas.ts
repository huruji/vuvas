export class Vuvas {
  public canvas: HTMLCanvasElement
  public deviceRatio: number
  public readonly transform: Transform;

  constructor(canvas: HTMLCanvasElement, deviceRatio: number) {
    this.canvas= canvas
    this.deviceRatio = deviceRatio
    this.transform = new Transform(this.context)
  }

  get context() {
    return this.canvas.getContext('2d')!
  }
}

export class Transform {
  _stack: DOMMatrix[] = [];

  _canGetTransform = false;

  constructor(public readonly context: CanvasRenderingContext2D) {
    this._canGetTransform = Boolean(context.getTransform);
  }

  save() {
    if (this._canGetTransform) {
      this._stack.push(this.context.getTransform());
    } else {
      this.context.save();
    }
  }

  restore() {
    if (this._canGetTransform) {
      if (this._stack.length > 0) {
        this.context.setTransform(this._stack.pop());
      }
    } else {
      this.context.restore();
    }
  }

  translate(x: number, y: number) {
    this.context.translate(x, y);
  }

  rotate(rad: number) {
    this.context.rotate(rad);
  }

  scale(sx: number, sy: number) {
    this.context.scale(sx, sy);
  }
}
