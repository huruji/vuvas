import { Container } from '../../container'
import { Node } from '../../Node'
import { Vuvas } from '../../vuvas'
import { drawGradient } from './draw'

export default class LinearGradient extends Node {
  _style:Record<string, any> = { path: true }
  constructor(root: Vuvas, container: Container) {
    super('LinearGradient', {}, root, container)
    this.setStyle(this._style)
  }

  customDrawer = () => {
    drawGradient(this.canvas, this)
  }
}