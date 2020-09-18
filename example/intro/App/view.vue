<template>
  <View :style="styles.container">
    <Navbar title="Overview"/>
    <View :style="styles.entries">
      <Entry label="Component" :onPress="log" />
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
    log(str) {
      $router.push('/coms')
      debugger;
      console.log('str')
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

