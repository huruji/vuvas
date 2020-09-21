import { yoga as Yoga } from '../init'

export const FLEXDIRECTION_ADAPTER = {
  'column': () => Yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': () => Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  "row": () => Yoga.FLEX_DIRECTION_ROW,
  "row-reverse": () => Yoga.FLEX_DIRECTION_ROW_REVERSE
}

export const flexDirectionParam = (val: keyof typeof FLEXDIRECTION_ADAPTER) => [FLEXDIRECTION_ADAPTER[val]()]
