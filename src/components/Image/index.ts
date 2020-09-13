import * as imageLoader from './image-loader';

import { DEFAULT_MEASURE, DrawTextOptions, applyTextStyle, drawText, measureText } from './drawtext';
import { applyAnimated, flatten, getFrameFromNode } from '../../util';

import { Container } from '../../container';
import { Node } from '../../Node';
import { Properties } from 'csstype';
import { Vuvas } from '../../vuvas';
import drawImage from './draw-image';

export default class Image extends Node {
  ready: boolean = false

  constructor (root: Vuvas, container: Container) {
    super('View', {}, root, container);
  }

  customDrawer() {
    if(!this.ready) {
      const { src } = this.props
      if (src) {
        imageLoader.get(src, this.onReady);
      }
    }
  }

  onReady = () => {
    this.ready = true
    drawImage(this.canvas, this, {})
  };
}