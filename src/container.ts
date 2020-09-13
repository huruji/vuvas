import { Node, RevasTouchEvent } from './Node';

import { Vuvas } from './Vuvas'
import { drawNode } from './draw';
import { promise } from './yoga-layout/init';
// import { updateLayout } from './css-layout'
import { updateLayout } from './yoga-layout';

// import { emitTouch, getNodeByTouch } from './touch';


export class Container {
  private _ready = false;
  private _next = false;
  private _reflow = false;
  private _root?: Node;
  private vuvas?: Vuvas
  private _canvas?: HTMLCanvasElement

  setCanvas(canvas: Vuvas){
    this.vuvas = canvas
    this._canvas = this.vuvas.canvas
  }

  get canvas() {
    return this.vuvas?.canvas
  }

  get width() {
    return this._canvas?.clientWidth || 0;
  }

  get height() {
    return this._canvas?.clientHeight || 0;
  }

  get scale() {
    return this.vuvas?.deviceRatio || 1;
  }

  constructor() {
    promise.then(this.ready);
  }

  public setRoot(root?: Node) {
    this._root = root;
  }

  public handleTouch = (evt: RevasTouchEvent) => {
    const { _root } = this;
    if (_root) {
      const emitted = new WeakSet<Node>();
      // Object.values(evt.touches).forEach(touch => {
      //   const node = getNodeByTouch(_root, evt.type, touch);
      //   // check if node is unmounted
      //   if (node.parent && !emitted.has(node)) {
      //     emitted.add(node);
      //     // emitTouch(node, evt);
      //   }
      // });
    }
  };

  public draw = (reflow = false) => {
    this._reflow = this._reflow || reflow;
    if (!this._ready) {
      this._next = true;
      return;
    }
    this._ready = false;
    const { _root, vuvas } = this;
    if (vuvas) {
      // if not unmounted
      if (this._reflow) {
        updateLayout(_root!)();
        this._reflow = false;
      }
      vuvas.context?.clearRect(0, 0, this.width, this.height);
      drawNode(vuvas, _root!, this);
      requestAnimationFrame(this.ready);
    }
  };

  private ready = () => {
    this._ready = true;
    if (this._next) {
      this._next = false;
      this.draw();
    }
  };
}
