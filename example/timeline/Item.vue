<template>
  <View :style="this.style.item">
    <Image :style="coverStyle" :src="src" />
    <View style={this.style.text}>
      <Text style={styles.title} :numberOfLines="2">
        {{title}}
      </Text>
      <Text style={styles.text} :numberOfLines="lines">
        {{excerpt}}
      </Text>
    </View>
  </View>
</template>

<script lang="ts">
import { ref } from 'vue'

function createItemTextStyle(index: number, animated: any, height: number) {
  const offset = (index - 1) * height;
  const translateY = animated.interpolate([offset, offset + height], [-height / 2, 0]);
  const opacity = animated.interpolate([offset + height / 2, offset + height, offset + 2 * height], [0, 1, 0]);
  return {
    item: {
      height,
    },
    cover: {
      backgroundColor: '#eee',
      height: height / 2,
      zIndex: 1,
    },
    text: { margin: 20, translateY, opacity, animated: true, height: height / 2 },
  };
}

export default {
  props: {
    src: String,
    title: String,
    excerpt: String,
    index: Number,
    lines: Number
  },
  computed: {
    itemStyle() {
    }
  },
  setup() {
    const count = ref(0)
    const inc = () => {
      count.value++
    }
    const app = document.querySelector('#app')!
    const WINDOW_HEIGHT = app.querySelector('canvas')!.clientHeight

    return {
      count,
      inc,
      coverStyle: {
        backgroundColor: '#eee',
        height: WINDOW_HEIGHT / 2,
        zIndex: 1,
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
