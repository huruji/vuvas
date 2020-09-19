<template>
  <Touchable :onPress="onPress" :style="styles.container">
    <Text :style="styles.label">{{label}}</Text>
    <Image src="./assets/entry.jpg" :style="styles.icon" />
    <View :style="styles.line" />
  </Touchable>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    label: String,
    onPress: Function,
  },
  setup() {
    return {
      styles: {
        container: {
          height: 58,
          justifyContent: "center",
          paddingLeft: 20,
          backgroundColor: 'red'
        },
        label: {
          color: "#191919",
          fontSize: 15,
          fontWeight: "600",
        },
        line: {
          position: "absolute",
          left: 20,
          right: 0,
          bottom: 0,
          height: 1,
          backgroundColor: "#000",
          opacity: 0.05,
        },
        icon: {
          width: 9,
          height: 12,
          position: "absolute",
          right: 16,
          top: 23,
        },
      },
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
