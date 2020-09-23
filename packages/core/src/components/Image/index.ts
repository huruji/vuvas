import * as imageLoader from './image-loader';

import { Container } from '../../container';
import { Node } from '../../Node';
import { Vuvas } from '../../vuvas';
import drawImage from './draw-image';

export default class Image extends Node {
  ready: boolean = false

  constructor (root: Vuvas, container: Container) {
    super('View', {}, root, container);
  }

  public customDrawer = () => {
    if(!this.ready) {
      const { src } = this.props
      if (src) {
        imageLoader.get(src, this.onReady);
      }
    } else {
      this.onReady()
    }
  }

  onReady = () => {
    this.ready = true
    drawImage(this.canvas, this, {})
  };
}