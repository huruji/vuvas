<template>
  <View :style="styles.container">
    <Navbar title="Animation" />
    <ScrollView :style="styles.container">
      <AnimateType />
      <AnimateEase />
    </ScrollView>
  </View>
</template>

<script>
import { ref } from "vue";
import Navbar from "../Components/Navbar.vue";
import AnimateType from "../Components/AnimateType.vue";
import AnimateEase from "../Components/AnimateEase.vue"

export default {
  components: {
    Navbar,
    AnimateType,
    AnimateEase
  },
  data() {},
  methods: {},
  setup() {
    return {
      styles: {
        container: { flex: 1, backgroundColor: '#fff' },
        row: { flexDirection: "row", marginRight: -15, marginTop: 10 },
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
        box: {
          width: 50,
          height: 50,
          backgroundColor: "#D8D8D8",
        },
      },
    };
  },
};
</script>

