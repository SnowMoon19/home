<template>
  <!--  <nav>-->
  <!--    <router-link to="/">Home</router-link> |-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </nav>-->
  <div class="main">
    <!--    <head-bar class="head"/>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin:0;
  padding:0;
  border:0
}

.main {
  background-image: url("assets/background.png");
  background-size: cover;
  width: 100%;
  height: 95vh;
}

</style>
<script>
export default {

}
</script>
