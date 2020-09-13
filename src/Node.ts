import { Container } from './container'
import { Vuvas } from './vuvas'

export class Frame {
  constructor(public x = 0, public y = 0, public width = 0, public height = 0) {}
}

export class Node<T = any> {
  public readonly children: Node[] = [];
  public frame = new Frame();
  public parent?: Node;
  public nextSibling?: Node;
  public style?: Record<string, any> = {}
  customDrawer?: Function
  constructor(public readonly type: string, public props: NodeProps & T, public canvas: Vuvas, public container: Container) {}
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
    this.props = Object.assign({}, this.props, props)
  }
  public appendChild = (child: Node, anchor?: Node) => {
    if(!anchor) {
      this.children.push(child)
      child.nextSibling = null
      child.parent = this
    }
    const index = this.children.indexOf(anchor)
    if(index >= 0) {
      this.children.splice(index + 1, 0, child);
      child.parent = this
      anchor.nextSibling = child
      child.nextSibling = this.children[index + 2] || null
    }
  }

  removeChild = (child: Node) => {
    const index = this.children.indexOf(child)
    if(index >= 0) {
      this.children.splice(index, 1)
      if (index > 0) {
        const beforeChild = this.children[index - 1]
        const currentChild = this.children[index]
        beforeChild.nextSibling = currentChild || null
      }
    }
  }

  setStyle = (style: any) => {
    this.style = style || {}
  }
}

export interface RevasTouch {
  identifier: number;
  x: number;
  y: number;
}

export type RevasTouchType = 'touchstart' | 'touchmove' | 'touchend';

export interface RevasTouchEvent {
  type: RevasTouchType;
  touches: { [key: string]: RevasTouch };
  timestamp: number;
  [key: string]: any;
}

export type RevasTouchEventListener = (event: RevasTouchEvent) => any;

export interface BaseProps {
  children?: any;
  style?: any | any[];
  cache?: string | boolean;
  forceCache?: boolean;
}

export interface NodeProps extends BaseProps {
  onTouchStart?: RevasTouchEventListener;
  onTouchMove?: RevasTouchEventListener;
  onTouchEnd?: RevasTouchEventListener;
  onLayout?: (frame: Frame) => any;
  pointerEvents?: 'auto' | 'none' | 'box-none';
  $ready?: boolean;
}