<template>
  <View :style="styles.container">
    <Text :style="styles.title">{{title}}</Text>
  </View>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    title: String
  },
  setup() {
    return {
      styles: {
        container: {
          height: 50,
          backgroundColor: "#333",
          justifyContent: "center",
          zIndex: 100,
        },
        title: {
          textAlign: "center",
          color: "#fff",
          fontSize: 17,
          fontWeight: "600",
        },
        icon: {
          width: 9,
          height: 14,
        },
        back: {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 40,
          justifyContent: "center",
          alignItems: "center",
        },
      },
    };
  },
};
</script>

<style scoped>
</style>
