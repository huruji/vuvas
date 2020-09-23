import { Container } from './container';
import { Vuvas } from './vuvas';

export class Frame {
  constructor (public x = 0, public y = 0, public width = 0, public height = 0) { }
}

export class Node<T = any> {
  public _style:Record<string, any> = {}
  public readonly children: Node[] = [];
  public frame = new Frame();
  public parent?: Node;
  public nextSibling?: Node | null;
  public style?: Record<string, any> = {};
  public customDrawer?: Function;
  constructor (public readonly type: string, public props: NodeProps & T, public canvas: Vuvas, public container: Container) { }
  get $ready() {
    if (this.props.$ready === false) {
      return false;
    }
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.$ready === false) {
        return false;
      }
    }
    return true;
  }
  setProps(props: Record<string, any>) {
    this.props = Object.assign({}, this.props, props);
  }
  public appendChild = (child: Node, anchor?: Node) => {
    if (child.type === 'ScrollViewContent') {
      child = child.parent!;
    }
    if (!anchor) {
      this.children.push(child);
      child.nextSibling = null;
      child.parent = this;
    }
    const index = this.children.indexOf(anchor!);
    if (index >= 0) {
      this.children.splice(index, 0, child);
      child.parent = this;
      child.nextSibling = anchor;
      if (index - 1 >= 0) {
        this.children[index - 1].nextSibling = child;
      }
      // child.nextSibling = this.children[index + 2] || null
    }
  };

  removeChild = (child: Node) => {
    if (child.type === 'ScrollViewContent') {
      child = child.parent!;
    }
    const index = this.children.indexOf(child);
    if (index >= 0) {
      this.children.splice(index, 1);
      if (index > 0) {
        const beforeChild = this.children[index - 1];
        const currentChild = this.children[index];
        beforeChild.nextSibling = currentChild || null;
      }
    }
  };

  setStyle = (style: any) => {
    this.style = Object.assign({}, style || {}, this._style);
  };
}

export interface VuvasTouch {
  identifier: number;
  x: number;
  y: number;
}

export type VuvasTouchType = 'touchstart' | 'touchmove' | 'touchend';

export interface VuvasTouchEvent {
  type: VuvasTouchType;
  touches: { [key: string]: VuvasTouch; };
  timestamp: number;
  [key: string]: any;
}

export type VuvasTouchEventListener = (event: VuvasTouchEvent) => any;

export interface BaseProps {
  children?: any;
  style?: any | any[];
  cache?: string | boolean;
  forceCache?: boolean;
}

export interface NodeProps extends BaseProps {
  onTouchStart?: VuvasTouchEventListener;
  onTouchMove?: VuvasTouchEventListener;
  onTouchEnd?: VuvasTouchEventListener;
  onLayout?: (frame: Frame) => any;
  pointerEvents?: 'auto' | 'none' | 'box-none';
  $ready?: boolean;
}