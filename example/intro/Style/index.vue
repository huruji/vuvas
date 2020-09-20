<template>
  <div id='vuvas-container'>
  </div>
</template>

<script lang="ts">
import { createApp } from 'vuvas'
import App from './view.vue'
export default {
  mounted() {
    createApp(App).mount(document.querySelector('#vuvas-container')!)
  }
}
</script>