<template>
  <Panel label="Basic">
    <View :style="[styles.box, style]" />
    <View :style="styles.row">
      <AnimateButton label="opacity" type="opacity" :from="1" :to="0" :onAnimate="onAnim" />
      <AnimateButton
        label="translateX"
        type="translateX"
        :from="0"
        :to="canvas.clientWidth - 80 "
        :onAnimate="onAnim"
      />
      <AnimateButton label="rotation" type="rotate" :from="0" :to="Math.PI" :onAnimate="onAnim" />
      <AnimateButton label="scale" type="scale" :from="1" :to="0.5" :onAnimate="onAnim" />
    </View>
  </Panel>
</template>

<script>
import { ref } from "vue";
import AnimateButton from "./AnimationButton.vue";
import Panel from "./Panel.vue";

export default {
  components: {
    AnimateButton,
    Panel,
  },
  setup() {
    return {
      styles: {
        row: { flexDirection: "row", marginRight: -15, marginTop: 10 },
        box: {
          width: 50,
          height: 50,
          backgroundColor: "#40b883",
        },
      },
    };
  },
  data() {
    return {
      style: {},
      canvas: document.querySelector('canvas')
    };
  },
  methods: {
    onAnim(style) {
      this.style = style
      // this.style = style
    },
  },
};
</script>

