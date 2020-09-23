<template>
  <View :style="styles.container">
    <View :style="styles.content"></View>
  </View>
</template>
<script>
export default {
  setup() {
    return {
      styles: {
        container: {
          backgroundColor: '#fff',
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center'
        },
        content: {
          height: 200,
          width: 400,
          backgroundColor: '#41b883',
          borderWidth: 4,
          borderColor: '#35495e'
        }
      },
    };
  },
};
</script>

