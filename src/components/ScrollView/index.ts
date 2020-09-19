import { Frame, Node } from '../../Node'
import Scroller, { VuvasScrollEvent } from './Scroller'

import { AnimatedValue } from '../../Animated'
import { Container } from '../../container'
import { Vuvas } from '../../vuvas'

export type ScrollViewOffset = { x?: number; y?: number };

export default class ScrollView extends Node {
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

  private _offset: ScrollViewOffset = { x: 0, y: 0 };

  constructor(root: Vuvas, container: Container) {
    super('ScrollView', {}, root, container)
    this.setStyle({})
    this._style = this._innerStyle
    this.setProps({
      onLayout: this._onLayout,
      onTouchMove: this._scroller.touchMove,
      onTouchStart: this._scroller.touchStart,
      onTouchEnd: this._scroller.touchEnd
    })
  }

  setStyle = (style: any) => {
    const { offset, } = this.props;
    let { horizontal } = this.props
    if (horizontal === false || horizontal === undefined) {
      horizontal = false
    } else {
      horizontal = true
    }
    debugger;
    this._scroller.horizontal = horizontal
    if (offset) {
      this._offset = offset
      this._scroller.emit('none')
    }
    this.style = Object.assign({}, style || {}, this._innerStyle, {
      flexDirection: horizontal ? 'row' : 'column',
      [horizontal ? 'height' : 'width']: '100%',
    })
  }

  private _scroller = new Scroller(e => {
    const { x = 0, y = 0 } = this._offset;
    this.props.horizontal ?
      this._innerStyle.translateX.setValue(x - e.x) :
      this._innerStyle.translateY.setValue(y - e.y);
    switch (e.type) {
      case 'scroll':
        return this.props.onScroll && this.props.onScroll(e);
      case 'start':
        return this.props.onScrollStart && this.props.onScrollStart(e);
      case 'end':
        return this.props.onScrollEnd && this.props.onScrollEnd(e);
    }
  });

  private _onLayout = (frame: Frame) => {
    if (this._width !== frame.width || this._height !== frame.height) {
      this._height = frame.height;
      this._width = frame.width;
      this._checkLayout();
      if (this.props.paging) {
        if (this.props.horizontal) {
          this._scroller.pagingX = this.props.paging === true ? frame.width : this.props.paging;
        } else {
          this._scroller.pagingY = this.props.paging === true ? frame.height : this.props.paging;
        }
      }
    }
    // this.props.onLayout && this.props.onLayout(frame);
  };


  private _checkLayout = () => {
    const maxX = this._contentWidth - this._width;
    const maxY = this._contentHeight - this._height;
    if ((maxX > 0 && maxX !== this._scroller.maxX) || (maxY > 0 && maxY !== this._scroller.maxY)) {
      this._scroller.maxX = maxX;
      this._scroller.maxY = maxY;
      this._scroller.emit('none');
    }
  };
}