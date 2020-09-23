# vuvas

使用 vue 3.0 + css 在 canvas 上绘制高性能 UI

## 原理

Vue 3.0 中 将 dom 的渲染器单独抽离为了 [@vue/runtime-dom](https://github.com/vuejs/vue-next/tree/master/packages/runtime-dom)，[@vue/runtime-dom](https://github.com/vuejs/vue-next/tree/master/packages/runtime-dom) 可以看作是基于 [@vue/runtime-core](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core) 提供的 API 构建的 web DOM 渲染器，[@vue/runtime-core](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core) 可以看作是与环境无关的 vue 核心实现，Vuvas 真是基于此来构建的 Canvas 环境下的渲染器。Vuvas 底层布局基于 [yoga-layout](https://github.com/facebook/yoga)，因此可以很方便的使用 css flexbox 来布局我们的页面。

## 快速开始

安装

```bash
npm i vuvas -S
```

使用

> index.ts

```js
import { createApp } from 'vuvas'
import App from './index.vue'

createApp(App).mount(document.querySelector('#app'))
```

> index.vue

```html
<template>
  <View :style="styles.view">
      <Text :style="styles.text">{{text}}</Text>
  </View>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      text: 'vuvas',
      styles: {
        view: {
          height: 55,
          backgroundColor: "#D8D8D8",
        },
        text: {
          fontSize: 12,
          color: "#000",
        },
      },
    }
  }
};
</script>
```

## 组件

Vuvas 内置了帮助我们构建 UI 的基础组件，可以把这些组件视作 Vuvas 环境下的标准组件（类似于 web 环境下的 div、p等标签）。

### View

基础的布局组件，类似于 dom 中的 div、section 标签，例子：

```html
<template>
  <View :style="styles.container">
  </View>
</template>
```

### Text

文本标签，可以在标签内部添加文字，类似 dom 中的 p 标签，例子：

```html
<template>
  <View :style="styles.container">
    <Text> Vuvas </Text>
  </View>
</template>
```

### Image

基本的图像标签，通过 src 属性链接图片地址，使用这个可以显示图片，类似 dom 的 img 标签，例子：

```html

```

### Touchable

可触发 touch 事件的组件，使用这个组件可以添加 touchStart、touchMove、touchEnd、touchCancel 事件，例如实现一个 Button：

```html
<template>
  <Touchable  :onPress="log">
    <Text :style="styles.button.text">Button</Text>
  </Touchable>
</template>
```

### ScrollView

可滚动的组件，通过这个组件可以包裹其他组件来实现滚动效果：

```html
```


