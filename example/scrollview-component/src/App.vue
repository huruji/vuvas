<template>
  <View :style="styles.container">
    <ScrollView horizontal :style="styles.scroll">
      <View
        :style="styles.box"
        v-for="(num, index) in numbers"
        :key="index"
      >
        <Text :style="styles.text">{{index + 1}}</Text>
      </View>
    </ScrollView>
  </View>
</template>
<script>
const numbers = [];
for (let i = 0; i < 20; i++) {
  numbers.push(i);
}
export default {
  setup() {
    return {
      numbers,
      styles: {
        container: {
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#41b883",
        },
        scroll: {
          height: 55,
        },
        box: {
          width: 100,
          height: 100,
          justifyContent: "center",
          backgroundColor: "#333",
          marginRight: 10,
        },
        text: {
          color: "#fff",
          fontWeight: "600",
          fontSize: 24,
          textAlign: "center",
        },
      },
    };
  },
};
</script>
