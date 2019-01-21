<template>
  <div id="app">
    
    <HelloWorld/>
    <google-map />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GoogleMap from "./components/GoogleMap";
export default {
  name: 'app',
  components: {
    HelloWorld,
    GoogleMap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
