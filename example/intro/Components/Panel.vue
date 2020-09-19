<template>
  <View :style="styles.container">
      <Text :style="styles.label">{{ label }}</Text>
      <View :style="styles.line" />
      <slot></slot>
  </View>
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
          padding: 20,
        },
        label: {
          fontSize: 12,
          fontWeight: "600",
          color: "#000",
          opacity: 0.5,
        },
        line: {
          height: 1,
          backgroundColor: "#000",
          opacity: 0.05,
          marginTop: 10,
          marginBottom: 15,
        },
        item: {
          marginRight: 15,
        },
        itemText: {
          textAlign: "center",
          fontSize: 12,
          marginTop: 2,
        },
      },
    };
  },
};
</script>

