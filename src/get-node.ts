import { Container } from './container'
import Image from './components/Image'
import { Node } from './Node'
import Text from './components/Text'
import Touchable from './components/Touchable'
import View from './components/View'
import { Vuvas } from './vuvas'

const nodeMap: Record<string, (root: Vuvas, container: Container) => Node> = {
  'View': (root:Vuvas, container: Container) => new View(root, container),
  'Text': (root:Vuvas, container: Container) => new Text(root, container),
  'Image': (root:Vuvas, container: Container) => new Image(root, container),
  'Touchable': (root:Vuvas, container: Container) => new Touchable(root, container)
}
export const getNode = (type: string, root: Vuvas, container: Container) => {
  if(!nodeMap[type]) {
    return
  }
  return nodeMap[type](root, container)
}