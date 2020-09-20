import { Container } from '../../container'
import { Node } from '../../Node'
import { Vuvas } from '../../vuvas'

export default class View extends Node {
  constructor(root: Vuvas, container: Container) {
    super('View', {}, root, container)
  }
}