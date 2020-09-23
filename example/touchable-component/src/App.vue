

<template>
  <View :style="styles.container">
    <View>
      <Text :style="styles.text">{{ count }}</Text>
      <Touchable :onPress="inc">
        <View :style="styles.content">
          <Text :style="styles.button">Add</Text>
        </View>
      </Touchable>
    </View>
  </View>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };
    return {
      count,
      inc,
      styles: {
        container: {
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#41b883",
          alignItems: "center",
        },
        text: {
          fontSize: 100,
          fontWeight: 800,
          color: "#fff",
          height: 100,
          fontFamily: "zapfino",
          textAlign: "center",
        },
        content: {
          backgroundColor: "#36495d",
          height: 80,
          width: 160,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 16
        },
        button: {
          color: '#fff',
          fontSize: 40,
          height: 80,
          width: 200,
          textAlign: 'center',
        },
      },
    };
  },
};
</script>