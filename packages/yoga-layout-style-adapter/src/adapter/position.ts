import { yoga as Yoga } from '../../init'

export const POSITION_ADAPTER = {
  relative: Yoga.POSITION_TYPE_RELATIVE,
  absolute: Yoga.POSITION_TYPE_ABSOLUTE
}

export const positionParam = (val: keyof typeof POSITION_ADAPTER) => [POSITION_ADAPTER[val]]
