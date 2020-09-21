import Yoga, { YogaWasm } from 'yoga-layout-wasm/asm'

export const yoga: YogaWasm & { _ready?: boolean } = {} as any;

export const onReadyEvnets: Function[] = []

export const onReady = (fn: Function) => {
  onReadyEvnets.push(fn)
}

export const promise = Yoga.init().then(y => {
  Object.assign(yoga, y, { _ready: true })
  onReadyEvnets.forEach(fn => fn())
})
