# yoga-layout-style-adaptor

just adapt yoga-layout with css style, so we can use yoga-layout with no pain

## why

yoga-layout 只暴漏了类似 setHeight、setFlex 这类方法，而且对于各种样式还需要自己适配，那么这就是你想要的这个适配器，通过一个 setStyle 方法就可以实现。

## how to use

```bash
npm i yoga-layout-style-adaptor -S
```

```js
import { setStyle } from 'yoga-layout-style-adaptor'


setStyle(yogaNode, cssStyle)
```

就是这么简单就可以将 css 样式应用到 yoga 节点中

同时也 export 了对应的样式接口

```js
import type { CSSProperties } from 'yoga-layout-style-adaptor'
```
