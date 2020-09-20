<template>
  <View :style="[styles.box.view, boxStyle]">
      <Text :style="styles.box.text">{{text}}</Text>
  </View>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    text: String,
    boxStyle: Object
  },
  setup() {
    return {
      styles: {
        box: {
          view: {
            height: 55,
            backgroundColor: "#D8D8D8",
            marginBottom: 5,
            marginTop: 5,
            justifyContent: "center",
          },
          text: {
            fontSize: 12,
            color: "#000",
            fontWeight: "600",
            textAlign: "center",
          },
        },
      },
    };
  },
};
</script>

