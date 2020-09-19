import { NodeProps } from '../../Node'
import { Vuvas } from '../../Vuvas'
import { getFrameFromNode } from '../../util'

export type LinearGradientProps = {
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  colors: string[];
} & NodeProps;

export function drawGradient(canvas: Vuvas, node: Node) {
  const { colors } = node.props as LinearGradientProps;
  if (colors && colors.length > 0) {
    const { start = { x: 0, y: 0 }, end = { x: 1, y: 0 } } = node.props as LinearGradientProps;
    const frame = getFrameFromNode(node);
    debugger;
    const grad = canvas.context.createLinearGradient(
      start.x * frame.width + frame.x,
      start.y * frame.height + frame.y,
      end.x * frame.width + frame.x,
      end.y * frame.height + frame.y
    );
    for (let i = 0; i < colors.length; i++) {
      grad.addColorStop(i / (colors.length - 1), colors[i]);
    }
    canvas.context.fillStyle = grad;
    canvas.context.fill();
  }
}