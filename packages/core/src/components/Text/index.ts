import { DEFAULT_MEASURE, DrawTextOptions, applyTextStyle, drawText, measureText } from './drawtext';
import { applyAnimated, flatten, getFrameFromNode } from '../../util';

import { Container } from '../../container';
import { Node } from '../../Node';
import { Properties } from 'csstype';
import { Vuvas } from '../../vuvas';

export type TextProps = NodeProps & {
  style?: any;
  numberOfLines?: number;
};
const TEXT_STYLES_LIST = [
  'fontStyle',
  'fontWeight',
  'fontSize',
  'fontFamily',
  'textBaseline',
  'wordBreak',
  'lineHeight',
];

const DEFAULT_TEXTSTYLE = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
  fontWeight: 'normal',
  fontSize: 14,
  color: '#000',
  fontStyle: 'normal',
  textBaseline: 'middle',
};

function textStyleChanged(left: any, right: any) {
  for (let i = 0; i < TEXT_STYLES_LIST.length; i++) {
    const item = TEXT_STYLES_LIST[i];
    if (left[item] !== right[item]) {
      return true;
    }
  }
  return false;
}

function textPropsChanged(left: DrawTextOptions, right?: DrawTextOptions) {
  if (!right) {
    return true;
  }
  if (left.content !== right.content) {
    return true;
  }
  if (left.numberOfLines !== right.numberOfLines) {
    return true;
  }
  if (left.frame.width !== right.frame.width) {
    return true;
  }
  return textStyleChanged(left.textStyle, right.textStyle);
}

function getTextFromNode(node: Text) {
  const frame = getFrameFromNode(node);
  if (frame.width > 0) {
    const { content } = node;
    if (typeof content === 'string') {
      return content;
    } else if (Array.isArray(content)) {
      return content.join('');
    }
  }
  return '';
}

function getTextStyleFromNode(node: Node) {
  const style = Object.assign({}, DEFAULT_TEXTSTYLE, ...flatten([node.style]));
  style.lineHeight = style.lineHeight || style.fontSize * 1.1;
  return applyAnimated(style);
}

export default class Text extends Node {
  _text?: string | string[];
  _measured = DEFAULT_MEASURE;
  height = 0
  _drawed?: DrawTextOptions;
  _isPureText:boolean = false

  constructor (root: Vuvas, container: Container, isPureText?: boolean) {
    super('Text', {}, root, container);
    this._isPureText = isPureText || false
  }

  setText(text: string) {
    this._text = text;
  }

  setPureText(isPureText: boolean) {
    this._isPureText = isPureText
  }

  customDrawer() {
    if (this._isPureText) return
    const frame = this.frame;
    let content = ''
    if (frame.width > 0) {
      const children = this.children as Text[];
      if(children.length && children[0]._isPureText) {
        const text = children[0]._text
        if (typeof text === 'string') {
          content = text
        } else if (Array.isArray(text)) {
          content = text.join('');
        }
      }
    }
    const node = this;
    if (content) {
      const options = {
        numberOfLines: node.props.numberOfLines || 0,
        textStyle: getTextStyleFromNode(node),
        frame: getFrameFromNode(node),
        content,
      };
      applyTextStyle(this.canvas, options);
      if (textPropsChanged(options, this._drawed)) {
        this._measured = measureText(this.canvas, options);
        this._drawed = options;
      }
      const [lines, height] = this._measured;
      if (height !== this.height) {
        this.setStyle({ ...this.style, height })
        this.height = height
        this.container.draw(true)
      } else {
        drawText(this.canvas, options, lines);
      }
    }

  }

  get text() {
    return this._text;
  }
}