<template>
  <View :style="styles.container">
    <Text :style="styles.text">Vuvas</Text>
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
          backgroundColor: '#41b883',
        },
        text: {
          fontSize: 100,
          fontWeight: 800,
          color: '#fff',
          height: 100,
          fontFamily: 'zapfino',
          textAlign: 'center'
        }
      },
    };
  },
};
</script>

