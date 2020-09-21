import { yoga as Yoga } from '../../init'

export const FLEXWRAP_ADAPTER = {
  'wrap': Yoga.WRAP_WRAP,
  'nowrap': Yoga.WRAP_NO_WRAP,
  'wrap-reverse': Yoga.WRAP_WRAP_REVERSE
}

export const flexWrapParam = (val: keyof typeof FLEXWRAP_ADAPTER) => [FLEXWRAP_ADAPTER[val]]
