import { Frame, Node } from '../Node';

import { AppContextType } from '../../components/Context';
import { yoga as Yoga } from './init';
import type { YogaNode } from 'yoga-layout-wasm/asm';
import apply from './style';

function _updateLayout(node: Node): [Function, YogaNode] {
  const yoga = Yoga.Node.create();
  const children: Function[] = [];
  apply(yoga, node.style);
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const [f, y] = _updateLayout(child);
    const index = children.push(f);
    yoga.insertChild(y, index - 1);
  }
  function process(x = 0, y = 0) {
    const { left, top, width, height } = yoga.getComputedLayout();
    node.frame = new Frame(x + left, y + top, width, height);
    node.props.onLayout && node.props.onLayout(node.frame);
    for (let i = 0; i < children.length; i++) {
      children[i](node.frame.x, node.frame.y);
    }
    yoga.free();
  }
  return [process, yoga];
}

export function updateLayout(root: Node<AppContextType>) {
  const [process, yoga] = _updateLayout(root);
  const { clientWidth, clientHeight, RTL } = root.props;
  yoga.calculateLayout(clientWidth, clientHeight, RTL ? Yoga.DIRECTION_RTL : Yoga.DIRECTION_LTR);
  return process;
}
