<template>
  <View :style="[styles.item]">
      <slot></slot>
      <Text :style="styles.itemText">{{ label }}</Text>
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

