<template>
  <View :style="viewStyle">
    <Text :style="style">text</Text>
  </View>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const inc = () => {
      count.value++
    }

    return {
      count,
      inc,
      viewStyle: {
        backgroundColor: 'red',
        height: 150,
      },
      style: {
        height: 100,
        flex: 1,
        fontSize: 30
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
