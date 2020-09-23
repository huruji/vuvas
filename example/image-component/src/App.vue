<template>
  <View :style="styles.container">
    <Image src="./src/vue.png" :style="styles.image" />
  </View>
</template>
<script>
export default {
  setup() {
    return {
      styles: {
        container: {
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center'
        },
        image: {
          height: 200,
          width: 200,
        }
      },
    };
  },
};
</script>
