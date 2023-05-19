<template>
  <div id="app">
      <the-header></the-header>
      <div class="lump"></div>
      <router-view/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
export default ({
  components: {
    TheHeader
  }
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);
}

.lump{
  height:100px;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e51;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
