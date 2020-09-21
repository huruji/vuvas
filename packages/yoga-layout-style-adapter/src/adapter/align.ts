import { yoga as Yoga } from '../init'

export const ALIGN_ADAPTER = {
  auto: () => Yoga.ALIGN_AUTO,
  baseline: () => Yoga.ALIGN_BASELINE,
  center: () => Yoga.ALIGN_CENTER,
  'flex-start': () => Yoga.ALIGN_FLEX_START,
  'flex-end': () => Yoga.ALIGN_FLEX_END,
  'space-around': () => Yoga.ALIGN_SPACE_AROUND,
  'space-between': () => Yoga.ALIGN_SPACE_BETWEEN,
  stretch: () => Yoga.ALIGN_STRETCH
}

export const alignParam = (val: keyof typeof ALIGN_ADAPTER) => [ALIGN_ADAPTER[val]()]
