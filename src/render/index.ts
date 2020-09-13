import { Container } from '../container'
import { Node } from '../Node'
import Text from '../components/Text'
import View from '../components/View'
import { Vuvas } from '../vuvas'
import { createRenderer } from '@vue/runtime-core'
import { getNode } from '../get-node'

function createCanvas(scale: number) {
  const canvas = document.createElement('canvas');
  return canvas;
}

const createApp = (...args) => {
  const container = new Container()
  const scale = window.devicePixelRatio;
  let dom:HTMLCanvasElement = createCanvas(scale)
  const vuvas = new Vuvas(dom, scale)
  container.setCanvas(vuvas)
  const render = createRenderer({
    forcePatchProp(el, key){
      console.log('forcePatchProp')
      return false
    },
    patchProp(
      el: Node,
      key,
      prevValue,
      nextValue,
      isSVG = false,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    ){
      if(key === 'style') {
        el.setStyle(nextValue)
      }
    },
    insert(child, parent, anchor){
      if (child && parent) {
        parent.appendChild(child, anchor || null)
      }
    },
    remove(child){

      const parent = child.parentNode
      if(parent) {
        parent.removeNode(child)
      }
    },
    createElement(type, isSvg, isCustomizedBuiltIn){
      const node = getNode(type, vuvas, container)
      return node
    },
    createText(text: string){
      const textNode = getNode('Text', vuvas, container) as Text
      textNode.setText(text)
      textNode.setPureText(true)
      return textNode
    },
    createComment(text){

      console.log('createElement')
      return null
    },
    setText(node, text){

      console.log('setText');
      node.setText(text)
    },
    setElementText(el, text){

      console.log('setElementText');
      el.setText(text)
    },
    parentNode(node){

      return node.parentNode
    },
    nextSibling(node){

      return node.nextSibling
    },
    querySelector(selector){
      return document.querySelector(selector)
    },
    setScopeId(el, id){
      // return ''
      // el.setAttribute(id, '')
    },
    cloneNode(el){

      return null;
      // return el.cloneNode(true)
    },
    insertStaticContent(){

      console.log('insertStaticContent')
      return []
    }
  })

  const app = render.createApp(...args);

  const { mount } = app;

  app.mount = (el: string | HTMLElement) => {
    let root: HTMLElement
    if(typeof el === 'string') {
      root = document.querySelector(el) as HTMLElement
    } else {
      root = el
    }
    const view = new View(vuvas, container)
    root.appendChild(dom)
    container.setRoot(view)
    dom.setAttribute('style', 'width: 100%; height: 100%;');
    dom.width = dom.clientWidth * scale;
    dom.height = dom.clientHeight * scale;
    dom.getContext('2d')?.scale(scale, scale)
    view.setStyle({
      height: dom.clientHeight,
      width: dom.clientWidth
    })
    mount(view)

    container.draw(true)

    return view
  }

  return app
}

export default createApp
