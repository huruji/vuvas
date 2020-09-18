<template>
  <View :style="styles.container">
    <Text>test</Text>
  </View>
</template>

<script>
import { ref } from "vue";

export default {
  components: {
  },
  data() {

  },
  methods: {
    log(str) {
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

