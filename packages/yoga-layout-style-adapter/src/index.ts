import { yoga as Yoga, onReady, promise } from './init'
import {
  alignParam,
  displayParam,
  flexDirectionParam,
  flexWrapParam,
  justifyContentParam,
  overflowParam,
  positionParam,
} from './adapter/index';

import {
  CSSProperty
} from './interface';
import { YogaNode } from 'yoga-layout-wasm/asm';

const BORDER_FUNC_MAP = {
  setBorderWidth: {
    func: 'setBorder',
    param: (width: number) => [Yoga.EDGE_ALL, width]
  },
  setBorderLeftWidth: {
    func: 'setBorder',
    param: (width: number) => [Yoga.EDGE_LEFT, width]
  },
  setBorderTopWidth: {
    func: 'setBorder',
    param: (width: number) => [Yoga.EDGE_TOP, width],
  },
  setBorderRightWidth: {
    func: 'setBorder',
    param: (width: number) => [Yoga.EDGE_RIGHT, width],
  },
  setBorderBottomWidth: {
    func: 'setBorder',
    param: (width: number) => [Yoga.EDGE_BOTTOM, width],
  }
};

const MARGIN_FUNC_MAP = {
  setMargin: {
    func: 'setMargin',
    param: (val: number) => [Yoga.EDGE_ALL, val]
  },
  setMarginLeft: {
    func: 'setMargin',
    param: (val: number) => [Yoga.EDGE_LEFT, val]
  },
  setMarginTop: {
    func: 'setMargin',
    param: (val: number) => [Yoga.EDGE_TOP, val]
  },
  setMarginRight: {
    func: 'setMargin',
    param: (val: number) => [Yoga.EDGE_RIGHT, val]
  },
  setMarginBottom: {
    func: 'setMargin',
    param: (val: number) => [Yoga.EDGE_BOTTOM, val]
  }
};

const PADDING_FUNC_MAP = {
  setPadding: {
    func: 'setPadding',
    param: (val: number) => [Yoga.EDGE_ALL, val]
  },
  setPaddingLeft: {
    func: 'setPadding',
    param: (val: number) => [Yoga.EDGE_LEFT, val]
  },
  setPaddingTop: {
    func: 'setPadding',
    param: (val: number) => [Yoga.EDGE_TOP, val]
  },
  setPaddingRight: {
    func: 'setPadding',
    param: (val: number) => [Yoga.EDGE_RIGHT, val]
  },
  setPaddingBottom: {
    func: 'setPadding',
    param: (val: number) => [Yoga.EDGE_BOTTOM, val]
  }
};

function selfParam<T>() {
  return (val: T) => [val];
}

