import { Container } from '../../container'
import { Node } from '../../Node'
import { Vuvas } from '../../vuvas'

export default class Touchable extends Node {
  constructor(root: Vuvas, container: Container) {
    super('Touchable', {}, root, container)
  }
}