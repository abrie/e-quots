<template>
  <div id="app">
    <CardStack/>
  </div>
</template>

<script>
import CardStack from './components/CardStack.vue'

export default {
  name: 'app',
  components: {
    CardStack
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
