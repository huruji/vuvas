<template>
  <Panel label="Easing">
        <View :style="[styles.box, style]" />
        <View :style="styles.row">
          <AnimateButton
            label="linear"
            type="translateX"
            :ease="Easing.linear"
            :from="0"
            :to="canvas.clientWidth - 80"
            :onAnimate="onAnim"
          />
          <AnimateButton
            label="ease"
            type="translateX"
            :ease="Easing.ease"
            :from="0"
            :to="canvas.clientWidth - 80"
            :onAnimate="onAnim"
          />
          <AnimateButton
            label="bounce"
            type="translateX"
            :ease="Easing.bounce"
            :from="0"
            :to="canvas.clientWidth - 80"
            :onAnimate="onAnim"
          />
          <AnimateButton
            label="ease-out"
            type="translateX"
            :ease="Easing.out()"
            :from="0"
            :to="canvas.clientWidth - 80"
            :onAnimate="onAnim"
          />
        </View>
      </Panel>
</template>

<script>
import { ref } from "vue";
import { Easing } from 'vuvas'
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
      canvas: document.querySelector('canvas'),
      Easing
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

