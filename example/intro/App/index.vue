<template>
  <div id='vuvas-container'>
  </div>
</template>

<script lang="ts">
import createApp from '../../../src/render/index'
import App from './view.vue'
export default {
  mounted() {
    createApp(App).mount(document.querySelector('#vuvas-container')!)
  }
}
</script>