import { Node, VuvasTouch, VuvasTouchEvent } from '../../Node'

import { AnimatedValue } from '../../Animated';
import { Container } from '../../container'
import { Vuvas } from '../../vuvas'

export default class Touchable extends Node {
  private _style:Record<string, any> = {
    opacity: new AnimatedValue(1),
    animated: true
  }

  constructor(root: Vuvas, container: Container) {
    super('Touchable', {}, root, container)
    this.setProps({
      activeOpacity: 0.7
    })
    this.setStyle(this._style)
  }

  private _start?: VuvasTouch;
  private _tid = '';

  public onTouchStart = (e: VuvasTouchEvent) => {
    this._tid = Object.keys(e.touches)[0];
    this._start = e.touches[this._tid];
    this._style.opacity.setValue(this.props.activeOpacity!);
    this.props.onPressIn && this.props.onPressIn();
  };

  public onTouchEnd = (e: VuvasTouchEvent) => {
    if (this._start && e.touches[this._tid]) {
      if (Math.abs(this._start.x - e.touches[this._tid].x) < 3 &&
        Math.abs(this._start.y - e.touches[this._tid].y) < 3) {
        this.props.onPress && this.props.onPress();
      }
    }
    this._style.opacity.setValue(1);
    this.props.onPressOut && this.props.onPressOut();
  };

}