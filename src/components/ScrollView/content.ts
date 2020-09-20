import { Frame, Node } from '../../Node'
import Scroller, { VuvasScrollEvent } from './Scroller'

import { AnimatedValue } from '../../Animated'
import { Container } from '../../container'
import { Vuvas } from '../../vuvas'

export type ScrollViewOffset = { x?: number; y?: number };

export default class ScrollViewContent extends Node {
  private _height = -1;
  private _contentHeight = -1;
  private _width = -1;
  private _contentWidth = -1;
  private _innerStyle = {
    translateX: new AnimatedValue(0),
    translateY: new AnimatedValue(0),
    position: 'absolute',
    animated: true,
  };

  _style:Record<string, any> = {  }

  public offset: ScrollViewOffset = { x: 0, y: 0 };
  public onTouchMove:any
  public onTouchStart: any
  public onTouchEnd: any

  constructor(root: Vuvas, container: Container) {
    super('ScrollViewContent', {}, root, container)
    this.setStyle({})
    this._style = this._innerStyle
    this.onTouchMove = this.scroller.touchMove
    this.onTouchStart = this.scroller.touchStart
    this.onTouchEnd = this.scroller.touchEnd
    this.setProps({
      onLayout: this._onContentLayout,
      onTouchMove: this.scroller.touchMove,
      onTouchStart: this.scroller.touchStart,
      onTouchEnd: this.scroller.touchEnd
    })

  }

  setStyle = (style: any, needParent = true) => {
    const { offset, horizontal } = this.props;
    this.scroller.horizontal = horizontal;
    if (offset) {
      this.offset = offset;
      this.scroller.emit('none');
    }
    if (needParent) {
      this.parent?.setStyle(style)
    }
    this.style = Object.assign({}, style || {}, this._innerStyle)
  }

  setProps = (props: any) => {
    this.props = Object.assign({}, this.props, props)
    const { offset } = this.props;
    let { horizontal } = this.props;
    if (horizontal === false || horizontal === undefined) {
      horizontal = false;
    } else {
      horizontal = true;
    }
    this.props.horizontal = horizontal
    this.style!.flexDirection = horizontal ? 'row' : 'column';
    if (horizontal) {
      this.style!.height = '100%'
    } else {
      this.style!.width = '100%'
    }
    this.setStyle({...(this.style || {})}, false)
  }

  public scroller = new Scroller(e => {
    const { x = 0, y = 0 } = this.offset;
    this.props.horizontal ?
      this._innerStyle.translateX.setValue(x - e.x) :
      this._innerStyle.translateY.setValue(y - e.y);
    this.container.draw(true)
    switch (e.type) {
      case 'scroll':
        return this.props.onScroll && this.props.onScroll(e);
      case 'start':
        return this.props.onScrollStart && this.props.onScrollStart(e);
      case 'end':
        return this.props.onScrollEnd && this.props.onScrollEnd(e);
    }
  });

  private _onContentLayout = (frame: Frame) => {
    const { x = 0, y = 0 } = this.offset;
    const width = frame.width + x;
    const height = frame.height + y;
    if (this._contentWidth !== width || this._contentHeight !== height) {
      this._contentHeight = height;
      this._contentWidth = width;
      this.checkLayout();
    }
  };

  public checkLayout = () => {
    const maxX = this._contentWidth - this._width;
    const maxY = this._contentHeight - this._height;
    if ((maxX > 0 && maxX !== this.scroller.maxX) || (maxY > 0 && maxY !== this.scroller.maxY)) {
      this.scroller.maxX = maxX;
      this.scroller.maxY = maxY;
      this.scroller.emit('none');
    }
  };

}