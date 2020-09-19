<template>
  <View :style="styles.container">
    <Navbar title="Components" />
    <Panel label="View">
      <View :style="styles.row">
        <View :style="styles.view.base" />
        <View :style="[styles.view.base, styles.view.radius]" />
        <View :style="[styles.view.base, styles.view.border]" />
        <View :style="[styles.view.base, styles.view.shadow]" />
      </View>
    </Panel>
    <Panel label="Text">
      <View :style="styles.row">
        <Text :style="styles.text.base">default style</Text>
        <Text :style="[styles.text.base, styles.text.weight]">fontWeight</Text>
        <Text :style="[styles.text.base, styles.text.color]">color: red</Text>
      </View>
      <View :style="styles.row">
        <Text :style="styles.text.base">textAlign: center</Text>
      </View>
      <View :style="styles.row">
        <Text :style="[styles.text.base, styles.text.serif]">fontFamily: serif</Text>
        <Text :style="[styles.text.base, styles.text.shadow]">textShadow</Text>
      </View>
    </Panel>
    <Panel label="Image" cache>
      <View :style="styles.rowLeft">
        <PanelItem
          label="contain"
        >
          <Image :style="[styles.view.base, styles.image.contain]" src="./assets/avatar.jpg" />
        </PanelItem>
        <PanelItem label="cover">
          <Image :style="styles.view.base" src="./assets/avatar.jpg" />
        </PanelItem>
      </View>
    </Panel>
    <Panel label="Touchable">
      <Touchable :style="styles.button.container" :onPress="log">
          <Text :style="styles.button.text">Button</Text>
      </Touchable>
    </Panel>
    <Panel label="LinearGradient" cache>
      <LinearGradient :style="styles.gradient" :colors="['#C48DF1', '#91D5FF', '#40A9FF']" />
    </Panel>
  </View>
</template>

<script>
import { ref } from "vue";
import Navbar from "../Components/Navbar.vue";
import Panel from "../Components/Panel.vue";
import PanelItem from '../Components/PanelItem.vue'

export default {
  components: {
    Navbar,
    Panel,
    PanelItem
  },
  data() {},
  methods: {
    log(str) {
      alert('press')
    },
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
          backgroundColor: "#fff",
        },
        row: {
          flexDirection: "row",
          justifyContent: "space-around",
          alignItem: "center",
        },
        rowLeft: {
          flexDirection: "row",
          alignItem: "center",
        },
        gradient: {
          height: 40,
          borderColor: 'red',
          borderWidth: 1
        },
        button: {
          container: {
            width: 120,
            height: 40,
            justifyContent: "center",
            backgroundColor: "#333",
          },
          text: {
            color: "#fff",
            fontWeight: "600",
            fontSize: 14,
            textAlign: "center",
          },
        },
        image: {
          contain: {
            resizeMode: "contain",
          },
        },
        text: {
          base: {
            flex: 1,
            textAlign: "center",
            lineHeight: 20,
          },
          weight: {
            fontWeight: "800",
          },
          color: {
            color: "red",
          },
          serif: {
            fontFamily: "serif",
          },
          shadow: {
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
            textShadowBlur: 1,
            textShadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        view: {
          base: {
            width: 60,
            height: 55,
            backgroundColor: "#D8D8D8",
          },
          radius: {
            borderRadius: 5,
          },
          border: {
            borderWidth: 1,
            borderColor: "#979797",
          },
          shadow: {
            backgroundColor: "white",
            shadowOffsetX: 0,
            shadowOffsetY: 2,
            shadowBlur: 6,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
        scrollView: {
          container: {
            height: 55,
          },
          box: {
            width: 60,
            height: 55,
            justifyContent: "center",
            backgroundColor: "#333",
            marginRight: 10,
          },
          text: {
            color: "#fff",
            fontWeight: "600",
            fontSize: 14,
            textAlign: "center",
          },
        },
      },
    };
  },
};
</script>

