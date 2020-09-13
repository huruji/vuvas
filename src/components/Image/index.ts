import { DEFAULT_MEASURE, DrawTextOptions, applyTextStyle, drawText, measureText } from './drawtext';
import { applyAnimated, flatten, getFrameFromNode } from '../../util';

import { Container } from '../../container';
import { Node } from '../../Node';
import { Properties } from 'csstype';
import { Vuvas } from '../../vuvas';

export default class Image extends Node {
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

  customDrawer(text: string) {
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
        // this.style!.height = height
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