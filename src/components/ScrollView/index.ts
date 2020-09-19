import { Frame, Node } from '../../Node';
import Scroller, { VuvasScrollEvent } from './Scroller';

import { AnimatedValue } from '../../Animated';
import { Container } from '../../container';
import ScrollViewContent from './content';
import { Vuvas } from '../../vuvas';

export type ScrollViewOffset = { x?: number; y?: number; };

export default class ScrollView extends Node {
  private _height = -1;
  private _contentHeight = -1;
  private _width = -1;
  private _contentWidth = -1;
  public content: ScrollViewContent | null = null;

  _style: Record<string, any> = {};

  constructor (root: Vuvas, container: Container) {
    super('ScrollView', {}, root, container);
    this.content = new ScrollViewContent(root, container);
    this.children.push(this.content);
    this.content.parent = this;
    this.setProps({
      onLayout: this._onLayout,
      onTouchMove: this.content.scroller.touchMove,
      onTouchStart: this.content.scroller.touchStart,
      onTouchEnd: this.content.scroller.touchEnd
    });
  }

  setStyle = (style: any) => {
    this.style = Object.assign({}, style || {});
  };

  setProps(props: Record<string, any>) {
    // this.props = Object.assign({}, this.props, props)
    // const { offset } = this.props;
    // let { horizontal } = this.props;
    // if (horizontal === false || horizontal === undefined) {
    //   horizontal = false;
    // } else {
    //   horizontal = true;
    // }
    // this.content?.setProps({
    //   offset,
    //   horizontal
    // })
    // this.style.flexDirection = horizontal ? 'row' : 'column';
    // if (horizontal) {
    //   this.style.height = '100%'
    // } else {
    //   this.style.width = '100%'
    // }
    // this.content?.setStyle({})
    // return this.content;
  }


  private _onLayout = (frame: Frame) => {
    if (this._width !== frame.width || this._height !== frame.height) {
      this._height = frame.height;
      this._width = frame.width;
      this.content!.checkLayout();
      if (this.props.paging) {
        if (this.props.horizontal) {
          this.content!.scroller.pagingX = this.props.paging === true ? frame.width : this.props.paging;
        } else {
          this.content!.scroller.pagingY = this.props.paging === true ? frame.height : this.props.paging;
        }
      }
    }
  };
}