<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    /*width: 1200px;*/
    /*height: 600px;*/
    width: 100%;
    height: 100%;
    /*margin: 0 auto;*/
    overflow: hidden;
    /*background: #e1eaed;*/
    /*margin-top: 40px;*/
  }
</style>
