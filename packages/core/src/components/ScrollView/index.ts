import { Frame, Node } from '../../Node';
import Scroller, { VuvasScrollEvent } from './Scroller';

import { AnimatedValue } from '../../Animated';
import { Container } from '../../container';
import ScrollViewContent from './content';
import { Vuvas } from '../../vuvas';

export type ScrollViewOffset = { x?: number; y?: number; };

export default class ScrollView extends Node {
  public height = -1;
  private _contentHeight = -1;
  public width = -1;
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


  private _onLayout = (frame: Frame) => {
    if (this.width !== frame.width || this.height !== frame.height) {
      this.height = frame.height;
      this.width = frame.width;
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