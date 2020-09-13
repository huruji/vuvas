<template>
  <View :style="viewStyle">
    <Text :style="style">text</Text>
    <Image :style="imageStyle" src="http://pic.netbian.com/uploads/allimg/200909/214821-1599659301e316.jpg" />
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
        height: 50,
        fontSize: 30
      },
      imageStyle: {
        height: 100
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
