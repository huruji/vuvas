import { Container } from '../../container'
import { Node } from '../../Node'
import { Vuvas } from '../../vuvas'

export default class ListView extends Node {
  constructor(root: Vuvas, container: Container) {
    super('ListView', {}, root, container)
  }
}