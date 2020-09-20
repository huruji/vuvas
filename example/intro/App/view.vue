<template>
  <View :style="styles.container">
    <Navbar title="Overview"/>
    <View :style="styles.entries">
      <Entry label="Component" :onPress="() => goTo('/coms')" />
      <Entry label="Style" :onPress="() => goTo('/style')" />
      <Entry label="Animation" :onPress="() => goTo('/animation')" />
      <Entry label="Gesture" :onPress="() => goTo('/gesture')" />
      <Entry label="About" :onPress="() => goTo('about')" />
    </View>
  </View>
</template>

<script>
import { ref } from "vue";
import Navbar from "../Components/Navbar.vue";
import Entry from '../Components/Entry.vue'

export default {
  components: {
    Navbar,
    Entry
  },
  data() {

  },
  methods: {
    goTo(route) {
      if(!route) return
      $router.push(route)

    }
  },
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };
    return {
      styles: {
        container: {
          flex: 1,
          backgroundColor: '#fff'
        },
        entries: {
          flex: 1,
          justifyContent: "center",
        },
      },
    };
  },
};
</script>

