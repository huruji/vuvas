<template>
  <Touchable :style="styles.button.container" :onPress="onPress">
    <Text :style="styles.button.text">{{label}}</Text>
  </Touchable>
</template>

<script>
import { ref } from "vue";
import { AnimatedValue, timing as animateTiming, Easing } from "vuvas";

export default {
  props: {
    ease: Object,
    label: String,
    type: String,
    from: Number,
    to: Number,
    onAnimate: Function,
  },
  data() {
    return {
      timing: null,
      onPress: () => {
        console.log('on')
      },
      animated: null
    };
  },
  mounted() {
    console.log('mounter')
    this.animated = new AnimatedValue(0);
    const style = {
      [this.type]: this.animated.interpolate(
        [0, 0.5, 1],
        [this.from, this.to, this.from]
      ),
      animated: true,
    };
    this.onPress = () => {
      console.log('onpress')
      this.timing && this.timing.stop();
      this.animated.setValue(0);
      this.timing = animateTiming(this.animated, {
        to: 1,
        duration: 2000,
        ease: this.ease || Easing.ease,
      }).start();
      this.onAnimate(style);
    };
  },
  setup(props, ctx) {
    return {
      styles: {
        button: {
          container: {
            flex: 1,
            height: 30,
            marginRight: 15,
            justifyContent: "center",
            backgroundColor: "#333",
          },
          text: {
            color: "#fff",
            fontSize: 12,
            textAlign: "center",
          },
        },
      },
    };
  },
};
</script>