const FUNC_MAP: Record<string, { func: string, param: Function; }> = {
  setAlignContent: {
    func: 'setAlignContent',
    param: alignParam
  },
  setAlignItems: {
    func: 'setAlignItems',
    param: alignParam
  },
  setAlignSelf: {
    func: 'AlignSelf',
    param: alignParam
  },
  setAspectRatio: {
    func: 'setAspectRatio',
    param: selfParam<number>()
  },
  ...BORDER_FUNC_MAP,
  setDisplay: {
    func: 'setDisplay',
    param: displayParam
  },
  setFlex: {
    func: 'setFlex',
    param: selfParam<number>()
  },
  setFlexBasis: {
    func: 'setFlexBasis',
    param: selfParam<number | string>()
  },
  setFlexBasisPercent: {
    func: 'setFlexBasisPercent',
    param: selfParam<number>()
  },
  setFlexDirection: {
    func: 'setFlexDirection',
    param: flexDirectionParam
  },
  setFlexGrow: {
    func: 'setFlexGrow',
    param: selfParam<number>()
  },
  setFlexShrink: {
    func: 'setFlexShrink',
    param: selfParam<number>()
  },
  setFlexWrap: {
    func: 'setFlexWrap',
    param: flexWrapParam
  },
  setHeight: {
    func: 'setHeight',
    param: selfParam<number | string>()
  },
  setHeightAuto: {
    func: 'setHeightAuto',
    param: (): any[] => []
  },
  setHeightPercent: {
    func: 'setHeightPercent',
    param: selfParam<number>()
  },
  setJustifyContent: {
    func: 'setJustifyContent',
    param: justifyContentParam
  },
  ...MARGIN_FUNC_MAP,
  // setMarginAuto: {
  //   func: 'setMarginAuto'
  // },
  // setMarginPercent: {
  //   func: 'setMarginPercent'
  // },
  setMaxHeight: {
    func: 'setMaxHeight',
    param: selfParam<number | string>()
  },
  setMaxHeightPercent: {
    func: 'setMaxHeightPercent',
    param: selfParam<number>()
  },
  setMaxWidth: {
    func: 'setMaxWidth',
    param: selfParam<number | string>()
  },
  setMaxWidthPercent: {
    func: 'setMaxWidthPercent',
    param: selfParam<number>()
  },
  setMinHeight: {
    func: 'setMinHeight',
    param: selfParam<number | string>()
  },
  setMinHeightPercent: {
    func: 'setMinHeightPercent',
    param: selfParam<number>()
  },
  setMinWidth: {
    func: 'setMinWidth',
    param: selfParam<number | string>()
  },
  setMinWidthPercent: {
    func: 'setMinWidthPercent',
    param: selfParam<number>()
  },
  setOverflow: {
    func: 'setOverflow',
    param: overflowParam
  },
  ...PADDING_FUNC_MAP,
  // setPaddingPercent: {
  //   func: 'setPaddingPercent'
  // },
  // setPosition: {
  //   func: 'setPosition',
  //   param: positionParam
  // },
  // setPositionPercent: {
  //   func: 'setPositionPercent'
  // },
  setPosition: {
    func: 'setPositionType',
    param: positionParam
  },
  setWidth: {
    func: 'setWidth',
    param: selfParam<number | string>()
  },
  setWidthAuto: {
    func: 'setWidthAuto',
    param: selfParam<number>()
  },
  setWidthPercent: {
    func: 'setWidthPercent',
    param: selfParam<number | string>()
  }
};

export type AutoType = 'setWidthAuto' | 'setHeightAuto';
export type PercentType = 'setHeightPercent' | 'setMaxHeightPercent' | 'setMaxWidthPercent' | 'setMinHeightPercent' | 'setMinWidthPercent' | 'setWidthPercent';

function applyStyle(node: YogaNode, style: Partial<CSSProperty>) {
  for (const [key, val] of Object.entries(style)) {
    let mapKey = `set${key[0].toUpperCase()}${key.substr(1)}`;
    if (!FUNC_MAP[mapKey]) {
      continue;
    }
    if (['height', 'width'].includes(key)) {
      if (val === 'auto') {
        mapKey += 'Auto';
        const funcName: AutoType = FUNC_MAP[mapKey].func as AutoType;
        node[funcName]();
        continue;
      }
    }
    if (['height', 'width', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth'].includes(key)) {
      if (
        val !== Number(val)
        &&
        typeof val === 'string'
        &&
        typeof Number.parseFloat(val) === 'number'
        &&
        val.endsWith('%')
      ) {
        mapKey += 'Percent';
        const funcName: PercentType = FUNC_MAP[mapKey].func as PercentType
        const param: [number] = FUNC_MAP[mapKey].param(Number.parseFloat(val))
        node[funcName](...param)
      } else if (typeof val !== 'number') {
        continue;
      }
    }

    // hack style
    const funcName: PercentType = FUNC_MAP[mapKey].func as PercentType;
    const param: [number] = FUNC_MAP[mapKey].param(val)
    node[funcName](...param)
  }
}

export function setStyle(node: YogaNode, style: Partial<CSSProperty>) {
  console.log('style', style)
  if(Yoga._ready) {
    applyStyle(node, style)
  } else {
    onReady(() => applyStyle(node, style))
  }
}

export type CSSProperties = CSSProperty
